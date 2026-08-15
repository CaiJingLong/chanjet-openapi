/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjscgdzc
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgdzc/hkjscgdzc.md
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/** （外部接口）删除固定资产 - 请求参数 */
export interface DeleteParams {
  /** 账套 ID，必填（路径参数） */
  bookid: string;
  /**
   * 固定资产ID，多个ID以逗号分割。
   * 请求地址中为路径占位符 {ids}，故作为路径参数处理；文档参数表将其列为查询参数且标注可选，二者不一致。
   */
  ids: string;
}

/** （外部接口）删除固定资产 - 响应无 data 字段，仅返回 code/successful 外壳 */
export type DeleteResult = void;

/**
 * 本接口文档未提供错误码说明表。
 */

/** （外部接口）删除固定资产 */
export function createHkjscgdzcApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）删除固定资产。
     *
     * @param params 请求参数
     * @param params.bookid 账套 ID，必填（路径参数）
     * @param params.ids 固定资产ID，多个ID以逗号分割，必填（路径参数）
     * @returns 无 data 返回值
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjscgdzc
     */
    delete(params: DeleteParams): Promise<DeleteResult> {
      return client.request<DeleteResult>({
        method: 'POST',
        path: '/accounting/asset/FixedAsset/outside/delete/{bookid}/{ids}',
        pathParams: { bookid: params.bookid, ids: params.ids },
      });
    },
  };
}
