/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjcssz/hkjcyxxxr
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjcssz/hkjcyxxxr.md
 * 错误码: 文档「错误码说明」表为空（- | -），故无错误码常量。
 */

import type { ChanjetClient, RequestOptions } from '../../client.js';

/**
 * （外部接口）财务信息写入请求参数。
 *
 * 官方文档未提供查询参数与请求体，仅含 URL 路径占位符 `{bookid}`。
 */
export interface SaveFinanceInfoParams {
  /** 账套 ID，URL 路径参数 `{bookid}`，必填 */
  bookid: string | number;
}

/**
 * 财务信息写入结果（`data` 字段）。
 */
export interface SaveFinanceInfoResult {
  /** 返回消息 */
  message?: string;
}

/**
 * 好会计财税设置 —— 财务信息写入 API 工厂。
 *
 * @param client 好会计客户端实例
 */
export function createHkjcyxxxrApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）财务信息写入。
     *
     * @param params 写入条件
     * @param params.bookid 账套 ID，URL 路径参数 `{bookid}`，必填
     * @returns 写入结果，`message` 为返回消息
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjcssz/hkjcyxxxr
     */
    saveFinanceInfo: (params: SaveFinanceInfoParams): Promise<SaveFinanceInfoResult> => {
      const { bookid } = params;
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/accounting/outside/saveFinanceInfo/{bookid}',
        pathParams: { bookid },
      };
      return client.request<SaveFinanceInfoResult>(options);
    },
  };
}
