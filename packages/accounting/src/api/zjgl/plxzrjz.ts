/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/plxzrjz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/zjgl/plxzrjz.md
 */

import type { ChanjetClient } from '../../client.js';

/**
 * 批量新增日记账的单条日记账（请求体数组元素）。
 */
export interface BatchAddItem {
  /** 财务账号 */
  finAccountId?: number;
  /** 摘要 */
  comments?: string;
  /** 日期，请输入2020-10-11类似的日期格式，必填 */
  bizDate: string;
  /** 收入，收入和支出金额填一个即可，另外一项填0，必填 */
  receiptAmount: string;
  /** 支出，收入和支出金额填一个即可，另外一项填0，必填 */
  disbursementAmount: string;
  /** 对方户名 */
  couterpartyAccountName?: string;
  /** 科目ID，与finAccountNo选一必填 */
  glAccountId?: number;
  /** 顺序号，排序用，必填 */
  sequenceNum: string;
  /** 外部单号 */
  externalCode?: string;
  /** 财务账号，与glAccountId选一必填 */
  finAccountNo?: string;
  /** 备注 */
  remark?: string;
  /** 收支类型名称 */
  incomeDisbursementName?: string;
  /** 回单url */
  digitalReceiptUrl?: string;
}

/**
 * 批量新增日记账的请求参数。
 */
export interface BatchAddParams {
  /** 账套id，必填，对应 URL 路径中的 {bookid} */
  bookid: number;
  /** 日记账数组，必填（请求体） */
  items: BatchAddItem[];
}

/**
 * 批量新增日记账返回数据的单条日记账（响应 `data` 数组元素）。
 */
export interface BatchAddResultItem {
  /** 期间 */
  acctgPeriod?: string;
  /** 业务日期 */
  bizDate?: string;
  /** 日记账来源枚举值 */
  cashJournalSrcEnum?: string;
  /** 摘要 */
  comments?: string;
  /** 对方科目 */
  couterpartyAccountName?: string;
  /** 支出 */
  disbursementAmount?: string;
  /** 财务账号 */
  finAccountId?: number;
  /** 科目id */
  glAccountId?: number;
  /** id */
  id?: number;
  /** 现金日记账收支类型ID */
  incomeDisbursementTypeId?: number;
  /** 更新时间 */
  lastUpdatedStamp?: string;
  /** 收入 */
  receiptAmount?: string;
  /** 顺序号 */
  sequenceNum?: string;
}

/** 批量新增日记账的返回数据（响应 `data` 字段，为日记账数组）。 */
export type BatchAddResult = BatchAddResultItem[];

/**
 * 批量新增日记账。
 *
 * @param params 请求参数
 * @param params.bookid 账套id，必填，对应 URL 路径中的 {bookid}
 * @param params.items 日记账数组，必填（请求体）
 * @param params.items.finAccountId 财务账号
 * @param params.items.comments 摘要
 * @param params.items.bizDate 日期，请输入2020-10-11类似的日期格式，必填
 * @param params.items.receiptAmount 收入，收入和支出金额填一个即可，另外一项填0，必填
 * @param params.items.disbursementAmount 支出，收入和支出金额填一个即可，另外一项填0，必填
 * @param params.items.couterpartyAccountName 对方户名
 * @param params.items.glAccountId 科目ID，与finAccountNo选一必填
 * @param params.items.sequenceNum 顺序号，排序用，必填
 * @param params.items.externalCode 外部单号
 * @param params.items.finAccountNo 财务账号，与glAccountId选一必填
 * @param params.items.remark 备注
 * @param params.items.incomeDisbursementName 收支类型名称
 * @param params.items.digitalReceiptUrl 回单url
 * @returns 批量新增结果，`data` 为新增的日记账数组
 * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
 * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/plxzrjz
 */
export function createPlxzrjzApi(client: ChanjetClient) {
  return {
    batchAdd(params: BatchAddParams): Promise<BatchAddResult> {
      const { bookid, items } = params;
      return client.request<BatchAddResult>({
        method: 'POST',
        path: '/accounting/acctgplt/CashJournal/batchAdd/{bookid}',
        pathParams: { bookid },
        body: items,
      });
    },
  };
}
