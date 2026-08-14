/**
 * @chanjet-openapi/accounting 公共导出面。
 * 核心能力（类型外壳、错误、客户端）平铺导出；鉴权经 `auth`、API 模块经 `api` 命名空间访问。
 */
export * from './types.js';
export * from './errors.js';
export * from './client.js';
export * as auth from './auth/index.js';
export * as api from './api/index.js';
