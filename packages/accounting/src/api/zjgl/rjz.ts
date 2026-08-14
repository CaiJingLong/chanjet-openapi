/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/rjz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/zjgl/rjz.md
 *
 * 勘误/歧义注明:
 * - 文档「错误码说明」表为空（- | -），无错误码常量。
 * - 修改日记账请求体 `disbursementExchangeRate` 表 string、示例 null；已按表取 string。
 */

import type { ChanjetClient } from '../../client.js';

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
  /** 姓名 */
  name?: string;
  /** id */
  id?: number;
  /** 用户名 */
  userName?: string;
}

/** 日记账查询结果中 `item` 元素的日记账来源枚举。 */
export interface ListItemCashJournalSrcEnum {
  /** id */
  id?: number;
  /** 显示名 */
  label?: string;
  /** 枚举值 */
  value?: string;
}

/** 日记账查询结果中 `item` 数组的单个元素。 */
export interface ListItem {
  /** 本币收入 */
  baseReceiptAmount?: number;
  /** 顺序号 */
  sequenceNum?: number;
  /** 是否期初 */
  isBeginning?: boolean;
  /** 账套是否同名 */
  isAccountBookSameName?: boolean;
  /** 银行对账状态 */
  vCashBankStatementCheckStatus?: boolean;
  /** 收支类型名称 */
  incomeDisbursementTypeName?: string;
  /** id */
  id?: number;
  /** 币种ID */
  currencyId?: number;
  /** 创建人 */
  createdUser?: ListItemUser;
  /** 收支类型ID */
  incomeDisbursementTypeId?: number;
  /** 关联日记账ID */
  refCashJournalEntryId?: number;
  /** 核销明细列表 */
  vApplyDetailList?: Record<string, unknown>[];
  /** 收支大类 */
  incomeDisbursementCategoryEnum?: string;
  /** 本币余额 */
  baseBalanceAmount?: number;
  /** 收支大类名称 */
  incomeDisbursementCategoryName?: string;
  /** 科目code */
  glAccountCode?: string;
  /** 日记账来源枚举 */
  cashJournalSrcEnum?: ListItemCashJournalSrcEnum;
  /** 日期 */
  bizDate?: string;
  /** 科目ID */
  glAccountId?: number;
  /** 余额汇率 */
  balanceAmountExchangeRate?: number;
  /** 收入 */
  receiptAmount?: number;
  /** 科目期间 */
  glAccountPeriod?: string;
  /** 最后修改人 */
  lastUpdatedUser?: ListItemUser;
  /** 期间 */
  acctgPeriod?: string;
  /** 摘要 */
  comments?: string;
  /** 收入汇率 */
  receiptExchangeRate?: number;
  /** 余额 */
  balanceAmount?: number;
}

/** 日记账查询结果中的 `total` 汇总。 */
export interface ListTotal {
  /** 总收入 */
  totalIncome?: number;
  /** 本币总余额 */
  totalBalanceBase?: number;
  /** 总支出 */
  totalPay?: number;
  /** 总余额 */
  totalBalance?: number;
  /** 本币总支出 */
  totalPayBase?: number;
  /** 本币总收入 */
  totalIncomeBase?: number;
}

/** 日记账查询结果中的 `prev` 上期信息。 */
export interface ListPrev {
  /** 期间 */
  acctgPeriod?: string;
  /** 余额 */
  balanceAmount?: number;
  /** 日期类型 */
  dateType?: number;
  /** 方向 */
  direction?: string;
  /** 附加信息 */
  extraInfoMap?: Record<string, unknown>;
  /** 科目ID */
  glAccountId?: number;
  /** 科目期间与会计期间 */
  glAccountPeriodAndAcctgPeriod?: string;
  /** 账套是否同名 */
  isAccountBookSameName?: boolean;
  /** 是否期初 */
  isBeginning?: boolean;
  /** 最后更新时间 */
  lastUpdatedStamp?: string;
  /** 租户ID */
  tenantId?: number;
  /** 银行对账状态 */
  vCashBankStatementCheckStatus?: boolean;
}

/** 日记账查询结果中的 `totalAll` 全量汇总。 */
export interface ListTotalAll {
  /** 总条数 */
  totalCount?: number;
  /** 总收入 */
  totalIncome?: number;
  /** 本币总收入 */
  totalIncomeBase?: number;
  /** 总支出 */
  totalPay?: number;
  /** 本币总支出 */
  totalPayBase?: number;
}

/**
 * 日记账查询的返回结果。
 *
 * 注：该接口返回扁平结构（无 `code`/`data`/`successful` 外壳）。
 */
export interface ListResult {
  /** 日记账数组 */
  item?: ListItem[];
  /** 汇总 */
  total?: ListTotal;
  /** 上期信息 */
  prev?: ListPrev;
  /** 全量汇总 */
  totalAll?: ListTotalAll;
  /** 期初余额 */
  initBalance?: number;
  /** 总条数 */
  totalCount?: number;
}

/** 修改日记账请求体中日记账来源枚举。 */
export interface UpdateCashJournalBodyCashJournalSrcEnum {
  /** id */
  id?: number;
  /** 显示名 */
  label?: string;
  /** 枚举值 */
  value?: string;
}

/** 修改日记账请求体中创建人/最后修改人。 */
export interface UpdateCashJournalBodyUser {
  /** id */
  id?: number;
  /** 姓名 */
  name?: string;
  /** 用户名 */
  userName?: string;
}

/** 修改日记账的请求体。 */
export interface UpdateCashJournalBody {
  /** 期间 */
  acctgPeriod?: string;
  /** 余额 */
  balanceAmount?: number;
  /** 余额汇率 */
  balanceAmountExchangeRate?: string;
  /** 本币余额 */
  baseBalanceAmount?: number;
  /** 本币支出 */
  baseDisbursementAmount?: number;
  /** 本币收入 */
  baseReceiptAmount?: number;
  /** 日期 */
  bizDate?: string;
  /** 日记账来源 */
  cashJournalSrcEnum?: UpdateCashJournalBodyCashJournalSrcEnum;
  /** 摘要 */
  comments?: string;
  /** 创建人 */
  createdUserId?: UpdateCashJournalBodyUser;
  /** 日期类型 */
  dateType?: number;
  /** 支出 */
  disbursementAmount?: number;
  /** 支出汇率 */
  disbursementExchangeRate?: string;
  /** 科目id */
  glAccountId?: number;
  /** 期间 */
  glAccountPeriod?: string;
  /** id */
  id?: number;
  /** 收支类型id */
  incomeDisbursementTypeId?: number;
  /** 账套是否同名 */
  isAccountBookSameName?: boolean;
  /** 是否期初 */
  isBeginning?: boolean;
  /** 是否合计 */
  isTotalRow?: boolean;
  /** 最后修改人 */
  lastUpdatedUserId?: UpdateCashJournalBodyUser;
  /** 上期 */
  prev?: boolean;
  /** 收入 */
  receiptAmount?: number;
  /** 收入汇率 */
  receiptExchangeRate?: string;
  /** 关联日记账ID */
  refCashJournalEntryId?: number;
  /** 选择是否失效 */
  selectionInvalid?: boolean;
  /** 顺序号 */
  sequenceNum?: number;
  /** 顺序号 */
  sequenceNumber?: number;
  /** 银行对账状态 */
  vCashBankStatementCheckStatus?: boolean;
  /** 是否结账 */
  hasJiezhang?: boolean;
  /** uuid */
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
     * @param params.body.balanceAmountExchangeRate 余额汇率
     * @param params.body.baseBalanceAmount 本币余额
     * @param params.body.baseDisbursementAmount 本币支出
     * @param params.body.baseReceiptAmount 本币收入
     * @param params.body.bizDate 日期
     * @param params.body.cashJournalSrcEnum 日记账来源
     * @param params.body.cashJournalSrcEnum.id id
     * @param params.body.cashJournalSrcEnum.label 显示名
     * @param params.body.cashJournalSrcEnum.value 枚举值
     * @param params.body.comments 摘要
     * @param params.body.createdUserId 创建人
     * @param params.body.createdUserId.id id
     * @param params.body.createdUserId.name 姓名
     * @param params.body.createdUserId.userName 用户名
     * @param params.body.dateType 日期类型
     * @param params.body.disbursementAmount 支出
     * @param params.body.disbursementExchangeRate 支出汇率
     * @param params.body.glAccountId 科目id
     * @param params.body.glAccountPeriod 期间
     * @param params.body.id id
     * @param params.body.incomeDisbursementTypeId 收支类型id
     * @param params.body.isAccountBookSameName 账套是否同名
     * @param params.body.isBeginning 是否期初
     * @param params.body.isTotalRow 是否合计
     * @param params.body.lastUpdatedUserId 最后修改人
     * @param params.body.lastUpdatedUserId.id id
     * @param params.body.lastUpdatedUserId.name 姓名
     * @param params.body.lastUpdatedUserId.userName 用户名
     * @param params.body.prev 上期
     * @param params.body.receiptAmount 收入
     * @param params.body.receiptExchangeRate 收入汇率
     * @param params.body.refCashJournalEntryId 关联日记账ID
     * @param params.body.selectionInvalid 选择是否失效
     * @param params.body.sequenceNum 顺序号
     * @param params.body.sequenceNumber 顺序号
     * @param params.body.vCashBankStatementCheckStatus 银行对账状态
     * @param params.body.hasJiezhang 是否结账
     * @param params.body.uuid uuid
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
