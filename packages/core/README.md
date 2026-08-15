# @chanjet-openapi/core

[![npm version](https://img.shields.io/npm/v/@chanjet-openapi/core.svg)](https://www.npmjs.com/package/@chanjet-openapi/core)

畅捷通开放平台 TypeScript SDK 的产品无关共享核心：HTTP 客户端、OAuth2 鉴权、统一错误模型、通用响应类型。

所有产品包（如 `@chanjet-openapi/accounting`）依赖此包，也可单独使用。

## 安装

```bash
pnpm add @chanjet-openapi/core
# 或
npm install @chanjet-openapi/core
```

## 快速上手

### 构造客户端

```typescript
import { ChanjetClient } from '@chanjet-openapi/core';

const client = new ChanjetClient({
  appKey: process.env.CHANJET_APP_KEY!,
  appSecret: process.env.CHANJET_APP_SECRET!,
  openToken: process.env.CHANJET_OPEN_TOKEN!,
});
```

### 发送请求

```typescript
// request<T>：成功返回 data，失败抛 ChanjetApiError
const data = await client.request<MyDataType>({
  method: 'GET',
  path: '/accounting/gl/glaccount/getInitBalanceList/{bookid}',
  pathParams: { bookid: '123' },
  query: { bookId: '123' },
});

// requestEnvelope<T>：返回完整响应外壳，不判定业务成败
const envelope = await client.requestEnvelope<MyDataType>({
  method: 'GET',
  path: '/accounting/gl/glaccount/getInitBalanceList/{bookid}',
  pathParams: { bookid: '123' },
});
```

### 鉴权

```typescript
import { auth, type TokenProvider } from '@chanjet-openapi/core';

// 授权码换 token
const tokenResult = await auth.exchangeAuthCode(
  { appKey: '...', appSecret: '...' },
  { code: '临时授权码', redirectUri: 'https://your-app.com/callback' },
);
// tokenResult.access_token → 用作 openToken
// tokenResult.refresh_token → 用于后续刷新

// 刷新 token
const refreshed = await auth.refreshAccessToken(
  { appKey: '...', appSecret: '...' },
  { refreshToken: tokenResult.refresh_token! },
);

// 永久授权码换 token
const token = await auth.getTokenByPermanentCode(
  { appKey: '...', appSecret: '...' },
  { orgAccessToken: '企业凭证', userAuthPermanentCode: '永久授权码' },
);
```

### 自动刷新 token

```typescript
import { auth } from '@chanjet-openapi/core';

// AutoRefreshTokenProvider 实现 TokenProvider 接口
// 在 token 即将过期时自动调用刷新接口
const tokenProvider = new auth.AutoRefreshTokenProvider({
  config: { appKey: '...', appSecret: '...' },
  accessToken: '初始access_token',
  refreshToken: '初始refresh_token',
  // expiresInSeconds 缺省按官方文档 6 天
});

const client = new ChanjetClient({
  appKey: '...',
  appSecret: '...',
  tokenProvider, // 每次请求前自动获取最新 token
});
```

### 错误处理

```typescript
import { ChanjetApiError, isPlatformError, PLATFORM_ERROR_CODES } from '@chanjet-openapi/core';

try {
  await client.request({ method: 'GET', path: '/some/api' });
} catch (e) {
  if (e instanceof ChanjetApiError) {
    console.error('错误码:', e.code); // 官方业务错误码原文
    console.error('错误消息:', e.msg); // 官方错误消息原文
    console.error('HTTP 状态:', e.httpStatus); // 网络错误时为 undefined
    console.error('请求 URL:', e.url);

    // 判断平台级错误
    if (isPlatformError(e, 'RATE_LIMIT_EXCEEDED')) {
      // 流量超限（httpStatus 401）
    }
    if (isPlatformError(e, 'APP_KEY_MISMATCH')) {
      // appKey 不一致（httpStatus 403）
    }
    if (isPlatformError(e, 'SYSTEM_ERROR')) {
      // 系统错误（appSecret/openToken 不正确等）
    }
  }
}
```

## API 概览

| 分类   | 符号                             | 说明                                                 |
| ------ | -------------------------------- | ---------------------------------------------------- |
| 客户端 | `ChanjetClient`                  | HTTP 客户端，配置 + 请求编排（重试、超时、错误归一） |
| 客户端 | `ChanjetClientConfig`            | 客户端构造配置                                       |
| 客户端 | `RequestOptions`                 | 请求参数（method/path/pathParams/query/body）        |
| 客户端 | `TokenProvider`                  | 动态 token 提供者接口                                |
| 错误   | `ChanjetApiError`                | 统一错误模型，保留官方 `code`/`msg` 原文             |
| 错误   | `PLATFORM_ERROR_CODES`           | 平台级错误码常量表                                   |
| 错误   | `isPlatformError()`              | 判断错误是否为指定平台级错误码                       |
| 类型   | `ApiEnvelope<T>`                 | 通用响应外壳                                         |
| 鉴权   | `auth.exchangeAuthCode()`        | 授权码换 token                                       |
| 鉴权   | `auth.refreshAccessToken()`      | 刷新 token（延长授权）                               |
| 鉴权   | `auth.getTokenByPermanentCode()` | 永久授权码换 token                                   |
| 鉴权   | `auth.AutoRefreshTokenProvider`  | 自动刷新 token 的 TokenProvider 实现                 |

## 行为规则

- **超时**：默认 30s（可配 `timeoutMs`）
- **重试**：仅幂等 GET 且网络层错误（fetch 抛异常/超时），指数退避 500ms/1s，最多 2 次；写操作不重试
- **成功判定**：`successful === true` 视为成功；无 `successful` 字段时 `code === '000000'` 或空值视为成功
- **扁平响应**：响应 JSON 无 `data` 字段时，`request<T>` 返回整个响应对象
- **安全**：禁止在日志/错误消息中输出 `appSecret`/`openToken` 明文

## 相关

- [GitHub](https://github.com/CaiJingLong/chanjet-openapi)
- [npm](https://www.npmjs.com/package/@chanjet-openapi/core)
- [AI API 参考 (llms.txt)](https://raw.githubusercontent.com/CaiJingLong/chanjet-openapi/gh-pages/llms.txt)
