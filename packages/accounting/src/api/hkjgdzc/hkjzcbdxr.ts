/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjzcbdxr
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgdzc/hkjzcbdxr.md
 */
import type { ChanjetClient } from '../../client.js';

/** （外部接口）资产变动写入 - 请求参数 */
export interface ChangeWriteParams {
  /** 账套 ID。来自请求地址路径占位符 {bookid}，文档输入参数表未单列该字段 */
  bookid: string;
  /** 修改属性名 baseOriginalValue，必填（查询参数） */
  propName: string;
  /**
   * 查询参数，必填（请求体）。
   * 文档参数表标注 array<string>；请求示例实际为资产变动对象数组
   * （含 modifiedValue、createdStamp、fixedAssetId、modifyPeriod、initialValue）。
   * 按参数表类型以 string 数组建模。
   */
  jsonObject: string[];
}

/** （外部接口）资产变动写入 - 响应 data 字段 */
export interface ChangeWriteResult {
  /** 内容 */
  message?: string;
}

/**
 * 本接口文档未提供错误码说明表。
 */

/** （外部接口）资产变动写入 */
export function createHkjzcbdxrApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）资产变动写入。
     *
     * @param params 请求参数
     * @param params.bookid 账套 ID，必填（路径参数）
     * @param params.propName 修改属性名 baseOriginalValue，必填（查询参数）
     * @param params.jsonObject 查询参数（资产变动数据，文档标注 string 数组），必填（请求体）
     * @returns 数据（含 message）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjzcbdxr
     */
    changeWrite(params: ChangeWriteParams): Promise<ChangeWriteResult> {
      return client.request<ChangeWriteResult>({
        method: 'POST',
        path: '/accounting/asset/FixedAsset/outside/changeWrite/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { propName: params.propName },
        body: params.jsonObject,
      });
    },
  };
}
