/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/aqcxxjllb
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/bb/aqcxxjllb.md
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/**
 * 模块错误码说明：官方文档未提供「错误码说明」表，故本模块不定义错误码常量；
 * 业务失败码统一由 ChanjetApiError.code 透传官方原文。
 */

/** 按期间查询现金流量表请求参数。 */
export interface CashFlowParams {
  /** 账套id，必填 */
  bookid: string;
  /** 查询期间，必填 */
  period: string;
  /** 是否查询季报，可选 */
  isQuarter?: boolean;
}

/** 按期间查询现金流量表结果项（文档未提供输出参数表，字段取自响应示例）。 */
export interface CashFlowResult {
  /** 现金流量表项目id */
  id?: number;
  /** 编码 */
  code?: string;
  /** 项目 */
  name?: string;
  /** 项目左侧空格字符 */
  indentCount?: number;
  /** 行次 */
  rowNum?: number;
  /** 本月金额 */
  monthAmount?: number;
  /** 本年累计金额 */
  thisYearAmount?: number;
  /** 上年同期累计金额 */
  lastYearAmount?: number;
  /** 第一季度 */
  q1Amount?: number;
  /** 第二季度 */
  q2Amount?: number;
  /** 第三季度 */
  q3Amount?: number;
  /** 第四季度 */
  q4Amount?: number;
}

/** 按期间查询现金流量表模块 API。 */
export function createAqcxxjllbApi(client: ChanjetClient) {
  return {
    /**
     * 按期间查询现金流量表。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.period 查询期间，必填
     * @param params.isQuarter 是否查询季报，可选
     * @returns 现金流量表项目数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/aqcxxjllb
     */
    cashFlow(params: CashFlowParams): Promise<CashFlowResult[]> {
      const { bookid, ...query } = params;
      return client.request<CashFlowResult[]>({
        method: 'GET',
        path: '/accounting/gl/CashFlow/{bookid}',
        pathParams: { bookid },
        query,
      });
    },
  };
}
