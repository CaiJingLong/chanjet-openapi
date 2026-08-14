/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/zb/kmyeb
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/zb/kmyeb.md
 */

import type { ChanjetClient } from '../../client.js';

/** 查询科目余额表（POST rpt）请求体。 */
export type RptParams = {
  /** 查询期间范围，必填 */
  period: string;
  /** 余额表类型，余额表类型0:标准 1:数量金额 2:外币金额 3:外币数量；默认传"0"；必填 */
  type: string;
  /** 是否显示辅助核算 */
  showAssistant?: boolean;
  /** 是否显示隐藏科目 */
  showHidden?: boolean;
  /** 是否显示本年累计 */
  showYearAcc?: boolean;
  /** 是否只显示末级 */
  onlyShowLeaf?: boolean;
  /** 查询起始科目编码（需要是有效的科目编码），范围与glAccountCode传一个，必填 */
  startGlAccountCode: string;
  /** 查询结束科目编码（包含下级科目，比如1001，包含100101等下级科目），必填 */
  endGlAccountCode: string;
  /** 科目条件传glAccountCode为单科目查询，传startGlAccountCode和endGlAccountCode为科目范围查询，两者不能同时存在 */
  glAccountCode?: string;
  /** 显示无余额无发生科目 */
  showEmptyRow?: boolean;
};

/** 查询科目余额表结果中的行数据。 */
export type RptResultItem = {
  /** 返回行id */
  id?: string;
  /** 期间 */
  period?: string;
  /** 科目类型 */
  glAccountType?: string;
  /** 科目编码 */
  glAccountCode?: string;
  /** 科目id */
  glAccountId?: number;
  /** 科目名称 */
  glAccountName?: string;
  /** 期初余额 */
  baseOpeningBalance?: string;
  /** 期末余额 */
  baseEndingBalance?: string;
  /** 原币期初余额 */
  openingBalance?: string;
  /** 原币期末余额 */
  endingBalance?: string;
  /** 贷方余额 */
  baserndingcrBalance?: string;
  /** 借方余额 */
  baseEndingDrBalance?: string;
  /** 借方期初余额 */
  baseOpeningDrBalance?: string;
  /** 贷方期初余额 */
  baseOpeningCrBalance?: string;
  /** 借方原币期初余额 */
  openingDrBalance?: string;
  /** 借方原币期末余额 */
  endingDrBalance?: string;
  /** 贷方原币期末余额 */
  endingCrBalance?: string;
  /** 本期借方发生额 */
  currentPeriodDrBalance?: string;
  /** 本期贷方发生额 */
  currentPeriodCrBalance?: string;
  /** 期初数量 */
  openingQty?: string;
  /** 期末数量 */
  endingQty?: string;
  /** 期初单价 */
  initUnitPrice?: string;
  /** 期末单价 */
  endUnitPrice?: string;
  /** 入库数量 */
  currentPeriodInQty?: string;
  /** 出库数量 */
  currentPeriodOutQty?: string;
  /** 单位 */
  unit?: string;
  /** 外币单位 */
  currency?: string;
  /** 是否是分类小计行 */
  isSumLine?: boolean;
  /** 是否是合计行 */
  isTotalLine?: boolean;
  /** 是否是辅助核算数据行 */
  isSubAccount?: boolean;
  /** 是否是末级 */
  leaf?: boolean;
  /** 有辅助核算 */
  hasAssistantAccount?: boolean;
  /** 本年累计贷方金额 */
  yearDfAccumulate?: string;
  /** 本年累计贷方金额原币 */
  yearDfAccumulateOrg?: string;
  /** 本年累计借方数量 */
  yearInQtyAccumulate?: string;
  /** 本年累计借方金额 */
  yearJfAccumulate?: string;
  /** 本年累计借方金额原币 */
  yearJfAccumulateOrg?: string;
  /** 本年累计贷方数量 */
  yearOutQtyAccumulate?: string;
};

/** 查询科目余额表结果（文档输出参数表仅列行字段，无响应示例，data 按余额表行数组推断）。 */
export type RptResult = RptResultItem[];

/** 科目辅助余额表（POST queryGlSubBalance）请求体。 */
export type QueryGlSubBalanceParams = {
  /** 期间202109-202109，必填 */
  period: string;
  /** 类型，默认0，必填 */
  glSubAccountTypeId: number;
  /** 显示本年累计 */
  showYearAmount?: boolean;
  /** 辅助核算查询条件 */
  queryItemData?: QueryGlSubBalanceParamsQueryItemData;
  /** 科目Id */
  glAccountId?: number;
};

/** 科目辅助余额表请求体中的辅助核算查询条件。 */
export type QueryGlSubBalanceParamsQueryItemData = {
  /** 项目ID */
  project_id?: string[];
  /** 客户Id */
  cust_id?: string[];
};

/** 科目辅助余额表结果数据项。 */
export type QueryGlSubBalanceResultData = {
  /** 贷方单价 */
  postedUnitCrPrice?: number;
  /** 科目名称 */
  glAccountName?: string;
  /** 辅助核算名称 */
  assistantName?: string;
  /** 部门编码 */
  departmentCode?: string;
  /** 部门id */
  departmentId?: number;
  /** 原币期初单价 */
  originalInitPrice?: number;
  /** 存货分类名称 */
  productCategoryName?: string;
  /** 借方发生额 */
  postedDr?: number;
  /** 存货名称 */
  productName?: string;
  /** 项目分类名称 */
  projectCategoryName?: string;
  /** 期末数量 */
  endingQty?: number;
  /** 多计量单位 */
  multiUoms?: string;
  /** 辅助核算编号 */
  assistantNo?: string;
  /** 科目全称 */
  glAccountLongName?: string;
  /** 贷方期初余额 */
  openingCrBalance?: number;
  /** 部门名称 */
  departmentName?: string;
  /** 存货分类编码 */
  productCategoryCode?: string;
  /** 本年累计贷方金额 */
  yearDfAccumulate?: number;
  /** 本年累计贷方数量 */
  yearOutQty?: number;
  /** 存货id */
  productId?: number;
  /** 贷方发生额 */
  postedCr?: number;
  /** 借方期末余额 */
  endingDrBalance?: number;
  /** 项目分类编码 */
  projectCategoryCode?: string;
  /** 辅助核算信息 */
  assistantInfoVOList?: QueryGlSubBalanceResultDataAssistantInfoVOList[];
  /** 期末单价 */
  endPrice?: number;
  /** 本币贷方期末余额 */
  baseEndingCrBalance?: number;
  /** 标准期末单价 */
  standardEndPrice?: number;
  /** 单位 */
  unit?: string;
  /** 本年累计入库数量 */
  yearInQty?: number;
  /** 本币借方发生额 */
  basePostedDr?: number;
  /** 客户供应商分类编码 */
  custVendorCategoryCode?: string;
  /** 项目名称 */
  projectName?: string;
  /** 项目id */
  projectId?: number;
  /** 科目编码 */
  glAccountCode?: string;
  /** 贷方数量 */
  postedCrQty?: number;
  /** 标准期初单价 */
  standardInitPrice?: number;
  /** 期末异常 */
  endBException?: boolean;
  /** 原币期末单价 */
  originalEndPrice?: number;
  /** 科目id */
  glAccountId?: number;
  /** 期初单价 */
  initPrice?: number;
  /** 期初数量 */
  openingQty?: number;
  /** 规格型号 */
  specNo?: string;
  /** 辅助核算信息 */
  assList?: QueryGlSubBalanceResultDataAssList[];
  /** 分组键 */
  groupKey?: string;
  /** 合计行 */
  isTotalRow?: boolean;
  /** 借方数量 */
  postedDrQty?: number;
  /** 存货分类id */
  productCategoryId?: number;
  /** 项目编码 */
  projectCode?: string;
  /** 本币贷方发生额 */
  basePostedCr?: number;
  /** 客户id */
  custId?: number;
  /** 币种 */
  currency?: string;
  /** 本币贷方期初余额 */
  baseOpeningCrBalance?: number;
  /** 借方期初余额 */
  openingDrBalance?: number;
  /** 分组行 */
  isGroupLine?: boolean;
  /** 借方单价 */
  postedUnitDrPrice?: number;
  /** 本币借方期初余额 */
  baseOpeningDrBalance?: number;
  /** 本年累计借方金额原币 */
  yearOrgJfAccumulate?: number;
  /** 客户供应商分类名称 */
  custVendorCategoryName?: string;
  /** 本币借方期末余额 */
  baseEndingDrBalance?: number;
  /** 关联id */
  relationId?: number;
  /** 客户名称 */
  custName?: string;
  /** 贷方期末余额 */
  endingCrBalance?: number;
  /** 客户编码 */
  custCode?: string;
  /** 客户供应商分类id */
  custVendorCategoryId?: number;
  /** 项目分类id */
  projectCategoryId?: number;
  /** 本年累计借方金额 */
  yearJfAccumulate?: number;
  /** 存货编码 */
  productCode?: string;
  /** 本年累计贷方金额原币 */
  yearOrgDfAccumulate?: number;
};

/** 科目辅助余额表结果中的辅助核算信息项。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOList = {
  /** 辅助核算类型id */
  glSubAccountTypeId?: number;
  /** 编码 */
  code?: string;
  /** 辅助核算类型编码 */
  glSubAccountTypeCode?: string;
  /** 顺序号 */
  sequenceNum?: number;
  /** 单据类型 */
  docType?: string;
  /** 辅助核算类型字段 */
  glSubAccountTypeField?: string;
  /** 多计量单位 */
  multiUoms?: string;
  /** 名称 */
  name?: string;
  /** 规格型号 */
  specNo?: string;
  /** id */
  id?: number;
  /** 平铺的关联实体属性 */
  redMap?: QueryGlSubBalanceResultDataAssistantInfoVOListRedMap;
};

/** 辅助核算信息项中的平铺关联属性映射。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOListRedMap = {
  /** 编号 */
  no?: string;
  /** 编码 */
  code?: string;
  /** 存货类型id */
  productTypeId_id?: number;
  /** 存货上级编码 */
  'productId.parentId.code'?: string;
  /** 规格型号 */
  specNo?: string;
  /** 往来单位分类编码 */
  primaryPartyCategoryId_code?: string;
  /** 存货类型id */
  'productId.productTypeId.id'?: number;
  /** 存货基本计量单位id */
  'productId.baseUomId.id'?: number;
  /** 往来单位分类 */
  primaryPartyCategoryId?: QueryGlSubBalanceResultDataAssistantInfoVOListRedMapPrimaryPartyCategoryId;
  /** 基本计量单位 */
  baseUomId?: QueryGlSubBalanceResultDataAssistantInfoVOListRedMapBaseUomId;
  /** 多计量单位 */
  multiUoms?: string;
  /** 往来单位名称 */
  partyName?: string;
  /** 往来单位分类id */
  primaryPartyCategoryId_id?: number;
  /** id */
  id?: number;
  /** 存货类型描述 */
  productTypeId_description?: string;
  /** 存货基本计量单位名称 */
  'productId.baseUomId.uomName'?: string;
  /** 上级编码 */
  parentId_code?: string;
  /** 部门上级id */
  'departmentId.parentId.id'?: number;
  /** 客户往来单位分类编码 */
  'custId.primaryPartyCategoryId.code'?: string;
  /** 客户往来单位分类id */
  'custId.primaryPartyCategoryId.id'?: number;
  /** 存货类型描述 */
  'productId.productTypeId.description'?: string;
  /** 往来单位分类名称 */
  primaryPartyCategoryId_name?: string;
  /** 部门上级编码 */
  'departmentId.parentId.code'?: string;
  /** 上级 */
  parentId?: QueryGlSubBalanceResultDataAssistantInfoVOListRedMapParentId;
  /** 存货类型 */
  productTypeId?: QueryGlSubBalanceResultDataAssistantInfoVOListRedMapProductTypeId;
  /** 存货上级id */
  'productId.parentId.id'?: number;
  /** 项目分类 */
  projectCategoryId?: QueryGlSubBalanceResultDataAssistantInfoVOListRedMapProjectCategoryId;
  /** 存货上级名称 */
  'productId.parentId.name'?: string;
  /** 基本计量单位id */
  baseUomId_id?: number;
  /** 上级id */
  parentId_id?: number;
  /** 基本计量单位名称 */
  baseUomId_uomName?: string;
  /** 项目分类id */
  projectCategoryId_id?: number;
  /** 部门上级名称 */
  'departmentId.parentId.name'?: string;
  /** 名称 */
  name?: string;
  /** 上级名称 */
  parentId_name?: string;
  /** 客户往来单位分类名称 */
  'custId.primaryPartyCategoryId.name'?: string;
  /** 项目项目分类id */
  'projectId.projectCategoryId.id'?: number;
};

/** 往来单位分类。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOListRedMapPrimaryPartyCategoryId = {
  /** 编码 */
  code?: string;
  /** 名称 */
  name?: string;
  /** id */
  id?: number;
};

/** 基本计量单位。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOListRedMapBaseUomId = {
  /** 计量单位名称 */
  uomName?: string;
  /** id */
  id?: number;
};

/** 上级分类。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOListRedMapParentId = {
  /** 编码 */
  code?: string;
  /** 名称 */
  name?: string;
  /** id */
  id?: number;
};

/** 存货类型。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOListRedMapProductTypeId = {
  /** 描述 */
  description?: string;
  /** id */
  id?: number;
};

/** 项目分类。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOListRedMapProjectCategoryId = {
  /** id */
  id?: number;
};

/** 科目辅助余额表结果中的辅助核算信息（assList）。 */
export type QueryGlSubBalanceResultDataAssList = {
  /** 编号 */
  no?: string;
  /** 名称 */
  name?: string;
  /** 计量单位 */
  measureUnit?: string;
  /** 规格型号 */
  specNo?: string;
  /** id */
  id?: number;
  /** 排序 */
  sort?: number;
  /** 类型 */
  type?: string;
};

/** 科目辅助余额表结果。 */
export type QueryGlSubBalanceResult = {
  /** 是否有数量核算 */
  hasQtyAccunting?: boolean;
  /** 是否有外币核算 */
  hasCurrencyAccounting?: boolean;
  /** 数据集合 */
  data?: QueryGlSubBalanceResultData[];
  /** 辅助核算类型编码集合 */
  subTypeCodes?: string[];
};

/**
 * 账簿（科目余额表/科目辅助余额表）API 模块。
 *
 * 文档未提供具体错误码说明，远端失败统一抛 {@link ChanjetApiError}。
 */
export function createKmyebApi(client: ChanjetClient) {
  return {
    /**
     * 查询科目余额表。
     *
     * @param bookid 账套ID，必填
     * @param params 查询条件
     * @param params.period 查询期间范围，必填
     * @param params.type 余额表类型0:标准 1:数量金额 2:外币金额 3:外币数量；默认传"0"；必填
     * @param params.showAssistant 是否显示辅助核算，可选
     * @param params.showHidden 是否显示隐藏科目，可选
     * @param params.showYearAcc 是否显示本年累计，可选
     * @param params.onlyShowLeaf 是否只显示末级，可选
     * @param params.startGlAccountCode 查询起始科目编码（需要是有效的科目编码），范围与glAccountCode传一个，必填
     * @param params.endGlAccountCode 查询结束科目编码（包含下级科目，比如1001，包含100101等下级科目），必填
     * @param params.glAccountCode 科目条件传glAccountCode为单科目查询，传startGlAccountCode和endGlAccountCode为科目范围查询，两者不能同时存在，可选
     * @param params.showEmptyRow 显示无余额无发生科目，可选
     * @returns 科目余额表行数组（文档输出参数表未列 data 包装字段，按余额表语义推断为行数组）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zb/kmyeb
     */
    async rpt(bookid: string, params: RptParams): Promise<RptResult> {
      return client.request<RptResult>({
        method: 'POST',
        path: '/accounting/gl/balance/rpt/{bookid}',
        pathParams: { bookid },
        body: params,
      });
    },

    /**
     * 科目辅助余额表。
     *
     * @param bookid 账套id，必填（文档未列路径参数表，按 URL 占位符 {bookid} 取 string）
     * @param params 查询条件
     * @param params.period 期间202109-202109，必填
     * @param params.glSubAccountTypeId 类型，默认0，必填
     * @param params.showYearAmount 显示本年累计，可选
     * @param params.queryItemData 辅助核算查询条件，可选
     * @param params.queryItemData.project_id 项目ID，可选
     * @param params.queryItemData.cust_id 客户Id，可选
     * @param params.glAccountId 科目Id，可选
     * @returns 科目辅助余额表结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zb/kmyeb
     */
    async queryGlSubBalance(
      bookid: string,
      params: QueryGlSubBalanceParams,
    ): Promise<QueryGlSubBalanceResult> {
      return client.request<QueryGlSubBalanceResult>({
        method: 'POST',
        path: '/accounting/gl/Ledge/queryGlSubBalance/{bookid}',
        pathParams: { bookid },
        body: params,
      });
    },
  };
}
