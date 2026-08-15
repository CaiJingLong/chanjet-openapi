import { describe, expect, it } from 'vitest';
import * as core from '../src/index.js';
import { ChanjetClient } from '../src/client.js';
import { ChanjetApiError } from '../src/errors.js';
import * as auth from '../src/auth/index.js';

describe('@chanjet-openapi/core 公共导出面', () => {
  it('导出 ChanjetClient 类', () => {
    expect(core.ChanjetClient).toBe(ChanjetClient);
  });

  it('导出 ChanjetApiError 类', () => {
    expect(core.ChanjetApiError).toBe(ChanjetApiError);
  });

  it('导出 auth 命名空间', () => {
    expect(core.auth).toBeDefined();
    expect(core.auth.exchangeAuthCode).toBe(auth.exchangeAuthCode);
    expect(core.auth.refreshAccessToken).toBe(auth.refreshAccessToken);
    expect(core.auth.getTokenByPermanentCode).toBe(auth.getTokenByPermanentCode);
    expect(core.auth.AutoRefreshTokenProvider).toBe(auth.AutoRefreshTokenProvider);
  });

  it('ChanjetClient 可实例化并配置 baseUrl', () => {
    const client = new core.ChanjetClient({
      appKey: 'test-key',
      appSecret: 'test-secret',
      openToken: 'test-token',
      baseUrl: 'https://custom.example.com',
    });
    expect(client).toBeInstanceOf(ChanjetClient);
  });

  it('ChanjetApiError 携带完整字段', () => {
    const err = new core.ChanjetApiError({
      message: '测试错误',
      code: '000001',
      msg: '业务失败',
      url: 'https://example.com/api',
    });
    expect(err).toBeInstanceOf(ChanjetApiError);
    expect(err.code).toBe('000001');
    expect(err.msg).toBe('业务失败');
    expect(err.url).toBe('https://example.com/api');
  });
});
