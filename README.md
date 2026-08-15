# chanjet-openapi

[![npm version](https://img.shields.io/npm/v/@chanjet-openapi/core.svg?label=@chanjet-openapi/core)](https://www.npmjs.com/package/@chanjet-openapi/core)
[![npm version](https://img.shields.io/npm/v/@chanjet-openapi/accounting.svg?label=@chanjet-openapi/accounting)](https://www.npmjs.com/package/@chanjet-openapi/accounting)

畅捷通开放平台（Chanjet Open Platform）TypeScript SDK monorepo：官方 API 的 SDK 源码 + 离线文档镜像。

- 远端契约来源：<https://open.chanjet.com/llms.txt>
- 命名空间：`@chanjet-openapi/*`
- 开发方式：完全由 AI 按 `AGENTS.md` 规约开发

## 目标

1. **严格对齐**：每个包的类型、接口、错误码、参数含义与官方文档一一对应，可逐字段追溯原文；严格对齐是验收的核心标准。
2. **类型安全**：TypeScript strict 模式，调用方在编译期捕获参数错误；禁止 `any` 逃逸到公共 API。
3. **零运行时依赖膨胀**：仅使用 Node 内置能力（原生 `fetch`），不引入重量级 HTTP/框架依赖。
4. **产品线独立演进**：按官方产品分类分包，包间接口稳定、互不阻塞；公共能力抽取为 `@chanjet-openapi/core`。
5. **可复现抓取**：上游文档完整抓取为 `.cache/docs/` 离线镜像（git 忽略），支持不联网开发；代码追溯以官方 URL 为准。

## 包规划

按官方分类，六个产品包（第一期只做 accounting）：

| 包                                                                                         | 产品         | 说明                                  | 状态         |
| ------------------------------------------------------------------------------------------ | ------------ | ------------------------------------- | ------------ |
| [`@chanjet-openapi/core`](https://www.npmjs.com/package/@chanjet-openapi/core)             | 公共核心     | 鉴权、HTTP 客户端、错误模型、通用类型 | 已发布 0.1.2 |
| [`@chanjet-openapi/accounting`](https://www.npmjs.com/package/@chanjet-openapi/accounting) | 好会计       | 智能云财税系统 API                    | 已发布 0.1.2 |
| `@chanjet-openapi/finance`                                                                 | 易代账       | 代账管理系统 API                      | 规划中       |
| `@chanjet-openapi/zplus`                                                                   | 好业财       | 进销存、业财税一体化 API              | 规划中       |
| `@chanjet-openapi/hsy`                                                                     | 好生意       | 智能营销与进销存 API                  | 规划中       |
| `@chanjet-openapi/tcloud`                                                                  | T+ / T+Cloud | 企业 ERP API，含 tIncrement 增值服务  | 规划中       |
| `@chanjet-openapi/stapi`                                                                   | 生态 API     | 钉钉等生态同步与单点登录              | 规划中       |

## 仓库结构

```
chanjet-openapi/
├── README.md               # 本文件：目标与说明
├── AGENTS.md               # AI 开发规约（开发前必读）
├── package.json            # workspace 根
├── pnpm-workspace.yaml
├── .changeset/             # changesets 配置
├── .github/workflows/      # CI（ci.yml）+ 发布（publish.yml）
├── .claude/skills/         # 项目级 skill（chanjet-release）
├── .cache/docs/            # 离线文档镜像（git 忽略，随时可重抓）
│   ├── common/             # 平台公共文档（鉴权、FAQ、运营规范）
│   └── accounting/         # 好会计 API 文档
└── packages/
    ├── core/               # @chanjet-openapi/core（鉴权、HTTP、错误模型）
    └── accounting/         # @chanjet-openapi/accounting（好会计 API，16 个模块）
```

## 当前状态

core 和 accounting 两个包已实现并发布到 npm。

### @chanjet-openapi/core

产品无关的共享核心：

- `ChanjetClient`：HTTP 客户端，配置 + 请求编排（重试、超时、错误归一）
- `ChanjetApiError`：统一错误模型，保留官方 `code`/`msg` 原文
- `PLATFORM_ERROR_CODES` + `isPlatformError`：平台级错误码常量表与类型守卫
- `auth/`：OAuth2 鉴权（get-token、refresh-token、auto-refresh、permanent-code）
- 75 tests passed

### @chanjet-openapi/accounting

好会计 API，16 个模块 65 个接口文件：

| 模块           | 说明                                     | 接口数 |
| -------------- | ---------------------------------------- | ------ |
| jcda           | 基础档案（账户、项目、往来单位、商品等） | 9      |
| zt             | 账套                                     | 1      |
| zjgl           | 资金管理（日记账、银行对账等）           | 6      |
| sz             | 收付                                     | 1      |
| zb             | 账表（余额表、明细表等）                 | 3      |
| km             | 科目                                     | 1      |
| pjgl           | 票据管理                                 | 2      |
| hkjkchs        | 好会计库存核算（出库、入库、调拨等）     | 6      |
| hkjgdzc        | 好会计固定资产                           | 11     |
| hkjgz          | 好会计工资                               | 5      |
| hkjjz          | 好会计结账                               | 2      |
| hkjcssz        | 好会计财务设置                           | 4      |
| hkjRoleManager | 角色管理                                 | 1      |
| cwxg           | 财务相关（凭证）                         | 2      |
| hkjMenu        | 菜单                                     | 1      |
| bb             | 报表                                     | 12     |

337 tests passed。

### npm 发布

- npm org `@chanjet-openapi` 已创建
- `@chanjet-openapi/core@0.1.0` / `0.1.1` / `0.1.2` 已发布
- `@chanjet-openapi/accounting@0.1.0` / `0.1.1` / `0.1.2` 已发布
- 后续发布通过 GitHub Actions OIDC trusted publishing 自动执行（changeset → Release PR → merge → CI publish）
- 发布流程详见 `chanjet-release` skill

### CI/CD

- `ci.yml`：PR 触发，执行 build + typecheck + test + format check
- `publish.yml`：main 分支推送触发，changesets/action 自动创建 Release PR 或发布到 npm
