---
name: chanjet-release
description: 'Use when publishing packages, creating changesets, bumping versions, or managing releases for the chanjet-openapi monorepo. Covers initial publish, subsequent releases via GitHub Actions OIDC, changeset authoring, and CHANGELOG conventions. Triggers: publish, release, changeset, version bump, changelog, npm publish.'
---

# chanjet-openapi 发布流程

本 skill 约束 `chanjet-openapi` monorepo 的全部发布行为。AGENTS.md §9 是规约基线，本 skill 是可执行的操作手册。

## 1. 版本号规则

### 1.1 0.x 阶段（当前）

| 变更类型                               | bump 级别 | 示例          | changeset 类型 |
| -------------------------------------- | --------- | ------------- | -------------- |
| 破坏性更改（API 删除/重命名/签名变更） | MINOR     | 0.1.0 → 0.2.0 | `minor`        |
| 新增功能（向后兼容）                   | PATCH     | 0.1.0 → 0.1.1 | `patch`        |
| Bug 修复                               | PATCH     | 0.1.1 → 0.1.2 | `patch`        |

### 1.2 1.0+ 阶段（未来）

| 变更类型   | bump 级别 | changeset 类型 |
| ---------- | --------- | -------------- |
| 破坏性更改 | MAJOR     | `major`        |
| 新增功能   | MINOR     | `minor`        |
| Bug 修复   | PATCH     | `patch`        |

### 1.3 判断破坏性更改

以下情况属于破坏性更改：

- 删除或重命名已导出的类型/接口/函数
- 改变已导出函数的参数签名（增删参数、改类型、改必填性）
- 改变已导出函数的返回值结构
- 改变 `package.json` 的 `exports` 路径

以下情况**不**属于破坏性更改：

- 新增导出符号
- 新增可选参数
- 内部实现重构（公共 API 不变）
- 修复 bug 导致行为变化（但公共签名不变）

## 2. 初次发布（手动）

每个包的第一版 `0.1.0` 由维护者手动发布。**仅此一次**手动 publish，后续全部走 CI。

### 2.1 前置条件

- [ ] `package.json` 的 `version` 为 `"0.1.0"`
- [ ] `package.json` 有 `publishConfig: { access: "public" }`
- [ ] `package.json` 有 `exports` 显式声明入口
- [ ] `tsconfig.build.json` 配置正确（`outDir: dist`, `noEmit: false`）
- [ ] 已登录 npm 官方 registry（见 §2.1.1）
- [ ] npm 账户对 `@chanjet-openapi` scope 有发布权限

### 2.1.1 npm registry 说明

如果本地 `npm config get registry` 返回的不是 `https://registry.npmjs.org`（如淘宝镜像 `https://registry.npmmirror.com`），所有登录和发布命令必须显式指定 `--registry https://registry.npmjs.org`，否则会发到错误 registry。

```bash
# 检查当前 registry
npm config get registry

# 登录官方 registry（如果当前 registry 非官方）
npm login --registry https://registry.npmjs.org

# 确认登录状态
npm whoami --registry https://registry.npmjs.org
```

### 2.2 执行步骤

```bash
# 1. 完整验证
pnpm -r build
pnpm -r typecheck
pnpm -r test
pnpm format:check

# 2. 确认 dist 产物存在
ls packages/<pkg>/dist/index.js

# 3. 预览将要发布的文件（确认不含 src/tests）
pnpm publish --filter @chanjet-openapi/<pkg> --dry-run --registry https://registry.npmjs.org

# 4. 发布（本地手动发布不加 --provenance，该标志仅 CI OIDC 环境可用）
pnpm publish --filter @chanjet-openapi/<pkg> --registry https://registry.npmjs.org

# 5. 验证
npm view @chanjet-openapi/<pkg>@0.1.0
```

> **注意**：如果本地 registry 已是官方 `https://registry.npmjs.org`，可省略 `--registry` 参数。

### 2.3 首发后

- 在仓库中创建 `.changeset/` 下的首个 changeset（如果有待发布的变更）
- 后续所有发布通过 GitHub Actions 自动执行

## 3. 后续发布（GitHub Actions OIDC）

### 3.1 流程

```
开发者写 changeset → 随 PR 合入 main → CI 触发 → changesets/action 创建 Release PR
→ Release PR 合入 main → CI 触发 → pnpm publish -r --provenance → npm 上线
```

### 3.2 写 changeset

每次 PR 包含包级别的变更时，必须附带一个 changeset 文件：

```bash
pnpm changeset
```

交互式选择：

1. 选择受影响的包（空格选择，回车确认）
2. 选择 bump 类型（patch / minor / major）
3. 写变更描述（Markdown，会写入 CHANGELOG）

### 3.3 changeset 文件格式

文件位于 `.changeset/`，文件名任意（建议语义化），格式：

```markdown
---
'@chanjet-openapi/accounting': patch
'@chanjet-openapi/core': minor
---

修复凭证查询分页参数映射错误

- page 参数未正确传递到 query string
- pageSize 默认值从 10 改为 20，与文档一致
```

frontmatter 中的包名必须与 `package.json` 的 `name` 完全一致。bump 类型遵循 §1 版本号规则。

### 3.4 Release PR

changesets/action 自动创建的 Release PR 会：

- 消费所有未处理的 changeset 文件
- bump 涉及包的 `version` 字段
- 生成/更新各包的 `CHANGELOG.md`
- 删除已消费的 changeset 文件
- 提交为 `chore: release packages`

合并 Release PR 后，CI 再次触发，此时无待消费 changeset，执行 `pnpm publish -r --provenance`。

### 3.5 多包同时发布

`pnpm publish -r` 会发布所有有版本变更的包。一个 Release PR 可以同时发布多个包。`workspace:*` 依赖会被 pnpm 自动替换为实际版本号。

## 4. CHANGELOG 规约

### 4.1 生成

- CHANGELOG.md 由 changesets 自动生成，**禁止手动编辑**（AGENTS.md §11）
- 每个 changeset 的描述正文成为 CHANGELOG 中对应版本的一条记录

### 4.2 格式

changesets 生成的 CHANGELOG.md 格式：

```markdown
# @chanjet-openapi/accounting

## 0.1.1

### Patch Changes

- 修复凭证查询分页参数映射错误
  - page 参数未正确传递到 query string
  - pageSize 默认值从 10 改为 20，与文档一致
- Updated dependencies
  - @chanjet-openapi/core@0.1.1
```

### 4.3 changeset 描述编写规范

- **用中文**（与项目 AGENTS.md 一致）
- 第一行是摘要（一句话说明变更内容）
- 后续行是细节（用 `-` 列表展开）
- 描述面向使用者，不写内部实现细节
- 破坏性更改必须标注 `**破坏性更改**：` 前缀

示例：

```markdown
---
'@chanjet-openapi/accounting': minor
---

**破坏性更改**：凭证查询方法 getVoucherList 参数重构

- 移除 params.pageSize 参数，改用 params.page.size
- params.orgId 从 string 改为 number
- 返回值 items 字段从数组改为分页对象
```

## 5. 发布前验证清单

CI 自动执行以下验证，全通过才 publish（AGENTS.md §9.3）：

```bash
pnpm -r build          # 构建所有包，生成 dist
pnpm -r typecheck      # TypeScript 类型检查
pnpm -r test           # 运行所有测试
pnpm format:check      # Prettier 格式检查
```

手动首发时同样必须执行此清单。

## 6. 新包接入发布

新增产品包（如 `packages/finance/`）时：

### 6.1 package.json 必填项

```json
{
  "name": "@chanjet-openapi/finance",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    }
  },
  "files": ["dist"],
  "publishConfig": { "access": "public" },
  "dependencies": {
    "@chanjet-openapi/core": "workspace:*"
  }
}
```

### 6.2 自动接入

- `pnpm-workspace.yaml` 已配 `packages/*`，新包自动被识别
- changesets 自动发现新包
- CI workflow（`pnpm -r build/test/typecheck/publish`）自动包含新包
- **不需要修改 publish.yml / ci.yml**

### 6.3 首发流程

新包首发按 §2 初次发布流程执行。首发后自动接入后续 CI 发布流程。

## 7. 禁止事项

- 禁止在日常开发中修改 `package.json` 的 `version` 字段（首发除外）
- 禁止手动编辑 CHANGELOG.md
- 禁止在非发布流程中执行 `pnpm publish`（首发除外）
- 禁止将含 `_authToken` 的 `.npmrc` 提交到版本库
- 禁止跳过 changeset 直接发布（首发除外）
