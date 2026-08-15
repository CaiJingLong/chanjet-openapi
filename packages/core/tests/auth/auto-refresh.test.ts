import { describe, expect, it, vi } from 'vitest';
import { AutoRefreshTokenProvider } from '../../src/auth/auto-refresh.js';
import type { AuthConfig, AuthTokenResult } from '../../src/auth/types.js';
import { ChanjetApiError } from '../../src/errors.js';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

function makeConfig(overrides: Partial<AuthConfig> = {}): AuthConfig {
  return { appKey: 'k', appSecret: 's', ...overrides };
}

describe('AutoRefreshTokenProvider', () => {
  it('构造时 accessToken/refreshToken 为空抛 TypeError', () => {
    const config = makeConfig();
    expect(
      () => new AutoRefreshTokenProvider({ config, accessToken: '', refreshToken: 'r' }),
    ).toThrow('accessToken 不能为空');
    expect(
      () => new AutoRefreshTokenProvider({ config, accessToken: 'a', refreshToken: '' }),
    ).toThrow('refreshToken 不能为空');
  });

  it('未到期时 getOpenToken 直接返回当前 token，不刷新', async () => {
    const refreshFn = vi.fn(async () => ({ access_token: 'new' }));
    const provider = new AutoRefreshTokenProvider({
      config: makeConfig(),
      accessToken: 'current',
      refreshToken: 'r',
      expiresInSeconds: 100000,
      refreshFn,
    });
    await expect(provider.getOpenToken()).resolves.toBe('current');
    expect(refreshFn).not.toHaveBeenCalled();
  });

  it('到期时 getOpenToken 先刷新并返回新 token', async () => {
    const refreshFn = vi.fn(async () => ({
      access_token: 'new-access',
      refresh_token: 'new-refresh',
      expires_in: '1000',
    }));
    const provider = new AutoRefreshTokenProvider({
      config: makeConfig(),
      accessToken: 'old',
      refreshToken: 'r',
      expiresInSeconds: 0,
      refreshFn,
    });
    await expect(provider.getOpenToken()).resolves.toBe('new-access');
    expect(refreshFn).toHaveBeenCalledTimes(1);
  });

  it('刷新后更新 refresh_token 并用于下一次刷新（续期）', async () => {
    let call = 0;
    const refreshFn = vi.fn(async (rt: string) => {
      call += 1;
      return {
        access_token: `access-${call}`,
        refresh_token: `refresh-${call}`,
        expires_in: '1000',
      };
    });
    const provider = new AutoRefreshTokenProvider({
      config: makeConfig(),
      accessToken: 'a0',
      refreshToken: 'r0',
      refreshFn,
    });
    await provider.refresh();
    await provider.refresh();
    expect(refreshFn).toHaveBeenNthCalledWith(1, 'r0');
    expect(refreshFn).toHaveBeenNthCalledWith(2, 'refresh-1');
  });

  it('expires_in 缺失时按 6 天兜底，不会立即再次刷新', async () => {
    const refreshFn = vi.fn(async () => ({ access_token: 'new', refresh_token: 'r2' }));
    const provider = new AutoRefreshTokenProvider({
      config: makeConfig(),
      accessToken: 'a',
      refreshToken: 'r',
      expiresInSeconds: 0,
      refreshFn,
    });
    await provider.getOpenToken();
    await provider.getOpenToken();
    expect(refreshFn).toHaveBeenCalledTimes(1);
  });

  it('并发 refresh 共享单飞，只调用一次刷新', async () => {
    let resolveFn: ((r: AuthTokenResult) => void) | undefined;
    const refreshFn = vi.fn(
      () =>
        new Promise<AuthTokenResult>((resolve) => {
          resolveFn = resolve;
        }),
    );
    const provider = new AutoRefreshTokenProvider({
      config: makeConfig(),
      accessToken: 'a',
      refreshToken: 'r',
      expiresInSeconds: 0,
      refreshFn,
    });
    const p1 = provider.refresh();
    const p2 = provider.refresh();
    resolveFn?.({ access_token: 'new', refresh_token: 'r2', expires_in: '100' });
    await expect(Promise.all([p1, p2])).resolves.toEqual(['new', 'new']);
    expect(refreshFn).toHaveBeenCalledTimes(1);
  });

  it('刷新响应缺少 access_token 抛 ChanjetApiError', async () => {
    const refreshFn = vi.fn(async () => ({ refresh_token: 'r' }));
    const provider = new AutoRefreshTokenProvider({
      config: makeConfig(),
      accessToken: 'a',
      refreshToken: 'r',
      expiresInSeconds: 0,
      refreshFn,
    });
    await expect(provider.getOpenToken()).rejects.toBeInstanceOf(ChanjetApiError);
  });

  it('未注入 refreshFn 时使用默认 refreshAccessToken', async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () =>
      jsonResponse({
        code: '200',
        message: '成功',
        result: { access_token: 'new', refresh_token: 'r2', expires_in: '1000' },
      }),
    );
    const provider = new AutoRefreshTokenProvider({
      config: makeConfig({ fetchImpl }),
      accessToken: 'a',
      refreshToken: 'r',
      expiresInSeconds: 0,
    });
    await expect(provider.getOpenToken()).resolves.toBe('new');
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
});
