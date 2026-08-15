/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjjz/hkjfjz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjjz/hkjfjz.md
 */

import type { ChanjetClient, RequestOptions } from '@chanjet-openapi/core';

/**
 * （外部接口）反结账请求参数。
 *
 * 官方文档将 `bookid` 列在请求体参数表中，但请求地址为
 * `POST /accounting/gl/CheckOut/outside/unCheckOut/{bookid}`，且请求示例 body 仅含 `period`，
 * 故 `bookid` 实为 URL 路径占位符，`period` 为请求体字段。
 */
export interface UnCheckOutParams {
  /** 账套ID，URL 路径参数 `{bookid}`，必填 */
  bookid: string;
  /** 区间，请求体字段，必填 */
  period: string;
}

/**
 * （外部接口）反结账结果（响应 `data` 字段）。
 *
 * 官方错误码说明表为空，未收录任何错误码常量。
 */
export interface UnCheckOutResult {
  /** 内容 */
  message?: string;
}

/**
 * 好会计结账——反结账模块。
 *
 * @param client 好会计客户端实例
 * @returns 反结账接口方法
 */
export function createHkjfjzApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）反结账。
     *
     * @param params 反结账参数
     * @param params.bookid 账套ID，URL 路径参数，必填
     * @param params.period 区间，请求体字段，必填
     * @returns 反结账结果，`message` 为返回内容
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjjz/hkjfjz
     */
    unCheckOut(params: UnCheckOutParams): Promise<UnCheckOutResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/gl/CheckOut/outside/unCheckOut/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { period: params.period },
      };
      return client.request<UnCheckOutResult>(options);
    },
  };
}
