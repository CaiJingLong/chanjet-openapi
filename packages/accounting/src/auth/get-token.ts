/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/common/app_settled/app_settled_auth
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/common/app_settled_app_settled_auth.md
 */

import { requestAuthToken } from './auth-request.js';
import type { AuthConfig, AuthTokenResult, ExchangeAuthCodeParams } from './types.js';

/**
 * 授权码换 token（新版）。GET /auth/v2/getToken。
 *
 * 用用户授权完成后回调地址携带的临时授权码换取访问令牌；返回 `refresh_token` 用于后续延长授权，
 * 返回 `user_auth_permanent_code` 供永久授权码方式换取 token。
 *
 * @param config 鉴权配置
 * @param config.appKey 开放平台 appKey，必填
 * @param config.appSecret 开放平台 appSecret，必填
 * @param config.baseUrl 请求基地址，缺省 https://openapi.chanjet.com
 * @param config.timeoutMs 超时（毫秒），缺省 30000
 * @param config.fetchImpl 测试注入的 fetch 实现，缺省原生 fetch
 * @param params 授权码换 token 入参
 * @param params.code 用户临时授权码，10 分钟内有效，使用一次后失效
 * @param params.redirectUri 开放平台应用中配置的 Oauth 回调地址，需要 urlEncode，不能带 query 参数
 * @returns token 结果，`access_token` 用作业务接口的 openToken
 * @throws {ChanjetApiError} HTTP 非 2xx、业务失败（code !== '200'）、网络异常或超时
 * @see https://open.chanjet.com/md/docs/file/apiFile/common/app_settled/app_settled_auth
 */
export async function exchangeAuthCode(
  config: AuthConfig,
  params: ExchangeAuthCodeParams,
): Promise<AuthTokenResult> {
  return requestAuthToken(config, {
    path: '/auth/v2/getToken',
    method: 'GET',
    query: {
      grantType: 'authorization_code',
      redirectUri: params.redirectUri,
      code: params.code,
    },
  });
}
