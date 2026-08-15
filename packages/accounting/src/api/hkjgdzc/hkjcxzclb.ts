/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjcxzclb
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgdzc/hkjcxzclb.md
 *
 * 冲突注明：以下响应字段文档参数表标注为 string，但响应示例中为 number。
 * 按参数表以 string 建模，实际返回可能为 number：
 * - aggregators.baseCurrentDepnAmount（示例 12.88）
 * - aggregators.baseLastDepnAmount（示例 1265）
 * - aggregators.baseOpenningDepnAmount（示例 1252.12）
 * - aggregators.baseOriginalAmount（示例 2450）
 * - aggregators.netWorth（示例 1185）
 * - aggregators.quantity（示例 1）
 * - data[].baseOriginalAmount（示例 2450）
 * - data[].baseCurrentDepnAmount（示例 12.88）
 * - data[].baseOpenningDepnAmount（示例 1252.12）
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/** （外部接口-新版资产）查询资产列表 - 请求参数 */
export interface QueryFixedAssetParams {
  /** 账套 ID，必填（路径参数） */
  bookid: string;
  /** 条数，必填 */
  pageSize: number;
  /** 页数，必填 */
  page: number;
  /** 查询方法默认简单查询，必填 */
  queryMethod: string;
  /** 简单查询条件 编码/名称，可选 */
  keyWords?: string;
  /** 查询期间，必填 */
  period: string;
}

/**
 * 响应正文为扁平结构，aggregators（合计）、statusControl（控制）、total、totalPages、page、pageSize
 * 等顶层字段与 data 数组同级。若走 client.request 会因 data 字段存在而只返回 data 数组，丢失其余顶层字段，
 * 故用 requestEnvelope 取完整响应体。
 */

/** 合计 */
export interface QueryFixedAssetAggregators {
  /** 本月折旧合计 */
  baseCurrentDepnAmount?: string;
  /** 期末累计折旧合计 */
  baseLastDepnAmount?: string;
  /** 期初累计折旧合计 */
  baseOpenningDepnAmount?: string;
  /** 原值合计 */
  baseOriginalAmount?: string;
  /** 是否可以还原 */
  isCleanReductionSign?: boolean;
  /** 是否可以清理 */
  isCleanSign?: boolean;
  /** 是否可以删除 */
  isDeleteSign?: boolean;
  /** 净值合计 */
  netWorth?: string;
  /** 数量 */
  quantity?: string;
}

/** 控制 */
export interface QueryFixedAssetStatusControl {
  /** 是否结转损益 */
  isCarryForwardProfitSign?: boolean;
  /** 是否已结账 */
  isClosePeriodSign?: boolean;
  /** 是否已折旧 */
  isDepreciationVoucherSign?: boolean;
}

/** 折旧方法 */
export interface QueryFixedAssetDataDepnPatternEnum {
  /** 折旧方法 */
  value?: string;
  /** 折旧方法名字 */
  label?: string;
}

/** 单条资产（data 数组元素） */
export interface QueryFixedAssetData {
  /** 费用科目id */
  expenseGlAccountIdname?: string;
  /** - */
  code?: string;
  /** 类别名称 */
  fixedAssetTypeIdname?: string;
  /** 是否可以删除 */
  isDeleteSign?: boolean;
  /** 规格型号 */
  specNo?: string;
  /** 折旧方法 */
  depnPatternEnum?: QueryFixedAssetDataDepnPatternEnum;
  /** 是否可以还原 */
  isCleanReductionSign?: boolean;
  /** 折旧科目ID */
  depnGlAccountIdcode?: string;
  /** 期末累计折旧 */
  baseLastDepnAmount?: number;
  /** 已经折旧月份 */
  accumulatedMonthsCnt?: number;
  /** 属性ID */
  fixedAssetArchivesAttributeId?: number;
  /** 资产ID */
  id?: number;
  /** 属性code */
  fixedAssetArchivesAttributeIdcode?: string;
  /** 是否可以清理 */
  isCleanSign?: boolean;
  /** 预计使用月份 */
  usefulLifeMonthsCnt?: number;
  /** 期间 */
  period?: string;
  /** 资产父类别id */
  fixedAssetTypeParentId?: number;
  /** 数量 */
  quantity?: number;
  /** 资产类别id */
  fixedAssetTypeId?: number;
  /** 折旧科目名称 */
  depnGlAccountIdname?: string;
  /** 原值 */
  baseOriginalAmount?: string;
  /** 类别编码 */
  fixedAssetTypeIdcode?: string;
  /** 残值率 */
  salvageValuePct?: number;
  /** 本月折旧 */
  baseCurrentDepnAmount?: string;
  /** 期初累计折旧 */
  baseOpenningDepnAmount?: string;
  /** 费用科目code */
  expenseGlAccountIdcode?: string;
  /** 净值 */
  netWorth?: number;
  /** 录入期间 */
  entryPeriod?: string;
  /** 资产名称 */
  name?: string;
  /** 属性名称 */
  fixedAssetArchivesAttributeIdname?: string;
  /** 购买期间 */
  accuquiredPeriod?: string;
  /** 折旧方法含义 */
  depnPatternEnumLabel?: string;
}

/** （外部接口-新版资产）查询资产列表 - 完整响应（含 data 数组及顶层分页/合计/控制字段） */
export interface QueryFixedAssetResult {
  /** 数据（资产数组） */
  data?: QueryFixedAssetData[];
  /** 合计 */
  aggregators?: QueryFixedAssetAggregators;
  /** 控制 */
  statusControl?: QueryFixedAssetStatusControl;
  /** 总条数 */
  total?: number;
  /** 总页数 */
  totalPages?: number;
  /** 当前页 */
  page?: number;
  /** 每页条数 */
  pageSize?: number;
}

/**
 * 本接口文档未提供错误码说明表。
 */

/** （外部接口-新版资产）查询资产列表 */
export function createHkjcxzclbApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口-新版资产）查询资产列表。
     *
     * @param params 请求参数
     * @param params.bookid 账套 ID，必填（路径参数）
     * @param params.pageSize 条数，必填（请求体）
     * @param params.page 页数，必填（请求体）
     * @param params.queryMethod 查询方法默认简单查询，必填（请求体）
     * @param params.keyWords 简单查询条件 编码/名称，可选（请求体）
     * @param params.period 查询期间，必填（请求体）
     * @returns 完整响应（含 data 资产数组及 aggregators、statusControl、total、totalPages、page、pageSize 等顶层字段）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjcxzclb
     */
    async queryFixedAsset(params: QueryFixedAssetParams): Promise<QueryFixedAssetResult> {
      const envelope = await client.requestEnvelope<QueryFixedAssetResult>({
        method: 'POST',
        path: '/accounting/asset/fixedAssetRestructure/queryFixedAsset/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          pageSize: params.pageSize,
          page: params.page,
          queryMethod: params.queryMethod,
          keyWords: params.keyWords,
          period: params.period,
        },
      });
      return envelope as unknown as QueryFixedAssetResult;
    },
  };
}
