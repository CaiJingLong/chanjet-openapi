import { describe, expect, it, vi } from 'vitest';
import { exchangeAuthCode } from '../../src/auth/get-token.js';
import type { AuthConfig } from '../../src/auth/types.js';
import { ChanjetApiError } from '../../src/errors.js';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

function headersOf(init?: RequestInit): Record<string, string> {
  return (init?.headers ?? {}) as Record<string, string>;
}

const tokenResult = {
  access_token: 'access-1',
  refresh_token: 'refresh-1',
  expires_in: '345600',
  app_name: 'accounting',
  user_auth_permanent_code: 'perm-code',
};

function makeConfig(overrides: Partial<AuthConfig> = {}): AuthConfig {
  return { appKey: 'k', appSecret: 's', ...overrides };
}

describe('exchangeAuthCode 授权码换 token', () => {
  it('以 GET 请求 /auth/v2/getToken，映射 grantType/redirectUri/code，成功后返回 result', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      jsonResponse({ code: '200', message: '成功', result: tokenResult }),
    );
    const config = makeConfig({ fetchImpl });
    const result = await exchangeAuthCode(config, {
      code: 'temp-code',
      redirectUri: 'https://example.com/cb?a=1',
    });

    expect(result).toEqual(tokenResult);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const url = String(fetchImpl.mock.calls[0]?.[0]);
    expect(url).toBe(
      'https://openapi.chanjet.com/auth/v2/getToken?grantType=authorization_code&redirectUri=https%3A%2F%2Fexample.com%2Fcb%3Fa%3D1&code=temp-code',
    );
    const headers = headersOf(fetchImpl.mock.calls[0]?.[1]);
    expect(headers.appKey).toBe('k');
    expect(headers.appSecret).toBe('s');
    expect(headers['Content-Type']).toBe('application/json');
    expect(headers.openToken).toBeUndefined();
  });

  it('业务失败（code !== 200）抛 ChanjetApiError，url 脱敏不含 query', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      jsonResponse({ code: '4002', message: 'appKey不正确' }),
    );
    const config = makeConfig({ fetchImpl });
    const err = await exchangeAuthCode(config, {
      code: 'temp-code',
      redirectUri: 'https://example.com/cb',
    }).catch((e: unknown) => e as ChanjetApiError);

    expect(err).toBeInstanceOf(ChanjetApiError);
    expect((err as ChanjetApiError).code).toBe('4002');
    expect((err as ChanjetApiError).msg).toBe('appKey不正确');
    expect((err as ChanjetApiError).url).toBe('https://openapi.chanjet.com/auth/v2/getToken');
  });

  it('HTTP 非 2xx 抛 ChanjetApiError 并携带 httpStatus', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      jsonResponse({ code: '500', message: '服务器内部错误' }, 500),
    );
    const config = makeConfig({ fetchImpl });
    const err = await exchangeAuthCode(config, {
      code: 'temp-code',
      redirectUri: 'https://example.com/cb',
    }).catch((e: unknown) => e as ChanjetApiError);

    expect(err).toBeInstanceOf(ChanjetApiError);
    expect((err as ChanjetApiError).httpStatus).toBe(500);
    expect((err as ChanjetApiError).code).toBe('500');
  });

  it('网络错误抛 ChanjetApiError（httpStatus 为 undefined）', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new Error('network down'));
    const config = makeConfig({ fetchImpl });
    const err = await exchangeAuthCode(config, {
      code: 'temp-code',
      redirectUri: 'https://example.com/cb',
    }).catch((e: unknown) => e as ChanjetApiError);

    expect(err).toBeInstanceOf(ChanjetApiError);
    expect((err as ChanjetApiError).httpStatus).toBeUndefined();
    expect((err as ChanjetApiError).url).toBe('https://openapi.chanjet.com/auth/v2/getToken');
  });

  it('result 缺省时返回空对象', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      jsonResponse({ code: '200', message: '成功' }),
    );
    const config = makeConfig({ fetchImpl });
    await expect(
      exchangeAuthCode(config, { code: 'temp-code', redirectUri: 'https://example.com/cb' }),
    ).resolves.toEqual({});
  });

  it('空响应体视为空对象，code 缺失时按业务失败处理', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () => new Response('', { status: 200 }));
    const config = makeConfig({ fetchImpl });
    await expect(
      exchangeAuthCode(config, { code: 'temp-code', redirectUri: 'https://example.com/cb' }),
    ).rejects.toBeInstanceOf(ChanjetApiError);
  });

  it('2xx 非法 JSON 响应体抛 ChanjetApiError', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () => new Response('not json', { status: 200 }));
    const config = makeConfig({ fetchImpl });
    await expect(
      exchangeAuthCode(config, { code: 'temp-code', redirectUri: 'https://example.com/cb' }),
    ).rejects.toThrow('鉴权响应体不是合法 JSON');
  });

  it('HTTP 非 2xx 无 message 时使用缺省消息', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () => jsonResponse({ code: '500' }, 500));
    const config = makeConfig({ fetchImpl });
    const err = await exchangeAuthCode(config, {
      code: 'temp-code',
      redirectUri: 'https://example.com/cb',
    }).catch((e: unknown) => e as ChanjetApiError);
    expect((err as ChanjetApiError).message).toContain('HTTP 500');
  });

  it('未注入 fetchImpl 时使用全局 fetch', async () => {
    const globalFetch = vi.fn(async () =>
      jsonResponse({ code: '200', message: '成功', result: { access_token: 'a' } }),
    );
    vi.stubGlobal('fetch', globalFetch);
    try {
      const result = await exchangeAuthCode(makeConfig(), {
        code: 'temp-code',
        redirectUri: 'https://example.com/cb',
      });
      expect(result).toEqual({ access_token: 'a' });
      expect(globalFetch).toHaveBeenCalledTimes(1);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
