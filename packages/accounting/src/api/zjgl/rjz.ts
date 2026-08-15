/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/rjz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/zjgl/rjz.md
 *
 * 勘误/歧义注明:
 * - 文档「错误码说明」表为空（- | -），无错误码常量。
 * - 修改日记账请求体 `disbursementExchangeRate` 表 string、示例 null；已按表取 string。
 */

import type { ChanjetClient } from '@chanjet-openapi/core';

/**
 * 日记账查询的请求参数。
 */
export interface ListParams {
  /** 账套id，必填，对应 URL 路径中的 {bookid} */
  bookid: string;
  /** 期间 格式"YYYYMM"，必填（查询参数） */
  period: string;
  /** 科目ID，必填（查询参数） */
  glAccountId: number;
}

/** 日记账查询结果中 `item` 元素的创建人/最后修改人。 */
export interface ListItemUser {
  /** 文档未提供说明 */
  name?: string;
  /** 文档未提供说明 */
  id?: number;
  /** 文档未提供说明 */
  userName?: string;
}

/** 日记账查询结果中 `item` 元素的日记账来源枚举。 */
export interface ListItemCashJournalSrcEnum {
  /** 文档未提供说明 */
  id?: number;
  /** 文档未提供说明 */
  label?: string;
  /** 文档未提供说明 */
  value?: string;
}

/** 日记账查询结果中 `item` 数组的单个元素。 */
export interface ListItem {
  /** 文档未提供说明 */
  baseReceiptAmount?: number;
  /** 文档未提供说明 */
  sequenceNum?: number;
  /** 文档未提供说明 */
  isBeginning?: boolean;
  /** 文档未提供说明 */
  isAccountBookSameName?: boolean;
  /** 文档未提供说明 */
  vCashBankStatementCheckStatus?: boolean;
  /** 文档未提供说明 */
  incomeDisbursementTypeName?: string;
  /** 文档未提供说明 */
  id?: number;
  /** 文档未提供说明 */
  currencyId?: number;
  /** 文档未提供说明 */
  createdUser?: ListItemUser;
  /** 文档未提供说明 */
  incomeDisbursementTypeId?: number;
  /** 文档未提供说明 */
  refCashJournalEntryId?: number;
  /** 文档未提供说明 */
  vApplyDetailList?: Record<string, unknown>[];
  /** 文档未提供说明 */
  incomeDisbursementCategoryEnum?: string;
  /** 文档未提供说明 */
  baseBalanceAmount?: number;
  /** 文档未提供说明 */
  incomeDisbursementCategoryName?: string;
  /** 文档未提供说明 */
  glAccountCode?: string;
  /** 文档未提供说明 */
  cashJournalSrcEnum?: ListItemCashJournalSrcEnum;
  /** 文档未提供说明 */
  bizDate?: string;
  /** 文档未提供说明 */
  glAccountId?: number;
  /** 文档未提供说明 */
  balanceAmountExchangeRate?: number;
  /** 文档未提供说明 */
  receiptAmount?: number;
  /** 文档未提供说明 */
  glAccountPeriod?: string;
  /** 文档未提供说明 */
  lastUpdatedUser?: ListItemUser;
  /** 文档未提供说明 */
  acctgPeriod?: string;
  /** 文档未提供说明 */
  comments?: string;
  /** 文档未提供说明 */
  receiptExchangeRate?: number;
  /** 文档未提供说明 */
  balanceAmount?: number;
}

/** 日记账查询结果中的 `total` 汇总。 */
export interface ListTotal {
  /** 文档未提供说明 */
  totalIncome?: number;
  /** 文档未提供说明 */
  totalBalanceBase?: number;
  /** 文档未提供说明 */
  totalPay?: number;
  /** 文档未提供说明 */
  totalBalance?: number;
  /** 文档未提供说明 */
  totalPayBase?: number;
  /** 文档未提供说明 */
  totalIncomeBase?: number;
}

/** 日记账查询结果中的 `prev` 上期信息。 */
export interface ListPrev {
  /** 文档未提供说明 */
  acctgPeriod?: string;
  /** 文档未提供说明 */
  balanceAmount?: number;
  /** 文档未提供说明 */
  dateType?: number;
  /** 文档未提供说明 */
  direction?: string;
  /** 文档未提供说明 */
  extraInfoMap?: Record<string, unknown>;
  /** 文档未提供说明 */
  glAccountId?: number;
  /** 文档未提供说明 */
  glAccountPeriodAndAcctgPeriod?: string;
  /** 文档未提供说明 */
  isAccountBookSameName?: boolean;
  /** 文档未提供说明 */
  isBeginning?: boolean;
  /** 文档未提供说明 */
  lastUpdatedStamp?: string;
  /** 文档未提供说明 */
  tenantId?: number;
  /** 文档未提供说明 */
  vCashBankStatementCheckStatus?: boolean;
}

/** 日记账查询结果中的 `totalAll` 全量汇总。 */
export interface ListTotalAll {
  /** 文档未提供说明 */
  totalCount?: number;
  /** 文档未提供说明 */
  totalIncome?: number;
  /** 文档未提供说明 */
  totalIncomeBase?: number;
  /** 文档未提供说明 */
  totalPay?: number;
  /** 文档未提供说明 */
  totalPayBase?: number;
}

/**
 * 日记账查询的返回结果。
 *
 * 注：该接口返回扁平结构（无 `code`/`data`/`successful` 外壳）。
 */
export interface ListResult {
  /** 文档未提供说明 */
  item?: ListItem[];
  /** 文档未提供说明 */
  total?: ListTotal;
  /** 文档未提供说明 */
  prev?: ListPrev;
  /** 文档未提供说明 */
  totalAll?: ListTotalAll;
  /** 文档未提供说明 */
  initBalance?: number;
  /** 文档未提供说明 */
  totalCount?: number;
}

/** 修改日记账请求体中日记账来源枚举。 */
export interface UpdateCashJournalBodyCashJournalSrcEnum {
  /** 文档未提供说明 */
  id?: number;
  /** 文档未提供说明 */
  label?: string;
  /** 文档未提供说明 */
  value?: string;
}

/** 修改日记账请求体中创建人/最后修改人。 */
export interface UpdateCashJournalBodyUser {
  /** 文档未提供说明 */
  id?: number;
  /** 文档未提供说明 */
  name?: string;
  /** 文档未提供说明 */
  userName?: string;
}

/** 修改日记账的请求体。 */
export interface UpdateCashJournalBody {
  /** 期间 */
  acctgPeriod?: string;
  /** 余额 */
  balanceAmount?: number;
  /** 文档未提供说明 */
  balanceAmountExchangeRate?: string;
  /** 本币余额 */
  baseBalanceAmount?: number;
  /** 支出 */
  baseDisbursementAmount?: number;
  /** 收入 */
  baseReceiptAmount?: number;
  /** 日期 */
  bizDate?: string;
  /** 日记账来源 */
  cashJournalSrcEnum?: UpdateCashJournalBodyCashJournalSrcEnum;
  /** 摘要 */
  comments?: string;
  /** 创建人 */
  createdUserId?: UpdateCashJournalBodyUser;
  /** 文档未提供说明 */
  dateType?: number;
  /** 支出 */
  disbursementAmount?: number;
  /** 文档未提供说明 */
  disbursementExchangeRate?: string;
  /** 科目id */
  glAccountId?: number;
  /** 期间 */
  glAccountPeriod?: string;
  /** id */
  id?: number;
  /** 收支类型id */
  incomeDisbursementTypeId?: number;
  /** 文档未提供说明 */
  isAccountBookSameName?: boolean;
  /** 是否期初 */
  isBeginning?: boolean;
  /** 是否合计 */
  isTotalRow?: boolean;
  /** 文档未提供说明 */
  lastUpdatedUserId?: UpdateCashJournalBodyUser;
  /** 文档未提供说明 */
  prev?: boolean;
  /** 收入 */
  receiptAmount?: number;
  /** 文档未提供说明 */
  receiptExchangeRate?: string;
  /** 文档未提供说明 */
  refCashJournalEntryId?: number;
  /** 文档未提供说明 */
  selectionInvalid?: boolean;
  /** 文档未提供说明 */
  sequenceNum?: number;
  /** 文档未提供说明 */
  sequenceNumber?: number;
  /** 文档未提供说明 */
  vCashBankStatementCheckStatus?: boolean;
  /** 文档未提供说明 */
  hasJiezhang?: boolean;
  /** 文档未提供说明 */
  uuid?: string;
  /** 标志：update */
  editFlag?: string;
  /** 期间 */
  periods?: string;
  /** 行号 */
  rowNum?: number;
}

/**
 * 修改日记账的请求参数。
 *
 * 注：URL 路径中的 `id`（string）与请求体中的 `id`（integer）同名但类型不同，为避免冲突，
 * 路径参数置于顶层，请求体字段统一收于 `body`。
 */
export interface UpdateCashJournalParams {
  /** 账套ID，必填，对应 URL 路径中的 {bookid} */
  bookid: string;
  /** 路径参数 id，必填 */
  id: string;
  /** 请求体 */
  body: UpdateCashJournalBody;
}

/** 修改日记账的返回数据（响应 `data` 字段，为记录 ID）。 */
export type UpdateCashJournalResult = number;

/**
 * 日记账查询。
 *
 * @param params 请求参数
 * @param params.bookid 账套id，必填，对应 URL 路径中的 {bookid}
 * @param params.period 期间 格式"YYYYMM"，必填（查询参数）
 * @param params.glAccountId 科目ID，必填（查询参数）
 * @returns 日记账查询结果，扁平结构（无 `code`/`data`/`successful` 外壳）
 * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
 * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/rjz
 */
export function createRjzApi(client: ChanjetClient) {
  return {
    list(params: ListParams): Promise<ListResult> {
      const { bookid, ...query } = params;
      return client.request<ListResult>({
        method: 'GET',
        path: '/accounting/acctgplt/CashJournal/list/{bookid}',
        pathParams: { bookid },
        query,
      });
    },

    /**
     * 修改日记账。
     *
     * @param params 请求参数
     * @param params.bookid 账套ID，必填，对应 URL 路径中的 {bookid}
     * @param params.id 路径参数 id，必填
     * @param params.body 请求体
     * @param params.body.acctgPeriod 期间
     * @param params.body.balanceAmount 余额
     * @param params.body.balanceAmountExchangeRate 文档未提供说明
     * @param params.body.baseBalanceAmount 本币余额
     * @param params.body.baseDisbursementAmount 支出
     * @param params.body.baseReceiptAmount 收入
     * @param params.body.bizDate 日期
     * @param params.body.cashJournalSrcEnum 日记账来源
     * @param params.body.cashJournalSrcEnum.id 文档未提供说明
     * @param params.body.cashJournalSrcEnum.label 文档未提供说明
     * @param params.body.cashJournalSrcEnum.value 文档未提供说明
     * @param params.body.comments 摘要
     * @param params.body.createdUserId 创建人
     * @param params.body.createdUserId.id 文档未提供说明
     * @param params.body.createdUserId.name 文档未提供说明
     * @param params.body.createdUserId.userName 文档未提供说明
     * @param params.body.dateType 文档未提供说明
     * @param params.body.disbursementAmount 支出
     * @param params.body.disbursementExchangeRate 文档未提供说明
     * @param params.body.glAccountId 科目id
     * @param params.body.glAccountPeriod 期间
     * @param params.body.id id
     * @param params.body.incomeDisbursementTypeId 收支类型id
     * @param params.body.isAccountBookSameName 文档未提供说明
     * @param params.body.isBeginning 是否期初
     * @param params.body.isTotalRow 是否合计
     * @param params.body.lastUpdatedUserId 文档未提供说明
     * @param params.body.lastUpdatedUserId.id 文档未提供说明
     * @param params.body.lastUpdatedUserId.name 文档未提供说明
     * @param params.body.lastUpdatedUserId.userName 文档未提供说明
     * @param params.body.prev 文档未提供说明
     * @param params.body.receiptAmount 收入
     * @param params.body.receiptExchangeRate 文档未提供说明
     * @param params.body.refCashJournalEntryId 文档未提供说明
     * @param params.body.selectionInvalid 文档未提供说明
     * @param params.body.sequenceNum 文档未提供说明
     * @param params.body.sequenceNumber 文档未提供说明
     * @param params.body.vCashBankStatementCheckStatus 文档未提供说明
     * @param params.body.hasJiezhang 文档未提供说明
     * @param params.body.uuid 文档未提供说明
     * @param params.body.editFlag 标志：update
     * @param params.body.periods 期间
     * @param params.body.rowNum 行号
     * @returns 修改后的记录 ID
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/rjz
     */
    updateCashJournal(params: UpdateCashJournalParams): Promise<UpdateCashJournalResult> {
      const { bookid, id, body } = params;
      return client.request<UpdateCashJournalResult>({
        method: 'PUT',
        path: '/accounting/acctgplt/CashJournal/{bookid}/{id}',
        pathParams: { bookid, id },
        body,
      });
    },
  };
}
