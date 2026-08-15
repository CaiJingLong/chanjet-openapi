---
'@chanjet-openapi/core': patch
'@chanjet-openapi/accounting': patch
---

新增平台级错误码常量表与类型守卫

- core 新增 `PLATFORM_ERROR_CODES` 常量表，集中定义跨模块的平台级错误码
- core 新增 `PlatformErrorCodeKey` 联合类型
- core 新增 `isPlatformError()` 类型守卫函数，用于判断错误是否为指定平台级错误码
- accounting 更新 core 依赖版本
