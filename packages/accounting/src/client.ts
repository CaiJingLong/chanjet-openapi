import { ChanjetApiError } from './errors.js';
import type { ApiEnvelope } from './types.js';

/** 默认请求基地址 */
const DEFAULT_BASE_URL = 'https://openapi.chanjet.com';
/** 默认超时（毫秒） */
const DEFAULT_TIMEOUT_MS = 30_000;
/** GET 网络层错误重试次数上限（额外重试，不含首次请求） */
const MAX_RETRIES = 2;
/** 指数退避基数（毫秒）：第 1 次重试 500ms，第 2 次重试 1000ms（即 500 * 2^attempt） */
const RETRY_BASE_BACKOFF_MS = 500;
/** 官方成功业务码（六位零） */
const SUCCESS_CODE = '000000';

export interface ChanjetClientConfig {
  appKey: string;
  appSecret: string;
  /** 静态 openToken；与 tokenProvider 至少提供一个 */
  openToken?: string;
  /** 动态 token 提供者，每次请求前调用 */
  tokenProvider?: TokenProvider;
  /** 默认 https://openapi.chanjet.com */
  baseUrl?: string;
  /** 默认 30000ms */
  timeoutMs?: number;
  /** 测试注入 */
  fetchImpl?: typeof fetch;
}

export interface TokenProvider {
  getOpenToken(): Promise<string>;
}

export interface RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** 含前导斜杠与 {param} 占位，如 /accounting/gl/glaccount/adjustSubjectCodeLen/{bookid} */
  path: string;
  pathParams?: Record<string, string | number>;
  /** 值为 undefined/null 的键不参与序列化；数组值序列化为重复键（key=v1&key=v2） */
  query?: Record<string, string | number | boolean | Array<string | number> | null | undefined>;
  body?: unknown;
}

/** 从响应体对象中提取错误透传字段（兼容 `msg` 与文档实际使用的 `message`） */
interface EnvelopeFields {
  code?: string;
  msg?: string;
  msgArgs?: ApiEnvelope<unknown>['msgArgs'];
  data?: unknown;
  requestId?: string;
}

function extractEnvelopeFields(raw: unknown): EnvelopeFields {
  if (raw === null || typeof raw !== 'object') {
    return {};
  }
  const obj = raw as Record<string, unknown>;
  const code = typeof obj['code'] === 'string' ? obj['code'] : undefined;
  const requestId = typeof obj['requestId'] === 'string' ? obj['requestId'] : undefined;
  const msgValue = obj['msg'];
  const messageValue = obj['message'];
  const msg =
    typeof msgValue === 'string'
      ? msgValue
      : typeof messageValue === 'string'
        ? messageValue
        : undefined;
  const rawMsgArgs = obj['msgArgs'];
  const msgArgs =
    rawMsgArgs !== null && typeof rawMsgArgs === 'object'
      ? (rawMsgArgs as ApiEnvelope<unknown>['msgArgs'])
      : undefined;
  return { code, msg, msgArgs, data: obj['data'], requestId };
}

/**
 * 业务成功判定（已取证，定稿）。
 *
 * 取证依据（各模块文档「响应示例」，成功 `code` 均为六位零 `"000000"`）：
 * - `.cache/docs/accounting/hkjcssz/hkjcwxxcx.md` L41 / L74：`{"code":"000000","data":{...},"successful":true}`
 * - `.cache/docs/accounting/hkjgdzc/hkjgdzcxr.md` L43 / L45：`{"code":"000000","data":...,"successful":true}`
 * - `.cache/docs/accounting/bb/newReport.md` L102：`{"code":"000000","data":{...}}`
 * - `.cache/docs/accounting/bb/zcfz.md` L317：`{"code":"000000","data":[...]}`
 * - `.cache/docs/accounting/bb/zdybb.md` L48：`{"code":"000000","data":{...}}`
 *
 * 判定规则：
 * 1. `successful === true` 视为成功；`successful === false` 视为失败。
 * 2. 无 `successful` 字段时：`code` 缺失/空或等于 `"000000"` 视为成功，其余非空值视为失败。
 * 3. 无任何外壳字段（无 `successful`、无 `code`）的 2xx 响应（扁平结构，如日记账查询）直接视为成功。
 */
function isBusinessSuccess(raw: unknown): boolean {
  if (raw === null || typeof raw !== 'object') {
    return true;
  }
  const envelope = raw as Record<string, unknown>;
  const successful = envelope['successful'];
  if (successful === true) {
    return true;
  }
  if (successful === false) {
    return false;
  }
  const code = envelope['code'];
  if (typeof code === 'string' && code !== '') {
    return code === SUCCESS_CODE;
  }
  return true;
}

function toHttpError(raw: unknown, httpStatus: number, url: string): ChanjetApiError {
  const fields = extractEnvelopeFields(raw);
  return new ChanjetApiError({
    message: fields.msg ?? `畅捷通 API 请求失败（HTTP ${httpStatus}）`,
    code: fields.code,
    msg: fields.msg,
    msgArgs: fields.msgArgs,
    data: fields.data,
    requestId: fields.requestId,
    httpStatus,
    url,
  });
}

function toBusinessError(raw: unknown, url: string): ChanjetApiError {
  const fields = extractEnvelopeFields(raw);
  return new ChanjetApiError({
    message: fields.msg ?? '畅捷通 API 业务失败',
    code: fields.code,
    msg: fields.msg,
    msgArgs: fields.msgArgs,
    data: fields.data,
    requestId: fields.requestId,
    httpStatus: undefined,
    url,
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 组装完整请求 URL：替换路径占位符并追加查询串。
 * 占位符值与查询值均经 URL 编码；`undefined` / `null` 的查询键不参与序列化。
 */
function buildUrl(options: RequestOptions, baseUrl: string): string {
  let path = options.path;
  const pathParams = options.pathParams;
  if (/\{[^{}]+\}/.test(path)) {
    if (!pathParams) {
      throw new TypeError(`路径 ${options.path} 包含占位符但未提供 pathParams`);
    }
    path = path.replace(/\{([^{}]+)\}/g, (_match, key: string) => {
      const value = pathParams[key];
      if (value === undefined) {
        throw new TypeError(`缺少路径参数 ${key}`);
      }
      return encodeURIComponent(String(value));
    });
  }

  const url = new URL(path, baseUrl);
  if (options.query) {
    for (const [key, value] of Object.entries(options.query)) {
      if (value === undefined || value === null) {
        continue;
      }
      if (Array.isArray(value)) {
        for (const item of value) {
          url.searchParams.append(key, String(item));
        }
      } else {
        url.searchParams.append(key, String(value));
      }
    }
  }
  return url.toString();
}

export class ChanjetClient {
  private readonly appKey: string;
  private readonly appSecret: string;
  private readonly openToken?: string;
  private readonly tokenProvider?: TokenProvider;
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl: typeof fetch;

  constructor(config: ChanjetClientConfig) {
    if (!config.appKey) {
      throw new TypeError('appKey 不能为空');
    }
    if (!config.appSecret) {
      throw new TypeError('appSecret 不能为空');
    }
    this.appKey = config.appKey;
    this.appSecret = config.appSecret;
    this.openToken = config.openToken;
    this.tokenProvider = config.tokenProvider;
    this.baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
    this.timeoutMs = config.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.fetchImpl = config.fetchImpl ?? globalThis.fetch;
  }

  /**
   * 发送请求；成功返回 data。HTTP 非 2xx 或业务失败均抛 ChanjetApiError。
   *
   * @param options 请求配置
   * @param options.method HTTP 方法
   * @param options.path 请求路径，含前导斜杠与 `{param}` 占位
   * @param options.pathParams 路径占位符替换值
   * @param options.query 查询参数，`undefined` / `null` 的键不参与序列化
   * @param options.body 请求体（JSON 序列化），GET 请求忽略
   * @returns 响应外壳中的 `data` 字段；响应 JSON 无 `data` 字段（扁平结构，业务数据直接在顶层）时返回整个响应对象
   * @throws {ChanjetApiError} HTTP 非 2xx、业务失败、网络异常或超时
   * @throws {TypeError} 缺少 appKey/appSecret/openToken 或路径占位符无对应值
   * @see https://open.chanjet.com/md/docs/file/guide/commonContent/jcwd-sfyz/sfyz-jrzy
   */
  async request<T>(options: RequestOptions): Promise<T> {
    const envelope = await this.requestEnvelope<T>(options);
    if (!isBusinessSuccess(envelope)) {
      throw toBusinessError(envelope, buildUrl(options, this.baseUrl));
    }
    // 成功返回 data；部分接口（如日记账查询）响应为扁平结构，业务数据直接在顶层、无 data 字段，
    // 此时返回整个响应对象（T 覆盖整个响应）。响应体为 null/非对象（JSON 标量或数组）时同理原样返回。
    if (envelope === null || typeof envelope !== 'object' || envelope.data === undefined) {
      return envelope as unknown as T;
    }
    return envelope.data;
  }

  /**
   * 发送请求；返回完整响应外壳，不判定业务成败（HTTP 非 2xx 仍抛 ChanjetApiError）。
   *
   * @param options 请求配置
   * @param options.method HTTP 方法
   * @param options.path 请求路径，含前导斜杠与 `{param}` 占位
   * @param options.pathParams 路径占位符替换值
   * @param options.query 查询参数，`undefined` / `null` 的键不参与序列化
   * @param options.body 请求体（JSON 序列化），GET 请求忽略
   * @returns 完整响应外壳
   * @throws {ChanjetApiError} HTTP 非 2xx、网络异常或超时
   * @throws {TypeError} 缺少 appKey/appSecret/openToken 或路径占位符无对应值
   * @see https://open.chanjet.com/md/docs/file/guide/commonContent/jcwd-sfyz/sfyz-jrzy
   */
  async requestEnvelope<T>(options: RequestOptions): Promise<ApiEnvelope<T>> {
    const url = buildUrl(options, this.baseUrl);
    const openToken = await this.resolveOpenToken(url);

    const init: RequestInit = {
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
        appKey: this.appKey,
        appSecret: this.appSecret,
        openToken,
      },
    };
    if (options.body !== undefined && options.method !== 'GET') {
      init.body = JSON.stringify(options.body);
    }

    let response: Response;
    try {
      response = await this.executeFetch(url, init, options.method);
    } catch (err) {
      throw new ChanjetApiError({ message: '网络请求失败', url, cause: err });
    }

    const raw = await this.parseResponseBody(response, url);
    if (!response.ok) {
      throw toHttpError(raw, response.status, url);
    }
    return raw as ApiEnvelope<T>;
  }

  /**
   * 解析 openToken：静态 `config.openToken` 优先，其次每次请求前调用 `tokenProvider`。
   * 两者皆未提供时抛错。
   */
  private async resolveOpenToken(url: string): Promise<string> {
    if (this.openToken !== undefined) {
      return this.openToken;
    }
    if (this.tokenProvider) {
      const token = await this.tokenProvider.getOpenToken();
      if (!token) {
        throw new ChanjetApiError({ message: 'tokenProvider 返回了空 openToken', url });
      }
      return token;
    }
    throw new TypeError('未配置 openToken 或 tokenProvider');
  }

  /**
   * 执行 fetch，带 30s 超时（AbortController）。仅 GET 且网络层错误（fetch 抛异常、超时）
   * 时重试，指数退避 500ms/1s，最多 2 次；写操作（POST/PUT/DELETE）不重试。
   */
  private async executeFetch(
    url: string,
    init: RequestInit,
    method: RequestOptions['method'],
  ): Promise<Response> {
    const isGet = method === 'GET';
    let attempt = 0;
    for (;;) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.timeoutMs);
      try {
        return await this.fetchImpl(url, { ...init, signal: controller.signal });
      } catch (err) {
        if (!isGet || attempt >= MAX_RETRIES) {
          throw err;
        }
        const delay = RETRY_BASE_BACKOFF_MS * 2 ** attempt;
        attempt += 1;
        await sleep(delay);
      } finally {
        clearTimeout(timer);
      }
    }
  }

  /** 读取响应体并解析为 JSON；空响应体视为空对象，非法 JSON 抛 ChanjetApiError。 */
  private async parseResponseBody(response: Response, url: string): Promise<unknown> {
    const text = await response.text();
    if (text.trim() === '') {
      return {};
    }
    try {
      return JSON.parse(text) as unknown;
    } catch {
      throw new ChanjetApiError({
        message: '响应体不是合法 JSON',
        httpStatus: response.status,
        url,
      });
    }
  }
}
