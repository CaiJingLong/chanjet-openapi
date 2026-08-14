# 共享契约 — @chanjet-openapi/accounting（主 agent 定稿）

本文档是第一期所有实现 agent 的契约基线。核心实现 agent 不得擅自更改公共签名；API 模块 agent 依赖此契约编程。契约变更必须由主 agent 决定并同步所有相关方。

## 1. 文档与快照

| 内容           | 官方 URL                                                                              | 本地快照                                               |
| -------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 接口鉴权指南   | https://open.chanjet.com/md/docs/file/guide/commonContent/jcwd-sfyz/sfyz-jrzy         | .cache/docs/guide-sfyz-jrzy.md                         |
| 授权码换 token | https://open.chanjet.com/md/docs/file/apiFile/common/app_settled/app_settled_auth     | .cache/docs/common/app_settled_app_settled_auth.md     |
| 延长授权       | https://open.chanjet.com/md/docs/file/apiFile/common/base_api/oauth2                  | .cache/docs/common/base_api_oauth2.md                  |
| 应用开通       | https://open.chanjet.com/md/docs/file/apiFile/common/app_settled/app_settled_app_auth | .cache/docs/common/app_settled_app_settled_app_auth.md |
| 好会计模块 ×68 | https://open.chanjet.com/md/docs/file/apiFile/accounting/...                          | .cache/docs/accounting/**/*.md                         |

## 2. Header 组装规则（所有请求）

- 每个请求必须携带：`appKey`、`appSecret`、`openToken`、`Content-Type: application/json`。
- openToken 来源优先级：`config.openToken`（静态）> `config.tokenProvider.getOpenToken()`（动态，每次请求前调用取最新值）。
- 禁止在任何日志、错误消息、注释示例中输出 appSecret / openToken 明文。

## 3. 核心签名（定稿，不可改）

```ts
// src/types.ts
/** 通用响应外壳。字段取自官方文档输出参数表与响应示例；官方 code/success 为 string，successful 为 boolean，禁止类型转换。 */
export interface ApiEnvelope<T> {
  code?: string;
  success?: string;
  successful?: boolean;
  msg?: string;
  msgArgs?: { indexedValues?: string[]; namedValues?: Record<string, unknown> };
  data?: T;
  requestId?: string;
  envConfigType?: string;
  verbose?: string;
  multiFieldErrors?: string;
  validateResult?: string;
  nextStepEnumTypeName?: string;
}

// src/errors.ts
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
}

// src/client.ts
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
  /** 值为 undefined/null 的键不参与序列化；数组值序列化为重复键 */
  query?: Record<string, string | number | boolean | Array<string | number> | null | undefined>;
  body?: unknown;
}

export class ChanjetClient {
  constructor(config: ChanjetClientConfig);
  /** 发送请求；成功返回 data。HTTP 非 2xx 或业务失败均抛 ChanjetApiError */
  request<T>(options: RequestOptions): Promise<T>;
  /** 发送请求；返回完整响应外壳，不判定成败 */
  requestEnvelope<T>(options: RequestOptions): Promise<ApiEnvelope<T>>;
}
```

## 4. 行为规则（client 层）

- 响应处理：非 2xx → `ChanjetApiError`（httpStatus + body 透传）；2xx 且业务失败 → `ChanjetApiError`（业务码原文）。
- **成功判定语义（已取证，定稿）**：成功值证据——`.cache/docs/accounting/hkjcssz/hkjcwxxcx.md` 第 41/74 行、`hkjgdzc/hkjgdzcxr.md` 第 43/45 行、`bb/newReport.md` 第 102 行、`bb/zcfz.md` 第 317 行、`bb/zdybb.md` 第 48 行等：成功响应 `code === '000000'`（六位零），部分接口另带 `successful: true`。判定规则：`successful === true` 视为成功，`successful === false` 视为失败；无 `successful` 字段时，`code` 缺失/空或等于 `'000000'` 视为成功，其余非空值视为失败。取证依据写入 `client.ts` 注释（注明文档与行号）。
- **扁平响应规则**：部分接口（如 zjgl/rjz 日记账查询）响应无外壳，业务数据直接在顶层。`request<T>` 成功时返回 `envelope.data`；当响应 JSON 无 `data` 字段时返回整个响应对象（`T` 覆盖整个响应）。无任何外壳字段（code/successful）的 2xx 响应直接视为成功。
- 超时 30s（AbortController）。仅 GET 且网络层错误（fetch 抛异常、超时）重试，指数退避 500ms/1s，最多 2 次；写操作不重试。
- 路径占位：`{bookid}` 由 pathParams 替换，值 encodeURIComponent 后拼接；query 同理。

## 5. API 模块规范

- 目录：`src/api/<官方路径段>/`，如 `src/api/cwxg/pzxz00001.ts` 对应快照 `.cache/docs/accounting/cwxg/pzxz00001.md`。
- 每个文档一个 `<name>.ts`（name = 文档叶子名），自含：来源标注头、请求/响应类型、错误码常量、调用方法（薄封装：构造 RequestOptions → `client.request<T>`）+ 完整 JSDoc。
- 实现 agent 不写任何 `index.ts`；聚合导出面（各模块 `index.ts`、`src/api/index.ts`、`src/index.ts`）由主 agent 在验收后统一生成。
- 文件头来源标注模板：

  ```ts
  /**
   * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pzxz00001
   * 抓取日期: 2026-08-14
   * 本地快照: .cache/docs/accounting/cwxg/pzxz00001.md
   */
  ```

- 命名：类型 `<接口名>Params` / `<接口名>Result`，嵌套 `<父类型><字段名>`；方法名 = 官方接口名转 camelCase（`adjustSubjectCodeLen`）。
- JSDoc：方法用途 + 逐参数（嵌套展开到叶子）+ `@returns` + `@throws {ChanjetApiError}` + `@see` 官方 URL。字段含义以快照"说明"列原文为准。
- 错误码表：模块文档的"错误码说明"表逐条收录为常量表（`name: 'gl.e1022', message: '...'`），JSDoc 中说明常见错误码。

## 6. 严格对齐（验收第一标准）

- 字段名、类型（官方 string 就 string，禁止转 boolean）、必填性、默认值、URL 路径逐字符与文档一致。
- 禁止"便利性重命名"（官方叫 `drCrDirection` 就不得改叫 `direction`）。
- 参数表格中"默认值"列非 `-` 的：作为可选参数，JSDoc 注明缺省行为由远端处理还是客户端补默认。

## 7. 测试要求

- 每个模块：参数映射（path/query/body/header 正确性）、错误路径（HTTP 状态、业务码）、可选参数缺省。
- client/auth/errors 核心覆盖率 ≥ 95%（vitest 配置已设阈值）。
- fetch 替身验证请求形态；禁止 mock 到永远通过。
