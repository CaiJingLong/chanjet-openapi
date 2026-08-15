/**
 * 来源:
 * - https://open.chanjet.com/md/docs/file/apiFile/common/app_settled/app_settled_auth
 * - https://open.chanjet.com/md/docs/file/apiFile/common/base_api/oauth2
 * 抓取日期: 2026-08-14
 * 本地快照:
 * - .cache/docs/common/app_settled_app_settled_auth.md
 * - .cache/docs/common/base_api_oauth2.md
 */

import { ChanjetApiError } from '../errors.js';
import type { AuthConfig, AuthTokenResponse, AuthTokenResult } from './types.js';
import { AUTH_SUCCESS_CODE } from './types.js';

const DEFAULT_BASE_URL = 'https://openapi.chanjet.com';
const DEFAULT_TIMEOUT_MS = 30_000;

/** 从鉴权响应体提取 code / message（两个字段官方类型均为 string） */
function extractAuthFields(raw: AuthTokenResponse): { code?: string; message?: string } {
  return {
    code: typeof raw.code === 'string' ? raw.code : undefined,
    message: typeof raw.message === 'string' ? raw.message : undefined,
  };
}

async function parseAuthBody(response: Response, url: string): Promise<AuthTokenResponse> {
  const text = await response.text();
  if (text.trim() === '') {
    return {};
  }
  try {
    return JSON.parse(text) as AuthTokenResponse;
  } catch {
    throw new ChanjetApiError({
      message: '鉴权响应体不是合法 JSON',
      httpStatus: response.status,
      url,
    });
  }
}

/** 鉴权请求构造入参（GET 走 query，POST 走 JSON body） */
export interface AuthRequestInit {
  /** 含前导斜杠的接口路径，如 /auth/v2/getToken */
  path: string;
  method: 'GET' | 'POST';
  /** 查询参数（GET） */
  query?: Record<string, string>;
  /** 请求体（POST，JSON 序列化） */
  body?: Record<string, string>;
}

/**
 * 发起鉴权请求（授权码换 token / 刷新 token / 永久授权码换 token 共用），返回 `result` 字段。
 *
 * 仅携带 `appKey` / `appSecret` / `Content-Type` 头（鉴权接口不携带 openToken）。
 * HTTP 非 2xx、业务失败（`code !== '200'`）、网络异常均抛 ChanjetApiError。
 *
 * 错误中的 `url` 字段脱敏：仅保留 origin + path，不携带 query（query 可能含 code / refreshToken）。
 */
export async function requestAuthToken(
  config: AuthConfig,
  init: AuthRequestInit,
): Promise<AuthTokenResult> {
  const baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
  const timeoutMs = config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const fetchImpl = config.fetchImpl ?? globalThis.fetch;

  const url = new URL(init.path, baseUrl);
  if (init.query) {
    for (const [key, value] of Object.entries(init.query)) {
      url.searchParams.append(key, value);
    }
  }
  const fullUrl = url.toString();
  const redactedUrl = url.origin + url.pathname;

  const requestInit: RequestInit = {
    method: init.method,
    headers: {
      'Content-Type': 'application/json',
      appKey: config.appKey,
      appSecret: config.appSecret,
    },
  };
  if (init.body !== undefined) {
    requestInit.body = JSON.stringify(init.body);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let response: Response;
  try {
    response = await fetchImpl(fullUrl, { ...requestInit, signal: controller.signal });
  } catch (err) {
    throw new ChanjetApiError({ message: '鉴权网络请求失败', url: redactedUrl, cause: err });
  } finally {
    clearTimeout(timer);
  }

  const raw = await parseAuthBody(response, redactedUrl);
  const { code, message } = extractAuthFields(raw);

  if (!response.ok) {
    throw new ChanjetApiError({
      message: message ?? `鉴权请求失败（HTTP ${response.status}）`,
      code,
      msg: message,
      httpStatus: response.status,
      url: redactedUrl,
    });
  }

  if (code !== AUTH_SUCCESS_CODE) {
    throw new ChanjetApiError({
      message: message ?? `鉴权业务失败（code=${code ?? ''}）`,
      code,
      msg: message,
      httpStatus: response.status,
      url: redactedUrl,
    });
  }

  return raw.result ?? {};
}
