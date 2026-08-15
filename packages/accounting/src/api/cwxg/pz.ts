/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/cwxg/pz.md
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/**
 * 凭证模块错误码表（文档「错误码说明」逐条收录）。
 *
 * 以下接口的「错误码说明」表为空（占位 `-`），无业务错误码：api-30311 getInitBalanceList、
 * api-31777 removeAcctgTrans、api-32600 saveAttc。
 */
export const PZ_ERROR_CODES = {
  GL_E0001: { code: 'gl.e0001', message: '与上级编码不匹配' },
  GL_E9004: { code: 'gl.e9004', message: '不能禁用已经使用的凭证类型' },
  ACCTGPLT_E1007: { code: 'acctgplt.e1007', message: '入参不合法' },
} as const;

// ---------------------------------------------------------------------------
// 1. 获取所有科目及期初数据
// ---------------------------------------------------------------------------

/**
 * 获取所有科目及期初数据入参。
 */
export interface GetInitBalanceListParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 账套id（查询参数） */
  bookId: number;
}

/**
 * 科目及期初数据项。
 */
export interface GetInitBalanceListResult {
  /** 会计制度 */
  acctgSystemId?: number;
  /** 别名 */
  aliasName?: string;
  /** 辅助项信息 */
  assistantTypes?: unknown;
  /** 期末余额：本币 */
  baseEndingBalance?: string;
  /** 期初余额：本币 */
  baseOpeningBalance?: string;
  /** 贷方金额 */
  basePostedCr?: string;
  /** 借方金额 */
  basePostedDr?: string;
  /** 是否可编辑 */
  cashItemEditable?: boolean;
  /** 不存数据库，贷方金额，默认为0 */
  dfAccumulate?: string;
  /** 不存数据库，贷方余额，默认为0 */
  dfActualBalance?: string;
  /** 贷方外币 */
  dfcurrency?: string;
  /** 无效数据不存储，临时字段 */
  dflj?: string;
  /** 无效数据不存储，临时字段 */
  dfljsl?: string;
  /** 无效数据不存储，临时字段 */
  dfljwb?: string;
  /** 科目方向 */
  drCrDirection?: string;
  /** 期末外币 */
  endcurrency?: string;
  /** 期末余额 */
  endingBalance?: string;
  /** 期末数量 */
  endingQty?: string;
  /** 科目分类 */
  glAccountClassId?: number;
  /** 科目编码 */
  glAccountCode?: string;
  /** 科目id */
  glAccountId?: number;
  /** 科目名称 */
  glAccountName?: string;
  /** 文档未提供说明 */
  hasAssistantDetail?: string;
  /** 是否外币核算 */
  hasForeignCurrency?: string;
  /** 科目id */
  id?: string;
  /** 期初外币核算 */
  initcurrency?: string;
  /** 是否有辅助核算 */
  isAssistantAccount?: string;
  /** 是否是现金等价物 */
  isCashItem?: string;
  /** 是否默认 */
  isDefault?: string;
  /** 是否是叶节点 */
  isLeaf?: string;
  /** 分类小计行 */
  isSubtotalLine?: string;
  /** 分类小计行 */
  isTotalLine?: string;
  /** 是否数量核算 */
  isaccountingNum?: string;
  /** 无效数据不存储，临时字段 */
  jfAccumulate?: string;
  /** 无效数据不存储，临时字段 */
  jfActualBalance?: string;
  /** 无效数据不存储，临时字段 */
  jfcurrency?: string;
  /** 无效数据不存储，临时字段 */
  jflj?: string;
  /** 无效数据不存储，临时字段 */
  jfljsl?: string;
  /** 无效数据不存储，临时字段 */
  jfljwb?: string;
  /** 期初外币 */
  openingBalance?: string;
  /** 期初数量 */
  openingQty?: string;
  /** 贷方外币 */
  postedCr?: string;
  /** 贷方数量 */
  postedCrQty?: string;
  /** 借方外币 */
  postedDr?: string;
  /** 借方数量 */
  postedDrQty?: string;
  /** 搜索文案 */
  searchText?: string;
  /** 状态 */
  status?: string;
  /** 科目类别编码 */
  subTypeCode?: string;
  /** 树形级别 */
  treeLevel?: string;
  /** 树型路径 */
  treePath?: string;
}

// ---------------------------------------------------------------------------
// 2. 获取凭证初始化数据
// ---------------------------------------------------------------------------

/**
 * 获取凭证初始化数据入参。
 */
export interface InitAcctgTransParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 新增凭证的期间 */
  period?: string;
  /** 新增凭证的类别 */
  acctgTransCategoryId?: number;
  /** 凭证插入点的老凭证id */
  preId?: number;
}

/**
 * 获取凭证初始化数据结果。
 */
export interface InitAcctgTransResult {
  /** 凭证期间 */
  acctgPeriod?: string;
  /** 凭证类别id */
  acctgTransCategoryId?: number;
  /** 凭证日期 */
  bizDate?: number;
  /** 凭证号 */
  code?: string;
  /** 制单人 */
  origCreatedUserName?: string;
}

// ---------------------------------------------------------------------------
// 3. 修改凭证
// ---------------------------------------------------------------------------

/**
 * 修改凭证入参。
 */
export interface ModifyAcctgTransParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 查询参数，false（文档仅给出示例值 false） */
  isInsert?: boolean;
  /** 查询参数，false（文档仅给出示例值 false） */
  isSave: boolean;
  /** 凭证类型id */
  acctgTransCategoryId: string;
  /** 期间 */
  acctgPeriod: string;
  /** 凭证编码 */
  code: string;
  /** 凭证日期 */
  bizDate: number;
  /** 凭证附件数量 */
  attachementCount?: number;
  /** 凭证分录 */
  details: ModifyAcctgTransParamsDetail[];
  /** 凭证id */
  id: number;
  /** 制单人 */
  origCreatedUserName: string;
  /** 审核人 */
  origApprovedUserName?: string;
}

/**
 * 修改凭证入参 - 凭证分录。
 */
export interface ModifyAcctgTransParamsDetail {
  /** 摘要 */
  comments?: string;
  /** 贷方数量 */
  postedCrQty?: number;
  /** 顺序号 */
  sequenceNum?: number;
  /** 辅助核算关系id */
  glSubAccountId?: number;
  /** 科目id */
  glAccountId?: number;
  /** 贷方外币 */
  postedCr?: number;
  /** 借方外币 */
  postedDr?: number;
  /** 借方数量 */
  postedDrQty?: number;
  /** 汇率 */
  exchangeRate?: number;
  /** 单价 */
  price?: number;
  /** 贷方金额 */
  basePostedCr?: number;
  /** 辅助核算关联关系对象（不传 glSubAccountId 可以通过此参数自动新增 glSubAccount） */
  glSubAccount?: ModifyAcctgTransParamsDetailGlSubAccount;
  /** 借方金额 */
  basePostedDr?: number;
}

/**
 * 修改凭证入参 - 分录 - 辅助核算关联关系对象。
 */
export interface ModifyAcctgTransParamsDetailGlSubAccount {
  /** 存货id */
  productId?: number;
  /** 部门id */
  departmentId?: number;
  /** 客户id */
  custId?: number;
  /** 供应商id */
  vendorId?: string;
  /** 员工id */
  employeeId?: number;
  /** 辅助核算关系id */
  id?: number;
  /** 项目id */
  projectId?: number;
}

// ---------------------------------------------------------------------------
// 4. 凭证列表模糊搜索
// ---------------------------------------------------------------------------

/**
 * 凭证列表模糊搜索入参。
 */
export interface AcctgTransFuzzySearchParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** query 参数 period：期间 text：模糊字段：可输入凭证号/摘要/科目/金额信息，例如 text:"凭证号" text:"摘要" text:"科目" text:"金额" pageCount：页码 pageSize：每页数量 */
  searchParam: string;
}

/**
 * 凭证列表模糊搜索结果。
 */
export interface AcctgTransFuzzySearchResult {
  /** 总数 */
  totalCount?: string;
  /** 返回结果集（参数表类型为 array<string>，但响应示例为对象数组，以示例为准） */
  result?: AcctgTransFuzzySearchResultItem[];
  /** 页码（响应示例出现，文档输出参数表未列） */
  pageCount?: number;
  /** 每页数量（响应示例出现，文档输出参数表未列） */
  pageSize?: number;
}

/**
 * 凭证列表模糊搜索结果 - 凭证项。
 */
export interface AcctgTransFuzzySearchResultItem {
  /** 凭证id */
  id?: number;
  /** 期间 */
  period?: string;
  /** 凭证日期 */
  voucherDate?: string;
  /** 凭证号 */
  voucherNo?: string;
  /** 制单人 */
  writtenPerson?: string;
  /** 审批人 */
  auditPerson?: string;
  /** 审批时间 */
  approvedDate?: string;
  /** 创建时间 */
  createdStamp?: string;
  /** 附件数 */
  attachementCount?: string;
  /** 凭证日期 */
  refBoName?: string;
  /** 凭证日期（文档原文如此；依语义当为备注） */
  comments?: string;
  /** 凭证类别（参数表类型为 string，但响应示例为对象 {name, id, longName}，以示例为准） */
  acctgTransCategoryId?: AcctgTransFuzzySearchResultItemAcctgTransCategoryId;
  /** 创建人 */
  createdUserId?: unknown;
  /** 作废人 */
  cancelUserId?: unknown;
  /** 凭证所属人 */
  ownerUserId?: unknown;
  /** 凭证明细集合（参数表类型为 array<string>，但响应示例为对象数组，以示例为准） */
  details?: AcctgTransFuzzySearchResultItemDetail[];
  /** 云审批任务id */
  bpmTaskId?: string;
  /** 来源数据ID(日记账ID) */
  refVoucherIds?: string[];
  /** 来源数据 */
  refVoucherInfo?: AcctgTransFuzzySearchResultItemRefVoucherInfo[];
}

/**
 * 凭证列表模糊搜索结果 - 凭证项 - 凭证类型。
 */
export interface AcctgTransFuzzySearchResultItemAcctgTransCategoryId {
  /** 凭证类型名称 */
  name?: string;
  /** 凭证类型全称 */
  longName?: number;
}

/**
 * 凭证列表模糊搜索结果 - 凭证项 - 凭证明细。
 */
export interface AcctgTransFuzzySearchResultItemDetail {
  /** 凭证明细-科目 */
  glAccount?: AcctgTransFuzzySearchResultItemDetailGlAccount;
  /** 凭证明细-科目外币 */
  currencyTO?: unknown;
  /** 凭证明细-外币符号 */
  symbol?: number;
  /** 凭证明细-科目计量单位 */
  baseUomTO?: number;
  /** 凭证明细-科目计量单位名称 */
  uomName?: number;
  /** 凭证明细-辅助核算 */
  assistantAccounts?: AcctgTransFuzzySearchResultItemDetailAssistantAccounts;
  /** 凭证明细-凭证 */
  masterVoucherId?: unknown;
  /** 凭证明细-借方本位币 */
  basePostedDr?: string;
  /** 凭证明细-贷方本位币 */
  basePostedCr?: string;
  /** 凭证明细-单价 */
  price?: string;
  /** 凭证明细-借方数量 */
  postedDrQty?: string;
  /** 凭证明细-贷方数量 */
  postedCrQty?: string;
  /** 凭证明细-汇率 */
  exchangeRate?: string;
  /** 凭证明细-借方原币 */
  postedDr?: string;
  /** 凭证明细-贷方原币 */
  postedCr?: string;
  /** 凭证明细-序号 */
  sequenceNum?: string;
}

/**
 * 凭证列表模糊搜索结果 - 凭证项 - 凭证明细 - 科目。
 */
export interface AcctgTransFuzzySearchResultItemDetailGlAccount {
  /** 凭证明细-科目编码 */
  code?: string;
  /** 凭证明细-科目级次 */
  treeLevel?: string;
  /** 凭证明细-科目是否外币核算 */
  hasForeignCurrency?: boolean;
  /** 凭证明细-科目是否数量核算 */
  hasQtyAccunting?: boolean;
  /** 凭证明细-科目是否辅助核算 */
  hasSubsidiaryAccounting?: boolean;
}

/**
 * 凭证列表模糊搜索结果 - 凭证项 - 凭证明细 - 辅助核算。
 */
export interface AcctgTransFuzzySearchResultItemDetailAssistantAccounts {
  /** 凭证明细-辅助核算-项目 */
  projectId?: AcctgTransFuzzySearchResultItemDetailAssistantAccountsProjectId;
  /** 凭证明细-辅助核算-客户 */
  custId?: unknown;
  /** 凭证明细-辅助核算-供应商 */
  vendorId?: unknown;
  /** 凭证明细-辅助核算-部门 */
  departmentId?: unknown;
  /** 凭证明细-辅助核算-员工 */
  employeeId?: unknown;
  /** 凭证明细-辅助核算-存货 */
  productId?: unknown;
  /** 凭证明细-辅助核算-存货规格型号 */
  specNo?: string;
  /** 凭证明细-辅助核算-存货计量单位 */
  baseUomId?: unknown;
}

/**
 * 凭证列表模糊搜索结果 - 凭证项 - 凭证明细 - 辅助核算 - 项目。
 */
export interface AcctgTransFuzzySearchResultItemDetailAssistantAccountsProjectId {
  /** 凭证明细-辅助核算-项目编码 */
  no?: string;
}

/**
 * 凭证列表模糊搜索结果 - 凭证项 - 来源数据。
 */
export interface AcctgTransFuzzySearchResultItemRefVoucherInfo {
  /** 上游单据BO名称 */
  refBoName?: string;
  /** 来源单据 */
  refVoucherId?: number;
}

// ---------------------------------------------------------------------------
// 5. 凭证打印
// ---------------------------------------------------------------------------

/**
 * 凭证打印入参。
 */
export interface PrintAcctgTransParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 来自云存储的printConfig.json */
  printStyle: string;
  /** 来自云存储的printConfig.json */
  printCount: string;
  /** 凭证id（官方类型 array，未标注元素类型；序列化为重复 query 键） */
  voucherIds: Array<string | number>;
  /** 添加封面 */
  addCover: boolean;
  /** 添加畅捷通标记 */
  addLogo: boolean;
  /** 行数（5～8） */
  rowSize: number;
  /** 左边距（默认60）左右和固定为86 */
  leftMargin: number;
  /** 右边距（默认26）左右和固定为86 */
  rightMargin: number;
  /** 上边距（A4三版默认为20，其余默认为40）A4三版上下和固定为40，其余上下和默认为80 */
  topMargin: number;
  /** 下边距（A4三版默认为20，其余默认为40）A4三版上下和固定为40，其余上下和默认为80 */
  bottomMargin: number;
}

/**
 * 凭证打印结果。
 */
export interface PrintAcctgTransResult {
  /** 凭证pdf URL */
  resultObj?: string;
}

// ---------------------------------------------------------------------------
// 6. 查询凭证期间汇总数量
// ---------------------------------------------------------------------------

/**
 * 查询凭证期间汇总数量入参。
 */
export interface CountByPeriodParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 开始期间 */
  startPeriod: string;
  /** 结束期间 */
  endPeriod: string;
}

/**
 * 查询凭证期间汇总数量结果。文档输出参数表仅列 `count`（凭证数），响应示例为期间→数量的映射对象。
 */
export interface CountByPeriodResult {
  /** 凭证数 */
  count?: string;
}

// ---------------------------------------------------------------------------
// 7. 查询凭证类别
// ---------------------------------------------------------------------------

/**
 * 查询凭证类别入参。
 */
export interface ListAcctgTransCategoryParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 启用，禁用 A:启用，I:禁用，传空查全部 */
  status?: string;
}

/**
 * 查询凭证类别结果项。
 */
export interface ListAcctgTransCategoryResult {
  /** 凭证类型编码 */
  code?: string;
  /** 名称 */
  name?: string;
  /** id */
  id?: number;
  /** 全称 */
  longName?: string;
  /** 启用，禁用 A:启用，I:禁用 */
  status?: string;
}

// ---------------------------------------------------------------------------
// 8. 凭证附件列表查询
// ---------------------------------------------------------------------------

/**
 * 凭证附件列表查询入参。
 */
export interface GetAttcListParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 凭证ID */
  acctgTransId: number;
}

/**
 * 凭证附件列表查询结果项。文档仅提供响应示例，未提供输出参数表。
 */
export interface GetAttcListResult {
  /** 附件大小 */
  attachmentSize?: string;
  /** 预览地址 */
  previewUrl?: string;
  /** 扩展数据 */
  extendData?: string;
  /** 附件后缀 */
  attachmentSuffix?: string;
  /** 附件名称 */
  attachmentName?: string;
  /** 附件id */
  id?: string;
  /** 原始地址 */
  originalUrl?: string;
}

// ---------------------------------------------------------------------------
// 9. 凭证删除
// ---------------------------------------------------------------------------

/**
 * 凭证删除入参。
 */
export interface RemoveAcctgTransParams {
  /** 账套id（路径参数）。注意：文档请求地址含 {bookid} 但未列路径参数表，按通例推断为账套id。 */
  bookid: string;
  /** 凭证id */
  acctgTransId: number;
}

// ---------------------------------------------------------------------------
// 10. （外部接口）凭证列表精确搜索
// ---------------------------------------------------------------------------

/**
 * 凭证列表精确搜索入参。
 */
export interface AcctgTransExactSearchParams {
  /** 账套id（路径参数）。注意：文档请求地址含 {bookid} 但未列路径参数表，按通例推断为账套id。 */
  bookid: string;
  /** 字符串类型, 将JSON转换成字符串（period 期间 / subjectNo 科目编码 / text / assistantType / summary 摘要 / writtenPerson 制单人 / startPeriod 开始期间 / endPeriod 结束期间 / pageCount 页码 / pageSize 每页数量） */
  searchParam: string;
}

/**
 * 凭证列表精确搜索结果。
 */
export interface AcctgTransExactSearchResult {
  /** 总数 */
  totalCount?: number;
  /** 返回结果集（参数表类型为 array<string>，但响应示例为对象数组，以示例为准） */
  result?: AcctgTransExactSearchResultItem[];
  /** 页码（响应示例出现，文档输出参数表未列） */
  pageCount?: number;
  /** 每页数量（响应示例出现，文档输出参数表未列） */
  pageSize?: number;
}

/**
 * 凭证列表精确搜索结果 - 凭证项。
 */
export interface AcctgTransExactSearchResultItem {
  /** 凭证id */
  id?: number;
  /** 期间 */
  period?: string;
  /** 凭证日期 */
  voucherDate?: string;
  /** 凭证号 */
  voucherNo?: string;
  /** 制单人 */
  writtenPerson?: string;
  /** 审批人 */
  auditPerson?: string;
  /** 审批时间 */
  approvedDate?: string;
  /** 创建时间 */
  createdStamp?: string;
  /** 附件数 */
  attachementCount?: number;
  /** 来源单据 */
  refBoName?: string;
  /** 备注 */
  comments?: string;
  /** 凭证类型（参数表类型为 string，但响应示例中为对象 {name, id, longName}，此处以参数表为准，name/longName 作为顶层字段） */
  acctgTransCategoryId?: string;
  /** 凭证类型名称 */
  name?: string;
  /** 凭证类型全称 */
  longName?: number;
  /** 创建人 */
  createdUserId?: unknown;
  /** 作废人 */
  cancelUserId?: unknown;
  /** 凭证所属人 */
  ownerUserId?: unknown;
  /** 凭证明细集合（参数表类型为 array<string>，但响应示例为对象数组，以示例为准） */
  details?: AcctgTransExactSearchResultItemDetail[];
  /** 云审批任务id */
  bpmTaskId?: string;
  /** 来源数据ID(日记账ID) */
  refVoucherIds?: string[];
  /** 来源数据 */
  refVoucherInfo?: AcctgTransExactSearchResultItemRefVoucherInfo[];
  /** 外部id */
  refVoucherId?: number;
  /** 外部编码 */
  refVoucherCode?: string;
}

/**
 * 凭证列表精确搜索结果 - 凭证项 - 凭证明细。
 */
export interface AcctgTransExactSearchResultItemDetail {
  /** 凭证明细-科目 */
  glAccount?: AcctgTransExactSearchResultItemDetailGlAccount;
  /** 凭证明细-科目外币 */
  currencyTO?: AcctgTransExactSearchResultItemDetailCurrencyTO;
  /** 凭证明细-外币符号 */
  symbol?: number;
  /** 凭证明细-科目计量单位 */
  baseUomTO?: number;
  /** 凭证明细-科目计量单位名称 */
  uomName?: number;
  /** 凭证明细-辅助核算 */
  assistantAccounts?: AcctgTransExactSearchResultItemDetailAssistantAccounts;
  /** 凭证明细-凭证 */
  masterVoucherId?: unknown;
  /** 凭证明细-借方本位币 */
  basePostedDr?: string;
  /** 凭证明细-贷方本位币 */
  basePostedCr?: string;
  /** 凭证明细-单价 */
  price?: string;
  /** 凭证明细-借方数量 */
  postedDrQty?: string;
  /** 凭证明细-贷方数量 */
  postedCrQty?: string;
  /** 凭证明细-汇率 */
  exchangeRate?: string;
  /** 凭证明细-借方原币 */
  postedDr?: string;
  /** 凭证明细-贷方原币 */
  postedCr?: string;
  /** 凭证明细-序号 */
  sequenceNum?: number;
}

/**
 * 凭证列表精确搜索结果 - 凭证项 - 凭证明细 - 科目。
 */
export interface AcctgTransExactSearchResultItemDetailGlAccount {
  /** 凭证明细-科目编码 */
  code?: string;
  /** 凭证明细-科目级次 */
  treeLevel?: number;
  /** 凭证明细-科目是否外币核算 */
  hasForeignCurrency?: boolean;
  /** 凭证明细-科目是否数量核算 */
  hasQtyAccunting?: boolean;
  /** 凭证明细-科目是否辅助核算 */
  hasSubsidiaryAccounting?: boolean;
}

/**
 * 凭证列表精确搜索结果 - 凭证项 - 凭证明细 - 科目外币。
 */
export interface AcctgTransExactSearchResultItemDetailCurrencyTO {
  /** 币别 */
  symbol?: string;
  /** 币别编码 */
  code?: string;
  /** 币别名称 */
  name?: string;
}

/**
 * 凭证列表精确搜索结果 - 凭证项 - 凭证明细 - 辅助核算。
 */
export interface AcctgTransExactSearchResultItemDetailAssistantAccounts {
  /** 凭证明细-辅助核算-项目 */
  projectId?: AcctgTransExactSearchResultItemDetailAssistantAccountsProjectId;
  /** 凭证明细-辅助核算-客户 */
  custId?: unknown;
  /** 凭证明细-辅助核算-供应商 */
  vendorId?: unknown;
  /** 凭证明细-辅助核算-部门 */
  departmentId?: unknown;
  /** 凭证明细-辅助核算-员工 */
  employeeId?: unknown;
  /** 凭证明细-辅助核算-存货 */
  productId?: unknown;
  /** 凭证明细-辅助核算-存货规格型号 */
  specNo?: string;
  /** 凭证明细-辅助核算-存货计量单位 */
  baseUomId?: unknown;
}

/**
 * 凭证列表精确搜索结果 - 凭证项 - 凭证明细 - 辅助核算 - 项目。
 */
export interface AcctgTransExactSearchResultItemDetailAssistantAccountsProjectId {
  /** 凭证明细-辅助核算-项目编码 */
  no?: string;
}

/**
 * 凭证列表精确搜索结果 - 凭证项 - 来源数据。
 */
export interface AcctgTransExactSearchResultItemRefVoucherInfo {
  /** 上游单据BO名称 */
  refBoName?: string;
  /** 来源单据 */
  refVoucherId?: number;
}

// ---------------------------------------------------------------------------
// 11. 启用凭证类别
// ---------------------------------------------------------------------------

/**
 * 启用凭证类别入参。
 */
export interface EnableCategoryParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 类别id。文档将 id 同时列于路径/请求体，但请求示例为 `?id=` 查询参数，按查询参数实现。 */
  id: string;
}

// ---------------------------------------------------------------------------
// 12. 禁用凭证类别
// ---------------------------------------------------------------------------

/**
 * 禁用凭证类别入参。
 */
export interface DisableCategoryParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 类别id。文档将其列于请求体，但请求示例为 `?id=` 查询参数，按查询参数实现。 */
  id: string;
}

// ---------------------------------------------------------------------------
// 13. 凭证批量删除
// ---------------------------------------------------------------------------

/**
 * 凭证批量删除入参。
 */
export interface BatchRemoveParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 删除集合凭证id。文档类型标注为 string，请求示例为数组，按数组实现。 */
  removeIdArray: number[];
}

// ---------------------------------------------------------------------------
// 14. 新增附件关联凭证
// ---------------------------------------------------------------------------

/**
 * 新增附件关联凭证入参。
 */
export interface SaveAttcParams {
  /** 账套id（路径参数）。注意：文档请求地址含 {bookid} 但未列路径参数表，按通例推断为账套id。 */
  bookid: string;
  /** 凭证id。文档列于请求体，但请求示例为 `?acctgTransId=` 查询参数，按查询参数实现。 */
  acctgTransId: number;
  /** 附件集合。文档请求体表仅列 acctgTransId，实际请求体为附件对象数组（见请求示例）。 */
  attachments: SaveAttcAttachment[];
}

/**
 * 新增附件关联凭证 - 附件对象。
 */
export interface SaveAttcAttachment {
  /** 附件名称 */
  attachmentName?: string;
  /** 附件大小 */
  attachmentSize?: number;
  /** 附件后缀 */
  attachmentSuffix?: string;
  /** 原始地址 */
  originalUrl?: string;
  /** 预览地址 */
  previewUrl?: string;
  /** 文档类型 */
  documentType?: string;
  /** 是否允许删除文件 */
  removeTab?: boolean;
}

// ---------------------------------------------------------------------------
// 15. 凭证批量查询
// ---------------------------------------------------------------------------

/**
 * 凭证批量查询入参。
 */
export interface GetVoucherByIdsParams {
  /** 账套id（路径参数）。注意：文档请求地址含 {bookid} 但未列路径参数表，按通例推断为账套id。 */
  bookid: string;
  /** 凭证ids。文档类型标注为 string，请求示例为数组，按数组实现。 */
  acctgTransIds: number[];
}

/**
 * 凭证批量查询结果。
 */
export interface GetVoucherByIdsResult {
  /** 凭证单据信息数组 */
  data?: GetVoucherByIdsResultData[];
  /** 是否成功 */
  success?: boolean;
}

/**
 * 凭证批量查询结果 - 凭证单据信息。
 */
export interface GetVoucherByIdsResultData {
  /** 凭证期间 */
  acctgPeriod?: string;
  /** 凭证类型 */
  acctgTransCategoryId?: number;
  /** 凭证日期 */
  bizDate?: string;
  /** 文档未给说明 */
  bizGlAccountXref?: unknown;
  /** 文档未给说明 */
  bizTypeId?: number;
  /** 文档未给说明 */
  boName?: string;
  /** 凭证号 */
  code?: string;
  /** 文档未给说明 */
  createdStamp?: string;
  /** 文档未给说明 */
  createdUserId?: number;
  /** 文档未给说明 */
  delInvoiceFlag?: boolean;
  /** 文档未给说明 */
  draftUserId?: number;
  /** 拓展属性 */
  extAttrs?: GetVoucherByIdsResultDataExtAttrs;
  /** 文档未给说明 */
  id?: number;
  /** 文档未给说明 */
  importAcctgTrans?: boolean;
  /** 文档未给说明 */
  isFinal?: boolean;
  /** 文档未给说明 */
  keepCashFlowFlag?: boolean;
  /** 文档未给说明 */
  lastUpdatedStamp?: string;
  /** 文档未给说明 */
  lastUpdatedUserId?: number;
  /** 文档未给说明 */
  origCreatedUserName?: string;
  /** 文档未给说明 */
  ownerUserId?: number;
  /** 文档未给说明 */
  refBoName?: string;
  /** 文档未给说明 */
  refVoucherCode?: string;
  /** 文档未给说明 */
  sendCalcBalanceMsg?: boolean;
  /** 文档未给说明 */
  seqNum?: number;
  /** 文档未给说明 */
  srcId?: number;
  /** 文档未给说明 */
  tenantId?: number;
  /** 文档未给说明 */
  uploadAttachmentCount?: number;
  /** 文档未给说明 */
  versionNo?: number;
  /** 文档未给说明 */
  voucherManual?: boolean;
}

/**
 * 凭证批量查询结果 - 凭证单据信息 - 拓展属性。
 */
export interface GetVoucherByIdsResultDataExtAttrs {
  /** 文档未给说明 */
  isSupervisor?: number;
  /** 文档未给说明 */
  voucherManual?: string;
  /** 文档未给说明 */
  needCheckCreaterId?: number;
  /** 文档未给说明 */
  updateAttachment?: number;
}

// ---------------------------------------------------------------------------
// 16. 查询凭证关联的单据信息
// ---------------------------------------------------------------------------

/**
 * 查询凭证关联的单据信息入参。
 */
export interface GetRefInfoByAcctgTransIdsParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 凭证ID列表 */
  acctgTransIds: string[];
}

/**
 * 查询凭证关联的单据信息结果。
 */
export interface GetRefInfoByAcctgTransIdsResult {
  /** 文档未给说明 */
  code?: string;
  /** 数据 */
  data?: GetRefInfoByAcctgTransIdsResultData[];
  /** 文档未给说明 */
  success?: boolean;
}

/**
 * 查询凭证关联的单据信息结果 - 数据项。
 */
export interface GetRefInfoByAcctgTransIdsResultData {
  /** 关联单据信息 */
  refInfos?: GetRefInfoByAcctgTransIdsResultDataRefInfo[];
  /** 凭证ID */
  acctgTransId?: number;
}

/**
 * 查询凭证关联的单据信息结果 - 数据项 - 关联单据信息。
 */
export interface GetRefInfoByAcctgTransIdsResultDataRefInfo {
  /** 单据类型CODE */
  refBoName?: string;
  /** 单据ID */
  refVoucherId?: string;
}

// ---------------------------------------------------------------------------
// 17. 凭证详情
// ---------------------------------------------------------------------------

/**
 * 凭证详情入参。
 */
export interface GetVoucherByIdParams {
  /** 账套id（路径参数）。注意：文档请求地址含 {bookid} 但未列路径参数表，按通例推断为账套id。 */
  bookid: string;
  /** 凭证id */
  voucherId: string;
}

/**
 * 凭证详情结果。
 */
export interface GetVoucherByIdResult {
  /** 结果码 : 000000成功 */
  code?: string;
  /** 数据 */
  data?: GetVoucherByIdResultData;
  /** 请求是否成功 */
  successful?: boolean;
}

/**
 * 凭证详情结果 - 数据。
 */
export interface GetVoucherByIdResultData {
  /** 凭证期间 */
  acctgPeriod?: string;
  /** 凭证类别 */
  acctgTransCategoryId?: GetVoucherByIdResultDataAcctgTransCategoryId;
  /** 附件列表 */
  attachmentList?: GetVoucherByIdResultDataAttachment[];
  /** 业务发生时间 */
  bizDate?: string;
  /** 业务类型 */
  bizTypeId?: number;
  /** bo名称 */
  boName?: string;
  /** 凭证code */
  code?: string;
  /** 创建人 */
  createdUserId?: GetVoucherByIdResultDataUser;
  /** 凭证分录列表 */
  details?: GetVoucherByIdResultDataDetail[];
  /** 拓展属性 */
  extAttrs?: GetVoucherByIdResultDataExtAttrs;
  /** 凭证id */
  id?: number;
  /** 期末结转完成标记 */
  isFinal?: boolean;
  /** 最后编辑人 */
  lastModifiedUserId?: GetVoucherByIdResultDataUser;
  /** 最后修改人 */
  lastUpdatedUserId?: GetVoucherByIdResultDataUser;
  /** 单据所有人id */
  ownerUserId?: GetVoucherByIdResultDataUser;
  /** 凭证来源bo名称 */
  refBoName?: string;
  /** 凭证来源单据code */
  refVoucherCode?: string;
  /** 凭证序号 */
  seqNum?: number;
  /** 上传附件数 */
  uploadAttachmentCount?: number;
}

/**
 * 凭证详情结果 - 数据 - 凭证类别。
 */
export interface GetVoucherByIdResultDataAcctgTransCategoryId {
  /** 凭证类别id */
  id?: number;
  /** 凭证类别名称 */
  name?: string;
}

/**
 * 凭证详情结果 - 数据 - 附件。
 */
export interface GetVoucherByIdResultDataAttachment {
  /** 附件名称 */
  attachmentName?: string;
  /** 附件大小 */
  attachmentSize?: number;
  /** 附件格式 */
  attachmentSuffix?: string;
  /** 附件类型 */
  attachmentTypeId?: number;
  /** 创建时间 */
  createdStamp?: string;
  /** 创建人 */
  createdUserId?: number;
  /** 附件id */
  id?: number;
  /** 最后更新人 */
  lastUpdatedStamp?: string;
  /** 存储地址 */
  originalUrl?: string;
  /** 预览地址 */
  previewUrl?: string;
  /** 关联单据id */
  refBoId?: number;
  /** 关联单据bo名称 */
  refBoName?: string;
}

/**
 * 凭证详情结果 - 数据 - 用户（创建人/最后编辑人/最后修改人/所有人共用结构）。
 */
export interface GetVoucherByIdResultDataUser {
  /** 文档未给说明 */
  id?: number;
  /** 文档未给说明 */
  lastUpdatedStamp?: string;
  /** 文档未给说明 */
  name?: string;
  /** 文档未给说明 */
  nickName?: string;
  /** 文档未给说明 */
  userName?: string;
}

/**
 * 凭证详情结果 - 数据 - 凭证分录。
 */
export interface GetVoucherByIdResultDataDetail {
  /** 文档未给说明 */
  basePostedCr?: number;
  /** 文档未给说明 */
  basePostedDr?: number;
  /** 文档未给说明 */
  code?: string;
  /** 文档未给说明 */
  comments?: string;
  /** 文档未给说明 */
  exchangeRate?: number;
  /** 科目 */
  glAccount?: GetVoucherByIdResultDataDetailGlAccount;
  /** 文档未给说明 */
  hasQtyAccounting?: boolean;
  /** 文档未给说明 */
  id?: number;
  /** 文档未给说明 */
  name?: string;
  /** 文档未给说明 */
  postedCr?: number;
  /** 文档未给说明 */
  postedCrQty?: number;
  /** 文档未给说明 */
  postedDr?: number;
  /** 文档未给说明 */
  postedDrQty?: number;
  /** 文档未给说明 */
  price?: number;
  /** 文档未给说明 */
  subjectLongtext?: string;
}

/**
 * 凭证详情结果 - 数据 - 凭证分录 - 科目。
 */
export interface GetVoucherByIdResultDataDetailGlAccount {
  /** 文档未给说明 */
  code?: string;
  /** 文档未给说明 */
  drCrDirection?: number;
  /** 文档未给说明 */
  hasForeignCurrency?: boolean;
  /** 文档未给说明 */
  hasQtyAccunting?: boolean;
  /** 文档未给说明 */
  hasSubsidiaryAccounting?: boolean;
  /** 文档未给说明 */
  id?: number;
  /** 文档未给说明 */
  longName?: string;
  /** 文档未给说明 */
  name?: string;
}

/**
 * 凭证详情结果 - 数据 - 拓展属性。
 */
export interface GetVoucherByIdResultDataExtAttrs {
  /** 文档未给说明 */
  voucherManual?: string;
}

// ---------------------------------------------------------------------------
// 18. 凭证附单据列表查询
// ---------------------------------------------------------------------------

/**
 * 凭证附单据列表查询入参。
 */
export interface GetNewAttcListParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 凭证ID */
  acctgTransId: number;
}

/**
 * 凭证附单据列表查询结果项。文档仅提供响应示例（附件与业务单据两种形状），未提供输出参数表，字段取自示例。
 */
export interface GetNewAttcListResult {
  /** 单据编码 */
  documentCode?: string;
  /** 单据类型 */
  documentType?: string;
  /** 单据日期 */
  documentDate?: string;
  /** 最后更新时间 */
  lastUpdatedStamp?: string;
  /** 创建时间 */
  createdStamp?: string;
  /** 创建人 */
  createdUserId?: number;
  /** 最后更新人 */
  lastUpdatedUserId?: number;
  /** 预览地址 */
  previewUrl?: string;
  /** 原始地址 */
  originalUrl?: string;
  /** 扩展数据 */
  extendData?: unknown;
  /** 附件类型 */
  attachmentTypeId?: number;
  /** 关联单据id */
  refBoId?: number;
  /** 关联单据bo名称 */
  refBoName?: string;
  /** 附件大小 */
  attachmentSize?: number;
  /** 附件后缀 */
  attachmentSuffix?: string;
  /** 附件名称 */
  attachmentName?: string;
  /** 账套id */
  tenantId?: number;
  /** 版本号 */
  versionNo?: number;
  /** 附件id */
  id?: number;
  /** 是否允许删除 */
  removeTab?: boolean;
  /** 税额合计 */
  baseTotalTax?: number;
  /** 不含税金额合计 */
  baseTotalAmountWithoutTax?: number;
  /** 含税金额合计 */
  baseTotalAmountWithTax?: number;
  /** 单据编号 */
  accountNo?: string;
  /** 业务类型 */
  businessType?: string;
  /** 来源单据id */
  refVoucherId?: number;
}

/**
 * 好会计凭证模块 API（pz.md，18 个接口）。
 */
export function createPzApi(client: ChanjetClient) {
  return {
    /**
     * 获取所有科目及期初数据。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.bookId 账套id（查询参数）
     * @returns 科目及期初数据数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=30311
     */
    getInitBalanceList: (params: GetInitBalanceListParams) =>
      client.request<GetInitBalanceListResult[]>({
        method: 'GET',
        path: '/accounting/gl/glaccount/getInitBalanceList/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { bookId: params.bookId },
      }),

    /**
     * 新增凭证时，获取初始化数据。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.period 新增凭证的期间
     * @param params.acctgTransCategoryId 新增凭证的类别
     * @param params.preId 凭证插入点的老凭证id
     * @returns 凭证初始化数据
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=19734
     */
    initAcctgTrans: (params: InitAcctgTransParams) =>
      client.request<InitAcctgTransResult>({
        method: 'POST',
        path: '/accounting/gl/AcctgTrans/init/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          ...(params.period !== undefined ? { period: params.period } : {}),
          ...(params.acctgTransCategoryId !== undefined
            ? { acctgTransCategoryId: params.acctgTransCategoryId }
            : {}),
          ...(params.preId !== undefined ? { preId: params.preId } : {}),
        },
      }),

    /**
     * 凭证修改接口。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.isInsert 查询参数，false（文档仅给出示例值 false）
     * @param params.isSave 查询参数，false（文档仅给出示例值 false）
     * @param params.acctgTransCategoryId 凭证类型id
     * @param params.acctgPeriod 期间
     * @param params.code 凭证编码
     * @param params.bizDate 凭证日期
     * @param params.attachementCount 凭证附件数量
     * @param params.details 凭证分录
     * @param params.details.comments 摘要
     * @param params.details.postedCrQty 贷方数量
     * @param params.details.sequenceNum 顺序号
     * @param params.details.glSubAccountId 辅助核算关系id
     * @param params.details.glAccountId 科目id
     * @param params.details.postedCr 贷方外币
     * @param params.details.postedDr 借方外币
     * @param params.details.postedDrQty 借方数量
     * @param params.details.exchangeRate 汇率
     * @param params.details.price 单价
     * @param params.details.basePostedCr 贷方金额
     * @param params.details.glSubAccount 辅助核算关联关系对象（不传 glSubAccountId 可以通过此参数自动新增 glSubAccount）
     * @param params.details.glSubAccount.productId 存货id
     * @param params.details.glSubAccount.departmentId 部门id
     * @param params.details.glSubAccount.custId 客户id
     * @param params.details.glSubAccount.vendorId 供应商id
     * @param params.details.glSubAccount.employeeId 员工id
     * @param params.details.glSubAccount.id 辅助核算关系id
     * @param params.details.glSubAccount.projectId 项目id
     * @param params.details.basePostedDr 借方金额
     * @param params.id 凭证id
     * @param params.origCreatedUserName 制单人
     * @param params.origApprovedUserName 审核人
     * @returns 无返回参数
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=31726
     */
    modifyAcctgTrans: (params: ModifyAcctgTransParams) =>
      client.request<void>({
        method: 'PUT',
        path: '/accounting/gl/AcctgTrans/{bookid}',
        pathParams: { bookid: params.bookid },
        query: {
          ...(params.isInsert !== undefined ? { isInsert: params.isInsert } : {}),
          isSave: params.isSave,
        },
        body: {
          acctgTransCategoryId: params.acctgTransCategoryId,
          acctgPeriod: params.acctgPeriod,
          code: params.code,
          bizDate: params.bizDate,
          ...(params.attachementCount !== undefined
            ? { attachementCount: params.attachementCount }
            : {}),
          details: params.details,
          id: params.id,
          origCreatedUserName: params.origCreatedUserName,
          ...(params.origApprovedUserName !== undefined
            ? { origApprovedUserName: params.origApprovedUserName }
            : {}),
        },
      }),

    /**
     * 凭证列表-模糊搜索。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.searchParam query 参数 period：期间 text：模糊字段（可输入凭证号/摘要/科目/金额信息）pageCount：页码 pageSize：每页数量
     * @returns 凭证分页结果，`result` 为凭证数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=31413
     */
    acctgTransFuzzySearch: (params: AcctgTransFuzzySearchParams) =>
      client.request<AcctgTransFuzzySearchResult>({
        method: 'GET',
        path: '/accounting/gl/AcctgTrans/acctgTransFuzzySearch/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { searchParam: params.searchParam },
      }),

    /**
     * 凭证列表-凭证打印。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.printStyle 来自云存储的printConfig.json
     * @param params.printCount 来自云存储的printConfig.json
     * @param params.voucherIds 凭证id
     * @param params.addCover 添加封面
     * @param params.addLogo 添加畅捷通标记
     * @param params.rowSize 行数（5～8）
     * @param params.leftMargin 左边距（默认60）左右和固定为86
     * @param params.rightMargin 右边距（默认26）左右和固定为86
     * @param params.topMargin 上边距（A4三版默认为20，其余默认为40）
     * @param params.bottomMargin 下边距（A4三版默认为20，其余默认为40）
     * @returns 凭证打印结果，`resultObj` 为凭证pdf URL
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=31215
     */
    printAcctgTrans: (params: PrintAcctgTransParams) =>
      client.request<PrintAcctgTransResult>({
        method: 'POST',
        path: '/accounting/gl/AcctgTrans/printAcctgTrans/{bookid}',
        pathParams: { bookid: params.bookid },
        query: {
          printStyle: params.printStyle,
          printCount: params.printCount,
          voucherIds: params.voucherIds,
          addCover: params.addCover,
          addLogo: params.addLogo,
          rowSize: params.rowSize,
          leftMargin: params.leftMargin,
          rightMargin: params.rightMargin,
          topMargin: params.topMargin,
          bottomMargin: params.bottomMargin,
        },
      }),

    /**
     * 获取凭证期间数量信息。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.startPeriod 开始期间
     * @param params.endPeriod 结束期间
     * @returns 凭证期间数量（响应示例为期间→数量的映射对象）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=31514
     */
    countByPeriod: (params: CountByPeriodParams) =>
      client.request<CountByPeriodResult>({
        method: 'GET',
        path: '/accounting/gl/AcctgTrans/countByPeriod/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { startPeriod: params.startPeriod, endPeriod: params.endPeriod },
      }),

    /**
     * 凭证类别查询接口。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.status 启用，禁用 A:启用，I:禁用，传空查全部
     * @returns 凭证类别数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=31760
     */
    listAcctgTransCategory: (params: ListAcctgTransCategoryParams) =>
      client.request<ListAcctgTransCategoryResult[]>({
        method: 'GET',
        path: '/accounting/gl/acctgTransCategory/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { ...(params.status !== undefined ? { status: params.status } : {}) },
      }),

    /**
     * 获取凭证下的附件列表。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.acctgTransId 凭证ID
     * @returns 凭证附件列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=31446
     */
    getAttcList: (params: GetAttcListParams) =>
      client.request<GetAttcListResult[]>({
        method: 'GET',
        path: '/accounting/gl/AcctgTrans/getAttcList/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { acctgTransId: params.acctgTransId },
      }),

    /**
     * 凭证删除接口。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.acctgTransId 凭证id
     * @returns 无返回参数（200 即为成功）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=31777
     */
    removeAcctgTrans: (params: RemoveAcctgTransParams) =>
      client.request<void>({
        method: 'DELETE',
        path: '/accounting/gl/AcctgTrans/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { acctgTransId: params.acctgTransId },
      }),

    /**
     * 凭证列表-精确搜索。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.searchParam 字符串类型, 将JSON转换成字符串（period 期间 / subjectNo 科目编码 / text / assistantType / summary 摘要 / writtenPerson 制单人 / startPeriod 开始期间 / endPeriod 结束期间 / pageCount 页码 / pageSize 每页数量）
     * @returns 凭证分页结果，`result` 为凭证数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=31788
     */
    acctgTransExactSearch: (params: AcctgTransExactSearchParams) =>
      client.request<AcctgTransExactSearchResult>({
        method: 'GET',
        path: '/accounting/gl/AcctgTrans/acctgTransExactSearch/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { searchParam: params.searchParam },
      }),

    /**
     * 启用凭证类别。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.id 类别id
     * @returns 无返回参数
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=31443
     */
    enableCategory: (params: EnableCategoryParams) =>
      client.request<void>({
        method: 'POST',
        path: '/accounting/gl/acctgTransCategory/enableCategory/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { id: params.id },
      }),

    /**
     * 禁用凭证类别。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.id 类别id
     * @returns 无返回参数
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=31440
     */
    disableCategory: (params: DisableCategoryParams) =>
      client.request<void>({
        method: 'POST',
        path: '/accounting/gl/acctgTransCategory/disableCategory/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { id: params.id },
      }),

    /**
     * 批量删除凭证。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.removeIdArray 删除集合凭证id
     * @returns 无返回参数（空对象）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=31429
     */
    batchRemove: (params: BatchRemoveParams) =>
      client.request<void>({
        method: 'DELETE',
        path: '/accounting/gl/AcctgTrans/batchRemove/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { removeIdArray: params.removeIdArray },
      }),

    /**
     * 凭证绑定附件信息。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.acctgTransId 凭证id
     * @param params.attachments 附件集合
     * @param params.attachments.attachmentName 附件名称
     * @param params.attachments.attachmentSize 附件大小
     * @param params.attachments.attachmentSuffix 附件后缀
     * @param params.attachments.originalUrl 原始地址
     * @param params.attachments.previewUrl 预览地址
     * @param params.attachments.documentType 文档类型
     * @param params.attachments.removeTab 是否允许删除文件
     * @returns 无返回参数
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=32600
     */
    saveAttc: (params: SaveAttcParams) =>
      client.request<void>({
        method: 'POST',
        path: '/accounting/gl/AcctgTrans/saveAttc/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { acctgTransId: params.acctgTransId },
        body: params.attachments,
      }),

    /**
     * 批量获取凭证单据信息（不包括凭证明细的信息）。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.acctgTransIds 凭证ids
     * @returns 凭证单据信息批量结果，`data` 为凭证单据信息数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=33449
     */
    getVoucherByIds: (params: GetVoucherByIdsParams) =>
      client.request<GetVoucherByIdsResult>({
        method: 'POST',
        path: '/accounting/gl/AcctgTrans/getVoucherByIds/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { acctgTransIds: params.acctgTransIds },
      }),

    /**
     * 查询凭证关联的单据信息。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.acctgTransIds 凭证ID列表
     * @returns 凭证关联的单据信息，`data` 为数据数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=33074
     */
    getRefInfoByAcctgTransIds: (params: GetRefInfoByAcctgTransIdsParams) =>
      client.request<GetRefInfoByAcctgTransIdsResult>({
        method: 'POST',
        path: '/accounting/gl/acctgplt/getRefInfoByAcctgTransIds/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { acctgTransIds: params.acctgTransIds },
      }),

    /**
     * 通过凭证id获取凭证详情。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.voucherId 凭证id
     * @returns 凭证详情，`data` 为凭证数据
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=33422
     */
    getVoucherById: (params: GetVoucherByIdParams) =>
      client.request<GetVoucherByIdResult>({
        method: 'GET',
        path: '/accounting/gl/AcctgTrans/getVoucherById/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { voucherId: params.voucherId },
      }),

    /**
     * 获取凭证下的附单据列表（包括业务生凭证的附单据）。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.acctgTransId 凭证ID
     * @returns 凭证附单据列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pz?id=33438
     */
    getNewAttcList: (params: GetNewAttcListParams) =>
      client.request<GetNewAttcListResult[]>({
        method: 'GET',
        path: '/accounting/gl/AcctgTrans/getNewAttcList/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { acctgTransId: params.acctgTransId },
      }),
  };
}
