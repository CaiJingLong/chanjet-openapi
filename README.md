# chanjet-openapi

畅捷通开放平台（Chanjet Open Platform）TypeScript monorepo：官方 API 的 SDK 源码 + 离线文档镜像。

- 远端契约来源：<https://open.chanjet.com/llms.txt>
- 命名空间：`@chanjet-openapi/*`（npm 上无人占用，见下文）
- 开发方式：完全由 AI 按 `AGENTS.md` 规约开发

## 目标

1. **严格对齐**：每个包的类型、接口、错误码、参数含义与官方文档一一对应，可逐字段追溯原文；严格对齐是验收的核心标准。
2. **类型安全**：TypeScript strict 模式，调用方在编译期捕获参数错误；禁止 `any` 逃逸到公共 API。
3. **零运行时依赖膨胀**：仅使用 Node 内置能力（原生 `fetch`），不引入重量级 HTTP/框架依赖。
4. **产品线独立演进**：按官方产品分类分包，包间接口稳定、互不阻塞；公共能力在第二个产品接入时抽取为 `@chanjet-openapi/core`，第一期不做超前抽象。
5. **可复现抓取**：上游文档完整抓取为 `.cache/docs/` 离线镜像（git 忽略），支持不联网开发；代码追溯以官方 URL 为准。

## 包规划

按官方分类，六个产品包（第一期只做 accounting）：

| 包                            | 产品         | 说明                                 | 状态   |
| ----------------------------- | ------------ | ------------------------------------ | ------ |
| `@chanjet-openapi/accounting` | 好会计       | 智能云财税系统 API                   | 第一期 |
| `@chanjet-openapi/finance`    | 易代账       | 代账管理系统 API                     | 规划中 |
| `@chanjet-openapi/zplus`      | 好业财       | 进销存、业财税一体化 API             | 规划中 |
| `@chanjet-openapi/hsy`        | 好生意       | 智能营销与进销存 API                 | 规划中 |
| `@chanjet-openapi/tcloud`     | T+ / T+Cloud | 企业 ERP API，含 tIncrement 增值服务 | 规划中 |
| `@chanjet-openapi/stapi`      | 生态 API     | 钉钉等生态同步与单点登录             | 规划中 |

## npm 命名空间状态

`@chanjet-openapi` 在 npm registry 上不存在（`-/org/chanjet-openapi/package` 返回 404 `Scope not found`，scope 搜索无匹配）。可注册使用。

**发布前需先注册 org**：npm scope 与 org 绑定，需在 npmjs.com 用个人账号创建 org `chanjet-openapi`，否则 scoped 包发布会失败。

## 仓库结构

```
chanjet-openapi/
├── README.md               # 本文件：目标与说明
├── AGENTS.md               # AI 开发规约（开发前必读）
├── package.json            # workspace 根
├── pnpm-workspace.yaml
├── .gitignore              # 忽略 .cache/、node_modules、dist
├── .cache/docs/            # 离线文档镜像（git 忽略，随时可重抓）
│   └── accounting/         # 好会计文档（第一期）
└── packages/
    └── accounting/         # @chanjet-openapi/accounting
```

## 当前状态

规约与文档阶段，代码骨架未建。第一期范围：好会计（accounting）体系，含鉴权、请求核心、按官方模块分组的 API 客户端。
