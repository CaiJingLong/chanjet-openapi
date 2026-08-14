/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/common/base_api/oauth2
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/common/base_api_oauth2.md
 */

import { requestAuthToken } from './auth-request.js';
import type { AuthConfig, AuthTokenResult, RefreshAccessTokenParams } from './types.js';

/**
 * 刷新开放平台 token（新版），即延长授权。GET /auth/v2/refreshToken。
 *
 * 用 refresh_token 换取新的访问令牌。刷新后原 token 立即失效，须使用新 token；
 * refresh_token 会自动续期，须用返回的新 refresh_token 覆盖旧值。
 *
 * @param config 鉴权配置
 * @param config.appKey 开放平台 appKey，必填
 * @param config.appSecret 开放平台 appSecret，必填
 * @param config.baseUrl 请求基地址，缺省 https://openapi.chanjet.com
 * @param config.timeoutMs 超时（毫秒），缺省 30000
 * @param config.fetchImpl 测试注入的 fetch 实现，缺省原生 fetch
 * @param params 刷新 token 入参
 * @param params.refreshToken 刷新令牌，必填
 * @returns token 结果，`access_token` 用作业务接口的 openToken
 * @throws {ChanjetApiError} HTTP 非 2xx、业务失败（code !== '200'）、网络异常或超时
 * @see https://open.chanjet.com/md/docs/file/apiFile/common/base_api/oauth2
 */
export async function refreshAccessToken(
  config: AuthConfig,
  params: RefreshAccessTokenParams,
): Promise<AuthTokenResult> {
  return requestAuthToken(config, {
    path: '/auth/v2/refreshToken',
    method: 'GET',
    query: {
      grantType: 'refresh_token',
      refreshToken: params.refreshToken,
    },
  });
}
