/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/hkjrjzjqcx
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/zjgl/hkjrjzjqcx.md
 *
 * 勘误/冲突注明（参数表与示例类型不一致，均按参数表取值）:
 * - 文档「错误码说明」表为空（- | -），无错误码常量。
 * - 请求体 `code`（科目Code）：表 string，示例 100101（number）。
 * - 请求体 `otherParam.receipt`：表 string，示例 1111（number）。
 * - 请求体 `otherParam.disbursement`：表 string，示例 1111（number）。
 * - 响应体 `sequenceNum`：表 string，示例 2（number）。
 * - 响应体 `incomeDisbursementTypeId`：表 string，示例 1490882046853558（number）。
 * - 响应体 `refCashJournalEntryId`：表 string，示例 0（number）。
 * - 响应体 `glAccountId`：表 string，示例 1519907020996608（number）。
 * - 响应体 `finAccountId`：表 string，示例 0（number）。
 * - 响应体 `id`：表 string，示例 1499005159997440（number）。
 */

import type { ChanjetClient } from '../../client.js';

/**
 * 精确查询日记账的搜索条件对象。
 */
export interface PreciseQueryCashJournalOtherParam {
  /** 收入 */
  receipt?: string;
  /** 支出 */
  disbursement?: string;
  /** 摘要 */
  comments?: string;
  /** 起始时间 */
  bizDate_begin?: string;
  /** 截止时间 */
  bizDate_end?: string;
}

/**
 * 精确查询日记账的请求参数。
 *
 * 注：文档请求体表格亦列出 `bookid`（账套ID），但请求地址已将 `{bookid}` 作为路径参数，
 * 请求示例的请求体仅含 `code`/`period`/`otherParam`，故此处 `bookid` 仅作为路径参数。
 */
export interface PreciseQueryCashJournalParams {
  /** 账套ID，必填，对应 URL 路径中的 {bookid} */
  bookid: string;
  /** 科目Code，必填 */
  code: string;
  /** 区间，必填 */
  period: string;
  /** 搜索条件对象，必填 */
  otherParam: PreciseQueryCashJournalOtherParam;
}

/**
 * 精确查询日记账的返回数据（响应 `data` 字段）。
 */
export interface PreciseQueryCashJournalResult {
  /** 日记账来源枚举 */
  cashJournalSrcEnum?: string;
  /** 顺序号：属性在属性列表中排列顺序 */
  sequenceNum?: string;
  /** 是否期初数据 */
  isBeginning?: boolean;
  /** 日期 */
  bizDate?: string;
  /** 科目ID */
  glAccountId?: string;
  /** 备注 */
  remark?: string;
  /** 收入 */
  receiptAmount?: string;
  /** 日记账ID */
  id?: string;
  /** 期间（年月）：会计年月 */
  acctgPeriod?: string;
  /** 摘要 */
  comments?: string;
  /** 现金日记账收支类型 */
  incomeDisbursementTypeId?: string;
  /** 关联日记账ID */
  refCashJournalEntryId?: string;
  /** 核销明细列表 */
  vApplyDetailList?: string[];
  /** 收支大类 */
  incomeDisbursementCategoryEnum?: string;
  /** 现金账户 */
  finAccountId?: string;
  /** 余额 */
  balanceAmount?: string;
  /** 对方户名 */
  couterpartyAccountName?: string;
  /** 支出 */
  disbursementAmount?: string;
  /** 账户code */
  glAccountCode?: string;
}

/**
 * 精确查询日记账。
 *
 * @param params 请求参数
 * @param params.bookid 账套ID，必填，对应 URL 路径中的 {bookid}
 * @param params.code 科目Code，必填
 * @param params.period 区间，必填
 * @param params.otherParam 搜索条件对象，必填
 * @param params.otherParam.receipt 收入
 * @param params.otherParam.disbursement 支出
 * @param params.otherParam.comments 摘要
 * @param params.otherParam.bizDate_begin 起始时间
 * @param params.otherParam.bizDate_end 截止时间
 * @returns 精确查询结果，`data` 为日记账明细
 * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
 * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/hkjrjzjqcx
 */
export function createHkjrjzjqcxApi(client: ChanjetClient) {
  return {
    preciseQueryCashJournal(
      params: PreciseQueryCashJournalParams,
    ): Promise<PreciseQueryCashJournalResult> {
      const { bookid, ...body } = params;
      return client.request<PreciseQueryCashJournalResult>({
        method: 'POST',
        path: '/accounting/acctgplt/CashJournal/outside/preciseQueryCashJournal/{bookid}',
        pathParams: { bookid },
        body,
      });
    },
  };
}
