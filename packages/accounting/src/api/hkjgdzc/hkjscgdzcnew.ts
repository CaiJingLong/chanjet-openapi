/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjscgdzcnew
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgdzc/hkjscgdzcnew.md
 */
import type { ChanjetClient } from '../../client.js';

/** （外部接口-新版资产）删除固定资产 - 请求参数 */
export interface DeleteFixedAssetParams {
  /** 账套 ID，必填（路径参数） */
  bookid: string;
  /** 期间，必填（请求体） */
  period: string;
  /** 资产ID列表，必填（请求体）。文档请求示例中元素为数字，但参数表标注 array<string> */
  ids: string[];
}

/**
 * （外部接口-新版资产）删除固定资产 - 响应 data 字段。
 *
 * 冲突注明：文档参数表定义了 data 子字段（deleteFailReason/deleteSuccessNum/isShowFlag），
 * 但响应示例仅返回 { "code": "000000", "successful": true }，无 data 字段。
 * 按参数表建模，实际响应可能不含 data。
 */
export interface DeleteFixedAssetResult {
  /** 删除失败原因 */
  deleteFailReason?: string;
  /** 删除数量 */
  deleteSuccessNum?: number;
  /** 是否展示原因 */
  isShowFlag?: boolean;
}

/**
 * 本接口文档未提供错误码说明表。
 */

/** （外部接口-新版资产）删除固定资产 */
export function createHkjscgdzcnewApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口-新版资产）删除固定资产。
     *
     * @param params 请求参数
     * @param params.bookid 账套 ID，必填（路径参数）
     * @param params.period 期间，必填（请求体）
     * @param params.ids 资产ID列表，必填（请求体）
     * @returns 删除结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjscgdzcnew
     */
    deleteFixedAsset(params: DeleteFixedAssetParams): Promise<DeleteFixedAssetResult> {
      return client.request<DeleteFixedAssetResult>({
        method: 'POST',
        path: '/accounting/asset/fixedAssetRestructure/deleteFixedAsset/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { period: params.period, ids: params.ids },
      });
    },
  };
}
