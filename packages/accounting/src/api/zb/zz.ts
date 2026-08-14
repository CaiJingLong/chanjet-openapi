/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/zb/zz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/zb/zz.md
 */

import type { ChanjetClient } from '../../client.js';

/** 总账查询（GET query）查询参数。 */
export type QueryParams = {
  /** 查询条件json串，必填 */
  queryParam: object;
};

/** 总账查询结果中的行数据。 */
export type QueryResultItem = {
  /** 借方本币金额 */
  basePostedDr?: string;
  /** 贷方本币金额 */
  basePostedCr?: string;
  /** 期末本币 */
  baseEndingBalance?: string;
  /** 借方外币 */
  postedDr?: string;
  /** 贷方外币 */
  postedCr?: string;
  /** 外币期末余额 */
  endingBalance?: string;
  /** 贷方数量 */
  postedCrQty?: string;
  /** 借方数量 */
  postedDrQty?: string;
  /** 期末数量 */
  endingQty?: string;
  /** 贷方本币单价 */
  basePostedCrPrice?: string;
  /** 借方本币单价 */
  basePostedDrPrice?: string;
  /** 期末单价 */
  baseEndingPrice?: string;
  /** 摘要 */
  comments?: string;
  /** 余额方向 */
  drCrDirection?: string;
  /** 汇率 */
  exchangeRate?: string;
  /** 分组号 */
  groupCount?: string;
  /** 排序id */
  id?: string;
  /** 期间 */
  period?: string;
  /** 科目编码 */
  glAccountCode?: string;
  /** 科目id */
  glAccountId?: number;
  /** 科目全称 */
  glAccountLongName?: string;
  /** 科目名称 */
  glAccountName?: string;
};

/** 总账查询结果（响应示例为行对象数组）。 */
export type QueryResult = QueryResultItem[];

/**
 * 账簿（总账）API 模块。
 *
 * 文档未提供具体错误码说明，远端失败统一抛 {@link ChanjetApiError}。
 */
export function createZzApi(client: ChanjetClient) {
  return {
    /**
     * 总账查询。
     *
     * @param bookid 账套id，必填
     * @param params 查询条件
     * @param params.queryParam 查询条件json串，必填
     * @returns 总账行对象数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zb/zz
     */
    async query(bookid: string, params: QueryParams): Promise<QueryResult> {
      return client.request<QueryResult>({
        method: 'GET',
        path: '/accounting/gl/TotalLedge/query/{bookid}',
        pathParams: { bookid },
        query: { queryParam: JSON.stringify(params.queryParam) },
      });
    },
  };
}
