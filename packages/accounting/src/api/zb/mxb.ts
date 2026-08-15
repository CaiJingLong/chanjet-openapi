/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/zb/mxb
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/zb/mxb.md
 */

import type { ChanjetClient } from '@chanjet-openapi/core';

/** 明细账分页查询（GET queryPaging）查询参数。 */
export type QueryPagingParams = {
  /** 查询条件json串，必填 */
  queryParam: string;
  /** 每页数量，必填 */
  pageSize: string;
  /** 页码，必填 */
  pageCount: string;
  /** 明细账类型：0:标准 1:数量金额 ,2:外币金额,3外币数量，必填 */
  subsidiaryTag: string;
  /** 开始期间，必填 */
  startPeriod: string;
  /** 结束期间，必填 */
  endPeriod: string;
  /** 开始科目编码（与科目id两者必须传一个），必填 */
  startGlAccountCode: string;
  /** 结束科目编码（与科目id两者必须传一个），必填 */
  endGlAccountCode: string;
  /** 只显示末级 */
  onlyDisplayLeaf?: boolean;
  /** 开始科目级次 */
  startTreeLevel?: string;
  /** 结束科目级次 */
  endTreeLevel?: string;
  /** 显示禁用科目 */
  displayDisableGlAccount?: boolean;
  /** 显示对方科目 */
  displayReverseGlAccount?: boolean;
  /** 显示对方科目全称 */
  reverseLongName?: boolean;
  /** 无发生隐藏本月合计本年年累计 */
  hideEmpty?: boolean;
  /** 摘要 */
  comments?: string;
  /** 开始日期 */
  startDate?: string;
  /** 结束日期 */
  endDate?: string;
  /** 是否科目辅助明细账查询（如果为true返回结果增加assistantTypeList,为当前科目关联的辅助核算类型） */
  queryWithAssistant?: boolean;
  /** 科目辅助明细账辅助核算条件 */
  assistants?: string;
  /** 是否是辅助核算 */
  isGlSubAccount?: boolean;
  /** 开始辅助项 */
  startAssistant?: string;
  /** 结束辅助项 */
  endAssistant?: string;
  /** 查询类型：simple:单科目查询（起止科目编码相同）；exact:多科目范围查询（起止科目范围） */
  queryType?: string;
  /** 显示辅助核算：当辅助核算的时候，如果要显示dynamicColumn信息，需要在查询中新增 "showAssistant":true */
  showAssistant?: boolean;
};

/** 明细账分页查询结果中的行数据。 */
export type QueryPagingResultData = {
  /** 本币借方金额 */
  basePostedDr?: string;
  /** 本币贷方金额 */
  basePostedCr?: string;
  /** 本币期末余额 */
  baseEndingBalance?: string;
  /** 外币借方金额 */
  postedDr?: string;
  /** 外贷方金额 */
  postedCr?: string;
  /** 外币期末余额 */
  endingBalance?: string;
  /** 贷方数量 */
  postedCrQty?: string;
  /** 借方数量 */
  postedDrQty?: string;
  /** 期末数量 */
  endingQty?: string;
  /** 贷方本币单价 */
  basePostedCrPrice?: string;
  /** 借方本币单价 */
  basePostedDrPrice?: string;
  /** 期末单价 */
  baseEndingPrice?: string;
  /** 摘要 */
  comments?: string;
  /** 余额方向 1：借 -1：贷 0：平 */
  drCrDirection?: string;
  /** 汇率 */
  exchangeRate?: string;
  /** 期间 */
  period?: string;
  /** 科目编码 */
  glAccountCode?: string;
  /** 科目id */
  glAccountId?: number;
  /** 科目全称 */
  glAccountLongName?: string;
  /** 科目名称 */
  glAccountName?: string;
  /** 单位 */
  uomName?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 辅助核算编码 */
  assistantCode?: string;
  /** 辅助核算名称 */
  assistantName?: string;
  /** 辅助核算规格型号 */
  assistantSpecNo?: string;
  /** 辅助核算表头map */
  assistantMap?: string;
};

/**
 * 明细账分页查询结果（扁平结构，无 code/data/successful 外壳，data 为行数组且与 totalCount 等同级）。
 *
 * 文档勘误：输出表 totalCount 声明 string、响应示例为数字；dynamicColumn 声明 array<string>、
 * 响应示例为对象数组；data 声明 array<string>、响应示例为对象数组，以响应示例为准；
 * 响应示例另含 endingPrice/groupCount/id/leaf/oppositeGlAccountName/postedCrPrice/
 * postedDrPrice/profitSubject/profitVoucher 等未列入输出表的字段。
 */
export type QueryPagingResult = {
  /** 参数表类型为 array<string>，响应示例为对象数组，以响应示例为准 */
  data?: QueryPagingResultData[];
  /** 总数 */
  totalCount?: string;
  /** 辅助核算类型 */
  assistantTypeList?: string[];
  /** 辅助核算列，key为列名称，value为取值字段，显示辅助核算条件下使用 */
  dynamicColumn?: string[];
};

/** 序时账分页查询（GET query）查询参数。 */
export type QueryParams = {
  /** 文档未提供说明，必填 */
  queryParam: object;
};

/** 序时账分页查询结果中的行数据。 */
export type QueryResultData = {
  /** 凭证分类：包括记账凭证和收付转凭证 */
  acctgTransCategoryId?: number;
  /** 凭证编号 */
  acctgTransCode?: string;
  /** 凭证id */
  acctgTransId?: number;
  /** 贷方金额 */
  basePostedCr?: string;
  /** 借方金额 */
  basePostedDr?: string;
  /** 凭证创建日期 */
  bizDate?: string;
  /** 摘要 */
  comments?: string;
  /** 客户 */
  custId?: number;
  /** 部门编码 */
  departmentCode?: number;
  /** 部门id */
  departmentId?: number;
  /** 名称 */
  departmentName?: string;
  /** 员工id */
  employeeId?: number;
  /** 科目 */
  glAccountCode?: string;
  /** 科目id */
  glAccountId?: number;
  /** 科目别名 */
  glAccountLongName?: string;
  /** 科目名称 */
  glAccountName?: string;
  /** 辅助核算id */
  glSubAccountId?: number;
  /** 期间 */
  period?: string;
  /** 发送额 */
  posted?: string;
  /** 贷方数量 */
  postedCrQty?: string;
  /** 数量 */
  postedQty?: string;
  /** 辅助核算存货 */
  productId?: number;
  /** 项目 */
  projectId?: number;
  /** 小计行 */
  sumLine?: boolean;
  /** 供应商 */
  vendorId?: number;
  /** 合计行 */
  totalLine?: boolean;
};

/** 序时账分页查询结果。 */
export type QueryResult = {
  /** 文档未提供说明 */
  data?: QueryResultData[];
  /** 返回查询集合个数 */
  totalCount?: number;
};

/** 科目辅助明细账（新）（POST queryGlSubDetail）请求体。 */
export type QueryGlSubDetailParams = {
  /** 开始期间 */
  startPeriod?: string;
  /** 文档未提供说明（文档标注必填） */
  pageCount: number;
  /** 开始级次 */
  startTreeLevel?: number;
  /** 结束期间 */
  endPeriod?: string;
  /** 包含禁用 */
  containsDisable?: boolean;
  /** 辅助核算 */
  queryItemData?: QueryGlSubDetailParamsQueryItemData;
  /** 结束级次 */
  endTreeLevel?: number;
  /** 科目Id */
  glAccountId?: number;
  /** 文档未提供说明（文档标注必填） */
  pageSize: number;
  /** 默认[1,2,3,4,5] */
  typeIdList?: string[];
  /** 文档未提供说明 */
  showSubInfo?: boolean;
};

/** 科目辅助明细账（新）请求体中的辅助核算条件。 */
export type QueryGlSubDetailParamsQueryItemData = {
  /** 项目 */
  project_id?: string[];
  /** 部门 */
  department_id?: string[];
  /** 文档未提供说明 */
  product_id?: string[];
  /** 文档未提供说明 */
  cust_id?: string[];
};

/** 科目辅助明细账（新）结果数据项。 */
export type QueryGlSubDetailResultDataList = {
  /** 文档未提供说明 */
  glAccountName?: string;
  /** 文档未提供说明 */
  postedDrPrice?: number;
  /** 文档未提供说明 */
  glAccountParentId?: number;
  /** 文档未提供说明 */
  drCrDirection?: string;
  /** 文档未提供说明 */
  glAccountId_id?: number;
  /** 文档未提供说明 */
  postedPrice?: number;
  /** 文档未提供说明 */
  postedDr?: number;
  /** 文档未提供说明 */
  productName?: string;
  /** 文档未提供说明 */
  endingQty?: number;
  /** 文档未提供说明 */
  exchangeRate?: number;
  /** 文档未提供说明 */
  glAccountLongName?: string;
  /** 文档未提供说明 */
  baseEndingBalance?: number;
  /** 文档未提供说明 */
  basePostedPrice?: number;
  /** 文档未提供说明 */
  period?: string;
  /** 文档未提供说明 */
  productId?: number;
  /** 文档未提供说明 */
  glAccountId_code?: string;
  /** 文档未提供说明 */
  glAccountId_parentId?: number;
  /** 文档未提供说明 */
  postedCr?: number;
  /** 文档未提供说明 */
  endingDrBalance?: number;
  /** 文档未提供说明 */
  assistantInfoVOList?: QueryGlSubDetailResultDataListAssistantInfoVOList[];
  /** 文档未提供说明 */
  baseEndingCrBalance?: number;
  /** 文档未提供说明 */
  glAccountId_longName?: string;
  /** 文档未提供说明 */
  basePostedDr?: number;
  /** 文档未提供说明 */
  projectName?: string;
  /** 文档未提供说明 */
  projectId?: number;
  /** 文档未提供说明 */
  glAccountCode?: string;
  /** 文档未提供说明 */
  basePostedCrPrice?: number;
  /** 文档未提供说明 */
  baseEndingPrice?: number;
  /** 文档未提供说明 */
  postedCrQty?: number;
  /** 文档未提供说明 */
  endingBalance?: number;
  /** 文档未提供说明 */
  glAccountId?: number;
  /** 文档未提供说明 */
  endingPrice?: number;
  /** 文档未提供说明 */
  isTotalRow?: boolean;
  /** 文档未提供说明 */
  basePostedDrPrice?: number;
  /** 文档未提供说明 */
  postedDrQty?: number;
  /** 文档未提供说明 */
  glAccountId_name?: string;
  /** 文档未提供说明 */
  projectCode?: string;
  /** 文档未提供说明 */
  basePostedCr?: number;
  /** 文档未提供说明 */
  custId?: number;
  /** 文档未提供说明 */
  glAccountFirstName?: string;
  /** 文档未提供说明 */
  direction?: string;
  /** 文档未提供说明 */
  endingExchangeRate?: number;
  /** 文档未提供说明 */
  postedCrPrice?: number;
  /** 文档未提供说明 */
  comments?: string;
  /** 文档未提供说明 */
  baseEndingDrBalance?: number;
  /** 文档未提供说明 */
  custName?: string;
  /** 文档未提供说明 */
  endingCrBalance?: number;
  /** 文档未提供说明 */
  custCode?: string;
  /** 文档未提供说明 */
  productCode?: string;
  /** 文档未提供说明 */
  currencyCode?: string;
};

/** 科目辅助明细账（新）结果中的辅助核算信息项。 */
export type QueryGlSubDetailResultDataListAssistantInfoVOList = {
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
  redMap?: QueryGlSubDetailResultDataListAssistantInfoVOListRedMap;
};

/** 辅助核算信息项中的平铺关联属性映射。 */
export type QueryGlSubDetailResultDataListAssistantInfoVOListRedMap = {
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
  primaryPartyCategoryId?: QueryGlSubDetailResultDataListAssistantInfoVOListRedMapPrimaryPartyCategoryId;
  /** 文档未提供说明 */
  baseUomId?: QueryGlSubDetailResultDataListAssistantInfoVOListRedMapBaseUomId;
  /** 文档未提供说明 */
  multiUoms?: string;
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
  'custId.primaryPartyCategoryId.code'?: string;
  /** 文档未提供说明 */
  'custId.primaryPartyCategoryId.id'?: number;
  /** 文档未提供说明 */
  'productId.productTypeId.description'?: string;
  /** 文档未提供说明 */
  primaryPartyCategoryId_name?: string;
  /** 文档未提供说明 */
  parentId?: QueryGlSubDetailResultDataListAssistantInfoVOListRedMapParentId;
  /** 文档未提供说明 */
  productTypeId?: QueryGlSubDetailResultDataListAssistantInfoVOListRedMapProductTypeId;
  /** 文档未提供说明 */
  'productId.parentId.id'?: number;
  /** 文档未提供说明 */
  projectCategoryId?: QueryGlSubDetailResultDataListAssistantInfoVOListRedMapProjectCategoryId;
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
  name?: string;
  /** 文档未提供说明 */
  parentId_name?: string;
  /** 文档未提供说明 */
  'custId.primaryPartyCategoryId.name'?: string;
  /** 文档未提供说明 */
  'projectId.projectCategoryId.id'?: number;
};

/** 往来单位分类。 */
export type QueryGlSubDetailResultDataListAssistantInfoVOListRedMapPrimaryPartyCategoryId = {
  /** 文档未提供说明 */
  code?: string;
  /** 文档未提供说明 */
  name?: string;
  /** 文档未提供说明 */
  id?: number;
};

/** 基本计量单位。 */
export type QueryGlSubDetailResultDataListAssistantInfoVOListRedMapBaseUomId = {
  /** 文档未提供说明 */
  uomName?: string;
  /** 文档未提供说明 */
  id?: number;
};

/** 上级分类。 */
export type QueryGlSubDetailResultDataListAssistantInfoVOListRedMapParentId = {
  /** 文档未提供说明 */
  code?: string;
  /** 文档未提供说明 */
  name?: string;
  /** 文档未提供说明 */
  id?: number;
};

/** 存货类型。 */
export type QueryGlSubDetailResultDataListAssistantInfoVOListRedMapProductTypeId = {
  /** 文档未提供说明 */
  description?: string;
  /** 文档未提供说明 */
  id?: number;
};

/** 项目分类。 */
export type QueryGlSubDetailResultDataListAssistantInfoVOListRedMapProjectCategoryId = {
  /** 文档未提供说明 */
  id?: number;
};

/** 科目辅助明细账（新）结果。 */
export type QueryGlSubDetailResult = {
  /** 文档未提供说明 */
  dataList?: QueryGlSubDetailResultDataList[];
  /** 文档未提供说明 */
  totalCount?: number;
};

/** 明细账分页查询(传参优化post)（POST queryPagingJson）请求体。 */
export type QueryPagingJsonParams = {
  /** 查询类型 : simple */
  queryType?: string;
  /** 开始期间 */
  startPeriod?: string;
  /** 结束期间 */
  endPeriod?: string;
  /** 开始的科目code */
  startGlAccountCode?: string;
  /** 结束的科目code */
  endGlAccountCode?: string;
  /** 页数 */
  pageCount?: number;
  /** 页容量 1-500 */
  pageSize?: number;
};

/** 明细账分页查询(传参优化post)结果数据项。 */
export type QueryPagingJsonResultData = {
  /** 凭证号 */
  acctgTransCode?: string;
  /** 本币期末余额 */
  baseEndingBalance?: number;
  /** 文档未提供说明 */
  baseEndingCrBalance?: number;
  /** 文档未提供说明 */
  baseEndingDrBalance?: number;
  /** 文档未提供说明 */
  baseEndingPrice?: number;
  /** 本币贷方发生额 */
  basePostedCr?: number;
  /** 文档未提供说明 */
  basePostedCrPrice?: number;
  /** 文档未提供说明 */
  basePostedDrPrice?: number;
  /** 文档未提供说明 */
  basePostedPrice?: number;
  /** 摘要 */
  comments?: string;
  /** 文档未提供说明 */
  crMultiColumn?: object;
  /** 文档未提供说明 */
  detail?: boolean;
  /** 文档未提供说明 */
  drCrDirection?: string;
  /** 文档未提供说明 */
  drMultiColumn?: object;
  /** 文档未提供说明 */
  endMultiColumn?: object;
  /** 文档未提供说明 */
  endingCrBalance?: number;
  /** 文档未提供说明 */
  endingDrBalance?: number;
  /** 文档未提供说明 */
  endingExchangeRate?: number;
  /** 文档未提供说明 */
  endingPrice?: number;
  /** 文档未提供说明 */
  endingQty?: number;
  /** 文档未提供说明 */
  exchangeRate?: number;
  /** 科目code */
  glAccountCode?: string;
  /** 文档未提供说明 */
  glAccountFirstName?: string;
  /** 文档未提供说明 */
  glAccountId?: number;
  /** 文档未提供说明 */
  glAccountLongName?: string;
  /** 科目名称 */
  glAccountName?: string;
  /** 文档未提供说明 */
  groupCount?: number;
  /** 文档未提供说明 */
  id?: number;
  /** 文档未提供说明 */
  isTotalRow?: boolean;
  /** 文档未提供说明 */
  leaf?: boolean;
  /** 日期 */
  period?: string;
  /** 文档未提供说明 */
  postedCr?: number;
  /** 文档未提供说明 */
  postedCrPrice?: number;
  /** 文档未提供说明 */
  postedCrQty?: number;
  /** 文档未提供说明 */
  postedDr?: number;
  /** 文档未提供说明 */
  postedDrPrice?: number;
  /** 文档未提供说明 */
  postedDrQty?: number;
  /** 文档未提供说明 */
  postedPrice?: number;
  /** 文档未提供说明 */
  profitSubject?: boolean;
  /** 文档未提供说明 */
  profitVoucher?: boolean;
  /** 文档未提供说明 */
  voucherId?: number;
};

/** 明细账分页查询(传参优化post)结果。 */
export type QueryPagingJsonResult = {
  /** 文档未提供说明 */
  data?: QueryPagingJsonResultData[];
  /** 总数 */
  totalCount?: number;
};

/**
 * 账簿（明细账/序时账/科目辅助明细账/总账明细）API 模块。
 *
 * 文档未提供具体错误码说明（错误码说明表为“略”），远端失败统一抛 {@link ChanjetApiError}。
 */
export function createMxbApi(client: ChanjetClient) {
  return {
    /**
     * 明细账分页查询。
     *
     * @param bookid 账套id，必填
     * @param params 查询条件
     * @param params.queryParam 查询条件json串，必填
     * @param params.pageSize 每页数量，必填
     * @param params.pageCount 页码，必填
     * @param params.subsidiaryTag 明细账类型：0:标准 1:数量金额 ,2:外币金额,3外币数量，必填
     * @param params.startPeriod 开始期间，必填
     * @param params.endPeriod 结束期间，必填
     * @param params.startGlAccountCode 开始科目编码（与科目id两者必须传一个），必填
     * @param params.endGlAccountCode 结束科目编码（与科目id两者必须传一个），必填
     * @param params.onlyDisplayLeaf 只显示末级，可选
     * @param params.startTreeLevel 开始科目级次，可选
     * @param params.endTreeLevel 结束科目级次，可选
     * @param params.displayDisableGlAccount 显示禁用科目，可选
     * @param params.displayReverseGlAccount 显示对方科目，可选
     * @param params.reverseLongName 显示对方科目全称，可选
     * @param params.hideEmpty 无发生隐藏本月合计本年年累计，可选
     * @param params.comments 摘要，可选
     * @param params.startDate 开始日期，可选
     * @param params.endDate 结束日期，可选
     * @param params.queryWithAssistant 是否科目辅助明细账查询（如果为true返回结果增加assistantTypeList,为当前科目关联的辅助核算类型），可选
     * @param params.assistants 科目辅助明细账辅助核算条件，可选
     * @param params.isGlSubAccount 是否是辅助核算，可选
     * @param params.startAssistant 开始辅助项，可选
     * @param params.endAssistant 结束辅助项，可选
     * @param params.queryType 查询类型：simple:单科目查询（起止科目编码相同）；exact:多科目范围查询（起止科目范围），可选
     * @param params.showAssistant 显示辅助核算：当辅助核算的时候，如果要显示dynamicColumn信息，需要在查询中新增 "showAssistant":true，可选
     * @returns 明细账分页查询结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zb/mxb
     */
    async queryPaging(bookid: string, params: QueryPagingParams): Promise<QueryPagingResult> {
      // 响应为扁平结构（顶层 data 为行数组，totalCount/assistantTypeList/dynamicColumn 为同级字段），
      // 若走 client.request 会因 data 字段存在而只返回行数组，丢失同级字段，故用 requestEnvelope 取完整响应体。
      const envelope = await client.requestEnvelope<QueryPagingResult>({
        method: 'GET',
        path: '/accounting/gl/SubsidiaryLedge/queryPaging/{bookid}',
        pathParams: { bookid },
        query: { ...params },
      });
      return envelope as unknown as QueryPagingResult;
    },

    /**
     * 序时账分页查询。
     *
     * @param bookid 账套id，必填
     * @param params 查询条件
     * @param params.queryParam 文档未提供说明，必填
     * @returns 序时账分页查询结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zb/mxb
     */
    async query(bookid: string, params: QueryParams): Promise<QueryResult> {
      // 响应为扁平结构（顶层 data 为行数组，totalCount 为同级字段），走 client.request 会只返回行数组，
      // 故用 requestEnvelope 取完整响应体。
      const envelope = await client.requestEnvelope<QueryResult>({
        method: 'GET',
        path: '/accounting/gl/ChronologicBook/query/{bookid}',
        pathParams: { bookid },
        query: { queryParam: JSON.stringify(params.queryParam) },
      });
      return envelope as unknown as QueryResult;
    },

    /**
     * 科目辅助明细账（新）。
     *
     * @param bookid 账套id，必填（文档路径参数表字段名为 book-id 且类型为 integer，按 URL 占位符取 bookid）
     * @param params 查询条件
     * @param params.startPeriod 开始期间，可选
     * @param params.pageCount 文档未提供说明，必填
     * @param params.startTreeLevel 开始级次，可选
     * @param params.endPeriod 结束期间，可选
     * @param params.containsDisable 包含禁用，可选
     * @param params.queryItemData 辅助核算，可选
     * @param params.queryItemData.project_id 项目，可选
     * @param params.queryItemData.department_id 部门，可选
     * @param params.queryItemData.product_id 文档未提供说明，可选
     * @param params.queryItemData.cust_id 文档未提供说明，可选
     * @param params.endTreeLevel 结束级次，可选
     * @param params.glAccountId 科目Id，可选
     * @param params.pageSize 文档未提供说明，必填
     * @param params.typeIdList 辅助核算类型id列表，默认[1,2,3,4,5]，可选
     * @param params.showSubInfo 文档未提供说明，可选
     * @returns 科目辅助明细账结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zb/mxb
     */
    async queryGlSubDetail(
      bookid: number,
      params: QueryGlSubDetailParams,
    ): Promise<QueryGlSubDetailResult> {
      return client.request<QueryGlSubDetailResult>({
        method: 'POST',
        path: '/accounting/gl/Ledge/queryGlSubDetail/{bookid}',
        pathParams: { bookid },
        body: params,
      });
    },

    /**
     * 明细账分页查询(传参优化post)。
     *
     * @param bookid 账套id，必填（文档未列路径参数表，按 URL 占位符 {bookid} 取 string）
     * @param params 查询条件
     * @param params.queryType 查询类型 : simple，可选
     * @param params.startPeriod 开始期间，可选
     * @param params.endPeriod 结束期间，可选
     * @param params.startGlAccountCode 开始的科目code，可选
     * @param params.endGlAccountCode 结束的科目code，可选
     * @param params.pageCount 页数，可选
     * @param params.pageSize 页容量 1-500，可选
     * @returns 明细账分页查询结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zb/mxb
     */
    async queryPagingJson(
      bookid: string,
      params: QueryPagingJsonParams,
    ): Promise<QueryPagingJsonResult> {
      return client.request<QueryPagingJsonResult>({
        method: 'POST',
        path: '/accounting/gl/SubsidiaryLedge/queryPagingJson/{bookid}',
        pathParams: { bookid },
        body: params,
      });
    },
  };
}
