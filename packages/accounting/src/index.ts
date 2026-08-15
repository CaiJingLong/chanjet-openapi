/**
 * @chanjet-openapi/accounting 公共导出面。
 * 核心能力（类型外壳、错误、客户端、鉴权）从 @chanjet-openapi/core re-export；
 * API 模块经 `api` 命名空间访问。
 */
export * from '@chanjet-openapi/core';
export * as api from './api/index.js';
