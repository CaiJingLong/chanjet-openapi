/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjcxzcbd
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgdzc/hkjcxzcbd.md
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/** （外部接口）查询资产变动 - 请求参数 */
export interface GetModifyEntryListParams {
  /** 账套 ID。来自请求地址路径占位符 {bookid}，文档输入参数表未单列该字段 */
  bookid: string;
  /** 固定资产编码，必填 */
  code: string;
  /** 区间，必填 */
  period: string;
}

/**
 * 资产变动记录。文档输出参数表将 data 标注为 object，但响应示例中 data 为数组（接口名含 List），
 * 故此处按数组元素建模。
 */
export interface GetModifyEntryListResultData {
  /** 修改后金额 */
  modifiedValue?: string;
  /** 创建时间 */
  createdStamp?: string;
  /** 固定资产ID */
  fixedAssetId?: string;
  /** 修改的期间 */
  modifyPeriod?: string;
  /** 修改前金额 */
  initialValue?: string;
}

/** （外部接口）查询资产变动 - 响应 data 字段（资产变动记录数组） */
export type GetModifyEntryListResult = GetModifyEntryListResultData[];

/**
 * 本接口文档未提供错误码说明表。
 */

/** （外部接口）查询资产变动 */
export function createHkjcxzcbdApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）查询资产变动。
     *
     * @param params 请求参数
     * @param params.bookid 账套 ID，必填（路径参数）
     * @param params.code 固定资产编码，必填（请求体）
     * @param params.period 区间，必填（请求体）
     * @returns 资产变动记录数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjcxzcbd
     */
    getModifyEntryList(params: GetModifyEntryListParams): Promise<GetModifyEntryListResult> {
      return client.request<GetModifyEntryListResult>({
        method: 'POST',
        path: '/accounting/asset/FixedAsset/outside/getModifyEntryList/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { code: params.code, period: params.period },
      });
    },
  };
}
