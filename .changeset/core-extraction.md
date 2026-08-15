---
"@chanjet-openapi/accounting": patch
---

抽取核心能力为独立的 @chanjet-openapi/core 包

将 client.ts、errors.ts、types.ts、auth/ 从 accounting 包抽取为产品无关的 @chanjet-openapi/core 包。accounting 包通过 workspace 依赖引用 core，re-export 其公共符号保持向后兼容。
