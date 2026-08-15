/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/jyzkb
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/bb/jyzkb.md
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/**
 * 模块错误码说明：官方文档未提供「错误码说明」表，故本模块不定义错误码常量；
 * 业务失败码统一由 ChanjetApiError.code 透传官方原文。
 */

/** 经营状况表查询请求参数。 */
export interface StateOfOperationParams {
  /** 账套id，必填 */
  bookid: string;
  /** 查询年份，必填 */
  year: string;
  /** 是否计算营业外收入和支出，必填，true-是/flase-否 */
  needBusiness: string;
}

/**
 * 经营状况表查询结果项。
 *
 * 注：文档"输出参数"表与"响应示例"不一致（示例为现金流量表结构，疑似复制错位），
 * 本类型以"输出参数"表为准。
 */
export interface StateOfOperationResult {
  /** 税金 */
  shuijin?: number;
  /** 期间 */
  period?: string;
  /** 月份 */
  month?: string;
  /** 收入 */
  shouru?: number;
  /** 成本 */
  chengben?: number;
  /** 费用 */
  feiyong?: number;
  /** 利润 */
  lirun?: number;
}

/** 经营状况表查询模块 API。 */
export function createJyzkbApi(client: ChanjetClient) {
  return {
    /**
     * 经营状况表查询。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.year 查询年份，必填
     * @param params.needBusiness 是否计算营业外收入和支出，必填，true-是/flase-否
     * @returns 经营状况表数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/jyzkb
     */
    stateOfOperation(params: StateOfOperationParams): Promise<StateOfOperationResult[]> {
      const { bookid, ...query } = params;
      return client.request<StateOfOperationResult[]>({
        method: 'GET',
        path: '/accounting/asr/Statistics/stateOfOperation/{bookid}',
        pathParams: { bookid },
        query,
      });
    },
  };
}
