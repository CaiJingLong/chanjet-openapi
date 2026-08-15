# @chanjet-openapi/accounting

[![npm version](https://img.shields.io/npm/v/@chanjet-openapi/accounting.svg)](https://www.npmjs.com/package/@chanjet-openapi/accounting)

畅捷通好会计（智能云财税系统）API 的 TypeScript SDK。16 个模块、65 个接口文件，类型与官方文档逐字段对齐。

## 安装

```bash
pnpm add @chanjet-openapi/core @chanjet-openapi/accounting
# 或
npm install @chanjet-openapi/core @chanjet-openapi/accounting
```

## 快速上手

```typescript
import { ChanjetClient } from '@chanjet-openapi/core';
import { api } from '@chanjet-openapi/accounting';

const client = new ChanjetClient({
  appKey: process.env.CHANJET_APP_KEY!,
  appSecret: process.env.CHANJET_APP_SECRET!,
  openToken: process.env.CHANJET_OPEN_TOKEN!,
});

// 调用凭证模块
const pzApi = api.cwxg.pz.createPzApi(client);
const result = await pzApi.getInitBalanceList({ bookid: '123', bookId: '123' });

// 调用基础档案 - 往来单位
const wldwApi = api.jcda.wldw.createWldwApi(client);
const partners = await wldwApi.queryWldwList({ bookid: '123' });

// 调用报表 - 资产负债表
const zcfzApi = api.bb.zcfz.createZcfzApi(client);
const report = await zcfzApi.getZcfzData({ bookid: '123', period: '2026-01' });
```

## 错误处理

```typescript
import { ChanjetApiError } from '@chanjet-openapi/core';

try {
  await pzApi.getInitBalanceList({ bookid: '123', bookId: '123' });
} catch (e) {
  if (e instanceof ChanjetApiError) {
    console.error('错误码:', e.code);
    console.error('错误消息:', e.msg);
  }
}
```

每个模块导出自己的错误码常量表（如 `PZ_ERROR_CODES`），可在调用处按模块错误码判断。

## API 模块

| 模块           | 说明                                     | 接口数 | 命名空间               |
| -------------- | ---------------------------------------- | ------ | ---------------------- |
| jcda           | 基础档案（账户、项目、往来单位、商品等） | 9      | `api.jcda.*`           |
| zt             | 账套                                     | 1      | `api.zt.*`             |
| zjgl           | 资金管理（日记账、银行对账等）           | 6      | `api.zjgl.*`           |
| sz             | 收付                                     | 1      | `api.sz.*`             |
| zb             | 账表（余额表、明细表等）                 | 3      | `api.zb.*`             |
| km             | 科目                                     | 1      | `api.km.*`             |
| pjgl           | 票据管理                                 | 2      | `api.pjgl.*`           |
| hkjkchs        | 库存核算（出库、入库、调拨等）           | 6      | `api.hkjkchs.*`        |
| hkjgdzc        | 固定资产                                 | 11     | `api.hkjgdzc.*`        |
| hkjgz          | 工资                                     | 5      | `api.hkjgz.*`          |
| hkjjz          | 结账                                     | 2      | `api.hkjjz.*`          |
| hkjcssz        | 财务设置                                 | 4      | `api.hkjcssz.*`        |
| hkjRoleManager | 角色管理                                 | 1      | `api.hkjRoleManager.*` |
| cwxg           | 财务相关（凭证）                         | 2      | `api.cwxg.*`           |
| hkjMenu        | 菜单                                     | 1      | `api.hkjjMenu.*`       |
| bb             | 报表                                     | 12     | `api.bb.*`             |

### 调用模式

每个模块文件导出一个 `create<Module>Api(client)` 工厂函数，返回该模块所有接口的方法对象：

```typescript
// 模块文件导出类型 + 错误码 + 工厂函数
import { api } from '@chanjet-openapi/accounting';

const pzApi = api.cwxg.pz.createPzApi(client);
// pzApi.getInitBalanceList(params)  → Promise<GetInitBalanceListResult[]>
// pzApi.initAcctgTrans(params)      → Promise<InitAcctgTransResult>
// pzApi.modifyAcctgTrans(params)    → Promise<void>
// ...共 18 个方法
```

## 相关

- [GitHub](https://github.com/CaiJingLong/chanjet-openapi)
- [npm](https://www.npmjs.com/package/@chanjet-openapi/accounting)
- [AI API 参考 (llms.txt)](https://raw.githubusercontent.com/CaiJingLong/chanjet-openapi/gh-pages/llms.txt)
