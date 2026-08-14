/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/nstjb
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/bb/nstjb.md
 */
import type { ChanjetClient } from '../../client.js';

/**
 * 模块错误码说明：官方文档未提供「错误码说明」表，故本模块不定义错误码常量；
 * 业务失败码统一由 ChanjetApiError.code 透传官方原文。
 */

/** 纳税统计表请求参数。 */
export interface GetTaxStatisticsParams {
  /** 账套id，必填 */
  bookid: string;
  /** 查询期间，必填 */
  period: string;
}

/** 纳税统计表结果项。 */
export interface GetTaxStatisticsResult {
  /** 本年累计金额 */
  thisYearAmount?: number;
  /** 表达式缩进 */
  indentCount?: number;
  /** 显示的行次 */
  rowText?: string;
  /** 公式是否可编辑 */
  editable?: boolean;
  /** 行次 */
  rowNum?: number;
  /** 本月金额 */
  monthAmount?: number;
  /** 公式呈现 */
  expressionDesc?: string;
  /** 项目id */
  id?: number;
  /** 可折叠 */
  foldable?: boolean;
  /** 项目名称 */
  expressionContent?: string;
}

/** 纳税统计表模块 API。 */
export function createNstjbApi(client: ChanjetClient) {
  return {
    /**
     * 查询纳税统计表。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.period 查询期间，必填
     * @returns 纳税统计表数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/nstjb
     */
    getTaxStatistics(params: GetTaxStatisticsParams): Promise<GetTaxStatisticsResult[]> {
      const { bookid, ...query } = params;
      return client.request<GetTaxStatisticsResult[]>({
        method: 'GET',
        path: '/accounting/asr/TaxStatistics/getTaxStatistics/{bookid}',
        pathParams: { bookid },
        query,
      });
    },
  };
}
