/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/zt/jcda-zt.md
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/** 账套管理错误码表（文档"错误码说明"逐条收录）。 */
export const JCDA_ZT_ERROR_CODES = {
  THIRDSRV_E0004: {
    code: 'thirdsrv.e0004',
    message: '当前用户未授权访问，cannot access app: user without any tenant',
  },
  SAAS_001: { code: 'saas.001', message: '参数错误' },
} as const;

/** 账套绑定请求参数。 */
export interface BindTenantParams {
  /** 账套ID，路径参数，必填 */
  bookid: number;
  /** 绑定主tenantId，在好会计绑定ISV应用的账套id或是唯一标识，请求体，必填 */
  masterTenantId: number;
  /** 绑定从tenantId，在好会计绑定ISV应用场景永远是好会计的账套id，请求体，必填 */
  slaveTenantId: number;
  /** 绑定的类型枚举：BINDING_HKJ_TO_HSY=好会计和好生意绑定；BINDING_HKJ_TO_THIRD_PLATFORM=好会计和第三方平台绑定，请求体，必填 */
  bindingTypeEnum: string;
  /** 主账套名称，请求体，必填 */
  masterTenantName: string;
  /** 从账套名称，请求体，必填 */
  slaveTenantName: string;
  /** 绑定的档案bo名称数组，为空时默认 商品/往来单位/部门/员工/项目/计量单位，请求体，可选 */
  bindingBoNames?: string[];
}

/** 账套绑定返回结果。 */
export interface BindTenantResult {
  /** 绑定结果 */
  result?: boolean;
  /** 错误信息 */
  errorInfo?: string;
}

/** 取消绑定账套请求参数。 */
export interface UnbindTenantParams {
  /** 账套id，路径参数，必填 */
  bookid: number;
  /** 取消绑定的帐套id，查询参数，必填 */
  tenantId: number;
}

/** 账套（列表返回结构）。 */
export interface AccountBook {
  /** 会计制度id */
  acctgSystemId?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 账套id */
  id?: number;
  /** 是否隐藏 */
  isHidden?: boolean;
  /** 当前财务数据期间 */
  latestFiOpenPeriod?: string;
  /** 账套名 */
  name?: string;
  /** 启用次数（文档标注 string） */
  enabledTimes?: string;
  /** 开账期间 */
  openingPeriod?: string;
  /** 凭证是否需要审核 */
  acctgTransApprovalRequired?: boolean;
  /** 报税行业id */
  taxIndustryId?: number;
  /** 税号 */
  taxNo?: string;
  /** 纳税性质 */
  taxpayerTypeEnum?: string;
  /** 账套编码 */
  bookCode?: string;
  /** 企业ID */
  enterpriseId?: string;
  /** 账套所属企业名称 */
  tenantOwnerName?: string;
  /** 凭证类别分组：ACCTG-记账、RECEIPT_PAYMENT_TRANSFER-收付转 */
  acctgTransGroupEnum?: string;
  /** 应用ID：如好会计=59，易代账=1065 */
  primaryAppId?: number;
}

/** 获取账套列表返回结果。 */
export type GetAccountBookListResult = AccountBook[];

/** 获取账套信息请求参数。 */
export interface GetAccountBookParams {
  /** 账套id，路径参数（请求地址 {bookid} 推断），必填 */
  bookid: number;
  /** 账套id，查询参数，可选 */
  tenantId?: number;
}

/** 获取账套信息返回结果（文档"输出参数"表仅列 acctgTransGroup，字段由响应示例补全）。 */
export interface GetAccountBookResult {
  /** 会计制度id */
  acctgSystemId?: number;
  /** 凭证类别 */
  acctgTransGroup?: string;
  /** 科目级次 */
  glAccountCodeLen?: string;
  /** 账套id */
  id?: number;
  /** 账套名称 */
  name?: string;
  /** 开账期间 */
  openingPeriod?: string;
  /** 账套所属企业名称 */
  tenantOwnerName?: string;
  /** 报税地区 */
  taxGeoName?: string;
  /** 报税行业 */
  taxIndustryId?: number;
  /** 税号 */
  taxNo?: string;
  /** 纳税性质 */
  taxpayerTypeEnum?: string;
  /** 凭证是否需要审核 */
  acctgTransApprovalRequired?: boolean;
}

/** 行业信息列表请求参数。 */
export interface QueryTaxIndustryParams {
  /** 账套ID，路径参数，必填 */
  bookid: number;
}

/** 行业信息。 */
export interface QueryTaxIndustryResult {
  /** 行业ID */
  id?: number;
  /** 行业名称 */
  name?: string;
  /** 检索关键字 */
  searchText?: string;
}

/** 账套导入检查请求参数。 */
export interface ImportCheckTenantDataParams {
  /** 账套id，路径参数（请求地址 {bookid} 推断；文档"路径参数"表误列 ossURL/newName），必填 */
  bookid: number;
  /** 账套云存储地址，查询参数（文档误列于"路径参数"表），必填 */
  ossURL: string;
  /** 指定账套名称导入，查询参数（文档误列于"路径参数"表），可选 */
  newName?: string;
}

/** 账套导入检查返回结果。 */
export interface ImportCheckTenantDataResult {
  /** 文件唯一标识，导入账套时必须用到的参数 */
  fileName?: string;
  /** 导入提示 */
  data?: string;
  /** 检查是否通过 */
  isSuccess?: boolean;
}

/** 账套导入请求参数。 */
export interface ImportTenantDataParams {
  /** 账套id，路径参数（请求地址 {bookid} 推断），必填 */
  bookid: number;
  /** 文件唯一标识，从账套导入检查接口获取，查询参数，必填 */
  fileName: string;
}

/** 账套导入返回结果（字段由响应示例推导，文档未提供输出参数表）。 */
export interface ImportTenantDataResult {
  taxpayerTypeEnum?: string;
  acctgSystemId?: number;
  bookCode?: string;
  createdUserId?: number;
  bookSourceEnum?: string;
  isMainTenant?: boolean;
  acctgTransGroupEnum?: string;
  enabledTimes?: number;
  isHidden?: boolean;
  latestFiOpenPeriod?: string;
  cashFlowOpeningPeriod?: string;
  glAccountCodeLen?: string;
  domainName?: string;
  openingPeriod?: string;
  primaryAppId?: number;
  name?: string;
  acctgTransApprovalRequired?: boolean;
  priceScale?: number;
  disabled?: boolean;
  enterpriseId?: number;
  id?: number;
  enableCustomizedReport?: boolean;
}

/** 账套导出请求参数。 */
export interface DownloadTenantDataParams {
  /** 导出的目标账套ID，路径参数（请求地址 {bookid}；文档"路径参数"表名为 bookId），必填 */
  bookid: number;
}

/** 账套导出返回结果。 */
export interface DownloadTenantDataResult {
  /** 文件下载地址 */
  ossURL?: string;
}

/** 编辑账套请求参数。 */
export interface UpdateAccountBookParams {
  /** 账套ID，路径参数（请求地址 {bookid} 推断；请求体另含同名 id），必填 */
  bookid: number;
  /** 账套ID，请求体，必填 */
  id: number;
  /** 账套名称，请求体，必填 */
  name: string;
  /** 会计制度：10001=2013小企业会计准则；10002=2007企业会计准则；10003=民间非营利组织会计制度；
   * 10004=工会会计制度；10008=农民专业合作社会计制度；10009=村集体经济组织会计制度，请求体，必填 */
  acctgSystemId: number;
  /** 开账期间，格式yyyyMM，如202009，请求体，必填 */
  openingPeriod: string;
  /** 纳税性质：NORMAL_TAXPAYER=一般纳税人；SMALL_TAXPAYER=小规模纳税人，请求体，必填 */
  taxpayerTypeEnum: string;
  /** 账套所属企业名称，请求体，可选 */
  tenantOwnerName?: string;
  /** 行业ID，请求体，可选（文档标注 string，响应示例为数字） */
  taxIndustryId?: string;
  /** 税号，请求体，可选 */
  taxNo?: string;
}

/** 编辑账套返回结果。 */
export interface UpdateAccountBookResult {
  id?: number;
  bookCode?: string;
  name?: string;
  acctgSystemId?: number;
  openingPeriod?: string;
  taxpayerTypeEnum?: string;
  tenantOwnerName?: string;
  taxIndustryId?: number;
  taxNo?: string;
}

/** 删除账套请求参数。 */
export interface DeleteAccountBookParams {
  /** 要删除的账套ID，路径参数（文档"路径参数"表名为 id），必填 */
  bookid: number;
}

/** 删除账套返回结果。 */
export interface DeleteAccountBookResult {
  id?: number;
}

/** 隐藏/显示账套请求参数。 */
export interface UpdateAccountBookHiddenStatusParams {
  /** 账套id，路径参数（请求地址 {bookid} 推断），必填 */
  bookid: number;
  /** 需要隐藏或显示的账套ID，请求体，必填 */
  id: number;
  /** 隐藏标识：true-隐藏，false-显示，请求体，必填 */
  hidden: boolean;
}

/** 检查并导入data请求参数。 */
export interface CheckAndImportTenantDataParams {
  /** 账套id，路径参数（请求地址 {bookid} 推断；文档"路径参数"表误列 ossURL/newName），必填 */
  bookid: number;
  /** 账套云存储地址，查询参数（文档误列于"路径参数"表），必填 */
  ossURL: string;
  /** 指定账套名称导入，查询参数（文档误列于"路径参数"表），可选 */
  newName?: string;
}

/** 检查并导入data返回结果。 */
export interface CheckAndImportTenantDataResult {
  /** true-成功 false-失败 */
  isSuccess?: boolean;
  /** 账套信息或提示信息 */
  data?: Record<string, unknown>;
}

/** 禁用/启用账套（disabledStatus）请求参数。 */
export interface UpdateAccountBookDisabledStatusParams {
  /** 账套id，路径参数（请求地址 {bookid} 推断），必填 */
  bookid: number;
  /** 需要禁用或启用的账套ID，请求体，必填 */
  id: number;
  /** 禁用标识：true-禁用，false-启用，请求体，必填 */
  disabled: boolean;
}

/** 编辑企业信息请求参数。 */
export interface UpdateOrgInfoParams {
  /** 账套id，路径参数（请求地址 {bookid} 推断），必填 */
  bookid: number;
  /** 账套ID，请求体，必填 */
  id: number;
  /** 账套所属企业名称，请求体，必填 */
  tenantOwnerName: string;
  /** 税号，请求体，必填 */
  taxNo: string;
}

/** 编辑企业信息返回结果（与编辑账套同构）。 */
export type UpdateOrgInfoResult = UpdateAccountBookResult;

/** 新增账套请求参数。 */
export interface CreateAccountBookParams {
  /** 账套名称，请求体，必填 */
  name: string;
  /** 会计制度：10001=2013小企业会计准则；10002=2007企业会计准则；10003=民间非营利组织会计制度；
   * 10004=工会会计制度；10008=农民专业合作社会计制度；10009=村集体经济组织会计制度，请求体，必填 */
  acctgSystemId: number;
  /** 开账期间，格式yyyyMM，如202009，请求体，必填 */
  openingPeriod: string;
  /** 纳税性质：NORMAL_TAXPAYER=一般纳税人；SMALL_TAXPAYER=小规模纳税人，请求体，必填 */
  taxpayerTypeEnum: string;
  /** 科目体系-科目初始化参照的纳税性质，默认为空取taxpayerTypeEnum；自定义科目体系时传递：
   * NORMAL_TAXPAYER=按一般纳税人；SMALL_TAXPAYER=按小规模纳税人，请求体，可选 */
  glAccountTaxpayerTypeEnum?: string;
  /** 凭证类别：ACCTG=记账凭证等；RECEIPT_PAYMENT_TRANSFER=收付转凭证，请求体，可选 */
  acctgTransGroupEnum?: string;
  /** 凭证是否需要审核，请求体，可选 */
  acctgTransApprovalRequired?: boolean;
  /** 账套所属企业名称，请求体，可选 */
  tenantOwnerName?: string;
  /** 行业ID，取自行业信息列表接口，请求体，可选 */
  taxIndustryId?: number;
  /** 税号，请求体，可选 */
  taxNo?: string;
  /** 报税地区ID，枚举值（11 北京、12 天津、13 河北等），请求体，可选 */
  taxAreaId?: number;
}

/** 新增账套返回结果。 */
export interface CreateAccountBookResult {
  id?: number;
  bookCode?: string;
  name?: string;
  acctgSystemId?: number;
  openingPeriod?: string;
  taxpayerTypeEnum?: string;
  acctgTransGroupEnum?: string;
  acctgTransApprovalRequired?: boolean;
  tenantOwnerName?: string;
  taxIndustryId?: number;
  taxNo?: string;
}

/** 税务档案列表请求参数。 */
export interface GetTaxRptMenuParams {
  /** 账套id，路径参数，必填 */
  bookid: string;
  /** 期间，查询参数，必填 */
  period: string;
}

/** 税务档案-关联税种。 */
export interface GetTaxRptMenuTaxTypeList {
  /** 税项 */
  appliedTaxItems?: Record<string, unknown>;
  /** 修改状态 add;update;delete */
  editFlag?: string;
  /** 公式 */
  formulaJson?: string[];
  lastUpdatedStamp?: string;
  /** 税种代码 */
  code?: string;
  createdUserId?: number;
  /** 企业形式：CORPORATION 公司；PARTNERSHIP_OR_SOLE 合伙企业/个独/个体工商户 */
  enterpriseFormEnum?: string;
  createdStamp?: string;
  lastUpdatedUserId?: number;
  /** 税种名称 */
  name?: string;
  /** 地区 */
  appliedRegions?: Record<string, unknown>;
  versionNo?: number;
  tenantId?: number;
  id?: number;
  /** 需要清空的字段的列名集合 */
  nullValueColumns?: string[];
}

/** 税务档案-子表。 */
export interface GetTaxRptMenuDetailList {
  /** 修改状态 add;update;delete */
  editFlag?: string;
  lastUpdatedStamp?: string;
  /** 编码 */
  code?: string;
  createdUserId?: number;
  /** 排列顺序 */
  sequenceNum?: number;
  createdStamp?: string;
  /** 引用的报表 */
  referTaxFinRptDef?: Record<string, unknown>;
  /** 报表类型 */
  glReportTypeEnum?: string;
  lastUpdatedUserId?: number;
  /** 申报期间类型：YEAR-年;QUARTER-季;MONTH-月 */
  reportPeriodTypeEnum?: string;
  /** 是否期初报表 */
  isOpenningRpt?: boolean;
  /** 子表名称 */
  name?: string;
  versionNo?: number;
  tenantId?: number;
  /** 报表样式 */
  reportStyle?: Record<string, unknown>;
  id?: number;
  /** 需要清空的字段的列名集合 */
  nullValueColumns?: string[];
  /** 税表报表定义 */
  taxFinRptDefId?: number;
}

/** 税务档案（单个税表定义）。 */
export interface GetTaxRptMenuResult {
  /** 修改状态 add;update;delete */
  editFlag?: string;
  /** 公式 */
  formulaJson?: string[];
  /** 纳税性质：NORMAL_TAXPAYER-一般纳税人、SMALL_TAXPAYER-小规模纳税人 */
  taxpayerTypeEnum?: string;
  lastUpdatedStamp?: string;
  /** 会计制度 */
  acctgSystemId?: number;
  /** 税表代码 */
  code?: string;
  createdUserId?: number;
  /** 企业形式：CORPORATION 公司；PARTNERSHIP_OR_SOLE 合伙企业/个独/个体工商户 */
  enterpriseFormEnum?: string;
  createdStamp?: string;
  /** 关联的税种列表 */
  taxTypeList?: GetTaxRptMenuTaxTypeList[];
  /** 报表类型：BALANCE_SHEET-资产负债表、BALANCE_SHEET_REORG-资产负债表重分类、INCOME_STATEMENT-利润表、
   * CASH_FLOW_STATEMENT-现金流量表、TAX_STATISTICS-纳税统计表 */
  glReportTypeEnum?: string;
  /** 下一期间税表类型：QUARTER-季;MONTH-月 */
  nextPeriodRptType?: string;
  lastUpdatedUserId?: number;
  /** 税种ID串 */
  taxTypeIds?: string;
  /** 报表xml模板 */
  reportXml?: string;
  /** 申报期间类型：YEAR-年;QUARTER-季;MONTH-月 */
  reportPeriodTypeEnum?: string;
  /** 税表名称 */
  name?: string;
  /** 地区 */
  appliedRegions?: Record<string, unknown>;
  /** 子表列表 */
  detailList?: GetTaxRptMenuDetailList[];
  versionNo?: number;
  tenantId?: number;
  id?: number;
  /** 需要清空的字段的列名集合 */
  nullValueColumns?: string[];
  /** 行业 */
  appliedIndustries?: Record<string, unknown>;
}

/** 钉钉新增账套请求参数。 */
export interface InitTenantParams {
  /** 新建的账套名称，请求体，必填 */
  tenantName: string;
}

/** 钉钉新增账套返回结果。 */
export interface InitTenantResult {
  accountantEmployeeId?: number;
  acctgTransApprovalRequired?: boolean;
  acctgTransGroupEnum?: string;
  bookCode?: string;
  bookSourceEnum?: string;
  cashFlowOpeningPeriod?: string;
  createdUserId?: number;
  disabled?: boolean;
  domainName?: string;
  enableCustomizedReport?: boolean;
  enabledTimes?: number;
  enterpriseId?: number;
  glAccountCodeLen?: string;
  /** 账套id */
  id?: number;
  isHidden?: boolean;
  isMainTenant?: boolean;
  latestFiOpenPeriod?: string;
  manual?: boolean;
  /** 账套名称 */
  name?: string;
  openingPeriod?: string;
  priceScale?: number;
  primaryAppId?: number;
  taxpayerTypeEnum?: string;
  tenantOwnerName?: string;
}

/** 禁用/启用账套（updateStatus）请求参数。 */
export interface UpdateAccountBookStatusParams {
  /** 账套id，路径参数（请求地址 {bookid} 推断），必填 */
  bookid: number;
  /** 需要禁用或启用的账套ID，请求体，必填 */
  id: number;
  /** 禁用标识：true-禁用，false-启用，请求体，必填 */
  disabled: boolean;
}

/** 禁用/启用账套（updateStatus）返回结果。 */
export interface UpdateAccountBookStatusResult {
  data?: boolean;
  /** true-成功 */
  result?: boolean;
}

/** 获取账套列表(分页)请求参数。 */
export interface GetAccountBookListPageParams {
  /** 页码，请求体，可选 */
  pageNum?: number;
  /** 分页大小，请求体，可选 */
  pageSize?: number;
  /** 查询条件，请求体，可选 */
  name?: string;
}

/** 获取账套列表(分页)返回结果。 */
export type GetAccountBookListPageResult = AccountBook[];

/** 获取账套信息(通过外部唯一标识2)请求参数。 */
export interface GetTenantIdByExternalParams {
  externalUniqueId?: string;
  externalSystem?: string;
}

/** 获取账套信息(通过外部唯一标识2)返回结果（data，文档"输出参数"表的 code/msg 为通用外壳，由 client 判定成功与否）。 */
export interface GetTenantIdByExternalResult {
  /** 账套id */
  tenantId?: number;
}
export function createJcdaZtApi(client: ChanjetClient) {
  return {
    /**
     * 账套绑定。
     *
     * @param params 请求参数
     * @param params.bookid 账套ID，路径参数，必填
     * @param params.masterTenantId 绑定主tenantId，请求体，必填
     * @param params.slaveTenantId 绑定从tenantId，请求体，必填
     * @param params.bindingTypeEnum 绑定类型枚举，请求体，必填
     * @param params.masterTenantName 主账套名称，请求体，必填
     * @param params.slaveTenantName 从账套名称，请求体，必填
     * @param params.bindingBoNames 绑定档案bo名称数组，请求体，可选
     * @returns 绑定结果（result/errorInfo）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    bindTenant(params: BindTenantParams): Promise<BindTenantResult> {
      return client.request<BindTenantResult>({
        method: 'POST',
        path: '/accounting/document/integration/tenant/binding/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          masterTenantId: params.masterTenantId,
          slaveTenantId: params.slaveTenantId,
          bindingTypeEnum: params.bindingTypeEnum,
          masterTenantName: params.masterTenantName,
          slaveTenantName: params.slaveTenantName,
          bindingBoNames: params.bindingBoNames,
        },
      });
    },

    /**
     * 取消绑定账套（仅删除绑定状态和绑定信息，不删除同步的档案）。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.tenantId 取消绑定的帐套id，查询参数，必填
     * @returns 成功无返回（HTTP 200）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    unbindTenant(params: UnbindTenantParams): Promise<void> {
      return client.request<void>({
        method: 'DELETE',
        path: '/accounting/document/integration/tenant/binding/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { tenantId: params.tenantId },
      });
    },

    /**
     * 获取账套列表。
     *
     * @returns 账套数组
     * @throws {ChanjetApiError} 远端返回业务错误（thirdsrv.e0004 未授权）、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    getAccountBookList(): Promise<GetAccountBookListResult> {
      return client.request<GetAccountBookListResult>({
        method: 'GET',
        path: '/accounting/accountBook/list',
      });
    },

    /**
     * 获取账套信息。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.tenantId 账套id，查询参数，可选
     * @returns 账套信息
     * @throws {ChanjetApiError} 远端返回业务错误（saas.001 参数错误）、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    getAccountBook(params: GetAccountBookParams): Promise<GetAccountBookResult> {
      return client.request<GetAccountBookResult>({
        method: 'GET',
        path: '/accounting/accounting/accountBook/{bookid}',
        pathParams: { bookid: params.bookid },
        query: params.tenantId === undefined ? undefined : { tenantId: params.tenantId },
      });
    },

    /**
     * 查询开通状态（触发初始化账套），需要轮询调用直到返回 200。
     *
     * @returns 成功无返回数据（HTTP 200）；返回 121 表示访问的云分区有问题
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    getAppOpenStatus(): Promise<void> {
      return client.request<void>({
        method: 'GET',
        path: '/accounting/setup/openAccess/app/status',
      });
    },

    /**
     * 行业信息列表。
     *
     * @param params 请求参数
     * @param params.bookid 账套ID，路径参数，必填
     * @returns 行业数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    queryTaxIndustry(params: QueryTaxIndustryParams): Promise<QueryTaxIndustryResult[]> {
      return client.request<QueryTaxIndustryResult[]>({
        method: 'GET',
        path: '/accounting/easyacctg/customer/queryTaxIndustry/{bookid}',
        pathParams: { bookid: params.bookid },
      });
    },

    /**
     * 账套导入检查（账套导入的前置步骤）。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.ossURL 账套云存储地址，查询参数，必填
     * @param params.newName 指定账套名称导入，查询参数，可选
     * @returns 检查结果（fileName/data/isSuccess）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    importCheckTenantData(
      params: ImportCheckTenantDataParams,
    ): Promise<ImportCheckTenantDataResult> {
      return client.request<ImportCheckTenantDataResult>({
        method: 'GET',
        path: '/accounting/asr/tenantData/importCheck/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { ossURL: params.ossURL, newName: params.newName },
      });
    },

    /**
     * 账套导入。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.fileName 文件唯一标识（从账套导入检查接口获取），查询参数，必填
     * @returns 导入的账套信息
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    importTenantData(params: ImportTenantDataParams): Promise<ImportTenantDataResult> {
      return client.request<ImportTenantDataResult>({
        method: 'GET',
        path: '/accounting/asr/tenantData/import/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { fileName: params.fileName },
      });
    },

    /**
     * 账套导出。
     *
     * @param params 请求参数
     * @param params.bookid 导出的目标账套ID，路径参数，必填
     * @returns 文件下载地址（ossURL）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    downloadTenantData(params: DownloadTenantDataParams): Promise<DownloadTenantDataResult> {
      return client.request<DownloadTenantDataResult>({
        method: 'GET',
        path: '/accounting/asr/tenantData/download/{bookid}',
        pathParams: { bookid: params.bookid },
      });
    },

    /**
     * 编辑账套。
     *
     * @param params 请求参数
     * @param params.bookid 账套ID，路径参数，必填
     * @param params.id 账套ID，请求体，必填
     * @param params.name 账套名称，请求体，必填
     * @param params.acctgSystemId 会计制度，请求体，必填
     * @param params.openingPeriod 开账期间，请求体，必填
     * @param params.taxpayerTypeEnum 纳税性质，请求体，必填
     * @param params.tenantOwnerName 账套所属企业名称，请求体，可选
     * @param params.taxIndustryId 行业ID，请求体，可选
     * @param params.taxNo 税号，请求体，可选
     * @returns 编辑后的账套信息
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    updateAccountBook(params: UpdateAccountBookParams): Promise<UpdateAccountBookResult> {
      return client.request<UpdateAccountBookResult>({
        method: 'PUT',
        path: '/accounting/accounting/accountBook/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          id: params.id,
          name: params.name,
          acctgSystemId: params.acctgSystemId,
          openingPeriod: params.openingPeriod,
          taxpayerTypeEnum: params.taxpayerTypeEnum,
          tenantOwnerName: params.tenantOwnerName,
          taxIndustryId: params.taxIndustryId,
          taxNo: params.taxNo,
        },
      });
    },

    /**
     * 删除账套。
     *
     * @param params 请求参数
     * @param params.bookid 要删除的账套ID，路径参数，必填
     * @returns 删除的账套id
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    deleteAccountBook(params: DeleteAccountBookParams): Promise<DeleteAccountBookResult> {
      return client.request<DeleteAccountBookResult>({
        method: 'DELETE',
        path: '/accounting/accounting/accountBook/{bookid}',
        pathParams: { bookid: params.bookid },
      });
    },

    /**
     * 隐藏/显示账套。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.id 需要隐藏或显示的账套ID，请求体，必填
     * @param params.hidden 隐藏标识（true-隐藏，false-显示），请求体，必填
     * @returns 成功无返回（HTTP 200）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    updateAccountBookHiddenStatus(params: UpdateAccountBookHiddenStatusParams): Promise<void> {
      return client.request<void>({
        method: 'PUT',
        path: '/accounting/accounting/accountBook/hiddenStatus/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { id: params.id, hidden: params.hidden },
      });
    },

    /**
     * 检查并导入data。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.ossURL 账套云存储地址，查询参数，必填
     * @param params.newName 指定账套名称导入，查询参数，可选
     * @returns 导入结果（isSuccess/data）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    checkAndImportTenantData(
      params: CheckAndImportTenantDataParams,
    ): Promise<CheckAndImportTenantDataResult> {
      return client.request<CheckAndImportTenantDataResult>({
        method: 'GET',
        path: '/accounting/asr/tenantData/checkAndImport/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { ossURL: params.ossURL, newName: params.newName },
      });
    },

    /**
     * 禁用/启用账套（disabledStatus）。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.id 需要禁用或启用的账套ID，请求体，必填
     * @param params.disabled 禁用标识（true-禁用，false-启用），请求体，必填
     * @returns 成功无返回（HTTP 200）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    updateAccountBookDisabledStatus(params: UpdateAccountBookDisabledStatusParams): Promise<void> {
      return client.request<void>({
        method: 'PUT',
        path: '/accounting/accounting/accountBook/disabledStatus/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { id: params.id, disabled: params.disabled },
      });
    },

    /**
     * 编辑企业信息（可仅编辑企业的名称和税号）。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.id 账套ID，请求体，必填
     * @param params.tenantOwnerName 账套所属企业名称，请求体，必填
     * @param params.taxNo 税号，请求体，必填
     * @returns 编辑后的账套信息
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    updateOrgInfo(params: UpdateOrgInfoParams): Promise<UpdateOrgInfoResult> {
      return client.request<UpdateOrgInfoResult>({
        method: 'POST',
        path: '/accounting/accounting/accountBook/updateOrgInfo/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { id: params.id, tenantOwnerName: params.tenantOwnerName, taxNo: params.taxNo },
      });
    },

    /**
     * 新增账套。
     *
     * @param params 请求参数
     * @param params.name 账套名称，请求体，必填
     * @param params.acctgSystemId 会计制度，请求体，必填
     * @param params.openingPeriod 开账期间，请求体，必填
     * @param params.taxpayerTypeEnum 纳税性质，请求体，必填
     * @param params.glAccountTaxpayerTypeEnum 科目体系纳税性质，请求体，可选
     * @param params.acctgTransGroupEnum 凭证类别，请求体，可选
     * @param params.acctgTransApprovalRequired 凭证是否需要审核，请求体，可选
     * @param params.tenantOwnerName 账套所属企业名称，请求体，可选
     * @param params.taxIndustryId 行业ID，请求体，可选
     * @param params.taxNo 税号，请求体，可选
     * @param params.taxAreaId 报税地区ID，请求体，可选
     * @returns 新增账套信息
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    createAccountBook(params: CreateAccountBookParams): Promise<CreateAccountBookResult> {
      return client.request<CreateAccountBookResult>({
        method: 'POST',
        path: '/accounting/accounting/accountBook',
        body: {
          name: params.name,
          acctgSystemId: params.acctgSystemId,
          openingPeriod: params.openingPeriod,
          taxpayerTypeEnum: params.taxpayerTypeEnum,
          glAccountTaxpayerTypeEnum: params.glAccountTaxpayerTypeEnum,
          acctgTransGroupEnum: params.acctgTransGroupEnum,
          acctgTransApprovalRequired: params.acctgTransApprovalRequired,
          tenantOwnerName: params.tenantOwnerName,
          taxIndustryId: params.taxIndustryId,
          taxNo: params.taxNo,
          taxAreaId: params.taxAreaId,
        },
      });
    },

    /**
     * 税务档案列表（taxFileList）。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.period 期间，查询参数，必填
     * @returns 税表定义数组
     * @throws {ChanjetApiError} 远端返回业务错误（saas.001 参数错误）、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    getTaxRptMenu(params: GetTaxRptMenuParams): Promise<GetTaxRptMenuResult[]> {
      return client.request<GetTaxRptMenuResult[]>({
        method: 'GET',
        path: '/accounting/accountBook/taxRptMenu/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { period: params.period },
      });
    },

    /**
     * 钉钉新增账套。
     *
     * @param params 请求参数
     * @param params.tenantName 新建的账套名称，请求体，必填
     * @returns 新增账套信息（文档输出参数表字段；响应示例标注"无返回，状态200即成功"）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    initTenant(params: InitTenantParams): Promise<InitTenantResult> {
      return client.request<InitTenantResult>({
        method: 'POST',
        path: '/accounting/accounting/accountBook/initTenant',
        body: { tenantName: params.tenantName },
      });
    },

    /**
     * 禁用/启用账套（updateStatus）。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.id 需要禁用或启用的账套ID，请求体，必填
     * @param params.disabled 禁用标识（true-禁用，false-启用），请求体，必填
     * @returns 结果（data/result，result 为 true 即成功）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    updateAccountBookStatus(
      params: UpdateAccountBookStatusParams,
    ): Promise<UpdateAccountBookStatusResult> {
      return client.request<UpdateAccountBookStatusResult>({
        method: 'PUT',
        path: '/accounting/accounting/accountBook/updateStatus/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { id: params.id, disabled: params.disabled },
      });
    },

    /**
     * 获取账套列表(分页)。
     *
     * @param params 请求参数
     * @param params.pageNum 页码，请求体，可选
     * @param params.pageSize 分页大小，请求体，可选
     * @param params.name 查询条件，请求体，可选
     * @returns 账套数组
     * @throws {ChanjetApiError} 远端返回业务错误（thirdsrv.e0004 未授权）、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    getAccountBookListPage(
      params: GetAccountBookListPageParams,
    ): Promise<GetAccountBookListPageResult> {
      return client.request<GetAccountBookListPageResult>({
        method: 'POST',
        path: '/accounting/accountBook/list/page',
        body: { pageNum: params.pageNum, pageSize: params.pageSize, name: params.name },
      });
    },

    /**
     * 获取账套信息(通过外部唯一标识2)。
     * 文档"输出参数"表列出通用外壳（code/msg/data），其中 data.tenantId 为账套id；
     * 成功码 000000 由 client 统一判定，此处经 request 返回 data。
     *
     * @param params 请求参数
     * @param params.externalUniqueId 外部唯一标识，请求体，可选
     * @param params.externalSystem 外部系统，请求体，可选
     * @returns 账套信息（tenantId）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zt/jcda-zt
     */
    getTenantIdByExternal(
      params: GetTenantIdByExternalParams,
    ): Promise<GetTenantIdByExternalResult> {
      return client.request<GetTenantIdByExternalResult>({
        method: 'POST',
        path: '/accounting/accounting/openAccess/tenant/getTenantIdByExternal',
        body: { externalUniqueId: params.externalUniqueId, externalSystem: params.externalSystem },
      });
    },
  };
}
