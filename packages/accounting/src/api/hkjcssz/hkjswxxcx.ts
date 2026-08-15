/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjcssz/hkjswxxcx
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjcssz/hkjswxxcx.md
 * 错误码: 文档「错误码说明」表为空（- | -），故无错误码常量。
 */

import type { ChanjetClient, RequestOptions } from '@chanjet-openapi/core';

/**
 * （外部接口）税务信息查询请求参数。
 *
 * 官方文档仅提供头部参数与 `period` 查询参数，`bookid` 为 URL 路径占位符。
 */
export interface TaxSettingQueryParams {
  /** 账套 ID，URL 路径参数 `{bookid}`，必填 */
  bookid: string | number;
  /** 期间，查询参数，必填 */
  period: string;
}

/**
 * 税务信息查询结果（`data` 字段）。
 *
 * 官方文档未提供输出参数表，以下字段均取自响应示例 JSON；因缺失必填性说明，全部标记为可选。
 */
export interface TaxSettingQueryResult {
  /** 纳税人类型枚举 */
  taxpayerTypeEnum?: string;
  /** 账套好会计 ID */
  tenantHkjId?: number;
  /** 记录 ID */
  id?: number;
  /** 税种设置列表 */
  hkjTaxTypeVOs?: TaxSettingQueryResultHkjTaxTypeVo[];
  /** 是否提示同步 */
  showSyncPrompt?: boolean;
}

/**
 * 税种设置条目。
 */
export interface TaxSettingQueryResultHkjTaxTypeVo {
  /** 账套好会计版本 ID */
  tenantHkjVersionId?: number;
  /** 税种 ID */
  taxTypeId?: number;
  /** 账套 ID */
  tenantId?: number;
  /** 记录 ID */
  id?: number;
  /** 税项设置列表 */
  taxSettingVOs?: TaxSettingQueryResultHkjTaxTypeVoTaxSettingVo[];
}

/**
 * 税项设置条目。
 */
export interface TaxSettingQueryResultHkjTaxTypeVoTaxSettingVo {
  /** 税项编码 */
  taxItemCode?: string;
  /** 账套 ID */
  tenantId?: number;
  /** 记录 ID */
  id?: number;
  /** 账套好会计税种 ID */
  tenantHkjTaxTypeId?: number;
  /** 税项取值 JSON（键值均为字符串） */
  taxItemValueJson?: Record<string, string>;
  /** 税项 ID */
  taxItemId?: number;
  /** 数值型取值 */
  numericalValue?: number;
}

/**
 * 好会计财税设置 —— 税务信息查询 API 工厂。
 *
 * @param client 好会计客户端实例
 */
export function createHkjswxxcxApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）税务信息查询。
     *
     * @param params 查询条件
     * @param params.bookid 账套 ID，URL 路径参数 `{bookid}`，必填
     * @param params.period 期间，查询参数，必填
     * @returns 税务信息，`data` 字段内容，`hkjTaxTypeVOs` 为税种设置列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjcssz/hkjswxxcx
     */
    taxSettingQuery: (params: TaxSettingQueryParams): Promise<TaxSettingQueryResult> => {
      const { bookid, period } = params;
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/accounting/outside/taxSetting/query/{bookid}',
        pathParams: { bookid },
        query: { period },
      };
      return client.request<TaxSettingQueryResult>(options);
    },
  };
}
