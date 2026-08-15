import { describe, expect, it, vi } from 'vitest';
import { refreshAccessToken } from '../../src/auth/refresh-token.js';
import type { AuthConfig } from '../../src/auth/types.js';
import { ChanjetApiError } from '../../src/errors.js';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

function makeConfig(overrides: Partial<AuthConfig> = {}): AuthConfig {
  return { appKey: 'k', appSecret: 's', ...overrides };
}

describe('refreshAccessToken 延长授权', () => {
  it('以 GET 请求 /auth/v2/refreshToken，映射 grantType/refreshToken，成功后返回 result', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      jsonResponse({
        code: '200',
        message: '成功',
        result: { access_token: 'new-access', refresh_token: 'new-refresh', expires_in: '518400' },
      }),
    );
    const config = makeConfig({ fetchImpl });
    const result = await refreshAccessToken(config, { refreshToken: 'old-refresh' });

    expect(result).toEqual({
      access_token: 'new-access',
      refresh_token: 'new-refresh',
      expires_in: '518400',
    });
    const url = String(fetchImpl.mock.calls[0]?.[0]);
    expect(url).toBe(
      'https://openapi.chanjet.com/auth/v2/refreshToken?grantType=refresh_token&refreshToken=old-refresh',
    );
  });

  it('业务失败抛 ChanjetApiError，url 脱敏（refreshToken 不出现在 url 中）', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      jsonResponse({ code: '14002', message: '请求太快，稍后重试' }),
    );
    const config = makeConfig({ fetchImpl });
    const err = await refreshAccessToken(config, {
      refreshToken: 'secret-refresh',
    }).catch((e: unknown) => e as ChanjetApiError);

    expect(err).toBeInstanceOf(ChanjetApiError);
    expect((err as ChanjetApiError).code).toBe('14002');
    expect((err as ChanjetApiError).url).toBe('https://openapi.chanjet.com/auth/v2/refreshToken');
    expect((err as ChanjetApiError).url).not.toContain('secret-refresh');
  });
});
