/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/rjzdzjk
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/zjgl/rjzdzjk.md
 *
 * 勘误/冲突注明（参数表与请求示例类型不一致，均按参数表取值）:
 * - `receiptAmount`：表 string，示例 number（890）
 * - `disbursementAmount`：表 string，示例 number（0）
 * - `balanceAmount`：表 string，示例 number（1404644.00）
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/**
 * 模块错误码说明：官方文档错误码说明表为空，故本模块不定义错误码常量；
 * 业务失败码统一由 ChanjetApiError.code 透传官方原文。
 */

/**
 * 对账接口的请求参数。
 */
export interface CheckingParams {
  /** 账套id，必填，对应 URL 路径中的 {bookid} */
  bookid: number;
  /** 条数，必填 */
  count: number;
  /** 业务日期，必填 */
  bizDate: string;
  /** 收入金额，必填 */
  receiptAmount: string;
  /** 支出金额，必填 */
  disbursementAmount: string;
  /** 余额 */
  balanceAmount?: string;
  /** 科目ID，与finAccountNo选一必填 */
  glAccountId?: string;
  /** 财务账号，与glAccountId选1必填 */
  finAccountNo?: string;
}

/** 对账接口的返回数据（响应 `data` 字段，为字符串结果）。 */
export type CheckingResult = string;

/**
 * 对账接口。
 *
 * @param params 请求参数
 * @param params.bookid 账套id，必填，对应 URL 路径中的 {bookid}
 * @param params.count 条数，必填
 * @param params.bizDate 业务日期，必填
 * @param params.receiptAmount 收入金额，必填
 * @param params.disbursementAmount 支出金额，必填
 * @param params.balanceAmount 余额
 * @param params.glAccountId 科目ID，与finAccountNo选一必填
 * @param params.finAccountNo 财务账号，与glAccountId选1必填
 * @returns 对账结果字符串
 * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
 * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/rjzdzjk
 */
export function createRjzdzjkApi(client: ChanjetClient) {
  return {
    checking(params: CheckingParams): Promise<CheckingResult> {
      const { bookid, ...body } = params;
      return client.request<CheckingResult>({
        method: 'POST',
        path: '/accounting/acctgplt/CashJournal/checking/{bookid}',
        pathParams: { bookid },
        body,
      });
    },
  };
}
