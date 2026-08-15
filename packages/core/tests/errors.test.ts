import { describe, expect, it } from 'vitest';
import { ChanjetApiError } from '../src/errors.js';

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
