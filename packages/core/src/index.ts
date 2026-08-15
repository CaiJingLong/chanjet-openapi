/**
 * @chanjet-openapi/core 公共导出面。
 *
 * 核心能力（类型外壳、错误、客户端、鉴权）供所有产品包共用。
 * 产品包（如 @chanjet-openapi/accounting）通过 `@chanjet-openapi/core` 导入这些符号。
 */
export * from './types.js';
export * from './errors.js';
export * from './client.js';
export * as auth from './auth/index.js';
