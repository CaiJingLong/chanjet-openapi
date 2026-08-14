# AGENTS.md — AI 开发规约

本文件是项目最高开发规约。任何代码、文档改动前必读，规约与事实冲突时以事实（官方文档、仓库现状）为准并回报。

## 1. 项目定位

畅捷通开放平台官方 API 的 TypeScript SDK monorepo。文档离线镜像在 `.cache/docs/`（git 忽略，见 §2），源码在 `packages/`，全部使用 `@chanjet-openapi` 命名空间。

- 官方产品分类（路径缩写）：好会计 `accounting`、易代账 `finance`、好业财 `zplus`、好生意 `hsy`、T+/T+Cloud `tcloud`、生态 API `stapi`。
- 第一期范围：**只做 accounting（好会计）体系**，其余产品不做、不预留。

## 2. 远端文档契约

上游唯一入口：<https://open.chanjet.com/llms.txt>。抓取规则（官方承诺的契约）：

1. 任何 UI 文档路径前加 `/md` 前缀得到 Markdown 版本。
2. 分类/列表页 URL 追加 `?inline=true`，服务端单次返回该模块下全部叶子接口契约，优先使用，减少串行请求。
3. 模糊检索：`https://open.chanjet.com/md/manifest/search?q=<query>&page=<n>&limit=<n>&format=md`（省 Token 用 `format=md`）。
4. 全站站点地图：`https://open.chanjet.com/md/docs-manifest.json`（体积大，优先用模糊检索）。
5. 分类入口：开发指南 `/md/docs/file/guide`、API 引用 `/md/docs/file/apiFile`、FAQ `/md/docs/file/qa`、运营规范 `/md/docs/file/operate`。
6. **离线镜像**：完整抓取结果保存到 `.cache/docs/`（加入 `.gitignore`），支持不联网查阅；可随时删除重抓，不入版本库（仓库不膨胀、上游更新无 diff 噪音）。代码对文档的引用追溯以官方 URL 为准，缓存路径仅作离线定位。

## 3. 工作流程（顺序不可跳）

1. **抓取**：按契约抓取 accounting 相关文档，保存到 `.cache/docs/accounting/`（git 忽略），文件名保持路径语义。开发前必须先抓取；网络不可用时直接使用已有缓存。
2. **固化**：`.cache/docs/` 是上游快照的本地离线镜像，只由抓取流程写入；实现时只读，不修改文档内容（除非文档与官方实际行为不符，需在对应文件顶部标注勘误及日期）。
3. **生成类型**：从固化文档提取参数/返回值结构，生成 TS 类型。每个 API 模块的类型文件头部必须标注来源：官方 URL（永久追溯）+ 抓取日期 + 本地缓存相对路径。
4. **实现**：实现运行时逻辑（鉴权、签名、HTTP、错误处理）。
5. **验证**：类型检查 + 构建 + 测试 + 冒烟测试（见 §10），全部通过才算完成。
6. **验收**：由独立验收 subagent 对照固化文档逐字段核验（见 §8），不合格打回实现 agent 重做，循环至合格。

## 4. 仓库结构约定

```
packages/<product>/           # 每产品一个包
├── package.json              # name: @chanjet-openapi/<product>
├── tsconfig.json             # 见 §5
├── src/
│   ├── index.ts              # 公共导出面（唯一出口）
│   ├── client.ts             # 客户端入口：配置 + 请求编排
│   ├── auth/                 # OAuth2 / 签名（官方"接口鉴权"指南）
│   ├── errors.ts             # 统一错误模型
│   └── api/<module>/         # 按官方 API 模块分组，一个模块一个目录
└── tests/                    # 与 src/ 同构
```

公共能力（鉴权、签名、HTTP 核心）第一期在 `packages/accounting/src/` 内实现；**第二个产品接入时**才抽取为 `@chanjet-openapi/core`。禁止第一期做跨产品抽象。

## 5. 工具链约定

- **包管理**：pnpm + workspace（根 `pnpm-workspace.yaml`）。依赖变更必须提交 `pnpm-lock.yaml`；CI 与验证命令使用 `--frozen-lockfile`。禁止混用 npm/yarn。
- **LSP**：TypeScript 项目 LSP 为 tsserver。每个包独立 `tsconfig.json`；重构/重命名**必须**走 LSP 的 `rename`/`rename_file`（跨文件引用安全），禁止文本查找替换式改名。
- **格式化**：prettier，根 `.prettierrc` 统一（`semi: true`、`singleQuote: true`、`printWidth: 100`、`trailingComma: "all"`）。`.cache/` 加入 `.prettierignore`——上游快照禁止重排。
- **Node 目标**：Node >= 18（原生 `fetch`），`engines` 字段显式声明。

## 6. 代码规范

- **TypeScript strict**（`strict: true`，`moduleResolution: "nodenext"`），公共 API 禁止 `any`；内部函数允许 `unknown` + 收窄，禁止 `as any`。
- **ESM only**。
- **接口注释标准格式**：每个直接调用远端 API 的方法（含 client 层入口）必须带 JSDoc，逐项写明方法用途、每个入参含义（嵌套对象展开到叶子）、出参结构、异常、文档链接。模板：

  ```ts
  /**
   * 按条件分页查询凭证列表。
   *
   * @param params 查询条件
   * @param params.orgId 账套 ID，必填
   * @param params.page 页码，从 1 开始，缺省 1
   * @returns 凭证分页结果，`items` 为凭证数组
   * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/voucher-list
   */
  ```

  参数说明以固化文档原文为准，不得凭记忆编写或猜测字段含义。

- **单文件规模**：原则上 ≤ 800 行，超限即拆分。拆分信号：多个职责、巨型字面量/类型对象、定位困难。按官方模块或职责边界拆，禁止为拆而拆。
- **错误模型**：所有远端错误归一为单一错误类，保留官方 `code`/`message` 原文；网络层、HTTP 层、业务层错误用统一形态区分，不向调用方泄漏内部异常。错误码集中为常量表 + 类型联合，禁止散落字符串。
- **命名**：类型按官方接口名称（如 `VoucherDetail`）；运行时符号 camelCase。不得自创与官方不同的概念名。
- **依赖纪律**：运行时依赖最小化。HTTP 用原生 `fetch`；不引入 axios、express、装饰器框架。工具类依赖需说明理由。
- **注释**：解释"为什么"（官方字段歧义、参数互斥关系、默认行为），不复述代码。字段歧义时以固化文档原文为注释来源。

## 7. 测试规约（TDD + 覆盖率）

- **框架**：vitest，各包独立运行。
- **TDD**：新增 API 模块与 bugfix **必须**先写失败测试再实现。探索性/生成代码可后补测试，但同一改动内补齐，不得跨改动欠债。
- **覆盖率**：statement/branch 目标 ≥ 85%；auth、errors、请求构造三个核心模块 ≥ 95%。覆盖率是为发现未测路径服务，禁止为凑数字写断言实现细节的垃圾测试。
- **测试质量**：每个 API 模块至少覆盖：参数映射正确性（URL/query/body/签名头）、错误路径（HTTP 状态、业务码）、可选参数缺省行为。HTTP 层测试用注入的 fetch 替身验证请求形态，不 mock 到"永远通过"。
- **冒烟测试**：构造客户端、发起一次真实请求（官方沙箱环境），观察成功或明确业务错误，不允许静默假通过。不依赖测试环境密钥也能运行（缺密钥时跳过并显式提示）。

## 8. 协作规约（subagent）

- 主 agent 只做三件事：搭建骨架、定稿跨模块共享契约（client 接口、错误模型、类型来源规范）、调度与验收协调；主 agent 不亲自实现模块。
- 独立小模块（如一个 `api/<module>/` 目录）交给一个实现 subagent 编写。
- **不为提速而提速**：共享契约由主 agent 先定稿并写入任务上下文，再分发；禁止并行写同一文件；禁止让 subagent 自行发明共享接口。
- **独立验收（核心）**：每个模块完成后，由专门的验收 subagent（不得是实现 agent 自身）执行验收。验收标准：与 `.cache/docs/` 固化文档逐字段比对（类型、必填性、参数含义、错误码、URL 路径），**严格对齐是验收的第一标准**；同时核验 §6 注释规范（来源标注、JSDoc 完整）与 §7 测试覆盖。
- **打回循环**：验收不合格 → 验收 agent 输出书面问题清单（逐条指出与文档不符之处）→ 主 agent 将清单派回实现 agent 改进/重做 → 重新提交验收，循环至合格。验收通过项与问题清单必须书面记录归档。
- subagent 中途不做项目级构建/测试，由主 agent 在验收前统一执行。

## 9. 版本与发布

- 包独立版本，使用 changesets 管理变更与 CHANGELOG。
- 每个包 `package.json` 用 `exports` 显式声明公共入口；仅 `src/index.ts` 导出的符号属于公共 API，其余为内部实现。
- 密钥/令牌：示例与日志中一律占位（`process.env.CHANJET_APP_KEY`），禁止打印 token 原文与签名中间值；错误日志脱敏后输出。
- 远端调用：默认超时 30s（可配）；重试仅限幂等 GET 与网络层错误，指数退避最多 2 次；写操作（POST/PUT/DELETE）不自动重试。

## 10. 验证与交付标准

每个改动交付前必须：

1. `tsc --noEmit` 通过（strict）。
2. 构建产物生成成功。
3. 测试通过且覆盖率达标（§7）。
4. 冒烟测试实际执行并给出观察结果。
5. prettier 检查通过。
6. 通过独立验收（§8），验收报告归档。

禁止交付：未跑过类型的代码、只在脑中"应该能跑"的实现、TODO 占位、静默吞错、未写注释的远端调用方法。

## 11. 禁则

- 禁止跳过抓取/固化直接凭记忆写 API 类型。
- 禁止修改 `.cache/docs/` 中的上游内容（勘误除外，见 §3）；禁止格式化 `.cache/`。
- 禁止在 accounting 包中为其他产品预留代码路径。
- 禁止引入与"契约保真"冲突的便利性重命名（官方叫 `voucherType` 就不得改叫 `type`）。
- 禁止绕过验证宣称完成（见 §10）。
- 禁止用 sed/文本替换做跨文件重命名（必须走 LSP）。
