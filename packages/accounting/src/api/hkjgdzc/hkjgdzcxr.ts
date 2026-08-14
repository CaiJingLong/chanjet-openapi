/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjgdzcxr
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgdzc/hkjgdzcxr.md
 */
import type { ChanjetClient } from '../../client.js';

/** （外部接口）固定资产写入 - 请求参数 */
export interface AssetWriteParams {
  /** 账套 ID。来自请求地址路径占位符 {bookid}，文档输入参数表未单列该字段 */
  bookid: string;
}

/**
 * 响应 data 字段为 integer（返回数据，资产 ID）。文档未提供请求体/查询/路径参数表
 * （仅头部参数），写入所需的业务载荷在文档中未展开，需以文档请求示例为准自行补充。
 */
export type AssetWriteResult = number;

/**
 * 本接口文档未提供错误码说明表。
 */

/** （外部接口）固定资产写入 */
export function createHkjgdzcxrApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）固定资产写入。
     *
     * @param params 请求参数
     * @param params.bookid 账套 ID，必填（路径参数）
     * @returns 返回数据（资产 ID）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjgdzcxr
     */
    assetWrite(params: AssetWriteParams): Promise<AssetWriteResult> {
      return client.request<AssetWriteResult>({
        method: 'POST',
        path: '/accounting/asset/FixedAsset/outside/assetWrite/{bookid}',
        pathParams: { bookid: params.bookid },
      });
    },
  };
}
