/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pzxz00001
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/cwxg/pzxz00001.md
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/**
 * 凭证新增模块错误码表（文档「错误码说明」逐条收录）。
 *
 * 文档各接口「错误码说明」表均未给出可直接映射的业务错误码：
 * - api-32079 给出的是 FAQ 链接；
 * - api-32868 给出的是 `success`/`errorInfo` 业务字段而非错误码。
 * 故此处无常量条目。
 */
export const PZXZ00001_ERROR_CODES = {} as const;

// ---------------------------------------------------------------------------
// 共享嵌套结构（各新增凭证接口的响应 glAccount.glAccountXrefList 结构完全一致）
// ---------------------------------------------------------------------------

/**
 * 关联辅助核算分类（非EO字段）。各新增凭证接口响应中结构一致，故共享。
 */
export interface AcctgTransGlAccountXrefListItem {
  /** 最后修改日期 */
  lastUpdatedStamp?: string;
  /** 最后修改人 */
  lastUpdatedUserId?: number;
  /** 科目辅助核算类型id */
  glSubAccountTypeId?: number;
  /** 创建时间 */
  createdUserId?: number;
  /** 创建日期 */
  createdStamp?: string;
  /** 科目id */
  glAccountId?: number;
  /** 账套ID */
  tenantId?: number;
  /** 版本 */
  versionNo?: number;
  /** 辅助核算类型 */
  glSubAccountType?: AcctgTransGlSubAccountType;
  /** 关联辅助核算id */
  id?: number;
}

/**
 * 辅助核算类型。各新增凭证接口响应中结构一致，故共享。
 */
export interface AcctgTransGlSubAccountType {
  /** 最后修改日期 */
  lastUpdatedStamp?: string;
  /** 最后修改人 */
  lastUpdatedUserId?: number;
  /** 辅助核算编码 */
  code?: string;
  /** 创建用户id */
  createdUserId?: number;
  /** 排序编号 */
  sequenceNum?: number;
  /** 对应子分类账户表字段名 */
  glSubAccountField?: string;
  /** 创建时间 */
  createdStamp?: string;
  /** 名称 */
  name?: string;
  /** 账套id */
  tenantId?: number;
  /** 版本号 */
  versionNo?: number;
  /** 辅助核算类型id */
  id?: number;
}

// ---------------------------------------------------------------------------
// 1. 新增凭证（期末结转生凭证业务场景)
// ---------------------------------------------------------------------------

/**
 * 新增凭证（期末结转生凭证业务场景）入参。
 */
export interface CreateCarryForwardAcctgTransParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 凭证分类，默认是100001（100001 记 100009 银 100007 银付 100006 银收 100008 现 100005 现付 100004 现收 100003 付 100002 收 100010 转） */
  acctgTransCategoryId: number;
  /** 凭证期间：例如202212 前四位年份，后两位月份，作用是区分做凭证的年月 */
  acctgPeriod: string;
  /** 业务事务类型，100501为凭证，写死即可 */
  bizTypeId: number;
  /** 凭证编号，默认三位，不要超过五位 */
  code: string;
  /** 期末结转的标志（final1-结转销售成本 … final27-工会资金结余(月)） */
  carryForwardTemplateEnum: string;
  /** 数据来源：写死AcctgTrans即可 */
  boName: string;
  /** 凭证日期，时间戳格式13位，凭证日期必须在期间范围内 */
  bizDate: number;
  /** 科目识别，只为外部接口服务，固定写true即可 */
  isCodeType: boolean;
  /** 凭证明细 */
  details: CreateCarryForwardAcctgTransParamsDetail[];
  /** 只为外部接口服务，固定写true即可 */
  categoryCodeExist: boolean;
  /** false */
  isFinal: boolean;
}

/**
 * 新增凭证（期末结转）入参 - 凭证明细。
 */
export interface CreateCarryForwardAcctgTransParamsDetail {
  /** 借方数量 */
  postedDrQty?: number;
  /** 摘要 */
  comments?: string;
  /** 贷方数量 */
  postedCrQty?: number;
  /** 顺序号 */
  sequenceNum?: number;
  /** 单价 */
  price?: number;
  /** 汇率。注：本接口（期末结转）参数表类型为 number；其他新增凭证接口参数表类型为 string，类型跨接口不一致，以各接口参数表为准 */
  exchangeRate?: number;
  /** 贷方外币 */
  postedCr?: number;
  /** 贷方金额 */
  basePostedCr?: number;
  /** 辅助核算信息 */
  glSubAccount?: CreateCarryForwardAcctgTransParamsDetailGlSubAccount;
  /** 借方金额 */
  basePostedDr?: number;
  /** 借方外币 */
  postedDr?: number;
  /** 科目信息 */
  glAccount?: CreateCarryForwardAcctgTransParamsDetailGlAccount;
}

/**
 * 新增凭证（期末结转）入参 - 凭证明细 - 辅助核算信息。
 */
export interface CreateCarryForwardAcctgTransParamsDetailGlSubAccount {
  /** 存货辅助核算编码 */
  productCode: string;
  /** 项目编号 */
  projectCode: string;
  /** 部门辅助核算 */
  departmentCode: string;
  /** 客户辅助核算 */
  customerCode: string;
  /** 员工辅助核算 */
  employeeCode: string;
  /** 供应商辅助核算 */
  vendorCode: string;
}

/**
 * 新增凭证（期末结转）入参 - 凭证明细 - 科目信息。
 */
export interface CreateCarryForwardAcctgTransParamsDetailGlAccount {
  /** 科目编号 */
  code: string;
  /** 借贷方向：标示科目借贷类型，借方为1，贷方为-1 */
  drCrDirection: number;
  /** 是否是辅助核算，是写true,否写false */
  hasSubsidiaryAccounting: boolean;
  /** 是否是末级，是写true,否写false */
  isLeafNode: boolean;
}

/**
 * 新增凭证（期末结转）结果。
 */
export interface CreateCarryForwardAcctgTransResult {
  /** 最后修改时间 */
  lastUpdatedStamp?: string;
  /** 接口来源（凭证新增-1，凭证修改-2，作废-3）；此字段不存于数据库中，对于用户无用处 */
  acctgFromInterfaceSource?: string;
  /** 期间 */
  acctgPeriod?: string;
  /** 凭证编码 */
  code?: string;
  /** 期末结转的标志 */
  carryForwardTemplateEnum: string;
  /** 数据来源 */
  boName?: string;
  /** 凭证日期。注：请求参数表中 bizDate 为 integer（时间戳），响应示例中为 string（"2022-03-10 10:41:28" 格式），请求/响应类型不一致，以参数表为准 */
  bizDate?: string;
  /** 单据来源。注：参数表类型为 array&lt;string&gt;，但响应示例中为对象数组（含 refBoName/refVoucherId 等字段），以参数表为准 */
  refVoucherInfo?: string[];
  /** 顺序号 */
  seqNum?: number;
  /** 此字段对客户无用，是否是API凭证新增凭证 */
  isCodeType?: boolean;
  /** 针对API接口通过code代替科目id,该字段判断传递参数是否用code替换 */
  categoryCodeExist?: boolean;
  /** 文档未给说明 */
  bizGlAccountXref?: unknown;
  /** 制单人 */
  origCreatedUserName?: string;
  /** 凭证分类 */
  acctgTransCategoryId?: number;
  /** 业务事务类型 */
  bizTypeId?: number;
  /** 操作用户 */
  draftUserId?: number;
  /** 单据所有者 */
  ownerUserId?: number;
  /** 凭证明细 */
  details?: CreateCarryForwardAcctgTransResultDetail[];
  /** id号 */
  id?: number;
  /** 期末结转完成标记：期末结转使用，期末结转完成，不允许编辑 */
  isFinal?: boolean;
}

/**
 * 新增凭证（期末结转）结果 - 凭证明细。
 */
export interface CreateCarryForwardAcctgTransResultDetail {
  /** 最后修改时间 */
  lastUpdatedStamp?: string;
  /** 存商品部门核算 */
  departmentAss?: boolean;
  /** 摘要 */
  comments?: string;
  /** 贷方数量 */
  postedCrQty?: string;
  /** 明细顺序号 */
  sequenceNum?: number;
  /** 辅助核算id */
  glSubAccountId?: number;
  /** 科目id */
  glAccountId?: number;
  /** 贷方外币 */
  postedCr?: string;
  /** 借方外币 */
  postedDr?: string;
  /** 存货核算 */
  productAss?: boolean;
  /** 借方数量 */
  postedDrQty?: string;
  /** 库存商品员工核算 */
  bizEmployeeAss?: boolean;
  /** 主表凭证id */
  masterVoucherId?: string;
  /** 单价 */
  price?: string;
  /** 汇率 */
  exchangeRate?: number;
  /** 贷方金额 */
  basePostedCr?: string;
  /** 辅助核算信息 */
  glSubAccount?: CreateCarryForwardAcctgTransResultDetailGlSubAccount;
  /** 借方金额 */
  basePostedDr?: string;
  /** 科目信息 */
  glAccount?: CreateCarryForwardAcctgTransResultDetailGlAccount;
  /** 凭证明细id */
  id?: number;
  /** 项目核算 */
  projectAss?: boolean;
}

/**
 * 新增凭证（期末结转）结果 - 凭证明细 - 辅助核算信息。
 */
export interface CreateCarryForwardAcctgTransResultDetailGlSubAccount {
  /** 最后更新时间 */
  lastUpdatedStamp?: string;
  /** 创建人员 */
  createdUserId?: number;
  /** 存货 */
  productId?: number;
  /** 创建日期 */
  createdStamp?: string;
  /** 部门 */
  departmentId?: number;
  /** 科目id */
  glAccountId?: number;
  /** 供应商 */
  vendorId?: number;
  /** 员工 */
  employeeId?: number;
  /** 是否辅助 */
  empty?: boolean;
  /** 最后更新人员 */
  lastUpdatedUserId?: number;
  /** 客户 */
  custId?: number;
  /** 账套id */
  tenantId?: number;
  /** 版本 */
  versionNo?: number;
  /** 辅助核算id */
  id?: number;
  /** 项目 */
  projectId?: number;
}

/**
 * 新增凭证（期末结转）结果 - 凭证明细 - 科目信息。
 */
export interface CreateCarryForwardAcctgTransResultDetailGlAccount {
  /** 是否可编辑 */
  cashItemEditable?: boolean;
  /** 最后修改日期 */
  lastUpdatedStamp?: string;
  /** 准备新增 */
  readyToAdd?: boolean;
  /** 科目编号 */
  code?: string;
  /** 贷方数量 */
  postedCrQty?: string;
  /** 外币余额 */
  endingBalance?: string;
  /** 贷方外币 */
  postedCr?: string;
  /** 借贷方向：标示科目借贷类型，借方为1，贷方为-1 */
  drCrDirection?: string;
  /** 借方发生额 */
  postedDr?: string;
  /** 是否辅助账核算 */
  hasSubsidiaryAccounting?: boolean;
  /** 关联辅助核算分类：非EO字段 */
  glAccountXrefList?: AcctgTransGlAccountXrefListItem[];
  /** 借方数量 */
  postedDrQty?: string;
  /** 余额数量 */
  endingQty?: string;
  /** 期初余额：本币 */
  baseOpeningBalance?: string;
  /** 贷方金额 */
  basePostedCr?: string;
  /** 是否创建明细科目 */
  createDetailGlAccount?: boolean;
  /** 借方金额 */
  basePostedDr?: string;
  /** 科目id */
  id?: number;
  /** 余额 */
  baseEndingBalance?: string;
  /** 是否末级科目 */
  isLeafNode?: boolean;
}

// ---------------------------------------------------------------------------
// 2. (外部接口) 新增凭证--有辅助核算
// ---------------------------------------------------------------------------

/**
 * 新增凭证（有辅助核算）入参。
 */
export interface CreateSubsidiaryAcctgTransParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 凭证分类，默认是100001 */
  acctgTransCategoryId: number;
  /** 凭证期间 */
  acctgPeriod: string;
  /** 业务事务类型，100501为凭证，写死即可 */
  bizTypeId: number;
  /** 凭证编号，默认三位，不要超过五位 */
  code: string;
  /** 数据来源：写死AcctgTrans即可 */
  boName: string;
  /** 凭证日期，时间戳格式13位 */
  bizDate: number;
  /** 外部id bigint(20) */
  refVoucherId?: number;
  /** 外部编码varchar30 */
  refVoucherCode?: string;
  /** 科目识别，只为外部接口服务，固定写true即可 */
  isCodeType: boolean;
  /** 凭证明细 */
  details: CreateSubsidiaryAcctgTransParamsDetail[];
  /** 只为外部接口服务，固定写true即可 */
  categoryCodeExist: boolean;
  /** false */
  isFinal: boolean;
  /** 经办人，例如张三 */
  origCreatedUserName: string;
}

/**
 * 新增凭证（有辅助核算）入参 - 凭证明细。
 */
export interface CreateSubsidiaryAcctgTransParamsDetail {
  /** 借方数量 */
  postedDrQty?: string;
  /** 摘要 */
  comments?: string;
  /** 贷方数量 */
  postedCrQty?: string;
  /** 顺序号 */
  sequenceNum?: number;
  /** 单价 */
  price?: string;
  /** 汇率 */
  exchangeRate?: string;
  /** 贷方外币 */
  postedCr?: string;
  /** 贷方金额 */
  basePostedCr?: string;
  /** 辅助核算信息 */
  glSubAccount?: CreateSubsidiaryAcctgTransParamsDetailGlSubAccount;
  /** 借方金额 */
  basePostedDr?: string;
  /** 借方外币 */
  postedDr?: string;
  /** 科目信息 */
  glAccount?: CreateSubsidiaryAcctgTransParamsDetailGlAccount;
  /** 币种id，科目启用外币核算需要传该参数，不传取科目默认币种 */
  currencyId?: number;
}

/**
 * 新增凭证（有辅助核算）入参 - 凭证明细 - 辅助核算信息。
 */
export interface CreateSubsidiaryAcctgTransParamsDetailGlSubAccount {
  /** 存货辅助核算编码 */
  productCode: string;
  /** 项目编号 */
  projectCode: string;
  /** 部门辅助核算 */
  departmentCode: string;
  /** 客户辅助核算 */
  customerCode: string;
  /** 员工辅助核算 */
  employeeCode: string;
  /** 供应商辅助核算 */
  vendorCode: string;
  /** 自定义辅助核算1（档案id） */
  freeSub1: number;
  /** 自定义辅助核算20（档案id） */
  freeSub20?: number;
  /** 自定辅助核算21（系统枚举） */
  freeSub21?: string;
  /** 自定义辅助核算25（自定义枚举） */
  freeSub25?: string;
}

/**
 * 新增凭证（有辅助核算）入参 - 凭证明细 - 科目信息。
 */
export interface CreateSubsidiaryAcctgTransParamsDetailGlAccount {
  /** 科目编号 */
  code: string;
  /** 借贷方向：标示科目借贷类型，借方为1，贷方为-1 */
  drCrDirection: string;
  /** 是否是辅助核算，是写true,否写false */
  hasSubsidiaryAccounting: boolean;
  /** 是否是末级，是写true,否写false */
  isLeafNode: boolean;
}

/**
 * 新增凭证（有辅助核算）结果。
 */
export interface CreateSubsidiaryAcctgTransResult {
  /** 最后修改时间 */
  lastUpdatedStamp?: string;
  /** 接口来源（凭证新增-1，凭证修改-2，作废-3） */
  acctgFromInterfaceSource?: string;
  /** 期间 */
  acctgPeriod?: string;
  /** 凭证编码 */
  code?: string;
  /** 数据来源 */
  boName?: string;
  /** 凭证日期 */
  bizDate?: string;
  /** 单据来源 */
  refVoucherInfo?: string[];
  /** 顺序号 */
  seqNum?: number;
  /** 此字段对客户无用，是否是API凭证新增凭证 */
  isCodeType?: boolean;
  /** 针对API接口通过code代替科目id,该字段判断传递参数是否用code替换 */
  categoryCodeExist?: boolean;
  /** 文档未给说明 */
  bizGlAccountXref?: unknown;
  /** 制单人 */
  origCreatedUserName?: string;
  /** 凭证分类 */
  acctgTransCategoryId?: number;
  /** 业务事务类型 */
  bizTypeId?: number;
  /** 上传的凭证附件数量 */
  uploadAttachmentCount?: number;
  /** 操作用户 */
  draftUserId?: number;
  /** 单据所有者 */
  ownerUserId?: number;
  /** 凭证明细 */
  details?: CreateSubsidiaryAcctgTransResultDetail[];
  /** id号 */
  id?: number;
  /** 期末结转完成标记 */
  isFinal?: boolean;
}

/**
 * 新增凭证（有辅助核算）结果 - 凭证明细。
 */
export interface CreateSubsidiaryAcctgTransResultDetail {
  /** 最后修改时间 */
  lastUpdatedStamp?: string;
  /** 存商品部门核算 */
  departmentAss?: boolean;
  /** 摘要 */
  comments?: string;
  /** 贷方数量 */
  postedCrQty?: number;
  /** 明细顺序号 */
  sequenceNum?: number;
  /** 辅助核算id */
  glSubAccountId?: number;
  /** 科目id */
  glAccountId?: number;
  /** 贷方外币 */
  postedCr?: number;
  /** 借方外币 */
  postedDr?: number;
  /** 存货核算 */
  productAss?: boolean;
  /** 借方数量 */
  postedDrQty?: number;
  /** 库存商品员工核算 */
  bizEmployeeAss?: boolean;
  /** 主表凭证id */
  masterVoucherId?: number;
  /** 单价 */
  price?: number;
  /** 汇率 */
  exchangeRate?: string;
  /** 贷方金额 */
  basePostedCr?: number;
  /** 辅助核算信息 */
  glSubAccount?: CreateSubsidiaryAcctgTransResultDetailGlSubAccount;
  /** 借方金额 */
  basePostedDr?: number;
  /** 科目信息 */
  glAccount?: CreateSubsidiaryAcctgTransResultDetailGlAccount;
  /** 凭证明细id */
  id?: number;
  /** 项目核算 */
  projectAss?: boolean;
}

/**
 * 新增凭证（有辅助核算）结果 - 凭证明细 - 辅助核算信息。
 */
export interface CreateSubsidiaryAcctgTransResultDetailGlSubAccount {
  /** 创建日期 */
  lastUpdatedStamp?: string;
  /** 创建人员 */
  createdUserId?: number;
  /** 存货 */
  productId?: number;
  /** 创建时间 */
  createdStamp?: string;
  /** 部门 */
  departmentId?: number;
  /** 科目 */
  glAccountId?: number;
  /** 供应商 */
  vendorId?: number;
  /** 员工 */
  employeeId?: number;
  /** 是否辅助 */
  empty?: boolean;
  /** 最后更新人 */
  lastUpdatedUserId?: number;
  /** 客户 */
  custId?: number;
  /** 账套id */
  tenantId?: number;
  /** 版本 */
  versionNo?: number;
  /** 辅助核算id */
  id?: number;
  /** 项目 */
  projectId?: number;
  /** 自定义辅助核算1 */
  freeSub1?: number;
  /** 自定义辅助核算21 */
  freeSub21?: string;
}

/**
 * 新增凭证（有辅助核算）结果 - 凭证明细 - 科目信息。
 */
export interface CreateSubsidiaryAcctgTransResultDetailGlAccount {
  /** 是否可编辑 */
  cashItemEditable?: boolean;
  /** 最后修改日期 */
  lastUpdatedStamp?: string;
  /** 准备新增 */
  readyToAdd?: boolean;
  /** 科目编号 */
  code?: string;
  /** 贷方数量 */
  postedCrQty?: number;
  /** 外币余额 */
  endingBalance?: number;
  /** 贷方外币 */
  postedCr?: number;
  /** 借贷方向：标示科目借贷类型，借方为1，贷方为-1 */
  drCrDirection?: number;
  /** 借方发生额 */
  postedDr?: number;
  /** 是否辅助账核算 */
  hasSubsidiaryAccounting?: boolean;
  /** 关联辅助核算分类：非EO字段 */
  glAccountXrefList?: AcctgTransGlAccountXrefListItem[];
  /** 借方数量 */
  postedDrQty?: number;
  /** 余额数量 */
  endingQty?: number;
  /** 期初余额：本币 */
  baseOpeningBalance?: number;
  /** 贷方金额 */
  basePostedCr?: number;
  /** 是否创建明细科目 */
  createDetailGlAccount?: boolean;
  /** 借方金额 */
  basePostedDr?: number;
  /** 科目id */
  id?: number;
  /** 余额 */
  baseEndingBalance?: number;
  /** 是否末级科目 */
  isLeafNode?: boolean;
}

// ---------------------------------------------------------------------------
// 3. (外部接口) 新增凭证--无辅助核算
// ---------------------------------------------------------------------------

/**
 * 新增凭证（无辅助核算）入参。
 */
export interface CreateNonSubsidiaryAcctgTransParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 凭证分类，默认是100001 */
  acctgTransCategoryId: number;
  /** 凭证期间 */
  acctgPeriod: string;
  /** 业务事务类型，100501为凭证，写死即可 */
  bizTypeId: number;
  /** 凭证编号，默认三位，不要超过五位 */
  code: string;
  /** 数据来源：写死AcctgTrans即可 */
  boName: string;
  /** 凭证日期，时间戳格式13位 */
  bizDate: number;
  /** 科目识别，只为外部接口服务，固定写true即可 */
  isCodeType: boolean;
  /** 附件集合信息。注：参数表结构为 attachmentList[].extendData.{字段}，但请求示例中字段直接平铺在 attachmentList 元素上（无 extendData 包裹层），以参数表为准 */
  attachmentList?: CreateNonSubsidiaryAcctgTransParamsAttachment[];
  /** 凭证明细 */
  details: CreateNonSubsidiaryAcctgTransParamsDetail[];
  /** 只为外部接口服务，固定写true即可 */
  categoryCodeExist: boolean;
  /** false */
  isFinal: boolean;
  /** 经办人，例如张三 */
  origCreatedUserName: string;
}

/**
 * 新增凭证（无辅助核算）入参 - 附件。
 */
export interface CreateNonSubsidiaryAcctgTransParamsAttachment {
  /** 附件扩展信息 */
  extendData?: CreateNonSubsidiaryAcctgTransParamsAttachmentExtendData;
}

/**
 * 新增凭证（无辅助核算）入参 - 附件 - 扩展信息。
 */
export interface CreateNonSubsidiaryAcctgTransParamsAttachmentExtendData {
  /** 文件全名 例如：学生信息.pdf */
  attachmentName?: string;
  /** 附件大小 不知道可以写0，知道就写上文件大小 */
  attachmentSize?: string;
  /** 文件后缀 例如：pdf,txt,xlsx,jpg */
  attachmentSuffix?: string;
  /** 下载地址文件路径 */
  originalUrl?: string;
  /** 预览地址 */
  previewUrl?: string;
  /** 文档类型，写死即可："文件" */
  documentType?: string;
  /** 是否允许删除文件：true 写死即可：true */
  removeTab?: string;
}

/**
 * 新增凭证（无辅助核算）入参 - 凭证明细。
 */
export interface CreateNonSubsidiaryAcctgTransParamsDetail {
  /** 借方数量 */
  postedDrQty?: string;
  /** 摘要 */
  comments?: string;
  /** 贷方数量 */
  postedCrQty?: string;
  /** 顺序号 */
  sequenceNum?: string;
  /** 单价 */
  price?: string;
  /** 汇率 */
  exchangeRate?: string;
  /** 贷方外币 */
  postedCr?: string;
  /** 贷方金额 */
  basePostedCr?: string;
  /** 辅助核算信息 */
  glSubAccount?: CreateNonSubsidiaryAcctgTransParamsDetailGlSubAccount;
  /** 借方金额 */
  basePostedDr?: string;
  /** 借方外币 */
  postedDr?: string;
  /** 科目信息 */
  glAccount?: CreateNonSubsidiaryAcctgTransParamsDetailGlAccount;
}

/**
 * 新增凭证（无辅助核算）入参 - 凭证明细 - 辅助核算信息。
 */
export interface CreateNonSubsidiaryAcctgTransParamsDetailGlSubAccount {
  /** 存货辅助核算编码 */
  productCode: string;
  /** 项目编号 */
  projectCode: string;
  /** 部门辅助核算 */
  departmentCode: string;
  /** 客户辅助核算 */
  customerCode: string;
  /** 员工辅助核算 */
  employeeCode: string;
  /** 供应商辅助核算 */
  vendorCode: string;
}

/**
 * 新增凭证（无辅助核算）入参 - 凭证明细 - 科目信息。
 */
export interface CreateNonSubsidiaryAcctgTransParamsDetailGlAccount {
  /** 科目编号 */
  code: string;
  /** 借贷方向：标示科目借贷类型，借方为1，贷方为-1 */
  drCrDirection: number;
  /** 是否是辅助核算，是写true,否写false */
  hasSubsidiaryAccounting: boolean;
  /** 是否是末级，是写true,否写false */
  isLeafNode: boolean;
}

/**
 * 新增凭证（无辅助核算）结果。
 */
export interface CreateNonSubsidiaryAcctgTransResult {
  /** 最后修改时间 */
  lastUpdatedStamp?: string;
  /** 接口来源 */
  acctgFromInterfaceSource?: string;
  /** 期间 */
  acctgPeriod?: string;
  /** 凭证编码 */
  code?: string;
  /** 数据来源 */
  boName?: string;
  /** 凭证日期 */
  bizDate?: string;
  /** 单据来源。注：参数表类型为 array<string>，但响应示例为对象数组（含 refBoName/refVoucherId），以参数表为准 */
  refVoucherInfo?: string[];
  /** 顺序号 */
  seqNum?: number;
  /** 此字段对客户无用 */
  isCodeType?: boolean;
  /** 针对API接口通过code代替科目id */
  categoryCodeExist?: boolean;
  /** 文档未给说明 */
  bizGlAccountXref?: unknown;
  /** 制单人 */
  origCreatedUserName?: string;
  /** 凭证分类 */
  acctgTransCategoryId?: number;
  /** 业务事务类型 */
  bizTypeId?: number;
  /** 上传的凭证附件数量 */
  uploadAttachmentCount?: number;
  /** 操作用户 */
  draftUserId?: number;
  /** 单据所有者 */
  ownerUserId?: number;
  /** 凭证明细 */
  details?: CreateNonSubsidiaryAcctgTransResultDetail[];
  /** id号 */
  id?: number;
  /** 期末结转完成标记 */
  isFinal?: boolean;
}

/**
 * 新增凭证（无辅助核算）结果 - 凭证明细。
 */
export interface CreateNonSubsidiaryAcctgTransResultDetail {
  /** 最后修改时间 */
  lastUpdatedStamp?: string;
  /** 存商品部门核算 */
  departmentAss?: boolean;
  /** 摘要 */
  comments?: string;
  /** 贷方数量 */
  postedCrQty?: string;
  /** 明细顺序号 */
  sequenceNum?: string;
  /** 辅助核算id */
  glSubAccountId?: number;
  /** 科目id */
  glAccountId?: number;
  /** 贷方外币 */
  postedCr?: string;
  /** 借方外币 */
  postedDr?: string;
  /** 存货核算 */
  productAss?: string;
  /** 借方数量 */
  postedDrQty?: string;
  /** 库存商品员工核算 */
  bizEmployeeAss?: string;
  /** 主表凭证id */
  masterVoucherId?: string;
  /** 单价 */
  price?: string;
  /** 汇率 */
  exchangeRate?: string;
  /** 贷方金额 */
  basePostedCr?: string;
  /** 辅助核算信息 */
  glSubAccount?: CreateNonSubsidiaryAcctgTransResultDetailGlSubAccount;
  /** 借方金额 */
  basePostedDr?: string;
  /** 科目信息 */
  glAccount?: CreateNonSubsidiaryAcctgTransResultDetailGlAccount;
  /** 凭证明细id */
  id?: string;
  /** 项目核算 */
  projectAss?: boolean;
}

/**
 * 新增凭证（无辅助核算）结果 - 凭证明细 - 辅助核算信息。
 */
export interface CreateNonSubsidiaryAcctgTransResultDetailGlSubAccount {
  /** 最后更新时间 */
  lastUpdatedStamp?: string;
  /** 创建人员 */
  createdUserId?: number;
  /** 存货 */
  productId?: number;
  /** 创建日期 */
  createdStamp?: string;
  /** 部门 */
  departmentId?: number;
  /** 科目id */
  glAccountId?: number;
  /** 供应商 */
  vendorId?: number;
  /** 员工 */
  employeeId?: number;
  /** 是否辅助 */
  empty?: boolean;
  /** 最后更新人员 */
  lastUpdatedUserId?: number;
  /** 客户 */
  custId?: number;
  /** 账套id */
  tenantId?: number;
  /** 版本 */
  versionNo?: number;
  /** 辅助核算id */
  id?: number;
  /** 项目 */
  projectId?: number;
}

/**
 * 新增凭证（无辅助核算）结果 - 凭证明细 - 科目信息。
 */
export interface CreateNonSubsidiaryAcctgTransResultDetailGlAccount {
  /** 是否可编辑 */
  cashItemEditable?: boolean;
  /** 最后修改日期 */
  lastUpdatedStamp?: string;
  /** 准备新增 */
  readyToAdd?: boolean;
  /** 科目编号 */
  code?: string;
  /** 贷方数量 */
  postedCrQty?: string;
  /** 外币余额 */
  endingBalance?: string;
  /** 贷方外币 */
  postedCr?: string;
  /** 借贷方向 */
  drCrDirection?: string;
  /** 借方发生额 */
  postedDr?: string;
  /** 是否辅助账核算 */
  hasSubsidiaryAccounting?: boolean;
  /** 关联辅助核算分类：非EO字段 */
  glAccountXrefList?: AcctgTransGlAccountXrefListItem[];
  /** 借方数量 */
  postedDrQty?: string;
  /** 余额数量 */
  endingQty?: string;
  /** 期初余额：本币 */
  baseOpeningBalance?: string;
  /** 贷方金额 */
  basePostedCr?: string;
  /** 是否创建明细科目 */
  createDetailGlAccount?: boolean;
  /** 借方金额 */
  basePostedDr?: string;
  /** 科目id */
  id?: number;
  /** 余额 */
  baseEndingBalance?: string;
  /** 是否末级科目 */
  isLeafNode?: boolean;
}

// ---------------------------------------------------------------------------
// 4. (外部接口) 新增凭证--关联发票、日记账、固定资产等既有业务数据
// ---------------------------------------------------------------------------

/**
 * 新增凭证（关联既有业务数据）入参。
 */
export interface CreateRefVoucherAcctgTransParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 凭证期间 */
  acctgPeriod: string;
  /** 凭证编号，默认三位，不要超过五位 */
  code: string;
  /** 数据来源：写死AcctgTrans即可 */
  boName: string;
  /** 凭证日期，时间戳格式13位 */
  bizDate: number;
  /** 数据来源标识：FixedAssetModifyEntry-固定资产 CashJournalEntry-日记账 Invoice-发票 Payroll-工资 */
  refBoName: string;
  /** 外部id */
  refVoucherId?: number;
  /** 外部编码 */
  refVoucherCode?: string;
  /** 发票、固定资产、日记账等业务来源的id */
  refVoucherIds: string[];
  /** 科目识别，只为外部接口服务，固定写true即可 */
  isCodeType: boolean;
  /** 只为外部接口服务，固定写true即可 */
  categoryCodeExist: boolean;
  /** 经办人，例如张三 */
  origCreatedUserName: string;
  /** 凭证分类，默认是100001 */
  acctgTransCategoryId: number;
  /** 业务事务类型，100501为凭证，写死即可 */
  bizTypeId: number;
  /** 凭证明细 */
  details: CreateRefVoucherAcctgTransParamsDetail[];
  /** false */
  isFinal: boolean;
}

/**
 * 新增凭证（关联既有业务数据）入参 - 凭证明细。
 */
export interface CreateRefVoucherAcctgTransParamsDetail {
  /** 借方数量 */
  postedDrQty?: string;
  /** 摘要 */
  comments?: string;
  /** 贷方数量 */
  postedCrQty?: string;
  /** 顺序号 */
  sequenceNum?: number;
  /** 单价 */
  price?: string;
  /** 汇率 */
  exchangeRate?: string;
  /** 贷方外币 */
  postedCr?: string;
  /** 贷方金额 */
  basePostedCr?: string;
  /** 辅助核算信息 */
  glSubAccount?: CreateRefVoucherAcctgTransParamsDetailGlSubAccount;
  /** 借方金额 */
  basePostedDr?: string;
  /** 借方外币 */
  postedDr?: string;
  /** 科目信息 */
  glAccount?: CreateRefVoucherAcctgTransParamsDetailGlAccount;
}

/**
 * 新增凭证（关联既有业务数据）入参 - 凭证明细 - 辅助核算信息。
 */
export interface CreateRefVoucherAcctgTransParamsDetailGlSubAccount {
  /** 存货辅助核算编码 */
  productCode: string;
  /** 项目编号 */
  projectCode: string;
  /** 部门辅助核算 */
  departmentCode: string;
  /** 客户辅助核算 */
  customerCode: string;
  /** 员工辅助核算 */
  employeeCode: string;
  /** 供应商辅助核算 */
  vendorCode: string;
}

/**
 * 新增凭证（关联既有业务数据）入参 - 凭证明细 - 科目信息。
 */
export interface CreateRefVoucherAcctgTransParamsDetailGlAccount {
  /** 科目编号 */
  code: string;
  /** 借贷方向 */
  drCrDirection: string;
  /** 是否是辅助核算，是写true,否写false */
  hasSubsidiaryAccounting: boolean;
  /** 是否是末级，是写true,否写false */
  isLeafNode: boolean;
}

/**
 * 新增凭证（关联既有业务数据）结果。
 */
export interface CreateRefVoucherAcctgTransResult {
  /** 最后修改时间 */
  lastUpdatedStamp?: string;
  /** 接口来源 */
  acctgFromInterfaceSource?: string;
  /** 期间 */
  acctgPeriod?: string;
  /** 凭证编码 */
  code?: string;
  /** 数据来源 */
  boName?: string;
  /** 凭证日期 */
  bizDate?: string;
  /** 单据来源。注：参数表类型为 array<string>，但响应示例为对象数组（含 refBoName/refVoucherId），以参数表为准 */
  refVoucherInfo?: string[];
  /** 顺序号 */
  seqNum?: number;
  /** 此字段对客户无用 */
  isCodeType?: boolean;
  /** 针对API接口通过code代替科目id */
  categoryCodeExist?: boolean;
  /** 文档未给说明 */
  bizGlAccountXref?: unknown;
  /** 制单人 */
  origCreatedUserName?: string;
  /** 凭证分类 */
  acctgTransCategoryId?: number;
  /** 业务事务类型 */
  bizTypeId?: number;
  /** 上传的凭证附件数量 */
  uploadAttachmentCount?: number;
  /** 操作用户 */
  draftUserId?: number;
  /** 单据所有者 */
  ownerUserId?: number;
  /** 凭证明细 */
  details?: CreateRefVoucherAcctgTransResultDetail[];
  /** id号 */
  id?: number;
  /** 期末结转完成标记 */
  isFinal?: boolean;
}

/**
 * 新增凭证（关联既有业务数据）结果 - 凭证明细。
 */
export interface CreateRefVoucherAcctgTransResultDetail {
  /** 最后修改时间 */
  lastUpdatedStamp?: string;
  /** 存商品部门核算 */
  departmentAss?: boolean;
  /** 摘要 */
  comments?: string;
  /** 贷方数量 */
  postedCrQty?: string;
  /** 明细顺序号 */
  sequenceNum?: number;
  /** 辅助核算id */
  glSubAccountId?: number;
  /** 科目id */
  glAccountId?: number;
  /** 贷方外币 */
  postedCr?: string;
  /** 借方外币 */
  postedDr?: string;
  /** 存货核算 */
  productAss?: boolean;
  /** 借方数量 */
  postedDrQty?: string;
  /** 库存商品员工核算 */
  bizEmployeeAss?: boolean;
  /** 主表凭证id */
  masterVoucherId?: number;
  /** 单价 */
  price?: string;
  /** 汇率 */
  exchangeRate?: string;
  /** 贷方金额 */
  basePostedCr?: string;
  /** 辅助核算信息 */
  glSubAccount?: CreateRefVoucherAcctgTransResultDetailGlSubAccount;
  /** 借方金额 */
  basePostedDr?: string;
  /** 科目信息 */
  glAccount?: CreateRefVoucherAcctgTransResultDetailGlAccount;
  /** 凭证明细id */
  id?: number;
  /** 项目核算 */
  projectAss?: boolean;
}

/**
 * 新增凭证（关联既有业务数据）结果 - 凭证明细 - 辅助核算信息。
 */
export interface CreateRefVoucherAcctgTransResultDetailGlSubAccount {
  /** 最后更新时间 */
  lastUpdatedStamp?: string;
  /** 创建人员 */
  createdUserId?: number;
  /** 存货 */
  productId?: number;
  /** 创建日期 */
  createdStamp?: string;
  /** 部门 */
  departmentId?: number;
  /** 科目id */
  glAccountId?: number;
  /** 供应商 */
  vendorId?: number;
  /** 员工 */
  employeeId?: number;
  /** 是否辅助 */
  empty?: boolean;
  /** 最后更新人员 */
  lastUpdatedUserId?: number;
  /** 客户 */
  custId?: number;
  /** 账套id */
  tenantId?: number;
  /** 版本 */
  versionNo?: number;
  /** 辅助核算id */
  id?: number;
  /** 项目 */
  projectId?: number;
}

/**
 * 新增凭证（关联既有业务数据）结果 - 凭证明细 - 科目信息。
 */
export interface CreateRefVoucherAcctgTransResultDetailGlAccount {
  /** 是否可编辑 */
  cashItemEditable?: boolean;
  /** 最后修改日期 */
  lastUpdatedStamp?: string;
  /** 准备新增 */
  readyToAdd?: boolean;
  /** 科目编号 */
  code?: string;
  /** 贷方数量 */
  postedCrQty?: number;
  /** 外币余额 */
  endingBalance?: number;
  /** 贷方外币 */
  postedCr?: number;
  /** 借贷方向 */
  drCrDirection?: number;
  /** 借方发生额 */
  postedDr?: number;
  /** 是否辅助账核算 */
  hasSubsidiaryAccounting?: boolean;
  /** 关联辅助核算分类：非EO字段 */
  glAccountXrefList?: AcctgTransGlAccountXrefListItem[];
  /** 借方数量 */
  postedDrQty?: number;
  /** 余额数量 */
  endingQty?: number;
  /** 期初余额：本币 */
  baseOpeningBalance?: number;
  /** 贷方金额 */
  basePostedCr?: number;
  /** 是否创建明细科目 */
  createDetailGlAccount?: boolean;
  /** 借方金额 */
  basePostedDr?: number;
  /** 科目id */
  id?: number;
  /** 余额 */
  baseEndingBalance?: number;
  /** 是否末级科目 */
  isLeafNode?: boolean;
}

// ---------------------------------------------------------------------------
// 5. 新增凭证（外币）
// ---------------------------------------------------------------------------

/**
 * 新增凭证（外币）入参。
 */
export interface CreateForeignCurrencyAcctgTransParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 凭证分类，默认是100001 */
  acctgTransCategoryId: number;
  /** 凭证期间 */
  acctgPeriod: string;
  /** 业务事务类型，100501为凭证，写死即可 */
  bizTypeId: number;
  /** 凭证编号，默认三位，不要超过五位 */
  code: string;
  /** 数据来源：写死AcctgTrans即可 */
  boName: string;
  /** 凭证日期，时间戳格式13位 */
  bizDate: number;
  /** 科目识别，只为外部接口服务，固定写true即可 */
  isCodeType: boolean;
  /** 凭证明细 */
  details: CreateForeignCurrencyAcctgTransParamsDetail[];
  /** 只为外部接口服务，固定写true即可 */
  categoryCodeExist: boolean;
  /** false */
  isFinal: boolean;
  /** 经办人，例如张三 */
  origCreatedUserName: string;
}

/**
 * 新增凭证（外币）入参 - 凭证明细。
 */
export interface CreateForeignCurrencyAcctgTransParamsDetail {
  /** 借方数量 */
  postedDrQty?: number;
  /** 摘要 */
  comments?: string;
  /** 贷方数量 */
  postedCrQty?: number;
  /** 顺序号 */
  sequenceNum?: number;
  /** 单价 */
  price?: number;
  /** 贷方外币 */
  postedCr?: number;
  /** 贷方金额 */
  basePostedCr?: number;
  /** 辅助核算信息 */
  glSubAccount?: CreateForeignCurrencyAcctgTransParamsDetailGlSubAccount;
  /** 借方金额 */
  basePostedDr?: number;
  /** 借方外币 */
  postedDr?: number;
  /** 科目信息 */
  glAccount?: CreateForeignCurrencyAcctgTransParamsDetailGlAccount;
  /** 汇率；外币必填；非外币不填 */
  exchangeRate?: string;
}

/**
 * 新增凭证（外币）入参 - 凭证明细 - 辅助核算信息。
 */
export interface CreateForeignCurrencyAcctgTransParamsDetailGlSubAccount {
  /** 存货辅助核算编码 */
  productCode: string;
  /** 项目编号 */
  projectCode: string;
  /** 部门辅助核算 */
  departmentCode: string;
  /** 客户辅助核算 */
  customerCode: string;
  /** 员工辅助核算 */
  employeeCode: string;
  /** 供应商辅助核算 */
  vendorCode: string;
}

/**
 * 新增凭证（外币）入参 - 凭证明细 - 科目信息。
 * 注：文档说明列与字段名错位（drCrDirection 说明列为「是否是辅助核算」，hasSubsidiaryAccounting 说明列为「是否是末级」，isLeafNode 说明列为「借贷方向」），注释按字段名语义编写。
 */
export interface CreateForeignCurrencyAcctgTransParamsDetailGlAccount {
  /** 科目编号 */
  code: string;
  /** 借贷方向：标示科目借贷类型，借方为1，贷方为-1 */
  drCrDirection: number;
  /** 是否是辅助核算，是写true,否写false */
  hasSubsidiaryAccounting: boolean;
  /** 是否是末级，是写true,否写false */
  isLeafNode: boolean;
}

/**
 * 新增凭证（外币）结果。
 */
export interface CreateForeignCurrencyAcctgTransResult {
  /** 最后修改时间 */
  lastUpdatedStamp?: string;
  /** 接口来源 */
  acctgFromInterfaceSource?: string;
  /** 期间 */
  acctgPeriod?: string;
  /** 凭证编码 */
  code?: string;
  /** 数据来源 */
  boName?: string;
  /** 凭证日期 */
  bizDate?: string;
  /** 单据来源 */
  refVoucherInfo?: string[];
  /** 顺序号 */
  seqNum?: number;
  /** 此字段对客户无用 */
  isCodeType?: boolean;
  /** 针对API接口通过code代替科目id */
  categoryCodeExist?: boolean;
  /** 文档未给说明 */
  bizGlAccountXref?: unknown;
  /** 制单人 */
  origCreatedUserName?: string;
  /** 凭证分类 */
  acctgTransCategoryId?: number;
  /** 业务事务类型 */
  bizTypeId?: number;
  /** 上传的凭证附件数量 */
  uploadAttachmentCount?: number;
  /** 操作用户 */
  draftUserId?: number;
  /** 单据所有者 */
  ownerUserId?: number;
  /** 凭证明细 */
  details?: CreateForeignCurrencyAcctgTransResultDetail[];
  /** id号 */
  id?: number;
  /** 期末结转完成标记 */
  isFinal?: boolean;
}

/**
 * 新增凭证（外币）结果 - 凭证明细。
 */
export interface CreateForeignCurrencyAcctgTransResultDetail {
  /** 最后修改时间 */
  lastUpdatedStamp?: string;
  /** 存商品部门核算 */
  departmentAss?: boolean;
  /** 摘要 */
  comments?: string;
  /** 贷方数量 */
  postedCrQty?: number;
  /** 明细顺序号 */
  sequenceNum?: number;
  /** 辅助核算id */
  glSubAccountId?: number;
  /** 科目id */
  glAccountId?: number;
  /** 贷方外币 */
  postedCr?: number;
  /** 借方外币 */
  postedDr?: number;
  /** 存货核算 */
  productAss?: boolean;
  /** 借方数量 */
  postedDrQty?: number;
  /** 库存商品员工核算 */
  bizEmployeeAss?: boolean;
  /** 主表凭证id */
  masterVoucherId?: number;
  /** 单价 */
  price?: number;
  /** 贷方金额 */
  basePostedCr?: number;
  /** 辅助核算信息 */
  glSubAccount?: CreateForeignCurrencyAcctgTransResultDetailGlSubAccount;
  /** 借方金额 */
  basePostedDr?: number;
  /** 科目信息 */
  glAccount?: CreateForeignCurrencyAcctgTransResultDetailGlAccount;
  /** 凭证明细id */
  id?: number;
  /** 项目核算 */
  projectAss?: boolean;
}

/**
 * 新增凭证（外币）结果 - 凭证明细 - 辅助核算信息。
 */
export interface CreateForeignCurrencyAcctgTransResultDetailGlSubAccount {
  /** 最后更新时间 */
  lastUpdatedStamp?: string;
  /** 创建人员 */
  createdUserId?: number;
  /** 存货 */
  productId?: number;
  /** 创建日期 */
  createdStamp?: string;
  /** 部门 */
  departmentId?: number;
  /** 科目id */
  glAccountId?: number;
  /** 供应商 */
  vendorId?: number;
  /** 员工 */
  employeeId?: number;
  /** 是否辅助 */
  empty?: boolean;
  /** 最后更新人员 */
  lastUpdatedUserId?: number;
  /** 客户 */
  custId?: number;
  /** 账套id */
  tenantId?: number;
  /** 版本 */
  versionNo?: number;
  /** 辅助核算id */
  id?: number;
  /** 项目 */
  projectId?: number;
}

/**
 * 新增凭证（外币）结果 - 凭证明细 - 科目信息。
 */
export interface CreateForeignCurrencyAcctgTransResultDetailGlAccount {
  /** 是否可编辑 */
  cashItemEditable?: boolean;
  /** 最后修改日期 */
  lastUpdatedStamp?: string;
  /** 准备新增 */
  readyToAdd?: boolean;
  /** 科目编号 */
  code?: string;
  /** 贷方数量 */
  postedCrQty?: number;
  /** 外币余额 */
  endingBalance?: number;
  /** 贷方外币 */
  postedCr?: number;
  /** 借贷方向 */
  drCrDirection?: number;
  /** 借方发生额 */
  postedDr?: number;
  /** 是否辅助账核算 */
  hasSubsidiaryAccounting?: boolean;
  /** 关联辅助核算分类：非EO字段 */
  glAccountXrefList?: AcctgTransGlAccountXrefListItem[];
  /** 借方数量 */
  postedDrQty?: number;
  /** 余额数量 */
  endingQty?: number;
  /** 期初余额：本币 */
  baseOpeningBalance?: number;
  /** 贷方金额 */
  basePostedCr?: number;
  /** 是否创建明细科目 */
  createDetailGlAccount?: boolean;
  /** 借方金额 */
  basePostedDr?: number;
  /** 科目id */
  id?: number;
  /** 余额 */
  baseEndingBalance?: number;
  /** 是否末级科目 */
  isLeafNode?: boolean;
}

// ---------------------------------------------------------------------------
// 6. 查询汇率
// ---------------------------------------------------------------------------

/**
 * 查询汇率入参。
 */
export interface QueryCurrencyExchangeByPeriodParams {
  /** 账套id（路径参数） */
  bookid: string;
  /** 外币币种 */
  currencyId: string;
  /** 年度 */
  year: string;
}

/**
 * 查询汇率结果项。
 */
export interface QueryCurrencyExchangeByPeriodResult {
  /** 最后修改时间 */
  lastUpdatedStamp?: string;
  /** 最后修改人 */
  lastUpdatedUserId?: number;
  /** 期间 */
  acctgPeriod?: string;
  /** 创建人 */
  createdUserId?: number;
  /** 汇率 */
  exchangeRate?: string;
  /** 创建时间 */
  createdStamp?: string;
  /** 账套 */
  tenantId?: number;
  /** 版本号 */
  versionNo?: number;
  /** 文档未给说明 */
  id?: number;
  /** 币种 */
  currencyId?: number;
}

// ---------------------------------------------------------------------------
// 7. 外部文件上传凭证附件
// ---------------------------------------------------------------------------

/**
 * 外部文件上传凭证附件入参（对象集合）。
 */
export interface ExternalFileUploadAcctgTransAttachmentParams {
  /** 账套id（路径参数）。注意：文档请求地址含 {bookid} 但未列路径参数表，按通例推断为账套id。 */
  bookid: string;
  /** 对象集合 */
  items: ExternalFileUploadAcctgTransAttachmentItem[];
}

/**
 * 外部文件上传凭证附件 - 对象集合项。
 */
export interface ExternalFileUploadAcctgTransAttachmentItem {
  /** 凭证id */
  acctgTransId: number;
  /** 是否覆盖，true-覆盖，false-不覆盖 */
  isItCovered: boolean;
  /** 附件对象信息集合 */
  details: ExternalFileUploadAcctgTransAttachmentItemDetail[];
}

/**
 * 外部文件上传凭证附件 - 对象集合项 - 附件对象。
 */
export interface ExternalFileUploadAcctgTransAttachmentItemDetail {
  /** 原附件地址，必须是互联网能访问到的 */
  externalFileUrl: string;
  /** 文件类型，类如："pdf" "txt" "png"等 */
  fileType: string;
  /** 文件名称 */
  fileName: string;
  /** 文件大小 */
  attachmentSize: number;
}

/**
 * 外部文件上传凭证附件结果。
 */
export interface ExternalFileUploadAcctgTransAttachmentResult {
  /** 数据 */
  data?: ExternalFileUploadAcctgTransAttachmentResultData[];
  /** true-成功 false-失败 */
  success?: boolean;
  /** 失败原因 */
  errorInfo?: string;
}

/**
 * 外部文件上传凭证附件结果 - 数据项。
 */
export interface ExternalFileUploadAcctgTransAttachmentResultData {
  /** 结果凭证id */
  acctgTransId?: number;
  /** 附件信息结果 */
  attachments?: ExternalFileUploadAcctgTransAttachmentResultDataAttachment[];
}

/**
 * 外部文件上传凭证附件结果 - 数据项 - 附件信息。
 */
export interface ExternalFileUploadAcctgTransAttachmentResultDataAttachment {
  /** 附件名称 */
  fileName?: string;
  /** 是否成功 */
  isSuccess?: boolean;
  /** 失败原因 */
  failMsg?: string;
}

/**
 * 好会计凭证新增模块 API（pzxz00001.md，7 个接口）。
 */
export function createPzxz00001Api(client: ChanjetClient) {
  return {
    /**
     * 新增凭证（期末结转生凭证业务场景）。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.acctgTransCategoryId 凭证分类，默认是100001
     * @param params.acctgPeriod 凭证期间
     * @param params.bizTypeId 业务事务类型，100501为凭证
     * @param params.code 凭证编号
     * @param params.carryForwardTemplateEnum 期末结转的标志
     * @param params.boName 数据来源：写死AcctgTrans即可
     * @param params.bizDate 凭证日期，时间戳格式13位
     * @param params.isCodeType 科目识别，固定写true即可
     * @param params.details 凭证明细
     * @param params.details.postedDrQty 借方数量
     * @param params.details.comments 摘要
     * @param params.details.postedCrQty 贷方数量
     * @param params.details.sequenceNum 顺序号
     * @param params.details.price 单价
     * @param params.details.exchangeRate 汇率
     * @param params.details.postedCr 贷方外币
     * @param params.details.basePostedCr 贷方金额
     * @param params.details.glSubAccount 辅助核算信息
     * @param params.details.glSubAccount.productCode 存货辅助核算编码
     * @param params.details.glSubAccount.projectCode 项目编号
     * @param params.details.glSubAccount.departmentCode 部门辅助核算
     * @param params.details.glSubAccount.customerCode 客户辅助核算
     * @param params.details.glSubAccount.employeeCode 员工辅助核算
     * @param params.details.glSubAccount.vendorCode 供应商辅助核算
     * @param params.details.basePostedDr 借方金额
     * @param params.details.postedDr 借方外币
     * @param params.details.glAccount 科目信息
     * @param params.details.glAccount.code 科目编号
     * @param params.details.glAccount.drCrDirection 借贷方向，借方为1，贷方为-1
     * @param params.details.glAccount.hasSubsidiaryAccounting 是否是辅助核算
     * @param params.details.glAccount.isLeafNode 是否是末级
     * @param params.categoryCodeExist 只为外部接口服务，固定写true即可
     * @param params.isFinal false
     * @returns 新增凭证结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pzxz00001?id=32083
     */
    createCarryForwardAcctgTrans: (params: CreateCarryForwardAcctgTransParams) =>
      client.request<CreateCarryForwardAcctgTransResult>({
        method: 'POST',
        path: '/accounting/gl/AcctgTrans1/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          acctgTransCategoryId: params.acctgTransCategoryId,
          acctgPeriod: params.acctgPeriod,
          bizTypeId: params.bizTypeId,
          code: params.code,
          carryForwardTemplateEnum: params.carryForwardTemplateEnum,
          boName: params.boName,
          bizDate: params.bizDate,
          isCodeType: params.isCodeType,
          details: params.details,
          categoryCodeExist: params.categoryCodeExist,
          isFinal: params.isFinal,
        },
      }),

    /**
     * 新增凭证（辅助核算场景），科目存在辅助核算的情况下新增凭证接口。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.acctgTransCategoryId 凭证分类，默认是100001
     * @param params.acctgPeriod 凭证期间
     * @param params.bizTypeId 业务事务类型，100501为凭证
     * @param params.code 凭证编号
     * @param params.boName 数据来源：写死AcctgTrans即可
     * @param params.bizDate 凭证日期，时间戳格式13位
     * @param params.refVoucherId 外部id bigint(20)
     * @param params.refVoucherCode 外部编码varchar30
     * @param params.isCodeType 科目识别，固定写true即可
     * @param params.details 凭证明细
     * @param params.details.postedDrQty 借方数量
     * @param params.details.comments 摘要
     * @param params.details.postedCrQty 贷方数量
     * @param params.details.sequenceNum 顺序号
     * @param params.details.price 单价
     * @param params.details.exchangeRate 汇率
     * @param params.details.postedCr 贷方外币
     * @param params.details.basePostedCr 贷方金额
     * @param params.details.glSubAccount 辅助核算信息
     * @param params.details.glSubAccount.productCode 存货辅助核算编码
     * @param params.details.glSubAccount.projectCode 项目编号
     * @param params.details.glSubAccount.departmentCode 部门辅助核算
     * @param params.details.glSubAccount.customerCode 客户辅助核算
     * @param params.details.glSubAccount.employeeCode 员工辅助核算
     * @param params.details.glSubAccount.vendorCode 供应商辅助核算
     * @param params.details.glSubAccount.freeSub1 自定义辅助核算1（档案id）
     * @param params.details.glSubAccount.freeSub20 自定义辅助核算20（档案id）
     * @param params.details.glSubAccount.freeSub21 自定辅助核算21（系统枚举）
     * @param params.details.glSubAccount.freeSub25 自定义辅助核算25（自定义枚举）
     * @param params.details.basePostedDr 借方金额
     * @param params.details.postedDr 借方外币
     * @param params.details.glAccount 科目信息
     * @param params.details.glAccount.code 科目编号
     * @param params.details.glAccount.drCrDirection 借贷方向
     * @param params.details.glAccount.hasSubsidiaryAccounting 是否是辅助核算
     * @param params.details.glAccount.isLeafNode 是否是末级
     * @param params.details.currencyId 币种id，科目启用外币核算需要传该参数
     * @param params.categoryCodeExist 只为外部接口服务，固定写true即可
     * @param params.isFinal false
     * @param params.origCreatedUserName 经办人，例如张三
     * @returns 新增凭证（辅助核算）结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pzxz00001?id=32079
     */
    createSubsidiaryAcctgTrans: (params: CreateSubsidiaryAcctgTransParams) =>
      client.request<CreateSubsidiaryAcctgTransResult>({
        method: 'POST',
        path: '/accounting/gl/AcctgTrans5/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          acctgTransCategoryId: params.acctgTransCategoryId,
          acctgPeriod: params.acctgPeriod,
          bizTypeId: params.bizTypeId,
          code: params.code,
          boName: params.boName,
          bizDate: params.bizDate,
          ...(params.refVoucherId !== undefined ? { refVoucherId: params.refVoucherId } : {}),
          ...(params.refVoucherCode !== undefined ? { refVoucherCode: params.refVoucherCode } : {}),
          isCodeType: params.isCodeType,
          details: params.details,
          categoryCodeExist: params.categoryCodeExist,
          isFinal: params.isFinal,
          origCreatedUserName: params.origCreatedUserName,
        },
      }),

    /**
     * 新增凭证（无辅助核算场景），附件保存与科目中存在二级科目和一级科目。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.acctgTransCategoryId 凭证分类，默认是100001
     * @param params.acctgPeriod 凭证期间
     * @param params.bizTypeId 业务事务类型，100501为凭证
     * @param params.code 凭证编号
     * @param params.boName 数据来源：写死AcctgTrans即可
     * @param params.bizDate 凭证日期，时间戳格式13位
     * @param params.isCodeType 科目识别，固定写true即可
     * @param params.attachmentList 附件集合信息
     * @param params.attachmentList.extendData 附件扩展信息
     * @param params.attachmentList.extendData.attachmentName 文件全名
     * @param params.attachmentList.extendData.attachmentSize 附件大小
     * @param params.attachmentList.extendData.attachmentSuffix 文件后缀
     * @param params.attachmentList.extendData.originalUrl 下载地址文件路径
     * @param params.attachmentList.extendData.previewUrl 预览地址
     * @param params.attachmentList.extendData.documentType 文档类型，写死"文件"
     * @param params.attachmentList.extendData.removeTab 是否允许删除文件，写死true
     * @param params.details 凭证明细
     * @param params.details.postedDrQty 借方数量
     * @param params.details.comments 摘要
     * @param params.details.postedCrQty 贷方数量
     * @param params.details.sequenceNum 顺序号
     * @param params.details.price 单价
     * @param params.details.exchangeRate 汇率
     * @param params.details.postedCr 贷方外币
     * @param params.details.basePostedCr 贷方金额
     * @param params.details.glSubAccount 辅助核算信息
     * @param params.details.glSubAccount.productCode 存货辅助核算编码
     * @param params.details.glSubAccount.projectCode 项目编号
     * @param params.details.glSubAccount.departmentCode 部门辅助核算
     * @param params.details.glSubAccount.customerCode 客户辅助核算
     * @param params.details.glSubAccount.employeeCode 员工辅助核算
     * @param params.details.glSubAccount.vendorCode 供应商辅助核算
     * @param params.details.basePostedDr 借方金额
     * @param params.details.postedDr 借方外币
     * @param params.details.glAccount 科目信息
     * @param params.details.glAccount.code 科目编号
     * @param params.details.glAccount.drCrDirection 借贷方向
     * @param params.details.glAccount.hasSubsidiaryAccounting 是否是辅助核算
     * @param params.details.glAccount.isLeafNode 是否是末级
     * @param params.categoryCodeExist 只为外部接口服务，固定写true即可
     * @param params.isFinal false
     * @param params.origCreatedUserName 经办人，例如张三
     * @returns 新增凭证（无辅助核算）结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pzxz00001?id=32081
     */
    createNonSubsidiaryAcctgTrans: (params: CreateNonSubsidiaryAcctgTransParams) =>
      client.request<CreateNonSubsidiaryAcctgTransResult>({
        method: 'POST',
        path: '/accounting/gl/AcctgTrans3/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          acctgTransCategoryId: params.acctgTransCategoryId,
          acctgPeriod: params.acctgPeriod,
          bizTypeId: params.bizTypeId,
          code: params.code,
          boName: params.boName,
          bizDate: params.bizDate,
          isCodeType: params.isCodeType,
          ...(params.attachmentList !== undefined ? { attachmentList: params.attachmentList } : {}),
          details: params.details,
          categoryCodeExist: params.categoryCodeExist,
          isFinal: params.isFinal,
          origCreatedUserName: params.origCreatedUserName,
        },
      }),

    /**
     * 新增凭证（关联发票、日记账、固定资产等既有业务数据）。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.acctgPeriod 凭证期间
     * @param params.code 凭证编号
     * @param params.boName 数据来源：写死AcctgTrans即可
     * @param params.bizDate 凭证日期，时间戳格式13位
     * @param params.refBoName 数据来源标识：FixedAssetModifyEntry-固定资产 CashJournalEntry-日记账 Invoice-发票 Payroll-工资
     * @param params.refVoucherId 外部id
     * @param params.refVoucherCode 外部编码
     * @param params.refVoucherIds 发票、固定资产、日记账等业务来源的id
     * @param params.isCodeType 科目识别，固定写true即可
     * @param params.categoryCodeExist 只为外部接口服务，固定写true即可
     * @param params.origCreatedUserName 经办人，例如张三
     * @param params.acctgTransCategoryId 凭证分类，默认是100001
     * @param params.bizTypeId 业务事务类型，100501为凭证
     * @param params.details 凭证明细
     * @param params.details.postedDrQty 借方数量
     * @param params.details.comments 摘要
     * @param params.details.postedCrQty 贷方数量
     * @param params.details.sequenceNum 顺序号
     * @param params.details.price 单价
     * @param params.details.exchangeRate 汇率
     * @param params.details.postedCr 贷方外币
     * @param params.details.basePostedCr 贷方金额
     * @param params.details.glSubAccount 辅助核算信息
     * @param params.details.glSubAccount.productCode 存货辅助核算编码
     * @param params.details.glSubAccount.projectCode 项目编号
     * @param params.details.glSubAccount.departmentCode 部门辅助核算
     * @param params.details.glSubAccount.customerCode 客户辅助核算
     * @param params.details.glSubAccount.employeeCode 员工辅助核算
     * @param params.details.glSubAccount.vendorCode 供应商辅助核算
     * @param params.details.basePostedDr 借方金额
     * @param params.details.postedDr 借方外币
     * @param params.details.glAccount 科目信息
     * @param params.details.glAccount.code 科目编号
     * @param params.details.glAccount.drCrDirection 借贷方向
     * @param params.details.glAccount.hasSubsidiaryAccounting 是否是辅助核算
     * @param params.details.glAccount.isLeafNode 是否是末级
     * @param params.isFinal false
     * @returns 新增凭证（关联既有业务数据）结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pzxz00001?id=32082
     */
    createRefVoucherAcctgTrans: (params: CreateRefVoucherAcctgTransParams) =>
      client.request<CreateRefVoucherAcctgTransResult>({
        method: 'POST',
        path: '/accounting/gl/AcctgTrans4/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          acctgPeriod: params.acctgPeriod,
          code: params.code,
          boName: params.boName,
          bizDate: params.bizDate,
          refBoName: params.refBoName,
          ...(params.refVoucherId !== undefined ? { refVoucherId: params.refVoucherId } : {}),
          ...(params.refVoucherCode !== undefined ? { refVoucherCode: params.refVoucherCode } : {}),
          refVoucherIds: params.refVoucherIds,
          isCodeType: params.isCodeType,
          categoryCodeExist: params.categoryCodeExist,
          origCreatedUserName: params.origCreatedUserName,
          acctgTransCategoryId: params.acctgTransCategoryId,
          bizTypeId: params.bizTypeId,
          details: params.details,
          isFinal: params.isFinal,
        },
      }),

    /**
     * 新增凭证（外币）。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.acctgTransCategoryId 凭证分类，默认是100001
     * @param params.acctgPeriod 凭证期间
     * @param params.bizTypeId 业务事务类型，100501为凭证
     * @param params.code 凭证编号
     * @param params.boName 数据来源：写死AcctgTrans即可
     * @param params.bizDate 凭证日期，时间戳格式13位
     * @param params.isCodeType 科目识别，固定写true即可
     * @param params.details 凭证明细
     * @param params.details.postedDrQty 借方数量
     * @param params.details.comments 摘要
     * @param params.details.postedCrQty 贷方数量
     * @param params.details.sequenceNum 顺序号
     * @param params.details.price 单价
     * @param params.details.postedCr 贷方外币
     * @param params.details.basePostedCr 贷方金额
     * @param params.details.glSubAccount 辅助核算信息
     * @param params.details.glSubAccount.productCode 存货辅助核算编码
     * @param params.details.glSubAccount.projectCode 项目编号
     * @param params.details.glSubAccount.departmentCode 部门辅助核算
     * @param params.details.glSubAccount.customerCode 客户辅助核算
     * @param params.details.glSubAccount.employeeCode 员工辅助核算
     * @param params.details.glSubAccount.vendorCode 供应商辅助核算
     * @param params.details.basePostedDr 借方金额
     * @param params.details.postedDr 借方外币
     * @param params.details.glAccount 科目信息
     * @param params.details.glAccount.code 科目编号
     * @param params.details.glAccount.drCrDirection 借贷方向
     * @param params.details.glAccount.hasSubsidiaryAccounting 是否是辅助核算
     * @param params.details.glAccount.isLeafNode 是否是末级
     * @param params.details.exchangeRate 汇率；外币必填；非外币不填
     * @param params.categoryCodeExist 只为外部接口服务，固定写true即可
     * @param params.isFinal false
     * @param params.origCreatedUserName 经办人，例如张三
     * @returns 新增凭证（外币）结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pzxz00001?id=32212
     */
    createForeignCurrencyAcctgTrans: (params: CreateForeignCurrencyAcctgTransParams) =>
      client.request<CreateForeignCurrencyAcctgTransResult>({
        method: 'POST',
        path: '/accounting/gl/AcctgTrans6/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          acctgTransCategoryId: params.acctgTransCategoryId,
          acctgPeriod: params.acctgPeriod,
          bizTypeId: params.bizTypeId,
          code: params.code,
          boName: params.boName,
          bizDate: params.bizDate,
          isCodeType: params.isCodeType,
          details: params.details,
          categoryCodeExist: params.categoryCodeExist,
          isFinal: params.isFinal,
          origCreatedUserName: params.origCreatedUserName,
        },
      }),

    /**
     * 查询汇率，返回批量集合，根据acctgPeriod对应的年份月份获取汇率。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.currencyId 外币币种
     * @param params.year 年度
     * @returns 汇率集合
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pzxz00001?id=32215
     */
    queryCurrencyExchangeByPeriod: (params: QueryCurrencyExchangeByPeriodParams) =>
      client.request<QueryCurrencyExchangeByPeriodResult[]>({
        method: 'GET',
        path: '/accounting/acctgplt/CurrencyExchange/queryByPeriod/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { currencyId: params.currencyId, year: params.year },
      }),

    /**
     * 外部文件上传凭证附件（可覆盖方式）。
     *
     * @param params 请求参数
     * @param params.bookid 账套id（路径参数）
     * @param params.items 对象集合
     * @param params.items.acctgTransId 凭证id
     * @param params.items.isItCovered 是否覆盖，true-覆盖，false-不覆盖
     * @param params.items.details 附件对象信息集合
     * @param params.items.details.externalFileUrl 原附件地址，必须是互联网能访问到的
     * @param params.items.details.fileType 文件类型
     * @param params.items.details.fileName 文件名称
     * @param params.items.details.attachmentSize 文件大小
     * @returns 上传结果，`data` 为各凭证附件结果，`success` 表示是否存在还未上传附件就失败了
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/cwxg/pzxz00001?id=32868
     */
    externalFileUploadAcctgTransAttachment: (
      params: ExternalFileUploadAcctgTransAttachmentParams,
    ) =>
      client.request<ExternalFileUploadAcctgTransAttachmentResult>({
        method: 'POST',
        path: '/accounting/gl/AcctgTrans/externalFileUploadAcctgTransAttachment/{bookid}',
        pathParams: { bookid: params.bookid },
        body: params.items,
      }),
  };
}
