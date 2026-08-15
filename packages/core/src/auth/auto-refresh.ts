/**
 * 来源:
 * - https://open.chanjet.com/md/docs/file/apiFile/common/base_api/oauth2
 * - https://open.chanjet.com/md/docs/file/guide/commonContent/jcwd-sfyz/sfyz-jrzy
 * 抓取日期: 2026-08-14
 * 本地快照:
 * - .cache/docs/common/base_api_oauth2.md
 * - .cache/docs/guide-sfyz-jrzy.md
 */

import { ChanjetApiError } from '../errors.js';
import type { TokenProvider } from '../client.js';
import { refreshAccessToken } from './refresh-token.js';
import type { AuthConfig, AuthTokenResult } from './types.js';

/**
 * 官方文档明确 access_token 有效期：app_settled_auth.md「token 若不重新获取，过期时间是 6 天」。
 * 缺省 `expires_in` 时以此兜底。
 */
const DEFAULT_EXPIRES_IN_SECONDS = 6 * 24 * 60 * 60;
/** 提前刷新安全边际（秒） */
const DEFAULT_REFRESH_AHEAD_SECONDS = 60;

export interface AutoRefreshTokenProviderOptions {
  /** 鉴权配置（appKey/appSecret 等，用于默认刷新函数） */
  config: AuthConfig;
  /** 初始 access_token */
  accessToken: string;
  /** 刷新令牌 */
  refreshToken: string;
  /** access_token 过期时间（秒）；缺省按官方文档 6 天 */
  expiresInSeconds?: number;
  /** 提前刷新的安全边际（秒）；缺省 60 */
  refreshAheadSeconds?: number;
  /** 自定义刷新函数（测试注入）；缺省调用 refreshAccessToken */
  refreshFn?: (refreshToken: string) => Promise<AuthTokenResult>;
}

/**
 * 自动刷新 TokenProvider。
 *
 * 持有 access_token / refresh_token 与过期时间，`getOpenToken()` 在令牌即将到期时先调用
 * 刷新接口（延长授权）再用新令牌，使客户端无需感知令牌轮换。
 *
 * 刷新策略取证：accounting 业务模块文档未给出「openToken 失效」的显式错误码；官方唯一明确事实是
 * access_token 过期（app_settled_auth.md L8「token 若不重新获取，过期时间是 6 天」）且须用
 * refresh_token 刷新（L22 方案建议）。故采用基于 `expires_in` 的**主动（时间驱动）刷新**，而非
 * 被动等待业务接口报错后再刷新；此为推断，注释已标注。
 */
export class AutoRefreshTokenProvider implements TokenProvider {
  private accessToken: string;
  private refreshToken: string;
  private expiresAt: number;
  private readonly refreshAheadMs: number;
  private readonly refreshFn: (refreshToken: string) => Promise<AuthTokenResult>;
  private inflight: Promise<string> | null = null;

  constructor(options: AutoRefreshTokenProviderOptions) {
    if (!options.accessToken) {
      throw new TypeError('accessToken 不能为空');
    }
    if (!options.refreshToken) {
      throw new TypeError('refreshToken 不能为空');
    }
    this.accessToken = options.accessToken;
    this.refreshToken = options.refreshToken;
    const expiresIn = options.expiresInSeconds ?? DEFAULT_EXPIRES_IN_SECONDS;
    this.expiresAt = Date.now() + expiresIn * 1000;
    this.refreshAheadMs = (options.refreshAheadSeconds ?? DEFAULT_REFRESH_AHEAD_SECONDS) * 1000;
    this.refreshFn =
      options.refreshFn ?? ((refreshToken) => refreshAccessToken(options.config, { refreshToken }));
  }

  /**
   * 返回当前 access_token；令牌即将到期时先刷新再返回新令牌。
   *
   * @returns 当前有效的 access_token（用作业务接口 openToken）
   * @throws {ChanjetApiError} 刷新失败（业务失败 / 网络异常）或刷新响应缺少 access_token
   */
  async getOpenToken(): Promise<string> {
    if (Date.now() >= this.expiresAt - this.refreshAheadMs) {
      await this.refresh();
    }
    return this.accessToken;
  }

  /**
   * 立即刷新并返回新 access_token。并发调用共享同一次刷新（单飞）。
   *
   * @returns 刷新后的新 access_token
   * @throws {ChanjetApiError} 刷新失败或刷新响应缺少 access_token
   */
  async refresh(): Promise<string> {
    if (this.inflight) {
      return this.inflight;
    }
    this.inflight = this.doRefresh();
    try {
      return await this.inflight;
    } finally {
      this.inflight = null;
    }
  }

  private async doRefresh(): Promise<string> {
    const result = await this.refreshFn(this.refreshToken);
    const access = result.access_token;
    if (!access) {
      throw new ChanjetApiError({ message: '刷新响应缺少 access_token', url: '' });
    }
    this.accessToken = access;
    if (result.refresh_token) {
      this.refreshToken = result.refresh_token;
    }
    this.expiresAt = Date.now() + parseExpiresInSeconds(result.expires_in);
    return access;
  }
}

function parseExpiresInSeconds(expiresIn: string | undefined): number {
  const seconds = Number(expiresIn);
  if (Number.isFinite(seconds) && seconds > 0) {
    return seconds;
  }
  return DEFAULT_EXPIRES_IN_SECONDS;
}
