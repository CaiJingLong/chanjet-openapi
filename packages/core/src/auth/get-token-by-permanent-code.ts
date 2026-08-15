/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/common/app_settled/app_settled_auth
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/common/app_settled_app_settled_auth.md
 */

import { requestAuthToken } from './auth-request.js';
import type { AuthConfig, AuthTokenResult, GetTokenByPermanentCodeParams } from './types.js';

/**
 * 使用用户永久授权码获取 token。POST /auth/token/getTokenByPermanentCode。
 *
 * 用户永久授权码首次只能通过授权码换 token 接口获取（返回字段 `user_auth_permanent_code`）。
 * 用户主动取消授权后该接口不能再获取 token；每永久授权码限额 1000 次/日（2026-01-01 执行）。
 *
 * @param config 鉴权配置
 * @param config.appKey 开放平台 appKey，必填
 * @param config.appSecret 开放平台 appSecret，必填
 * @param config.baseUrl 请求基地址，缺省 https://openapi.chanjet.com
 * @param config.timeoutMs 超时（毫秒），缺省 30000
 * @param config.fetchImpl 测试注入的 fetch 实现，缺省原生 fetch
 * @param params 永久授权码换 token 入参
 * @param params.orgAccessToken 企业凭证（由获取企业凭证接口返回），必填
 * @param params.userAuthPermanentCode 用户永久授权码（首次由授权码换 token 接口返回），必填
 * @returns token 结果，`access_token` 用作业务接口的 openToken
 * @throws {ChanjetApiError} HTTP 非 2xx、业务失败（code !== '200'）、网络异常或超时
 * @see https://open.chanjet.com/md/docs/file/apiFile/common/app_settled/app_settled_auth
 */
export async function getTokenByPermanentCode(
  config: AuthConfig,
  params: GetTokenByPermanentCodeParams,
): Promise<AuthTokenResult> {
  return requestAuthToken(config, {
    path: '/auth/token/getTokenByPermanentCode',
    method: 'POST',
    body: {
      orgAccessToken: params.orgAccessToken,
      userAuthPermanentCode: params.userAuthPermanentCode,
    },
  });
}
