/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/pjgl/xzfp.md
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/**
 * 发票管理模块错误码常量表。
 *
 * 仅「采集数电发票日志接口」的文档错误码说明表逐条收录；其余接口的错误码说明表为空，
 * 下面另外收录了各接口响应示例中出现的业务错误码（msg 原文为空）。
 */
export const XZFP_ERROR_CODES = {
  /** 采集数电发票日志接口错误码说明表：入参校验错误，具体看 msg */
  INVOICE_E210: { code: 'invoice.e210', message: '入参校验错误，具体看msg' },
  /** 响应示例出现的业务错误码（新增/修改发票、修改费用单等） */
  INVOICE_E2004: { code: 'invoice.e2004', message: '' },
  INVOICE_E0001: { code: 'invoice.e0001', message: '' },
  INVOICE_E1002: { code: 'invoice.e1002', message: '' },
} as const;

/* -------------------------------------------------------------------------- */
/* 1. 批量新增发票 addAllInvoices                                              */
/* -------------------------------------------------------------------------- */

/** 批量新增发票明细（参数表类型列为 string） */
export interface AddAllInvoicesParamsInvoiceDetailVOs {
  /** 商品名称 */
  invoiceProductName: string;
  /** 商品规格 */
  invoiceProductSpecNo?: string;
  /** 商品单位 */
  baseUomName?: string;
  /** 税率 */
  taxPct: string;
  /** 征税项目：001-货物、002-劳务、003-服务、004-不动产、005-无形资产、006-固定资产 */
  taxationItemEnum: string;
  /** 计税方法：001-一般计税方法-非即征即退、002-一般计税方法-即征即退、003-简易计税方法-非即征即退、004-简易计税方法-即征即退、005-免抵退、006-免税 */
  taxationMethodEnum: string;
  /** 本币不含税金额 */
  baseAmountWithoutTax: string;
  /** 本币含税金额 */
  baseAmountWithTax: string;
  /** 本币税额 */
  baseTax: string;
  /** 含税金额 */
  amountWithTax: string;
  /** 不含税金额 */
  amountWithoutTax: string;
  /** 数量 */
  transQty?: string;
  /** 税额 */
  tax: string;
  /** 单价 */
  priceWithoutTax?: string;
}

/** 批量新增发票单张发票（请求体为数组，本类型描述单个元素，与参数表对齐） */
export interface AddAllInvoicesParams {
  /** 客户/供应商：进项发票为供应商名称，销项发票为客户名称 */
  custVendor: string;
  /** 发票号 */
  invoiceNo: string;
  /** 发票代码 */
  invoiceCode: string;
  /** 进销类型：INCOMING-进项，OUTGOING-销项 */
  inOutTypeEnum: string;
  /** 开票日期 */
  bizDate: string;
  /** 账期 格式yyyyMM 如：202211 */
  acctgPeriod?: string;
  /** 是否认证 */
  isAuth?: boolean;
  /** 认证期间 yyyyMM 如：202211 */
  authPeriod?: string;
  /** 标示是否为电子发票 */
  isElectronic?: boolean;
  /** 备注 */
  comments: string;
  /** 发票类型（枚举） */
  noteTypeEnum: string;
  /** 交易币种 如人民币：100001；港元：10001；美元：10066等 */
  currencyId: number;
  /** 税号 */
  taxNo: string;
  /** 税率 */
  taxPct: string;
  /** 发票总金额 */
  totalAmountWithoutTax: string;
  /** 总税额 */
  totalTax: string;
  /** 价税合计 */
  totalAmountWithTax: string;
  /** 本币无税合计 */
  baseTotalAmountWithoutTax: string;
  /** 本币税额合计 */
  baseTotalTax: string;
  /** 本币价税合计 */
  baseTotalAmountWithTax: string;
  /** 发票明细集合 */
  invoiceDetailVOs: AddAllInvoicesParamsInvoiceDetailVOs[];
  /** 第三方单据标识 */
  requsetSerialNo?: string;
  /** 第三方用户id */
  userId?: string;
}

/* -------------------------------------------------------------------------- */
/* 2. 新增发票 addInvoice                                                     */
/* -------------------------------------------------------------------------- */

/** 新增发票明细 */
export interface AddInvoiceParamsInvoiceDetailVOs {
  /** 商品名称 */
  invoiceProductName?: string;
  /** 商品规格 */
  invoiceProductSpecNo: string;
  /** 商品单位 */
  baseUomName?: string;
  /** 税率 */
  taxPct: number;
  /** 征税项目：001-货物、002-劳务、003-服务、004-不动产、005-无形资产、006-固定资产 */
  taxationItemEnum: string;
  /** 计税方法：001-一般计税方法-非即征即退、002-一般计税方法-即征即退、003-简易计税方法-非即征即退、004-简易计税方法-即征即退、005-免抵退、006-免税 */
  taxationMethodEnum: string;
  /** 本币不含税金额 */
  baseAmountWithoutTax: number;
  /** 本币含税金额 */
  baseAmountWithTax: number;
  /** 本币税额 */
  baseTax: number;
  /** 含税金额 */
  amountWithTax: number;
  /** 不含税金额 */
  amountWithoutTax: number;
  /** 数量 */
  transQty?: number;
  /** 税额 */
  tax: number;
  /** 单价 */
  priceWithoutTax?: number;
}

/** 新增发票请求体 */
export interface AddInvoiceParams {
  /** 客户/供应商：进项发票为供应商名称，销项发票为客户名称（大象回传 使用购买方名称） */
  custVendor: string;
  /** 发票号 */
  invoiceNo: string;
  /** 发票代码：全电票传空 */
  invoiceCode?: string;
  /** 进销类型：INCOMING-进项，OUTGOING-销项（大象回传默认值OUTGOING） */
  inOutTypeEnum: string;
  /** 开票日期 */
  bizDate: string;
  /** 账期 格式yyyyMM 如：202211 进项票传入账的期间，销项票传开票日期所在期间 */
  acctgPeriod?: string;
  /** 是否认证，1已认证，0未认证 */
  isAuth?: boolean;
  /** 认证期间 yyyyMM 如：202211 */
  authPeriod?: string;
  /** 标示是否为电子发票，false为纸票，true为电子发票 */
  isElectronic?: boolean;
  /** 备注 */
  comments: string;
  /** 发票类型（枚举） */
  noteTypeEnum: string;
  /** 全电发票类型：默认GENERAL_INVOICE,通用 */
  feInvoiceLabelEnum?: string;
  /** 交易币种 如人民币：100001；港元：10001；美元：10066等 */
  currencyId: number;
  /** 税号，进项发票为供应商税号，销项发票为客户税号（大象回传 使用购买方名称） */
  taxNo: string;
  /** 税率 税额/金额的平均税率 */
  taxPct?: number;
  /** 发票总金额 */
  totalAmountWithoutTax: number;
  /** 总税额 */
  totalTax: number;
  /** 价税合计 */
  totalAmountWithTax: number;
  /** 总金额 */
  baseTotalAmountWithoutTax: number;
  /** 总税额 */
  baseTotalTax: number;
  /** 价税合计 */
  baseTotalAmountWithTax: number;
  /** 发票原件URL */
  elecInvoiceUrl?: string;
  /** 发票原件名称 */
  fileName?: string;
  /** 传ISV标识,默认：ISSUE */
  invoiceSourceModule?: string;
  /** 默认值：ISSUE */
  invoiceInputMethod?: string;
  /** 发票状态：NORMAL-正常，CANCELLED-作废，CHARGE_OFF-红冲 */
  voucherStatusEnum?: string;
  /** 发票明细集合 */
  invoiceDetailVOs: AddInvoiceParamsInvoiceDetailVOs[];
  /** 销售单据标识，多个单号以','分割 */
  requsetSerialNo?: string;
  /** 用户id */
  userId?: string;
  /** 部门id */
  departmentId?: number;
  /** 人员id */
  bizEmployeeId?: number;
  /** 项目id */
  projectId?: number;
}

/** 新增发票返回（输出参数表仅 code/msg） */
export interface AddInvoiceResult {
  /** 业务错误码（成功为空） */
  code?: string;
  /** 错误消息 */
  msg?: string;
}

/* -------------------------------------------------------------------------- */
/* 3. 费用信息 getFee                                                         */
/* -------------------------------------------------------------------------- */

/** 费用信息查询参数 */
export interface GetFeeParams {
  /** 主键 id */
  id: number;
}

/** 费用信息返回 */
export interface GetFeeResult {
  /** 本币税额 */
  baseTotalTax?: number;
  /** 账期 */
  acctgPeriod?: string;
  /** 单据编码 */
  code?: string;
  /** 是否可抵扣 */
  taxable?: boolean;
  /** 费用种类 */
  kind?: string;
  /** 费用用途 */
  use?: string;
  /** 业务对象名 */
  refBoName?: string;
  /** 记账凭证列表（结构复杂，以响应示例为准） */
  acctgTransList?: Record<string, unknown>[];
  /** 目的地 */
  destination?: number;
  /** 关联发票 */
  vInvoiceId?: { id?: number; invoiceNo?: string };
  /** 本币不含税金额 */
  baseTotalAmountWithoutTax?: number;
  /** 单据序号 */
  ssn?: string;
  /** 原始票据数量 */
  originNoteCount?: number;
  /** 支付方式 */
  payMethod?: string;
  /** 税率 */
  taxPct?: number;
  /** 业务对象名 */
  name?: string;
  /** 本币金额 */
  baseTotalAmount?: number;
  /** 主键 */
  id?: number;
  /** 出发站 */
  departureStation?: number;
  /** 费用类型枚举 */
  feeTypeEnum?: { label?: string; value?: string };
  /** 关联凭证id */
  refVoucherId?: number;
}

/* -------------------------------------------------------------------------- */
/* 4. 发票列表 listInvoice                                                    */
/* -------------------------------------------------------------------------- */

/** 发票列表查询参数 */
export interface ListInvoiceParams {
  /** 账套id */
  tenantId: string;
  /** 期间202002-202002 */
  periods: string;
  /** 页码 */
  page: number;
  /** 每页条数 */
  pageSize: number;
  /** true 查询全部票夹数据，false */
  all: string;
}

/** 发票列表单行（发票类/费用类字段混合） */
export interface ListInvoiceResultDataEntry {
  /** 日期 */
  date?: string;
  /** 金额 */
  amount?: number;
  /** 企业名 */
  orgName?: string;
  /** 价税合计 */
  url?: string;
  /** 价税合计 */
  taxAndAmount?: number;
  /** true 已经被使用，false 未被使用 */
  used?: boolean;
  /** 税 */
  tax?: number;
  /** 发票/费用 ID */
  id?: number;
  /** 发票状态：CANCELLED 作废 CHARGE_OFF 红冲 */
  voucherStatusEnum?: { value?: string };
  /** 类型：invoice 发票 / OTHER 其他费用类 */
  type?: string;
  /** 是否已生成凭证 */
  isSaveVoucher?: boolean;
  /** 商品名/类型名称 */
  productName?: string;
  /** 发票号码 */
  invoiceNo?: string;
  /** 发票代码 */
  invoiceCode?: string;
}

/** 发票列表返回 */
export interface ListInvoiceResult {
  /** 列表票据总数 */
  count?: number;
  /** 总金额 */
  amount?: number;
  /** 票据列表 */
  data?: ListInvoiceResultDataEntry[];
}

/* -------------------------------------------------------------------------- */
/* 5. 查询发票以及关联的凭证 getInvoice                                       */
/* -------------------------------------------------------------------------- */

/** 查询发票查询参数 */
export interface GetInvoiceParams {
  /** 主键 id */
  id: number;
}

/** 客户/供应商联系人 */
export interface GetInvoiceResultCustVendorIdContact {
  /** 地址 */
  address1?: string;
  /** 电话 */
  telephone?: string;
}

/** 客户/供应商信息 */
export interface GetInvoiceResultCustVendorId {
  /** 主键 */
  id?: number;
  /** 名称 */
  partyName?: string;
  /** 税号 */
  taxNo?: string;
  /** 银行 */
  bankAccountNo?: string;
  /** 联系人列表 */
  custVendorContactList?: GetInvoiceResultCustVendorIdContact[];
  /** 地址 */
  primaryContactAddress1?: string;
  /** 开户行 */
  openingBank?: string;
}

/** 枚举值对象 */
export interface GetInvoiceResultEnumValue {
  /** 枚举值 */
  value?: string;
  /** 枚举标签 */
  label?: string;
}

/** 商品税收分类 */
export interface GetInvoiceResultDetailProductTaxCategoryId {
  /** 主键 */
  id?: number;
  /** 编码 */
  code?: string;
  /** 名称 */
  name?: string;
  /** 短名称 */
  shortName?: string;
}

/** 发票明细商品 */
export interface GetInvoiceResultDetailProduct {
  /** 主键 */
  id?: number;
  /** 商品名 */
  name?: string;
  /** 税率 */
  taxPct?: number;
  /** 税收分类 */
  taxCategoryId?: GetInvoiceResultDetailProductTaxCategoryId;
}

/** 发票明细 */
export interface GetInvoiceResultDetail {
  /** 主键 */
  id?: number;
  /** 数量 */
  transQty?: number;
  /** 单价 */
  priceWithoutTax?: number;
  /** 税额 */
  baseTax?: number;
  /** 金额 */
  baseAmountWithoutTax?: number;
  /** 征税项目 */
  taxationItemEnum?: GetInvoiceResultEnumValue;
  /** 征税方法 */
  taxationMethodEnum?: GetInvoiceResultEnumValue;
  /** 商品 */
  product?: GetInvoiceResultDetailProduct;
}

/** 查询发票返回 */
export interface GetInvoiceResult {
  /** 主键 */
  id?: number;
  /** 号码 */
  invoiceNo?: string;
  /** 销售方式（用户可选）：赊账、现金销售 */
  shellMethod?: string;
  /** 采购用途（用户可选）：用于销售、自用资产、办公耗材 */
  buyTarget?: string;
  /** 采购方式：赊账、现金购买 */
  buyMethod?: string;
  /** 资产类型 */
  fixedAssetType?: string;
  /** 代码 */
  invoiceCode?: string;
  /** 期间 */
  acctgPeriod?: string;
  /** 购买方（OUTGOING 销售方） */
  orgName?: string;
  /** INCOMING 销售方，OUTGOING 购买方 */
  custVendorId?: GetInvoiceResultCustVendorId;
  /** 红蓝标志 */
  redBlueFlagEnum?: GetInvoiceResultEnumValue;
  /** 发票类型 */
  noteTypeEnum?: GetInvoiceResultEnumValue;
  /** 开票日 */
  bizDate?: number;
  /** 税额 */
  baseTotalTax?: number;
  /** 金额 */
  baseTotalAmountWithoutTax?: number;
  /** 价税合计 */
  baseTotalAmountWithTax?: number;
  /** 税率 */
  taxPct?: number;
  /** 税号 */
  taxNo?: string;
  /** 备注 */
  comments?: string;
  /** 进销类型 */
  inOutTypeEnum?: GetInvoiceResultEnumValue;
  /** 是否认证 */
  isAuth?: boolean;
  /** 是否模拟认证 */
  simulationCertified?: boolean;
  /** 到期日 */
  dueDate?: number;
  /** 是否电子票 */
  isElectronic?: boolean;
  /** 发票原件URL */
  elecInvoiceUrl?: string;
  /** 报销类型 */
  type?: string;
  /** 发票明细列表 */
  details?: GetInvoiceResultDetail[];
  /** 记账信息 */
  acctgTransList?: Record<string, unknown>[];
}

/* -------------------------------------------------------------------------- */
/* 6. 费用生成凭证 feeToVoucher                                               */
/* 7. 修改费用单 updateFee                                                    */
/* 8. 界面枚举值合集 typeList                                                 */
/* 9. 发票生成凭证 invoiceToVoucher                                           */
/* -------------------------------------------------------------------------- */

/** 界面枚举值合集-费用部分 */
export interface TypeListResultFee {
  /** 支付方式枚举 */
  payMethodEnum?: Record<string, unknown>[];
  /** 费用种类枚举 */
  kindEnum?: Record<string, unknown>[];
  /** 费用用途枚举 */
  useEnum?: Record<string, unknown>[];
}

/** 界面枚举值合集-进项发票-采购方式枚举项 */
export interface TypeListResultInInvoiceBuyMethodEnum {
  /** 枚举值 */
  value?: string;
  /** 枚举 key */
  key?: string;
}

/** 界面枚举值合集-进项发票部分 */
export interface TypeListResultInInvoice {
  /** 采购用途枚举 */
  buyTargetEnum?: Record<string, unknown>[];
  /** 采购方式枚举 */
  buyMethodEnum?: TypeListResultInInvoiceBuyMethodEnum[];
}

/** 界面枚举值合集-销项发票部分 */
export interface TypeListResultOutInvoice {
  /** 销售方式枚举 */
  shellMethodEnum?: Record<string, unknown>[];
}

/** 界面枚举值合集返回 */
export interface TypeListResult {
  /** 费用相关枚举 */
  fee?: TypeListResultFee;
  /** 进项发票枚举 */
  inInvoice?: TypeListResultInInvoice;
  /** 销项发票枚举 */
  outInvoice?: TypeListResultOutInvoice;
}

/* -------------------------------------------------------------------------- */
/* 10. 修改发票 updateInvoice                                                 */
/* -------------------------------------------------------------------------- */

/** 修改发票请求体（仅参数表列出的字段，示例中额外字段以参数表为准） */
export interface UpdateInvoiceParams {
  /** 客户/供应商：进项发票为供应商名称，销项发票为客户名称 */
  custVendor: string;
  /** 发票号 */
  invoiceNo: string;
  /** 进销类型：INCOMING-进项，OUTGOING-销项 */
  inOutTypeEnum: string;
  /** 发票总金额 */
  baseTotalAmountWithoutTax: number;
  /** 本币税额合计 */
  baseTotalTax: number;
  /** 销售方式（用户可选）：赊账、现金销售 */
  shellMethod?: string;
  /** 采购用途（用户可选）：用于销售、自用资产、办公耗材，默认"用于销售" */
  buyTarget?: string;
  /** 采购方式：赊账、现金购买 */
  buyMethod?: string;
  /** 固定资产 类型 */
  fixedAssetType?: string;
  /** 部门id */
  departmentId?: number;
  /** 人员id */
  bizEmployeeId?: number;
  /** 项目id */
  projectId?: number;
}

/** 修改发票返回（输出参数表仅 code/msg） */
export interface UpdateInvoiceResult {
  /** 业务错误码（成功为空） */
  code?: string;
  /** 错误消息 */
  msg?: string;
}

/* -------------------------------------------------------------------------- */
/* 11. 发票汇总数据 allInvoice                                                */
/* -------------------------------------------------------------------------- */

/** 发票汇总查询参数 */
export interface AllInvoiceParams {
  /** 期间 */
  period: string;
}

/** 发票汇总统计项 */
export interface AllInvoiceResultStat {
  /** 税额 */
  TaxAmount?: number;
  /** 金额 */
  Amount?: number;
  /** 数量 */
  Count?: number;
  /** 价税合计 */
  AmountWithTax?: number;
}

/** 发票汇总返回 */
export interface AllInvoiceResult {
  /** 进项发票汇总 */
  invoiceIN?: AllInvoiceResultStat;
  /** 销项发票汇总 */
  invoiceOUT?: AllInvoiceResultStat;
  /** 费用汇总 */
  fee?: AllInvoiceResultStat;
}

/* -------------------------------------------------------------------------- */
/* 12. 采集数电发票日志接口 getInvoiceOrderStats                              */
/* -------------------------------------------------------------------------- */

/** 采集数电发票日志请求体 */
export interface GetInvoiceOrderStatsParams {
  /** 起始期间，yyyyMM格式，如：202401 */
  beginPeriod: string;
  /** 结束期间，yyyyMM格式，如：202403。起止时间仅支持3个月以内的范围 */
  endPeriod: string;
  /** 账套id */
  bookId: number;
}

/** 采集数电发票日志单条 */
export interface GetInvoiceOrderStatsResultData {
  /** 订单批次号 */
  batchNo?: string;
  /** 订单创建时间 */
  createTime?: string;
  /** 采集发票张数 */
  dataNum?: number;
  /** 账套id */
  hkjTenantId?: number;
  /** 采集发票类型 OUTGOING,INCOMING 代表进销项 */
  invoiceType?: string;
  /** 订单类型 1-授权采集,3-定时任务采集 */
  orderType?: number;
  /** 订单企业id */
  orgId?: number;
  /** 订单企业名称 */
  orgName?: string;
  /** 订单地区 */
  province?: string;
  /** 订单税号 */
  taxNo?: string;
}

/** 采集数电发票日志返回（data 为数组） */
export type GetInvoiceOrderStatsResult = GetInvoiceOrderStatsResultData[];

/* -------------------------------------------------------------------------- */
/* 13. 上传文件接口 importData                                                */
/* -------------------------------------------------------------------------- */

/** 上传文件 url 项 */
export interface ImportDataParamsUrl {
  /** ofd pdf png jpg jpeg */
  url?: string;
}

/** 上传文件请求体 */
export interface ImportDataParams {
  /** url 列表 */
  urls?: ImportDataParamsUrl[];
  /** SCAN */
  src?: string;
  /** 期间 yyyymm */
  acctgPeriod?: string;
  /** FEISHU 飞书 DINGDING */
  client?: string;
}

/** 上传文件返回 url 项 */
export interface ImportDataResultDataUrl {
  /** 图片数据上传数据（对照用） */
  pngAllDate?: Record<string, unknown>;
  /** 是否成功 */
  success?: boolean;
  /** 是否重复 */
  dumplite?: string;
  /** pdf上传数据（对照用） */
  pdfAllDate?: Record<string, unknown>;
  /** url */
  url?: string;
}

/** 上传文件返回 */
export interface ImportDataResult {
  /** url 列表（输出参数表必填=是） */
  urls: ImportDataResultDataUrl[];
}

/* -------------------------------------------------------------------------- */
/* 14. 删除发票 deleteInvoice                                                 */
/* -------------------------------------------------------------------------- */

/** 删除发票查询参数 */
export interface DeleteInvoiceParams {
  /** 主键标识 */
  id: number;
}

/* -------------------------------------------------------------------------- */
/* 15. （外部接口）查询发票信息 getInvoiceInfo                               */
/* -------------------------------------------------------------------------- */

/** 查询发票信息请求体（invoiceStr 为 JSON 字符串，见文档说明） */
export interface GetInvoiceInfoParams {
  /** JSON 字符串，形如 {"invoiceNo":"...","invoiceCode":"...","id":...} */
  invoiceStr: string;
}

/** 结算方式科目（官方原文拼写 settlemenGlAccount） */
export interface GetInvoiceInfoResultSettlemenGlAccount {
  /** 结算方式科目id */
  id?: number;
  /** 结算方式科目编码 */
  code?: string;
  /** 结算方式科目名称 */
  name?: string;
}

/** 辅助项公共结构（存货/部门/客户/供应商/员工/项目 辅助项形状一致） */
export interface GetInvoiceInfoResultSubAccount {
  /** 辅助项id */
  id?: number;
  /** 辅助项编码 */
  code?: string;
  /** 辅助项名称 */
  name?: string;
}

/** 结算方式科目辅助项 */
export interface GetInvoiceInfoResultSettlementGlSubAccountObject {
  /** 结算方式科目辅助项表id */
  id?: number;
  /** 存货辅助项 */
  productId?: GetInvoiceInfoResultSubAccount;
  /** 部门辅助项 */
  departmentId?: GetInvoiceInfoResultSubAccount;
  /** 客户辅助项 */
  custId?: GetInvoiceInfoResultSubAccount;
  /** 供应商辅助项 */
  vendorId?: GetInvoiceInfoResultSubAccount;
  /** 员工辅助项 */
  employeeId?: GetInvoiceInfoResultSubAccount;
  /** 项目辅助项 */
  projectId?: GetInvoiceInfoResultSubAccount;
}

/** 发票明细科目 */
export interface GetInvoiceInfoResultInvoiceDetailVOsGlAccount {
  /** 发票明细科目id */
  id?: number;
  /** 发票明细科目编码 */
  code?: string;
  /** 发票明细科目名称 */
  name?: string;
}

/** 发票详情明细 */
export interface GetInvoiceInfoResultInvoiceDetailVOs {
  /** 不含税金额 */
  amountWithoutTax?: number;
  /** 商品规格 */
  invoiceProductSpecNo?: string;
  /** 商品id */
  invoiceProductId?: number;
  /** 商品名称 */
  invoiceProductName?: string;
  /** 税额 */
  tax?: number;
  /** 本币含税金额 */
  baseAmountWithTax?: number;
  /** 商品税率 */
  taxPct?: number;
  /** 本币税额 */
  baseTax?: string;
  /** 数量 */
  transQty?: number;
  /** 商品单位 */
  baseUomName?: string;
  /** 征税项目 */
  taxationItemEnum?: string;
  /** 单价 */
  priceWithoutTax?: number;
  /** 计税方法 */
  taxationMethodEnum?: string;
  /** 本币不含税金额 */
  baseAmountWithoutTax?: number;
  /** 含税金额 */
  amountWithTax?: string;
  /** 发票明细科目 */
  glAccount?: GetInvoiceInfoResultInvoiceDetailVOsGlAccount;
  /** 存货id */
  productId?: number;
  /** 存货编码 */
  productCode?: string;
  /** 存货名称 */
  productName?: string;
}

/** 查询发票信息返回 */
export interface GetInvoiceInfoResult {
  /** 发票总金额 */
  totalAmountWithoutTax?: number;
  /** 本币税额合计 */
  baseTotalTax?: number;
  /** 备注 */
  comments?: string;
  /** 开票日期 */
  bizDate?: string;
  /** 1是电子票 0不是电子票 */
  isElectronic?: number;
  /** 发票代码 */
  invoiceCode?: string;
  /** 本币无税合计 */
  baseTotalAmountWithoutTax?: number;
  /** 本币价税合计 */
  baseTotalAmountWithTax?: number;
  /** 客户/供应商：进项发票为供应商名称，销项发票为客户名称 */
  custVendor?: string;
  /** 总税额 */
  totalTax?: number;
  /** pdf 的附件url */
  elecInvoiceUrl?: string;
  /** 税率 */
  taxPct?: number;
  /** 价税合计 */
  totalAmountWithTax?: number;
  /** 进销类型：INCOMING-进项（收到的发票），OUTGOING-销项（开出的发票） */
  inOutTypeEnum?: string;
  /** 结算方式科目 */
  settlemenGlAccount?: GetInvoiceInfoResultSettlemenGlAccount;
  /** 结算方式科目辅助项 */
  settlementGlSubAccountObject?: GetInvoiceInfoResultSettlementGlSubAccountObject;
  /** 减免税项目id */
  favorableTaxPolicyId?: number;
  /** 是否税局代开 */
  isTaxOfficeInstead?: boolean;
  /** 是否差额征税 */
  isDifferentialTax?: boolean;
  /** 扣减额 */
  discount?: string;
  /** 发票详情（参数表类型列为 object，但字段名复数且响应示例为数组，故按数组建模） */
  invoiceDetailVOs?: GetInvoiceInfoResultInvoiceDetailVOs[];
  /** 发票号 */
  invoiceNo?: string;
  /** 发票类型 */
  note_type_enum?: string;
  /** 交易币种 */
  currencyId?: number;
  /** 税号 */
  taxNo?: string;
  /** 发票id */
  id?: number;
}

/* -------------------------------------------------------------------------- */
/* 16. （外部接口）新增发票 addInvoiceExternal                                */
/* -------------------------------------------------------------------------- */

/** 外部新增发票明细 */
export interface AddInvoiceExternalParamsInvoiceDetailVOs {
  /** 不含税金额 */
  amountWithoutTax?: number;
  /** 商品规格 */
  invoiceProductSpecNo?: string;
  /** 商品名称 */
  invoiceProductName?: string;
  /** 税额 */
  tax?: number;
  /** 本币含税金额 */
  baseAmountWithTax?: number;
  /** 商品税率 */
  taxPct?: number;
  /** 本币税额 */
  baseTax?: string;
  /** 数量 */
  transQty?: number;
  /** 商品单位 */
  baseUomName?: string;
  /** 征税项目 */
  taxationItemEnum?: string;
  /** 单价 */
  priceWithoutTax?: number;
  /** 计税方法 */
  taxationMethodEnum?: string;
  /** 本币不含税金额 */
  baseAmountWithoutTax?: number;
  /** 含税金额 */
  amountWithTax?: string;
}

/** 外部新增发票请求体 */
export interface AddInvoiceExternalParams {
  /** 价税合计 */
  totalAmountWithoutTax?: number;
  /** 本币税额合计 */
  baseTotalTax?: number;
  /** 备注 */
  comments?: string;
  /** 开票日期 */
  bizDate?: string;
  /** 1是电子票 0不是电子票 */
  isElectronic?: number;
  /** 发票代码 */
  invoiceCode?: string;
  /** 本币无税合计 */
  baseTotalAmountWithoutTax?: number;
  /** 本币价税合计 */
  baseTotalAmountWithTax?: number;
  /** 客户/供应商：进项发票为供应商名称，销项发票为客户名称 */
  custVendor?: string;
  /** 总税额 */
  totalTax?: number;
  /** pdf 的附件url */
  elecInvoiceUrl?: string;
  /** 税率 */
  taxPct?: number;
  /** 发票总金额 */
  totalAmountWithTax?: number;
  /** 进销类型：INCOMING-进项（收到的发票），OUTGOING-销项（开出的发票） */
  inOutTypeEnum?: string;
  /** 发票详情（参数表类型列为 object，但字段名复数且请求示例为数组，故按数组建模） */
  invoiceDetailVOs?: AddInvoiceExternalParamsInvoiceDetailVOs[];
  /** 发票号 */
  invoiceNo?: string;
  /** 发票类型（官方原文字段名 notetypeenum） */
  notetypeenum?: string;
  /** 交易币种 */
  currencyId?: number;
  /** 税号 */
  taxNo?: string;
}

/** 外部新增发票返回 */
export interface AddInvoiceExternalResult {
  /** 是否生成日记账 */
  cashJournalEntryGenerated?: boolean;
  /** 返回新增的发票id */
  id: number;
}

/* -------------------------------------------------------------------------- */
/* 工厂函数与方法集                                                          */
/* -------------------------------------------------------------------------- */

/** 发票管理（xzfp）模块方法集 */
export interface XzfpApi {
  /**
   * 批量新增发票。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @param params 发票数组（文档参数表描述单张发票字段，请求体为数组）
   * @returns 无输出参数表定义，成功返回结构未在文档中给出
   * @throws {ChanjetApiError} 远端返回业务错误（如 invoice.e2004）、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-30622
   */
  addAllInvoices(bookid: string, params: AddAllInvoicesParams[]): Promise<unknown>;

  /**
   * 新增发票。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @param params 请求体
   * @returns 输出仅 code/msg
   * @throws {ChanjetApiError} 远端返回业务错误（如 invoice.e2004）、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-30418
   */
  addInvoice(bookid: string, params: AddInvoiceParams): Promise<AddInvoiceResult>;

  /**
   * 费用信息。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @param params 查询参数
   * @param params.id 主键 id，必填
   * @returns 费用信息详情
   * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-31516
   */
  getFee(bookid: string, params: GetFeeParams): Promise<GetFeeResult>;

  /**
   * 发票列表（票据列表）。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @param params 查询参数
   * @param params.tenantId 账套id，必填
   * @param params.periods 期间202002-202002，必填
   * @param params.page 页码，必填
   * @param params.pageSize 每页条数，必填
   * @param params.all true 查询全部票夹数据，false，必填
   * @returns 票据列表
   * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-31538
   */
  listInvoice(bookid: string, params: ListInvoiceParams): Promise<ListInvoiceResult>;

  /**
   * 查询发票以及关联的凭证。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @param params 查询参数
   * @param params.id 主键 id，必填
   * @returns 发票及关联凭证信息
   * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-31517
   */
  getInvoice(bookid: string, params: GetInvoiceParams): Promise<GetInvoiceResult>;

  /**
   * 费用生成凭证。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @returns 生成结果（data 为 boolean）
   * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-31545
   */
  feeToVoucher(bookid: string): Promise<boolean>;

  /**
   * 修改费用单。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @returns 无输出参数表定义，成功返回结构未在文档中给出
   * @throws {ChanjetApiError} 远端返回业务错误（如 invoice.e2004）、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-31282
   */
  updateFee(bookid: string): Promise<unknown>;

  /**
   * 界面枚举值合集。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @returns 界面枚举值合集
   * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-31549
   */
  typeList(bookid: string): Promise<TypeListResult>;

  /**
   * 发票生成凭证。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @returns 生成结果（data 为 boolean）
   * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-31546
   */
  invoiceToVoucher(bookid: string): Promise<boolean>;

  /**
   * 修改发票。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @param params 请求体（仅参数表列出的字段）
   * @returns 输出仅 code/msg
   * @throws {ChanjetApiError} 远端返回业务错误（如 invoice.e2004）、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-31616
   */
  updateInvoice(bookid: string, params: UpdateInvoiceParams): Promise<UpdateInvoiceResult>;

  /**
   * 发票汇总数据（发票统计）。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @param params 查询参数
   * @param params.period 期间，必填
   * @returns 进项/销项/费用三组汇总统计
   * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-31515
   */
  allInvoice(bookid: string, params: AllInvoiceParams): Promise<AllInvoiceResult>;

  /**
   * 采集数电发票日志接口：按账套查询数电票采集日志列表。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @param params 请求体
   * @param params.beginPeriod 起始期间，yyyyMM格式，如：202401，必填
   * @param params.endPeriod 结束期间，yyyyMM格式，如：202403，起止时间仅支持3个月以内的范围，必填
   * @param params.bookId 账套id，必填
   * @returns 采集日志列表
   * @throws {ChanjetApiError} 远端返回业务错误（如 invoice.e210 入参校验错误）、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-32877
   */
  getInvoiceOrderStats(
    bookid: string,
    params: GetInvoiceOrderStatsParams,
  ): Promise<GetInvoiceOrderStatsResult>;

  /**
   * 上传文件接口。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @param params 请求体
   * @param params.urls url 列表，可选
   * @param params.urls[].url ofd pdf png jpg jpeg，可选
   * @param params.src 固定 SCAN，可选
   * @param params.acctgPeriod 期间 yyyymm，可选
   * @param params.client FEISHU 飞书 / DINGDING，可选
   * @returns 上传结果
   * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-32893
   */
  importData(bookid: string, params: ImportDataParams): Promise<ImportDataResult>;

  /**
   * 删除发票。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @param params 查询参数
   * @param params.id 主键标识，必填
   * @returns 无输出参数表定义，成功返回结构未在文档中给出
   * @throws {ChanjetApiError} 远端返回业务错误（如 invoice.e0001、invoice.e1002）、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-30436
   */
  deleteInvoice(bookid: string, params: DeleteInvoiceParams): Promise<unknown>;

  /**
   * （外部接口）查询发票信息。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @param params 请求体（GET 请求携带的 body）
   * @param params.invoiceStr JSON 字符串（含 invoiceNo/invoiceCode/id/redBlueFlagEnum/inOutTypeEnum/noteTypeEnum），必填
   * @returns 发票信息
   * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-31842
   */
  getInvoiceInfo(bookid: string, params: GetInvoiceInfoParams): Promise<GetInvoiceInfoResult>;

  /**
   * （外部接口）新增发票。
   *
   * @param bookid 账套id，必填，作为路径参数
   * @param params 请求体（官方建议从 getInvoiceInfo 的 data 取值作为参数）
   * @returns 新增结果，`id` 为新增的发票id
   * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/xzfp#api-31841
   */
  addInvoiceExternal(
    bookid: string,
    params: AddInvoiceExternalParams,
  ): Promise<AddInvoiceExternalResult>;
}

/** 创建发票管理（xzfp）模块 API 方法集 */
export function createXzfpApi(client: ChanjetClient): XzfpApi {
  return {
    addAllInvoices(bookid: string, params: AddAllInvoicesParams[]): Promise<unknown> {
      return client.request<unknown>({
        method: 'POST',
        path: '/accounting/invoice/Invoice/addAllInvoices/{bookid}',
        pathParams: { bookid },
        body: params,
      });
    },

    addInvoice(bookid: string, params: AddInvoiceParams): Promise<AddInvoiceResult> {
      return client.request<AddInvoiceResult>({
        method: 'POST',
        path: '/accounting/invoice/Invoice/{bookid}',
        pathParams: { bookid },
        body: params,
      });
    },

    getFee(bookid: string, params: GetFeeParams): Promise<GetFeeResult> {
      return client.request<GetFeeResult>({
        method: 'GET',
        path: '/accounting/wap/Invoice/getFee/{bookid}',
        pathParams: { bookid },
        query: { id: params.id },
      });
    },

    listInvoice(bookid: string, params: ListInvoiceParams): Promise<ListInvoiceResult> {
      return client.request<ListInvoiceResult>({
        method: 'GET',
        path: '/accounting/wap/Invoice/listInvoice/{bookid}',
        pathParams: { bookid },
        query: { ...params },
      });
    },

    getInvoice(bookid: string, params: GetInvoiceParams): Promise<GetInvoiceResult> {
      return client.request<GetInvoiceResult>({
        method: 'GET',
        path: '/accounting/wap/Invoice/getInvoice/{bookid}',
        pathParams: { bookid },
        query: { id: params.id },
      });
    },

    feeToVoucher(bookid: string): Promise<boolean> {
      return client.request<boolean>({
        method: 'POST',
        path: '/accounting/third/Invoice/feeToVoucher/{bookid}',
        pathParams: { bookid },
      });
    },

    updateFee(bookid: string): Promise<unknown> {
      return client.request<unknown>({
        method: 'PUT',
        path: '/accounting/voucher/fee/{bookid}',
        pathParams: { bookid },
      });
    },

    typeList(bookid: string): Promise<TypeListResult> {
      return client.request<TypeListResult>({
        method: 'GET',
        path: '/accounting/third/Invoice/typeList/{bookid}',
        pathParams: { bookid },
      });
    },

    invoiceToVoucher(bookid: string): Promise<boolean> {
      return client.request<boolean>({
        method: 'POST',
        path: '/accounting/third/Invoice/invoiceToVoucher/{bookid}',
        pathParams: { bookid },
      });
    },

    updateInvoice(bookid: string, params: UpdateInvoiceParams): Promise<UpdateInvoiceResult> {
      return client.request<UpdateInvoiceResult>({
        method: 'PUT',
        path: '/accounting/invoice/Invoice/{bookid}',
        pathParams: { bookid },
        body: params,
      });
    },

    allInvoice(bookid: string, params: AllInvoiceParams): Promise<AllInvoiceResult> {
      return client.request<AllInvoiceResult>({
        method: 'GET',
        path: '/accounting/wap/AutoInvoice/allInvoice/{bookid}',
        pathParams: { bookid },
        query: { period: params.period },
      });
    },

    getInvoiceOrderStats(
      bookid: string,
      params: GetInvoiceOrderStatsParams,
    ): Promise<GetInvoiceOrderStatsResult> {
      return client.request<GetInvoiceOrderStatsResult>({
        method: 'POST',
        path: '/accounting/invoice/BasicService/getInvoiceOrderStats/{bookid}',
        pathParams: { bookid },
        body: params,
      });
    },

    importData(bookid: string, params: ImportDataParams): Promise<ImportDataResult> {
      return client.request<ImportDataResult>({
        method: 'POST',
        path: '/accounting/invoice/InvoiceScan/importData/{bookid}',
        pathParams: { bookid },
        body: params,
      });
    },

    deleteInvoice(bookid: string, params: DeleteInvoiceParams): Promise<unknown> {
      return client.request<unknown>({
        method: 'DELETE',
        path: '/accounting/invoice/Invoice/{bookid}',
        pathParams: { bookid },
        query: { id: params.id },
      });
    },

    getInvoiceInfo(bookid: string, params: GetInvoiceInfoParams): Promise<GetInvoiceInfoResult> {
      return client.request<GetInvoiceInfoResult>({
        method: 'GET',
        path: '/accounting/invoice/invoiceSyn/getInvoiceInfo/{bookid}',
        pathParams: { bookid },
        body: params,
      });
    },

    addInvoiceExternal(
      bookid: string,
      params: AddInvoiceExternalParams,
    ): Promise<AddInvoiceExternalResult> {
      return client.request<AddInvoiceExternalResult>({
        method: 'POST',
        path: '/accounting/invoice/invoiceSyn/addInvoice/{bookid}',
        pathParams: { bookid },
        body: params,
      });
    },
  };
}
