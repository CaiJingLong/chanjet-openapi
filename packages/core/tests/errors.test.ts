import { describe, expect, it } from 'vitest';
import { ChanjetApiError, PLATFORM_ERROR_CODES, isPlatformError } from '../src/errors.js';

describe('ChanjetApiError', () => {
  it('携带全部 readonly 字段并继承 Error', () => {
    const cause = new Error('底层网络错误');
    const err = new ChanjetApiError({
      message: '畅捷通 API 业务失败',
      code: 'openApi.e9000',
      msg: '其它错误,详见详细信息',
      msgArgs: { indexedValues: ['a'], namedValues: { k: 'v' } },
      data: { detail: 1 },
      requestId: 'req-123',
      httpStatus: 200,
      url: 'https://openapi.chanjet.com/accounting/x',
      cause,
    });

    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(ChanjetApiError);
    expect(err.name).toBe('ChanjetApiError');
    expect(err.message).toBe('畅捷通 API 业务失败');
    expect(err.code).toBe('openApi.e9000');
    expect(err.msg).toBe('其它错误,详见详细信息');
    expect(err.msgArgs).toEqual({ indexedValues: ['a'], namedValues: { k: 'v' } });
    expect(err.data).toEqual({ detail: 1 });
    expect(err.requestId).toBe('req-123');
    expect(err.httpStatus).toBe(200);
    expect(err.url).toBe('https://openapi.chanjet.com/accounting/x');
    expect(err.cause).toBe(cause);
  });

  it('网络错误时 httpStatus 为 undefined，其余可选字段缺省', () => {
    const err = new ChanjetApiError({
      message: '网络请求失败',
      url: 'https://openapi.chanjet.com/x',
    });
    expect(err.httpStatus).toBeUndefined();
    expect(err.code).toBeUndefined();
    expect(err.msg).toBeUndefined();
    expect(err.msgArgs).toBeUndefined();
    expect(err.data).toBeUndefined();
    expect(err.requestId).toBeUndefined();
    expect(err.cause).toBeUndefined();
  });
});

describe('PLATFORM_ERROR_CODES', () => {
  it('所有常量值与固化文档一致', () => {
    expect(PLATFORM_ERROR_CODES.RATE_LIMIT_EXCEEDED).toBe('50112');
    expect(PLATFORM_ERROR_CODES.APP_KEY_MISMATCH).toBe('50112');
    expect(PLATFORM_ERROR_CODES.SYSTEM_ERROR).toBe('50000');
    expect(PLATFORM_ERROR_CODES.APP_KEY_EMPTY).toBe('4001');
    expect(PLATFORM_ERROR_CODES.APP_KEY_INVALID).toBe('4002');
    expect(PLATFORM_ERROR_CODES.GRANT_TYPE_EMPTY).toBe('4003');
    expect(PLATFORM_ERROR_CODES.GRANT_TYPE_UNSUPPORTED).toBe('4008');
    expect(PLATFORM_ERROR_CODES.INTERNAL_SERVER_ERROR).toBe('500');
    expect(PLATFORM_ERROR_CODES.REQUEST_TOO_FREQUENT).toBe('14002');
  });
});

describe('isPlatformError', () => {
  function makeError(code: string | undefined, httpStatus?: number): ChanjetApiError {
    return new ChanjetApiError({ message: 'x', url: 'https://x', code, httpStatus });
  }

  it('50112 + httpStatus 401 匹配 RATE_LIMIT_EXCEEDED', () => {
    expect(isPlatformError(makeError('50112', 401), 'RATE_LIMIT_EXCEEDED')).toBe(true);
  });

  it('50112 + httpStatus 403 匹配 APP_KEY_MISMATCH', () => {
    expect(isPlatformError(makeError('50112', 403), 'APP_KEY_MISMATCH')).toBe(true);
  });

  it('50112 + httpStatus 401 不匹配 APP_KEY_MISMATCH', () => {
    expect(isPlatformError(makeError('50112', 401), 'APP_KEY_MISMATCH')).toBe(false);
  });

  it('50112 + httpStatus 403 不匹配 RATE_LIMIT_EXCEEDED', () => {
    expect(isPlatformError(makeError('50112', 403), 'RATE_LIMIT_EXCEEDED')).toBe(false);
  });

  it('非 50112 的码只按 code 匹配，不检查 httpStatus', () => {
    expect(isPlatformError(makeError('50000', 401), 'SYSTEM_ERROR')).toBe(true);
    expect(isPlatformError(makeError('50000', 403), 'SYSTEM_ERROR')).toBe(true);
    expect(isPlatformError(makeError('50000', 404), 'SYSTEM_ERROR')).toBe(true);
    expect(isPlatformError(makeError('4001', 200), 'APP_KEY_EMPTY')).toBe(true);
    expect(isPlatformError(makeError('14002', 500), 'REQUEST_TOO_FREQUENT')).toBe(true);
  });

  it('code 不匹配时返回 false', () => {
    expect(isPlatformError(makeError('99999', 401), 'RATE_LIMIT_EXCEEDED')).toBe(false);
    expect(isPlatformError(makeError('50000', 401), 'RATE_LIMIT_EXCEEDED')).toBe(false);
  });

  it('code 为 undefined 时返回 false', () => {
    expect(isPlatformError(makeError(undefined, 401), 'RATE_LIMIT_EXCEEDED')).toBe(false);
    expect(isPlatformError(makeError(undefined, 403), 'APP_KEY_MISMATCH')).toBe(false);
    expect(isPlatformError(makeError(undefined), 'SYSTEM_ERROR')).toBe(false);
  });
});
