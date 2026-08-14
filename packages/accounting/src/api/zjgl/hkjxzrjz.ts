/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/hkjxzrjz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/zjgl/hkjxzrjz.md
 */

import type { ChanjetClient } from '../../client.js';

/**
 * 新增日记账的请求参数。
 */
export interface AddCashJournalParams {
  /** 账套ID，必填，对应 URL 路径中的 {bookid} */
  bookid: string;
  /** 财务账号 */
  finAccountId?: number;
  /** 科目ID */
  glAccountId?: number;
  /** 收支大类 */
  incomeDisbursementCategoryEnum?: string;
  /** 现金日记账收支类型ID */
  incomeDisbursementTypeId?: number;
  /** 收入 */
  receiptAmount?: string;
  /** 支出 */
  disbursementAmount?: string;
  /** 对方户名 */
  couterpartyAccountName?: string;
  /** 日记账来源：枚举型：Manual_Web */
  cashJournalSrcEnum?: string;
  /** 顺序号 */
  sequenceNum?: number;
  /** 日期 */
  bizDate?: string;
  /** 摘要 */
  comments?: string;
}

/** 新增日记账的返回数据（响应 `data` 字段，为新增记录的 ID）。 */
export type AddCashJournalResult = number;

/**
 * 新增日记账。
 *
 * @param params 请求参数
 * @param params.bookid 账套ID，必填，对应 URL 路径中的 {bookid}
 * @param params.finAccountId 财务账号
 * @param params.glAccountId 科目ID
 * @param params.incomeDisbursementCategoryEnum 收支大类
 * @param params.incomeDisbursementTypeId 现金日记账收支类型ID
 * @param params.receiptAmount 收入
 * @param params.disbursementAmount 支出
 * @param params.couterpartyAccountName 对方户名
 * @param params.cashJournalSrcEnum 日记账来源：枚举型：Manual_Web
 * @param params.sequenceNum 顺序号
 * @param params.bizDate 日期
 * @param params.comments 摘要
 * @returns 新增记录的 ID
 * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
 * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/hkjxzrjz
 */
export function createHkjxzrjzApi(client: ChanjetClient) {
  return {
    addCashJournal(params: AddCashJournalParams): Promise<AddCashJournalResult> {
      const { bookid, ...body } = params;
      return client.request<AddCashJournalResult>({
        method: 'POST',
        path: '/accounting/acctgplt/CashJournal/outside/addCashJournal/{bookid}',
        pathParams: { bookid },
        body,
      });
    },
  };
}
