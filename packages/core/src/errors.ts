/**
 * 来源: packages/core/CONTRACT.md（共享契约，主 agent 定稿）
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
