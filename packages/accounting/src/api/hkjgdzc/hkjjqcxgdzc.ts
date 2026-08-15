/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjjqcxgdzc
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgdzc/hkjjqcxgdzc.md
 *
 * 冲突注明：以下响应字段文档参数表标注为 string，但响应示例中为 number。
 * 按参数表以 string 建模，实际返回可能为 number：
 * - data.salvageValuePct（示例 0.05）
 * - data.baseNetValue（示例 11099）
 * - data.fixedAssetDepnEntry[].accumulatedMonths（示例 1）
 * - data.fixedAssetDepnEntry[].baseOriginalValue（示例 11111）
 * - data.fixedAssetDepnEntry[].baseOpenningDepnAmount（示例 11）
 * - data.fixedAssetDepnEntry[].baseCurrentDepnAmount（示例 1）
 * - data.fixedAssetDepnEntry[].usefulLifeMonths（示例 36）
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

export interface PreciseQueryAssetsParams {
  /** 账套 id，必填（路径参数） */
  bookid: string;
  /** 资产编码，必填（查询参数） */
  code: string;
  /** 期间，必填（查询参数） */
  period: string;
}

/** 资产类别（data.fixedAssetTypeId） */
export interface PreciseQueryAssetsResultFixedAssetTypeId {
  /** 资产类别ID */
  id?: string;
  /** 资产类别编码 */
  code?: string;
  /** 资产类别名称 */
  name?: string;
}

/** 折旧方法（data.fixedAssetDepnEntry[].depnPatternEnum） */
export interface PreciseQueryAssetsResultFixedAssetDepnEntryDepnPatternEnum {
  /** value值 */
  value?: string;
  /** 对应含义 */
  label?: string;
}

/** 固定资产折旧记录（data.fixedAssetDepnEntry 数组元素） */
export interface PreciseQueryAssetsResultFixedAssetDepnEntry {
  /** 累计折旧月份 */
  accumulatedMonths?: string;
  /** 资产原值 */
  baseOriginalValue?: string;
  /** 期初累计折旧 */
  baseOpenningDepnAmount?: string;
  /** 本月折旧合计 */
  baseCurrentDepnAmount?: string;
  /** 折旧期间 */
  depnPeriod?: string;
  /** 折旧方法 */
  depnPatternEnum?: PreciseQueryAssetsResultFixedAssetDepnEntryDepnPatternEnum;
  /** 使用期限 */
  usefulLifeMonths?: string;
}

/**
 * 辅助核算引用（项目/存货/部门/客户/商户等）。文档中这些字段结构一致（id/name/code），
 * 故抽为一个共享类型，避免逐字段重复声明。
 */
export interface PreciseQueryAssetsResultSubAccountRef {
  /** id */
  id?: string;
  /** 名称 */
  name?: string;
  /** 编码 */
  code?: string;
}

/**
 * 费用科目辅助核算的员工引用。文档中该字段编码列名为 empCode，
 * 与其它辅助核算引用的 code 不同（文档原文如此）。
 */
export interface PreciseQueryAssetsResultSubAccountEmployeeRef {
  /** id */
  id?: string;
  /** 名称 */
  name?: string;
  /** 编码 */
  empCode?: string;
}

/** 费用科目 辅助核算（data.expenseGlSubAccountId） */
export interface PreciseQueryAssetsResultExpenseGlSubAccountId {
  /** id */
  id?: string;
  /** 项目 */
  projectId?: PreciseQueryAssetsResultSubAccountRef;
  /** 存货 */
  productId?: PreciseQueryAssetsResultSubAccountRef;
  /** 部门 */
  departmentId?: PreciseQueryAssetsResultSubAccountRef;
  /** 员工（编码字段为 empCode） */
  employeeId?: PreciseQueryAssetsResultSubAccountEmployeeRef;
  /** 客户 */
  custId?: PreciseQueryAssetsResultSubAccountRef;
  /** 商户 */
  vendorId?: PreciseQueryAssetsResultSubAccountRef;
}

/** 辅助核算 累计折旧（data.depnGlSubAccountId） */
export interface PreciseQueryAssetsResultDepnGlSubAccountId {
  /** id */
  id?: string;
  /** 项目 */
  projectId?: PreciseQueryAssetsResultSubAccountRef;
  /** 存货 */
  productId?: PreciseQueryAssetsResultSubAccountRef;
  /** 部门 */
  departmentId?: PreciseQueryAssetsResultSubAccountRef;
  /** 员工（编码字段为 code） */
  employeeId?: PreciseQueryAssetsResultSubAccountRef;
  /** 客户 */
  custId?: PreciseQueryAssetsResultSubAccountRef;
  /** 商户 */
  vendorId?: PreciseQueryAssetsResultSubAccountRef;
}

/** （外部接口）精确查询固定资产 - 响应 data 字段 */
export interface PreciseQueryAssetsResult {
  /** 固定资产ID */
  id?: number;
  /** 名称 */
  name?: string;
  /** 固定资产编号 */
  code?: string;
  /** 资产类型 */
  fixedAssetTypeId?: PreciseQueryAssetsResultFixedAssetTypeId;
  /** 购买期间 */
  accuquiredPeriod?: string;
  /** 录入期间 */
  entryPeriod?: string;
  /** 残值率 */
  salvageValuePct?: string;
  /** 固定资产折旧记录 */
  fixedAssetDepnEntry?: PreciseQueryAssetsResultFixedAssetDepnEntry[];
  /** 是否有凭证 */
  hasAcctgTrans?: string;
  /** 是否可修改 */
  canUpdate?: string;
  /** 是否可清理 */
  showClean?: string;
  /** 是否可删除 */
  showRemove?: boolean;
  /** 是否可以添加固定资产变更记录 */
  canAddModify?: boolean;
  /** 原值 */
  baseNetValue?: string;
  /** 是否已清理 */
  cleaned?: boolean;
  /** 是否显示可恢复 */
  showRestore?: string;
  /** 期末累计折旧 */
  baseEndAccuDepnAmount?: string;
  /** 费用科目 辅助核算 */
  expenseGlSubAccountId?: PreciseQueryAssetsResultExpenseGlSubAccountId;
  /** 辅助核算 累计折旧 */
  depnGlSubAccountId?: PreciseQueryAssetsResultDepnGlSubAccountId;
  /** 是否成功 */
  successful?: string;
}

/**
 * 本接口文档未提供错误码说明表。
 */

/** （外部接口）精确查询固定资产 */
export function createHkjjqcxgdzcApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）精确查询固定资产。
     *
     * @param params 请求参数
     * @param params.bookid 账套 id，必填（路径参数）
     * @param params.code 资产编码，必填（查询参数）
     * @param params.period 期间，必填（查询参数）
     * @returns 固定资产数据
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjjqcxgdzc
     */
    preciseQueryAssets(params: PreciseQueryAssetsParams): Promise<PreciseQueryAssetsResult> {
      return client.request<PreciseQueryAssetsResult>({
        method: 'POST',
        path: '/accounting/asset/FixedAsset/outside/preciseQueryAssets/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { code: params.code, period: params.period },
      });
    },
  };
}
