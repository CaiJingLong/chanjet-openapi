/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjxzxggdzc
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgdzc/hkjxzxggdzc.md
 */
import type { ChanjetClient } from '../../client.js';

/** (外部接口) 新增/修改固定资产 - 请求参数 */
export interface AddParams {
  /** 账套 ID，必填（路径参数） */
  bookid: string;
  /** 固定资产编码，必填 */
  code: string;
  /** 固定资产名称，必填 */
  name: string;
  /** 固定资产类别ID，必填。参数表为 string，请求示例为数字 */
  fixedAssetTypeId: string;
  /** 购买期间，必填 */
  accuquiredPeriod: string;
  /** 折旧方法：枚举型，包括STRAIGHT_LINE-年限平均、DOUBLE_DECLINING-双倍余额递减、NONE-不提折旧，必填 */
  depnPatternEnum: string;
  /** 原值，必填。参数表为 string，请求示例为数字 */
  baseOriginalValue: string;
  /** 使用 期限，必填。参数表为 string，请求示例为数字 */
  usefulLifeMonths: string;
  /** 残值率，必填。参数表为 string，请求示例为数字 */
  salvageValuePct: string;
  /** 费用科目，可选 */
  expenseGlAccountId?: string;
  /** 费用辅助核算项目，可选 */
  expenseGlSubAccountId?: string;
  /** 折旧科目，可选 */
  depnGlAccountId?: string;
  /** 折旧辅助核算项目，可选 */
  depnGlSubAccountId?: string;
  /** 业务员ID，可选 */
  bizEmployeeId?: string;
  /** 部门ID，可选 */
  departmentId?: string;
  /** 存放地点，可选 */
  place?: string;
  /** 规格型号，可选 */
  specNo?: string;
  /** 录入期间，可选 */
  entryPeriod?: string;
  /** 数量，可选 */
  quantity?: string;
  /** (期初累计折旧) 为空，可选 */
  baseOpenningDepnAmount?: string;
  /** 本月折旧，可选 */
  baseCurrentDepnAmount?: string;
}

/** (外部接口) 新增/修改固定资产 - 响应 data 字段（integer，返回数据） */
export type AddResult = number;

/**
 * 本接口文档未提供错误码说明表。
 */

/** (外部接口) 新增/修改固定资产 */
export function createHkjxzxggdzcApi(client: ChanjetClient) {
  return {
    /**
     * (外部接口) 新增/修改固定资产（新增资产）。
     *
     * @param params 请求参数
     * @param params.bookid 账套 ID，必填（路径参数）
     * @param params.code 固定资产编码，必填（请求体）
     * @param params.name 固定资产名称，必填（请求体）
     * @param params.fixedAssetTypeId 固定资产类别ID，必填（请求体）
     * @param params.accuquiredPeriod 购买期间，必填（请求体）
     * @param params.depnPatternEnum 折旧方法（STRAIGHT_LINE/DOUBLE_DECLINING/NONE），必填（请求体）
     * @param params.baseOriginalValue 原值，必填（请求体）
     * @param params.usefulLifeMonths 使用期限，必填（请求体）
     * @param params.salvageValuePct 残值率，必填（请求体）
     * @param params.expenseGlAccountId 费用科目，可选（请求体）
     * @param params.expenseGlSubAccountId 费用辅助核算项目，可选（请求体）
     * @param params.depnGlAccountId 折旧科目，可选（请求体）
     * @param params.depnGlSubAccountId 折旧辅助核算项目，可选（请求体）
     * @param params.bizEmployeeId 业务员ID，可选（请求体）
     * @param params.departmentId 部门ID，可选（请求体）
     * @param params.place 存放地点，可选（请求体）
     * @param params.specNo 规格型号，可选（请求体）
     * @param params.entryPeriod 录入期间，可选（请求体）
     * @param params.quantity 数量，可选（请求体）
     * @param params.baseOpenningDepnAmount 期初累计折旧（为空），可选（请求体）
     * @param params.baseCurrentDepnAmount 本月折旧，可选（请求体）
     * @returns 返回数据（资产 ID）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjxzxggdzc
     */
    add(params: AddParams): Promise<AddResult> {
      return client.request<AddResult>({
        method: 'POST',
        path: '/accounting/asset/FixedAsset/outside/add/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          code: params.code,
          name: params.name,
          fixedAssetTypeId: params.fixedAssetTypeId,
          accuquiredPeriod: params.accuquiredPeriod,
          depnPatternEnum: params.depnPatternEnum,
          baseOriginalValue: params.baseOriginalValue,
          usefulLifeMonths: params.usefulLifeMonths,
          salvageValuePct: params.salvageValuePct,
          expenseGlAccountId: params.expenseGlAccountId,
          expenseGlSubAccountId: params.expenseGlSubAccountId,
          depnGlAccountId: params.depnGlAccountId,
          depnGlSubAccountId: params.depnGlSubAccountId,
          bizEmployeeId: params.bizEmployeeId,
          departmentId: params.departmentId,
          place: params.place,
          specNo: params.specNo,
          entryPeriod: params.entryPeriod,
          quantity: params.quantity,
          baseOpenningDepnAmount: params.baseOpenningDepnAmount,
          baseCurrentDepnAmount: params.baseCurrentDepnAmount,
        },
      });
    },
  };
}
