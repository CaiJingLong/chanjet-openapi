import { describe, expect, it, vi } from 'vitest';
import { getTokenByPermanentCode } from '../../src/auth/get-token-by-permanent-code.js';
import type { AuthConfig } from '../../src/auth/types.js';
import { ChanjetApiError } from '../../src/errors.js';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

function headersOf(init?: RequestInit): Record<string, string> {
  return (init?.headers ?? {}) as Record<string, string>;
}

function makeConfig(overrides: Partial<AuthConfig> = {}): AuthConfig {
  return { appKey: 'k', appSecret: 's', ...overrides };
}

describe('getTokenByPermanentCode 使用用户永久授权码获取 token', () => {
  it('以 POST 请求 /auth/token/getTokenByPermanentCode，映射 body 字段，成功后返回 result', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      jsonResponse({
        code: '200',
        message: '成功',
        result: { access_token: 'access-1', refresh_token: 'refresh-1', expires_in: '518400' },
      }),
    );
    const config = makeConfig({ fetchImpl });
    const result = await getTokenByPermanentCode(config, {
      orgAccessToken: 'org-access',
      userAuthPermanentCode: 'perm-code',
    });

    expect(result).toEqual({
      access_token: 'access-1',
      refresh_token: 'refresh-1',
      expires_in: '518400',
    });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const url = String(fetchImpl.mock.calls[0]?.[0]);
    expect(url).toBe('https://openapi.chanjet.com/auth/token/getTokenByPermanentCode');
    const init = fetchImpl.mock.calls[0]?.[1];
    expect(init?.method).toBe('POST');
    expect(JSON.parse(init?.body as string)).toEqual({
      orgAccessToken: 'org-access',
      userAuthPermanentCode: 'perm-code',
    });
    const headers = headersOf(init);
    expect(headers.appKey).toBe('k');
    expect(headers.appSecret).toBe('s');
    expect(headers['Content-Type']).toBe('application/json');
    expect(headers.openToken).toBeUndefined();
  });

  it('业务失败（code=50000）抛 ChanjetApiError，url 脱敏不含 query', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      jsonResponse({ code: '50000', message: '系统错误' }),
    );
    const config = makeConfig({ fetchImpl });
    const err = await getTokenByPermanentCode(config, {
      orgAccessToken: 'org-access',
      userAuthPermanentCode: 'perm-code',
    }).catch((e: unknown) => e as ChanjetApiError);

    expect(err).toBeInstanceOf(ChanjetApiError);
    expect((err as ChanjetApiError).code).toBe('50000');
    expect((err as ChanjetApiError).msg).toBe('系统错误');
    expect((err as ChanjetApiError).url).toBe(
      'https://openapi.chanjet.com/auth/token/getTokenByPermanentCode',
    );
  });
});
