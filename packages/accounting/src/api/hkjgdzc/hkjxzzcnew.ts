/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjxzzcnew
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgdzc/hkjxzzcnew.md
 */
import type { ChanjetClient } from '../../client.js';

/** (外部接口-新版资产) 新增资产 - 请求参数 */
export interface AddFixedAssetParams {
  /** 账套 ID，必填（路径参数） */
  bookid: string;
  /** 资产编码，必填 */
  code: string;
  /** 资产名称，必填 */
  name: string;
  /** 资产属性 10001 ：固定资产 10002 ：无形资产 10003 ：待摊费用，必填 */
  fixedAssetArchivesAttributeId: number;
  /** 资产类别ID，必填 */
  fixedAssetTypeId: number;
  /** 费用科目ID，可选 */
  expenseGlAccountId?: number;
  /** 折旧科目ID，可选 */
  depnGlAccountId?: number;
  /** 数量，可选 */
  quantity?: string;
  /** 规格型号，可选 */
  specNo?: string;
  /** 折旧方法 STRAIGHT_LINE：年限平均 DOUBLE_DECLINING：双倍余额 NONE：不提折旧，必填 */
  depnPatternEnum: string;
  /** 预计使用年限，必填 */
  usefulLifeMonthsCnt: number;
  /** 原值，必填 */
  baseOriginalAmount: string;
  /** 期初累计折旧 注：不填写或者和本月折旧都为0 系统会自动计算，可选 */
  baseOpenningDepnAmount?: string;
  /** 本月折旧 注：不填写或者和期初累计折旧都为0 系统会自动计算，可选 */
  baseCurrentDepnAmount?: string;
  /** 购买期间，必填 */
  accuquiredPeriod: string;
  /** 录入期间，必填 */
  entryPeriod: string;
  /** 残值率，必填。参数表为 string，请求示例为数字 */
  salvageValuePct: string;
  /** 存放地点，可选 */
  place?: string;
  /** 员工ID，可选 */
  bizEmployeeId?: number;
  /** 部门ID，可选 */
  departmentId?: number;
}

/** (外部接口-新版资产) 新增资产 - 响应 data 字段（integer，资产ID） */
export type AddFixedAssetResult = number;

/**
 * 本接口文档未提供错误码说明表。
 */

/** (外部接口-新版资产) 新增资产 */
export function createHkjxzzcnewApi(client: ChanjetClient) {
  return {
    /**
     * (外部接口-新版资产) 新增资产。
     *
     * @param params 请求参数
     * @param params.bookid 账套 ID，必填（路径参数）
     * @param params.code 资产编码，必填（请求体）
     * @param params.name 资产名称，必填（请求体）
     * @param params.fixedAssetArchivesAttributeId 资产属性（10001 固定资产/10002 无形资产/10003 待摊费用），必填（请求体）
     * @param params.fixedAssetTypeId 资产类别ID，必填（请求体）
     * @param params.expenseGlAccountId 费用科目ID，可选（请求体）
     * @param params.depnGlAccountId 折旧科目ID，可选（请求体）
     * @param params.quantity 数量，可选（请求体）
     * @param params.specNo 规格型号，可选（请求体）
     * @param params.depnPatternEnum 折旧方法（STRAIGHT_LINE/DOUBLE_DECLINING/NONE），必填（请求体）
     * @param params.usefulLifeMonthsCnt 预计使用年限，必填（请求体）
     * @param params.baseOriginalAmount 原值，必填（请求体）
     * @param params.baseOpenningDepnAmount 期初累计折旧（不填写或与本月折旧均为 0 时系统自动计算），可选（请求体）
     * @param params.baseCurrentDepnAmount 本月折旧（不填写或与期初累计折旧均为 0 时系统自动计算），可选（请求体）
     * @param params.accuquiredPeriod 购买期间，必填（请求体）
     * @param params.entryPeriod 录入期间，必填（请求体）
     * @param params.salvageValuePct 残值率，必填（请求体）
     * @param params.place 存放地点，可选（请求体）
     * @param params.bizEmployeeId 员工ID，可选（请求体）
     * @param params.departmentId 部门ID，可选（请求体）
     * @returns 资产ID
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgdzc/hkjxzzcnew
     */
    addFixedAsset(params: AddFixedAssetParams): Promise<AddFixedAssetResult> {
      return client.request<AddFixedAssetResult>({
        method: 'POST',
        path: '/accounting/asset/fixedAssetRestructure/addFixedAsset/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          code: params.code,
          name: params.name,
          fixedAssetArchivesAttributeId: params.fixedAssetArchivesAttributeId,
          fixedAssetTypeId: params.fixedAssetTypeId,
          expenseGlAccountId: params.expenseGlAccountId,
          depnGlAccountId: params.depnGlAccountId,
          quantity: params.quantity,
          specNo: params.specNo,
          depnPatternEnum: params.depnPatternEnum,
          usefulLifeMonthsCnt: params.usefulLifeMonthsCnt,
          baseOriginalAmount: params.baseOriginalAmount,
          baseOpenningDepnAmount: params.baseOpenningDepnAmount,
          baseCurrentDepnAmount: params.baseCurrentDepnAmount,
          accuquiredPeriod: params.accuquiredPeriod,
          entryPeriod: params.entryPeriod,
          salvageValuePct: params.salvageValuePct,
          place: params.place,
          bizEmployeeId: params.bizEmployeeId,
          departmentId: params.departmentId,
        },
      });
    },
  };
}
