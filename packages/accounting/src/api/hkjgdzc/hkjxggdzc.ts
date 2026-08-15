/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjxggdzc
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgdzc/hkjxggdzc.md
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/** （外部接口）修改固定资产 - 请求参数 */
export interface UpdateParams {
  /** 账套 ID。来自请求地址路径占位符 {bookid}，文档输入参数表未单列该字段 */
  bookid: string;
  /**
   * 请求参数，必填。
   * 文档参数表将该字段标注为 string；请求示例实际展示为完整的固定资产 JSON 对象
   * （含 code、name、fixedAssetTypeId、depnGlAccountId、expenseGlAccountId 等字段）。
   * 按参数表类型以 string 建模，调用方需自行序列化。
   */
  object: string;
}

/** （外部接口）修改固定资产 - 响应 data 字段 */
export interface UpdateResult {
  /** 返回数据 */
  message?: string;
}

/**
 * 本接口文档未提供错误码说明表。
 */

/** （外部接口）修改固定资产 */
export function createHkjxggdzcApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）修改固定资产。
     *
     * @param params 请求参数
     * @param params.bookid 账套 ID，必填（路径参数）
     * @param params.object 请求参数（固定资产对象，文档标注为 string），必填（请求体）
     * @returns 返回数据（含 message）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjxggdzc
     */
    update(params: UpdateParams): Promise<UpdateResult> {
      return client.request<UpdateResult>({
        method: 'POST',
        path: '/accounting/asset/FixedAsset/outside/update/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { object: params.object },
      });
    },
  };
}
