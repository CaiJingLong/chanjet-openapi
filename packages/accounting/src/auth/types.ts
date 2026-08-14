/**
 * 来源:
 * - https://open.chanjet.com/md/docs/file/apiFile/common/app_settled/app_settled_auth
 * - https://open.chanjet.com/md/docs/file/apiFile/common/base_api/oauth2
 * 抓取日期: 2026-08-14
 * 本地快照:
 * - .cache/docs/common/app_settled_app_settled_auth.md
 * - .cache/docs/common/base_api_oauth2.md
 */

/** 鉴权请求配置（授权码换 token / 刷新 token 共用） */
export interface AuthConfig {
  appKey: string;
  appSecret: string;
  /** 默认 https://openapi.chanjet.com */
  baseUrl?: string;
  /** 默认 30000ms */
  timeoutMs?: number;
  /** 测试注入 */
  fetchImpl?: typeof fetch;
}

/**
 * 鉴权接口响应外壳。字段与官方输出参数表逐字对齐（`code` 为 string，`message` 为 string，
 * `result` 为 object）。
 */
export interface AuthTokenResponse {
  /** 返回 code 码，200 为成功，其余均为失败 */
  code?: string;
  /** 描述信息 */
  message?: string;
  /** 返回结果 */
  result?: AuthTokenResult;
}

/**
 * token 结果字段（授权码换 token 接口输出参数表；刷新 token 接口为其子集）。
 * 官方参数表类型均为 string（部分响应示例展示为整数，此处以参数表为准，不做类型转换）。
 */
export interface AuthTokenResult {
  /** 访问令牌，调用接口中的 openToken 使用该字段 */
  access_token?: string;
  /** 过期时间，单位 s */
  expires_in?: string;
  /** 更新令牌，刷新 token 时使用 */
  refresh_token?: string;
  /** 更新令牌过期时间，单位 s */
  refresh_expires_in?: string;
  /** 授权域 */
  scope?: string;
  /** 用户 ID */
  user_id?: string;
  /** 企业 ID */
  org_id?: string;
  /** 畅捷通内应用名 */
  app_name?: string;
  /** T+ 产品部分接口需要传在 Cookie 中的值 */
  sid?: string;
  /** 用户永久授权码（仅授权码换 token 接口返回） */
  user_auth_permanent_code?: string;
}

/** 授权码换 token 入参 */
export interface ExchangeAuthCodeParams {
  /** 用户临时授权码，由授权完成后跳转地址返回；10 分钟内有效，使用一次后失效 */
  code: string;
  /** 开放平台应用中配置的 Oauth 回调地址，需要 urlEncode，不能带 query 参数 */
  redirectUri: string;
}

/** 刷新 token 入参 */
export interface RefreshAccessTokenParams {
  /** 刷新令牌 */
  refreshToken: string;
}

/** 使用用户永久授权码获取 token 入参 */
export interface GetTokenByPermanentCodeParams {
  /** 企业凭证，由获取企业凭证接口返回 */
  orgAccessToken: string;
  /** 用户永久授权码，首次通过授权码换 token 接口返回 */
  userAuthPermanentCode: string;
}

/** 鉴权接口业务错误码（来自授权码换 token / 刷新 token 接口「错误码说明」表） */
export const AUTH_SUCCESS_CODE = '200';

/** 鉴权接口错误码常量表（「错误码说明」表逐条收录） */
export const AUTH_ERROR_CODES = {
  SUCCESS: { code: '200', message: '成功' },
  APP_KEY_EMPTY: { code: '4001', message: 'appKey不能为空' },
  APP_KEY_INVALID: { code: '4002', message: 'appKey不正确' },
  GRANT_TYPE_EMPTY: { code: '4003', message: 'grantType不能为空' },
  GRANT_TYPE_UNSUPPORTED: { code: '4008', message: '不支持的grantType' },
  INTERNAL_ERROR: { code: '500', message: '服务器内部错误' },
  RATE_LIMIT: { code: '14002', message: '请求太快，稍后重试 (可能由于同一请求并发导致)' },
  SYSTEM_ERROR: { code: '50000', message: '系统错误' },
} as const;
