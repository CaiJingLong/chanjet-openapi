/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/ystjb
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/bb/ystjb.md
 */
import type { ChanjetClient } from '../../client.js';

/**
 * 模块错误码说明：官方文档提供「错误码说明」表但内容为空（- | -），故本模块不定义错误码常量；
 * 业务失败码统一由 ChanjetApiError.code 透传官方原文。
 */

/** 应收统计表请求参数。 */
export interface ReceiveParams {
  /** 账套id，必填 */
  bookid: string;
  /** 期间(yyyyMM)，必填 */
  period: string;
}

/** 应收统计表结果项（文档未提供输出参数表，字段取自响应示例）。 */
export interface ReceiveResult {
  /** 本年贷方累计 */
  yearDfAccumulate?: number;
  /** 客户辅助项编码 */
  assistantCustomerCode?: string;
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

/**
 * 应收应付指标查询请求参数。
 *
 * 注：文档请求地址含 `{bookid}` 占位，但未提供"路径参数"表；按 URL 推断 bookid 为必填路径参数。
 */
export interface RevceivePayTimeParams {
  /** 账套id，必填（按 URL 占位符推断，文档未单独列路径参数表） */
  bookid: string;
}

/** 应收应付指标查询结果。 */
export interface RevceivePayTimeResult {
  /** 应收客户 */
  receiveCustomerCount?: string;
  /** 应收总金额 */
  receiveEndbalanceSum?: string;
  /** 应付供应商 */
  payCustomerCount?: string;
  /** 应付总金额 */
  payEndbalanceSum?: string;
}

/** 应收统计表模块 API。 */
export function createYstjbApi(client: ChanjetClient) {
  return {
    /**
     * 应收统计表。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.period 期间(yyyyMM)，必填
     * @returns 应收统计表数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/ystjb
     */
    receive(params: ReceiveParams): Promise<ReceiveResult[]> {
      const { bookid, ...query } = params;
      return client.request<ReceiveResult[]>({
        method: 'GET',
        path: '/accounting/gl/statistics/receive/{bookid}',
        pathParams: { bookid },
        query,
      });
    },

    /**
     * 应收应付指标查询（内部）。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填（按 URL 占位符推断）
     * @returns 应收应付指标
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/ystjb
     */
    revceivePayTime(params: RevceivePayTimeParams): Promise<RevceivePayTimeResult> {
      return client.request<RevceivePayTimeResult>({
        method: 'GET',
        path: '/accounting/gl/Index/revceivePayTime/{bookid}',
        pathParams: { bookid: params.bookid },
      });
    },
  };
}
