/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/zb/kmyeb
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/zb/kmyeb.md
 */

import type { ChanjetClient } from '@chanjet-openapi/core';

/** 查询科目余额表（POST rpt）请求体。 */
export type RptParams = {
  /** 查询期间范围，必填 */
  period: string;
  /** 余额表类型，余额表类型0:标准 1:数量金额 ,2:外币金额,3外币数量；默认传"0"；必填 */
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
  /** 文档未提供说明 */
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
  /** 文档未提供说明 */
  postedUnitCrPrice?: number;
  /** 文档未提供说明 */
  glAccountName?: string;
  /** 文档未提供说明 */
  assistantName?: string;
  /** 文档未提供说明 */
  departmentCode?: string;
  /** 文档未提供说明 */
  departmentId?: number;
  /** 文档未提供说明 */
  originalInitPrice?: number;
  /** 文档未提供说明 */
  productCategoryName?: string;
  /** 文档未提供说明 */
  postedDr?: number;
  /** 文档未提供说明 */
  productName?: string;
  /** 文档未提供说明 */
  projectCategoryName?: string;
  /** 文档未提供说明 */
  endingQty?: number;
  /** 文档未提供说明 */
  multiUoms?: string;
  /** 文档未提供说明 */
  assistantNo?: string;
  /** 文档未提供说明 */
  glAccountLongName?: string;
  /** 文档未提供说明 */
  openingCrBalance?: number;
  /** 文档未提供说明 */
  departmentName?: string;
  /** 文档未提供说明 */
  productCategoryCode?: string;
  /** 文档未提供说明 */
  yearDfAccumulate?: number;
  /** 文档未提供说明 */
  yearOutQty?: number;
  /** 文档未提供说明 */
  productId?: number;
  /** 文档未提供说明 */
  postedCr?: number;
  /** 文档未提供说明 */
  endingDrBalance?: number;
  /** 文档未提供说明 */
  projectCategoryCode?: string;
  /** 文档未提供说明 */
  assistantInfoVOList?: QueryGlSubBalanceResultDataAssistantInfoVOList[];
  /** 文档未提供说明 */
  endPrice?: number;
  /** 文档未提供说明 */
  baseEndingCrBalance?: number;
  /** 文档未提供说明 */
  standardEndPrice?: number;
  /** 文档未提供说明 */
  unit?: string;
  /** 文档未提供说明 */
  yearInQty?: number;
  /** 文档未提供说明 */
  basePostedDr?: number;
  /** 文档未提供说明 */
  custVendorCategoryCode?: string;
  /** 文档未提供说明 */
  projectName?: string;
  /** 文档未提供说明 */
  projectId?: number;
  /** 文档未提供说明 */
  glAccountCode?: string;
  /** 文档未提供说明 */
  postedCrQty?: number;
  /** 文档未提供说明 */
  standardInitPrice?: number;
  /** 文档未提供说明 */
  endBException?: boolean;
  /** 文档未提供说明 */
  originalEndPrice?: number;
  /** 文档未提供说明 */
  glAccountId?: number;
  /** 文档未提供说明 */
  initPrice?: number;
  /** 文档未提供说明 */
  openingQty?: number;
  /** 文档未提供说明 */
  specNo?: string;
  /** 辅助核算信息 */
  assList?: QueryGlSubBalanceResultDataAssList[];
  /** 文档未提供说明 */
  groupKey?: string;
  /** 文档未提供说明 */
  isTotalRow?: boolean;
  /** 文档未提供说明 */
  postedDrQty?: number;
  /** 文档未提供说明 */
  productCategoryId?: number;
  /** 文档未提供说明 */
  projectCode?: string;
  /** 文档未提供说明 */
  basePostedCr?: number;
  /** 文档未提供说明 */
  custId?: number;
  /** 文档未提供说明 */
  currency?: string;
  /** 文档未提供说明 */
  baseOpeningCrBalance?: number;
  /** 文档未提供说明 */
  openingDrBalance?: number;
  /** 文档未提供说明 */
  isGroupLine?: boolean;
  /** 文档未提供说明 */
  postedUnitDrPrice?: number;
  /** 文档未提供说明 */
  baseOpeningDrBalance?: number;
  /** 文档未提供说明 */
  yearOrgJfAccumulate?: number;
  /** 文档未提供说明 */
  custVendorCategoryName?: string;
  /** 文档未提供说明 */
  baseEndingDrBalance?: number;
  /** 文档未提供说明 */
  relationId?: number;
  /** 文档未提供说明 */
  custName?: string;
  /** 文档未提供说明 */
  endingCrBalance?: number;
  /** 文档未提供说明 */
  custCode?: string;
  /** 文档未提供说明 */
  custVendorCategoryId?: number;
  /** 文档未提供说明 */
  projectCategoryId?: number;
  /** 文档未提供说明 */
  yearJfAccumulate?: number;
  /** 文档未提供说明 */
  productCode?: string;
  /** 文档未提供说明 */
  yearOrgDfAccumulate?: number;
};

/** 科目辅助余额表结果中的辅助核算信息项。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOList = {
  /** 文档未提供说明 */
  glSubAccountTypeId?: number;
  /** 文档未提供说明 */
  code?: string;
  /** 文档未提供说明 */
  glSubAccountTypeCode?: string;
  /** 文档未提供说明 */
  sequenceNum?: number;
  /** 文档未提供说明 */
  docType?: string;
  /** 文档未提供说明 */
  glSubAccountTypeField?: string;
  /** 文档未提供说明 */
  multiUoms?: string;
  /** 文档未提供说明 */
  name?: string;
  /** 文档未提供说明 */
  specNo?: string;
  /** 文档未提供说明 */
  id?: number;
  /** 文档未提供说明 */
  redMap?: QueryGlSubBalanceResultDataAssistantInfoVOListRedMap;
};

/** 辅助核算信息项中的平铺关联属性映射。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOListRedMap = {
  /** 文档未提供说明 */
  no?: string;
  /** 文档未提供说明 */
  code?: string;
  /** 文档未提供说明 */
  productTypeId_id?: number;
  /** 文档未提供说明 */
  'productId.parentId.code'?: string;
  /** 文档未提供说明 */
  specNo?: string;
  /** 文档未提供说明 */
  primaryPartyCategoryId_code?: string;
  /** 文档未提供说明 */
  'productId.productTypeId.id'?: number;
  /** 文档未提供说明 */
  'productId.baseUomId.id'?: number;
  /** 文档未提供说明 */
  primaryPartyCategoryId?: QueryGlSubBalanceResultDataAssistantInfoVOListRedMapPrimaryPartyCategoryId;
  /** 文档未提供说明 */
  baseUomId?: QueryGlSubBalanceResultDataAssistantInfoVOListRedMapBaseUomId;
  /** 文档未提供说明 */
  multiUoms?: string;
  /** 文档未提供说明 */
  partyName?: string;
  /** 文档未提供说明 */
  primaryPartyCategoryId_id?: number;
  /** 文档未提供说明 */
  id?: number;
  /** 文档未提供说明 */
  productTypeId_description?: string;
  /** 文档未提供说明 */
  'productId.baseUomId.uomName'?: string;
  /** 文档未提供说明 */
  parentId_code?: string;
  /** 文档未提供说明 */
  'departmentId.parentId.id'?: number;
  /** 文档未提供说明 */
  'custId.primaryPartyCategoryId.code'?: string;
  /** 文档未提供说明 */
  'custId.primaryPartyCategoryId.id'?: number;
  /** 文档未提供说明 */
  'productId.productTypeId.description'?: string;
  /** 文档未提供说明 */
  primaryPartyCategoryId_name?: string;
  /** 文档未提供说明 */
  'departmentId.parentId.code'?: string;
  /** 文档未提供说明 */
  parentId?: QueryGlSubBalanceResultDataAssistantInfoVOListRedMapParentId;
  /** 文档未提供说明 */
  productTypeId?: QueryGlSubBalanceResultDataAssistantInfoVOListRedMapProductTypeId;
  /** 文档未提供说明 */
  'productId.parentId.id'?: number;
  /** 文档未提供说明 */
  projectCategoryId?: QueryGlSubBalanceResultDataAssistantInfoVOListRedMapProjectCategoryId;
  /** 文档未提供说明 */
  'productId.parentId.name'?: string;
  /** 文档未提供说明 */
  baseUomId_id?: number;
  /** 文档未提供说明 */
  parentId_id?: number;
  /** 文档未提供说明 */
  baseUomId_uomName?: string;
  /** 文档未提供说明 */
  projectCategoryId_id?: number;
  /** 文档未提供说明 */
  'departmentId.parentId.name'?: string;
  /** 文档未提供说明 */
  name?: string;
  /** 文档未提供说明 */
  parentId_name?: string;
  /** 文档未提供说明 */
  'custId.primaryPartyCategoryId.name'?: string;
  /** 文档未提供说明 */
  'projectId.projectCategoryId.id'?: number;
};

/** 往来单位分类。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOListRedMapPrimaryPartyCategoryId = {
  /** 文档未提供说明 */
  code?: string;
  /** 文档未提供说明 */
  name?: string;
  /** 文档未提供说明 */
  id?: number;
};

/** 基本计量单位。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOListRedMapBaseUomId = {
  /** 文档未提供说明 */
  uomName?: string;
  /** 文档未提供说明 */
  id?: number;
};

/** 上级分类。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOListRedMapParentId = {
  /** 文档未提供说明 */
  code?: string;
  /** 文档未提供说明 */
  name?: string;
  /** 文档未提供说明 */
  id?: number;
};

/** 存货类型。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOListRedMapProductTypeId = {
  /** 文档未提供说明 */
  description?: string;
  /** 文档未提供说明 */
  id?: number;
};

/** 项目分类。 */
export type QueryGlSubBalanceResultDataAssistantInfoVOListRedMapProjectCategoryId = {
  /** 文档未提供说明 */
  id?: number;
};

/** 科目辅助余额表结果中的辅助核算信息（assList）。 */
export type QueryGlSubBalanceResultDataAssList = {
  /** 文档未提供说明 */
  no?: string;
  /** 文档未提供说明 */
  name?: string;
  /** 文档未提供说明 */
  measureUnit?: string;
  /** 文档未提供说明 */
  specNo?: string;
  /** 文档未提供说明 */
  id?: number;
  /** 文档未提供说明 */
  sort?: number;
  /** 文档未提供说明 */
  type?: string;
};

/** 科目辅助余额表结果。 */
export type QueryGlSubBalanceResult = {
  /** 文档未提供说明 */
  hasQtyAccunting?: boolean;
  /** 文档未提供说明 */
  hasCurrencyAccounting?: boolean;
  /** 文档未提供说明 */
  data?: QueryGlSubBalanceResultData[];
  /** 文档未提供说明 */
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
     * @param params.type 余额表类型，余额表类型0:标准 1:数量金额 ,2:外币金额,3外币数量；默认传"0"；必填
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
     * @param params.queryItemData 文档未提供说明，可选
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
