/**
 * 来源: packages/core/CONTRACT.md（共享契约，主 agent 定稿）
 *
 * 平台级错误码来源（固化文档）：
 * - https://open.chanjet.com/md/docs/file/qa/qa/cjwt-apidy/apiLiquidControl — .cache/docs/common/qa-apiLiquidControl.md
 * - https://open.chanjet.com/md/docs/file/qa/qa/cjwt-apidy/tokenAppkeyChk — .cache/docs/common/qa-tokenAppkeyChk.md
 * - https://open.chanjet.com/md/docs/file/qa/qa/cjwt-apidy/apidy-apidywt — .cache/docs/common/qa-apidy-apidywt.md
 * - https://openapi.chanjet.com/auth/v2/refreshToken 错误码表 — .cache/docs/common/base_api_oauth2.md
 */
import type { ApiEnvelope } from './types.js';

/** ChanjetApiError 构造入参 */
export interface ChanjetApiErrorOptions {
  /** 面向调用方的错误描述（不得包含 appSecret / openToken 等明文） */
  message: string;
  /** 官方业务错误码原文 */
  code?: string;
  /** 官方错误消息原文 */
  msg?: string;
  msgArgs?: ApiEnvelope<unknown>['msgArgs'];
  data?: unknown;
  requestId?: string;
  /** HTTP 状态码；网络错误时为 undefined */
  httpStatus?: number;
  /** 实际请求 URL */
  url: string;
  /** 底层错误（网络异常、超时等），便于排障 */
  cause?: unknown;
}

/**
 * 畅捷通开放平台统一错误模型。
 *
 * 网络层、HTTP 层、业务层错误统一归一为该类：网络错误时 `httpStatus` 为 `undefined`；
 * HTTP 非 2xx 时携带 `httpStatus` 并透传响应体；业务失败时携带官方 `code` / `msg` 原文。
 */
export class ChanjetApiError extends Error {
  /** 官方业务错误码原文 */
  readonly code?: string;
  /** 官方错误消息原文 */
  readonly msg?: string;
  readonly msgArgs?: ApiEnvelope<unknown>['msgArgs'];
  readonly data?: unknown;
  readonly requestId?: string;
  /** HTTP 状态码；网络错误时为 undefined */
  readonly httpStatus?: number;
  /** 实际请求 URL */
  readonly url: string;

  constructor(options: ChanjetApiErrorOptions) {
    super(options.message, { cause: options.cause });
    this.name = 'ChanjetApiError';
    this.code = options.code;
    this.msg = options.msg;
    this.msgArgs = options.msgArgs;
    this.data = options.data;
    this.requestId = options.requestId;
    this.httpStatus = options.httpStatus;
    this.url = options.url;
  }
}

/**
 * 平台级错误码常量表。
 *
 * 这些错误码跨所有 API 模块，不属于任何单个业务模块的错误码表。
 * 来源：畅捷通开放平台 FAQ + OAuth2 鉴权接口错误码表。
 *
 * 注意：`50112` 被平台复用于两种含义——
 * - httpStatus 401：流量管控（appKey+orgId 本月访问已达上限）
 * - httpStatus 403：appKey 不一致（获取 token 时的 appKey 与当前请求 appKey 不一致）
 * 需按 `ChanjetApiError.httpStatus` 区分。
 *
 * 另外，409 状态码（保护性限频）的响应体格式不同（`{"error":"..."}` 而非 `{"code":...}`），
 * 不纳入本 code 常量表。
 */
export const PLATFORM_ERROR_CODES = {
  /** appKey+orgId 本月访问已达上限（流量管控），httpStatus 401 */
  RATE_LIMIT_EXCEEDED: '50112',
  /** 获取 token 时的 appKey 与当前请求 appKey 不一致，httpStatus 403 */
  APP_KEY_MISMATCH: '50112',
  /** 系统错误（appSecret 不正确 / openToken 不正确 / 接口 404 等），httpStatus 401/403/404 */
  SYSTEM_ERROR: '50000',
  /** appKey 不能为空（OAuth2 鉴权接口） */
  APP_KEY_EMPTY: '4001',
  /** appKey 不正确（OAuth2 鉴权接口） */
  APP_KEY_INVALID: '4002',
  /** grantType 不能为空（OAuth2 鉴权接口） */
  GRANT_TYPE_EMPTY: '4003',
  /** 不支持的 grantType（OAuth2 鉴权接口） */
  GRANT_TYPE_UNSUPPORTED: '4008',
  /** 服务器内部错误（OAuth2 鉴权接口） */
  INTERNAL_SERVER_ERROR: '500',
  /** 请求太快，稍后重试（并发限流，OAuth2 鉴权接口） */
  REQUEST_TOO_FREQUENT: '14002',
} as const;

/** PLATFORM_ERROR_CODES 的键名联合类型 */
export type PlatformErrorCodeKey = keyof typeof PLATFORM_ERROR_CODES;

/**
 * 判断错误是否为指定平台级错误码。
 *
 * 对于 `50112`（RATE_LIMIT_EXCEEDED / APP_KEY_MISMATCH 共用同一 code 值），
 * 需额外检查 httpStatus 区分：
 * - `RATE_LIMIT_EXCEEDED` 要求 `httpStatus === 401`（流量管控）
 * - `APP_KEY_MISMATCH`  要求 `httpStatus === 403`（appKey 不一致）
 * 其余错误码仅按 `code` 匹配，不检查 httpStatus。
 *
 * 注意：因为 `50112` 被两个常量共用，本函数第二个参数接收 **键名**
 * （`keyof PLATFORM_ERROR_CODES`）而非值，以便区分调用方意图。
 *
 * @param error 待判断的 ChanjetApiError 实例
 * @param key 目标平台错误码的键名（PLATFORM_ERROR_CODES 的 key）
 * @returns 是否匹配
 *
 * @example
 * if (isPlatformError(err, 'RATE_LIMIT_EXCEEDED')) {
 *   // 流量超限，提示用户购买流量包
 * }
 * if (isPlatformError(err, 'APP_KEY_MISMATCH')) {
 *   // appKey 不一致，检查 token 获取逻辑
 * }
 */
export function isPlatformError(error: ChanjetApiError, key: PlatformErrorCodeKey): boolean {
  const code = PLATFORM_ERROR_CODES[key];
  if (error.code !== code) return false;
  // 50112 被复用于两种含义，需按 httpStatus 区分：
  // - RATE_LIMIT_EXCEEDED 要求 httpStatus 401
  // - APP_KEY_MISMATCH  要求 httpStatus 403
  if (key === 'RATE_LIMIT_EXCEEDED') {
    return error.httpStatus === 401;
  }
  if (key === 'APP_KEY_MISMATCH') {
    return error.httpStatus === 403;
  }
  return true;
}
