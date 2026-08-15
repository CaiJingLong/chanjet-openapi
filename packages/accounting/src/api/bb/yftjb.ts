/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/yftjb
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/bb/yftjb.md
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/**
 * 模块错误码说明：官方文档未提供「错误码说明」表，故本模块不定义错误码常量；
 * 业务失败码统一由 ChanjetApiError.code 透传官方原文。
 */

/** 应付统计表请求参数。 */
export interface PayParams {
  /** 账套id，必填 */
  bookid: string;
  /** 期间(yyyyMM)，必填 */
  period: string;
}

/** 应付统计表结果项（文档未提供输出参数表，字段取自响应示例）。 */
export interface PayResult {
  /** 本年贷方累计 */
  yearDfAccumulate?: number;
  /** 是否入账（示例为字符串 "false"） */
  isentry?: string;
  /** 客户辅助项 */
  assistantCustomer?: number;
  /** 账龄天数 */
  spanDay?: number;
  /** 临时标识 */
  tempFlag?: boolean;
  /** 科目id */
  subjectId?: number;
  /** 本期借方余额 */
  currentPeriodJfBalance?: number;
  /** 本年借方累计 */
  yearJfAccumulate?: number;
  /** 辅助项id */
  assistantId?: number;
  /** 供应商辅助项 */
  assistantProvider?: number;
  /** 期初余额 */
  initBalance?: number;
  /** 供应商辅助项编码 */
  assistantProviderCode?: string;
  /** id */
  id?: number;
  /** 辅助项账 */
  assistantAccount?: number;
  /** 本期贷方余额 */
  currentPeriodDfBalance?: number;
  /** 期末余额 */
  endbalance?: number;
  /** 科目名称 */
  subjectName?: string;
}

/** 应付统计表模块 API。 */
export function createYftjbApi(client: ChanjetClient) {
  return {
    /**
     * 应付统计表。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.period 期间(yyyyMM)，必填
     * @returns 应付统计表数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/yftjb
     */
    pay(params: PayParams): Promise<PayResult[]> {
      const { bookid, ...query } = params;
      return client.request<PayResult[]>({
        method: 'GET',
        path: '/accounting/gl/statistics/pay/{bookid}',
        pathParams: { bookid },
        query,
      });
    },
  };
}
