/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/kmjqc
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/jcda/kmjqc.md
 *
 * 错误码说明：多数接口错误码说明表为空或未提供；getInitBalanceLists 接口错误码见 GET_INIT_BALANCE_LISTS_ERRORS 常量。
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/**
 * 获取所有科目及期初数据请求参数。
 */
export interface GetInitBalanceListParams {
  /** 账套id */
  bookid: string;
  /** 账套id */
  bookId: number;
}

/**
 * 获取所有科目及期初数据返回结果条目。
 */
export interface GetInitBalanceListResult {
  /** 会计制度 */
  acctgSystemId?: number;
  /** 别名 */
  aliasName?: string;
  /** 辅助项信息（文档类型为 object，以参数表为准） */
  assistantTypes?: Record<string, unknown>;
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
  /** - */
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

/**
 * （外部接口）科目查询接口（支持单个和全部）请求参数。
 */
export interface GetInitBalanceListsParams {
  /** 账套id */
  bookid: string;
  /** 检索关键词 */
  searchText?: string;
  /** 编码模糊检索 */
  code?: string;
  /** 名称模糊检索 */
  name?: string;
}

/**
 * 科目查询接口常见错误码（文档未提供业务含义）。
 */
export const GET_INIT_BALANCE_LISTS_ERRORS = {
  GL_E0001: { code: 'gl.e0001', message: '' },
} as const;

/**
 * （外部接口）科目查询接口（支持单个和全部）返回结果条目。
 */
export interface GetInitBalanceListsResult {
  /** 是否可编辑 */
  cashItemEditable?: string;
  /** 会计制度 */
  acctgSystemId?: number;
  /** 科目分类 */
  glAccountClassId?: number;
  /** 科目类型 */
  glAccountTypeId?: number;
  /** 长名称 */
  longName?: string;
  /** 别名：有相同语义的科目可能有不同的code，但是有相同的别名 */
  aliasName?: string;
  /** 开户银行ID */
  houseBankId?: number;
  /** 银行账号 */
  finAccountId?: number;
  /** 银行账号 */
  finAccount?: string;
  /** 银行户名 */
  finAccountName?: string;
  /** 借贷方向：标示科目借贷类型，借方为1，贷方为-1 */
  drCrDirection?: number;
  /** 是否辅助账核算 */
  hasSubsidiaryAccounting?: boolean;
  /** 是否外币核算 */
  hasForeignCurrency?: boolean;
  /** 币种：外币币种 */
  currencyId?: number;
  /** 是否数量核算 */
  hasQtyAccunting?: boolean;
  /** 计量单位 */
  baseUomId?: number;
  /** 是否预置数据：不可删除和修改。 */
  isDefault?: boolean;
  /** 现金流量入项目编码：关联现金流量表项目编码 */
  cashFlowInItemCode?: string;
  /** 现金流量出项目编码：关联现金流量表项目编码 */
  cashFlowOutItemCode?: string;
  /** 全文检索文本 */
  searchText?: string;
  /** 科目状态：缺省情况下标示该记录是否启用（A-Active)或未启用（I-Inactive)。若为空，表示A-Active */
  statusEnum?: string;
  /** 来源ID：在系统初始化时，将tenant_id=0下的数据复制到当前租户下，src_id记录来源数据的ID，方便数据跟踪 */
  srcId?: string;
  /** 上级科目 */
  parent?: Record<string, unknown>;
  /** 关联辅助核算分类 */
  glAccountXrefList?: Record<string, unknown>;
  /** 是否有数量余额数据 */
  hasQtyRecord?: boolean;
  /** 是否有外币余额数据 */
  hasFCRecord?: boolean;
  /** 是否有辅助核算数据 */
  hasGlSubAccountRecord?: boolean;
  /** 是否有其它同级科目 */
  hasSibling?: boolean;
  /** 科目名称 */
  glAccountName?: string;
  /** 借方外币 */
  postedDr?: string;
  /** 是否末级 */
  isLeaf?: boolean;
  /** 是否是现金等价物 */
  isCashItem?: boolean;
  /** 期末数量 */
  endingQty?: string;
  /** 期初金额 */
  baseOpeningBalance?: string;
  /** 期初外币 */
  openingBalance?: string;
  /** 期末金额 */
  baseEndingBalance?: string;
  /** 是否有辅助核算 */
  isAssistantAccount?: boolean;
  /** 辅助核算（文档类型为 object，以参数表为准） */
  assistantTypes?: GetInitBalanceListsResultAssistantType;
  /** 客户号 */
  customerNo?: string;
  /** 树形路径，用20位code通过中划线连接，code不足20位在左侧补零 */
  treePath?: string;
  /** 外币核算 */
  currencyCode?: string;
  /** 父节点id */
  parentId?: number;
  /** 科目状态：缺省情况下标示该记录是否启用（A-Active)或未启用（I-Inactive)。若为空，表示A-Active */
  status?: string;
  /** 科目ID */
  id?: number;
  /** 科目ID */
  glAccountId?: number;
}

/**
 * 科目查询辅助核算。
 */
export interface GetInitBalanceListsResultAssistantType {
  /** - */
  assistantAccountTypeFieldName?: string;
  /** id固定 */
  assistantAccountTypeNo?: string;
  /** 辅助核算名称（固定名称） */
  assistantAccountTypeName?: string;
  /** 辅助核算（固定类型） */
  assistantAccountType?: string;
  /** 辅助核算id（固定id） */
  assistantAccountId?: string;
}

/**
 * （外部接口）试算平衡请求参数。
 */
export interface TrialBalanceParams {
  /** 账套id */
  bookid: string;
  /** 是否重分类 */
  isReorg?: string;
}

/**
 * （外部接口）试算平衡返回结果。
 */
export interface TrialBalanceResult {
  /** 是否资产负债表平衡 */
  isBalanceSheetBalanced?: boolean;
  /** 是否固定资产平衡 */
  isFixedAssetBalanced?: boolean;
  /** 是否应显示固定资产 */
  shouldFixedAssetBeShown?: boolean;
  /** 账户金额信息 */
  account?: TrialBalanceResultAccount;
}

/**
 * 试算平衡账户金额信息。
 */
export interface TrialBalanceResultAccount {
  /** 期初借方 */
  initJ?: number;
  /** 累计借方 */
  accumulativeJ?: number;
  /** 期初贷方 */
  initC?: number;
  /** 累计贷方 */
  accumulativeC?: number;
  /** 累计差额 */
  accumulativeD?: number;
  /** 期初差额 */
  initD?: number;
}

/**
 * （外部接口）新增科目请求参数。
 */
export interface AddGlAccountParams {
  /** 账套id */
  bookid: string;
  /** 科目 */
  glAccount: AddGlAccountParamsGlAccount[];
  /** 辅助核算类别 客户-10001、供应商-10002，部门-10003，员工-10004、存货-10005、项目-10006 */
  assistantTypes?: string[];
  /** 辅助核算档案 */
  assistantDetail?: AddGlAccountParamsAssistantDetail[];
}

/**
 * 新增科目科目信息。
 */
export interface AddGlAccountParamsGlAccount {
  /** 科目编号 */
  code: string;
  /** 科目名称 */
  name: string;
  /** 是否辅助账核算 */
  hasSubsidiaryAccounting: boolean;
  /** 是否外币核算 */
  hasForeignCurrency: boolean;
  /** 是否数量核算 */
  hasQtyAccunting: string;
  /** 计量单位 */
  baseUomId?: string;
  /** 借贷方向：标示科目借贷类型，借方为1，贷方为-1 */
  drCrDirection: number;
  /** 科目分类：1.资产，2.负债，3.权益，4.成本，5.损益 */
  glAccountClassId: string;
  /** 银行账号 */
  finAccountId?: string;
  /** 币种：外币币种（编码清单见文档） */
  currencyId?: string;
  /** 上级科目ID 比如1001得id是1495768377720832 */
  parentId?: number;
  /** 针对API接口，如不知道父级科目id，则写true,并填写parentcode */
  isCodeType?: boolean;
  /** 父级科目编码 */
  parentCode?: string;
  /** 客户号 */
  customerNo?: string;
  /** 是否是现金等价物 */
  isCashItem?: boolean;
  /** 银行存款1002科目中的银行的账号名称 */
  finAccountName?: string;
  /** 1002银行存款-银行账号 */
  finAccount?: number;
  /** 银行编码（编码清单见文档） */
  houseBankId?: string;
}

/**
 * 新增科目辅助核算档案。
 */
export interface AddGlAccountParamsAssistantDetail {
  /** 科目Id */
  glAccountId?: number;
  /** 项目Id */
  projectId?: number;
  /** 部门id */
  departmentId?: number;
  /** 客户id */
  custId?: number;
  /** 供应商id */
  vendorId?: number;
  /** 员工id */
  employeeId?: number;
  /** 库存id */
  productId?: number;
}

/**
 * 新增科目返回结果。
 */
export interface AddGlAccountResult {
  /** 新增科目的id */
  id?: number;
}

/**
 * （外部接口）更新科目辅助余额请求参数。
 */
export interface AddAssistaccountingParams {
  /** 账套id */
  bookid: string;
  /** 科目余额新增标识 */
  tag: number;
  /** 辅助余额信息 */
  subAccountBalance: AddAssistaccountingParamsSubAccountBalance;
}

/**
 * 更新科目辅助余额辅助余额信息。
 */
export interface AddAssistaccountingParamsSubAccountBalance {
  /** 科目编号 */
  code?: string;
  /** 本年累计贷方数量 */
  postedCrQty?: string;
  /** 期初余额 */
  endingBalance?: string;
  /** 本年累计贷方原币 */
  postedCr?: string;
  /** 期初数量 */
  openingQty?: string;
  /** 期初余额数量 */
  endingQty?: string;
  /** 本年累计贷方本位币 */
  basePostedCr?: string;
  /** 本年累计借方本位币 */
  basePostedDr?: string;
  /** 期初余额 */
  openingBalance?: string;
  /** 期末余额：本币 */
  baseEndingBalance?: string;
  /** 辅助核算详情 */
  glSubAccount?: AddAssistaccountingParamsSubAccountBalanceGlSubAccount;
}

/**
 * 更新科目辅助余额辅助核算详情。
 */
export interface AddAssistaccountingParamsSubAccountBalanceGlSubAccount {
  /** 客户 */
  custNo?: string;
  /** 供应商 */
  vendorNo?: string;
  /** 项目 */
  projectNo?: string;
  /** 部门 */
  departmentNo?: string;
  /** 员工 */
  employeeNo?: string;
  /** 存货、单位 */
  productNo?: string;
}

/**
 * 更新科目辅助余额返回结果。
 */
export type AddAssistaccountingResult = Record<string, number>;

/**
 * （外部接口）科目期初辅助余额查询请求参数。
 */
export interface GetSubAccountInitBalanceListsParams {
  /** 账套id */
  bookid: string;
  /** 账套id */
  bookId: number;
  /** 科目编号 */
  glAccountCode: string;
}

/**
 * 科目期初辅助余额查询返回结果条目。
 */
export interface GetSubAccountInitBalanceListsResult {
  /** 科目余额标识 */
  tag?: number;
  /** 辅助余额信息 */
  subAccountBalance?: GetSubAccountInitBalanceListsResultSubAccountBalance;
}

/**
 * 科目期初辅助余额查询辅助余额信息。
 */
export interface GetSubAccountInitBalanceListsResultSubAccountBalance {
  /** 科目编号 */
  code?: string;
  /** 本年累计贷方数量 */
  postedCrQty?: number;
  /** 期初余额 */
  endingBalance?: number;
  /** 本年累计贷方原币 */
  postedCr?: number;
  /** 期初数量 */
  openingQty?: number;
  /** 本年累计借方原币 */
  postedDr?: number;
  /** 本年累计借方数量 */
  postedDrQty?: number;
  /** 期初余额数量 */
  endingQty?: number;
  /** 本年累计贷方本位币 */
  basePostedCr?: number;
  /** 辅助核算详情 */
  glSubAccount?: GetSubAccountInitBalanceListsResultSubAccountBalanceGlSubAccount;
  /** 本年累计借方本位币 */
  basePostedDr?: number;
  /** 期初余额 */
  openingBalance?: number;
  /** 期末余额：本币 */
  baseEndingBalance?: number;
}

/**
 * 科目期初辅助余额查询辅助核算详情。
 */
export interface GetSubAccountInitBalanceListsResultSubAccountBalanceGlSubAccount {
  /** 客户 */
  custNo?: string;
  /** 供应商 */
  vendorNo?: string;
  /** 项目 */
  projectNo?: string;
  /** 部门 */
  departmentNo?: string;
  /** 员工 */
  employeeNo?: string;
  /** 存货、单位 */
  productNo?: string;
}

/**
 * （外部接口）新增科目余额请求参数。
 */
export interface UpdateBalanceDuiaWangParams {
  /** 账套id */
  bookid: string;
  /** 科目信息 */
  glAccount: UpdateBalanceDuiaWangParamsGlAccount;
}

/**
 * 新增科目余额科目信息。
 */
export interface UpdateBalanceDuiaWangParamsGlAccount {
  /** 期末余额：本币 */
  baseEndingBalance?: number;
}

/**
 * 新增科目余额返回结果（Long 类型的 id）。
 */
export type UpdateBalanceDuiaWangResult = number;

/**
 * （外部接口）修改科目请求参数。
 */
export interface UpdateAccountDuiaParams {
  /** 账套id */
  bookid: string;
  /** 科目 */
  glAccount: UpdateAccountDuiaParamsGlAccount;
  /** 辅助核算类别 客户-10001、供应商-10002，部门-10003，员工-10004、存货-10005、项目-10006 */
  assistantTypes?: string[];
  /** 辅助核算档案 */
  assistantDetail?: UpdateAccountDuiaParamsAssistantDetail;
}

/**
 * 修改科目科目信息。
 */
export interface UpdateAccountDuiaParamsGlAccount {
  /** 科目编号 */
  code: string;
  /** 科目名称 */
  name: string;
  /** 是否辅助账核算 */
  hasSubsidiaryAccounting: boolean;
  /** 是否外币核算 */
  hasForeignCurrency?: boolean;
  /** 是否数量核算 */
  hasQtyAccunting?: boolean;
  /** 计量单位 */
  baseUomId?: number;
  /** 借贷方向：标示科目借贷类型，借方为1，贷方为-1 */
  drCrDirection?: number;
  /** 科目分类：1.资产，2.负债，3.权益，4.成本，5.损益 */
  glAccountClassId?: number;
  /** 银行账号 */
  finAccountId?: string;
  /** 币种：外币币种（编码清单见文档） */
  currencyId?: number;
  /** 上级科目ID 比如1001得id是1495768377720832 */
  parentId?: number;
  /** 针对API接口，如不知道父级科目id，则写true,并填写parentcode */
  isCodeType?: string;
  /** 父级科目编码 */
  parentCode?: string;
  /** 客户号 */
  customerNo?: string;
  /** 是否是现金等价物 */
  isCashItem?: boolean;
  /** 银行存款1002科目中的银行的账号名称 */
  finAccountName?: string;
  /** 1002银行存款-银行账号 */
  finAccount?: number;
  /** 银行编码（编码清单见文档） */
  houseBankId?: number;
}

/**
 * 修改科目辅助核算档案。
 */
export interface UpdateAccountDuiaParamsAssistantDetail {
  /** 科目Id */
  glAccountId?: number;
  /** 项目Id */
  projectId?: number;
  /** 部门id */
  departmentId?: number;
  /** 客户id */
  custId?: number;
  /** 供应商id */
  vendorId?: number;
  /** 员工id */
  employeeId?: number;
  /** 库存id */
  productId?: number;
}

/**
 * 修改科目返回结果。
 */
export interface UpdateAccountDuiaResult {
  /** 更新结果 */
  result?: boolean;
  /** 错误信息 */
  errorMsg?: string;
}

/**
 * （外部接口）更新科目辅助余额-json入参请求参数。
 */
export interface AddAssistaccountingToJSONObjectParams {
  /** 账套id */
  bookid: string;
  /** 科目余额新增标识 */
  tag: number;
  /** 辅助余额信息 */
  subAccountBalance: AddAssistaccountingToJSONObjectParamsSubAccountBalance;
}

/**
 * 更新科目辅助余额-json入参辅助余额信息。
 */
export interface AddAssistaccountingToJSONObjectParamsSubAccountBalance {
  /** - */
  code?: string;
  /** - */
  postedCrQty?: string;
  /** - */
  endingBalance?: string;
  /** - */
  postedCr?: string;
  /** - */
  openingQty?: string;
  /** - */
  endingQty?: string;
  /** - */
  basePostedCr?: string;
  /** - */
  basePostedDr?: string;
  /** - */
  openingBalance?: string;
  /** - */
  baseEndingBalance?: string;
  /** - */
  glSubAccount?: AddAssistaccountingToJSONObjectParamsSubAccountBalanceGlSubAccount;
}

/**
 * 更新科目辅助余额-json入参辅助核算详情。
 */
export interface AddAssistaccountingToJSONObjectParamsSubAccountBalanceGlSubAccount {
  /** - */
  custNo?: string;
  /** - */
  vendorNo?: string;
  /** - */
  projectNo?: string;
  /** - */
  departmentNo?: string;
  /** - */
  employeeNo?: string;
  /** - */
  productNo?: string;
}

/**
 * 更新科目辅助余额-json入参返回结果（键为入参索引，值为科目辅助余额表id）。
 *
 * 注意：文档输出参数表为 id|string，但响应示例为 map，以响应示例为准。
 */
export type AddAssistaccountingToJSONObjectResult = Record<string, number>;

/**
 * （外部接口）科目期初辅助余额查询-json出参请求参数。
 */
export interface GetInitBalanceListsToJSONObjectParams {
  /** 账套id */
  bookid: string;
  /** 科目编号 */
  glAccountCode: string;
}

/**
 * 科目期初辅助余额查询-json出参返回结果。
 */
export interface GetInitBalanceListsToJSONObjectResult {
  /** 数据列表 */
  datas?: GetInitBalanceListsToJSONObjectResultData[];
}

/**
 * 科目期初辅助余额查询-json出参数据条目。
 */
export interface GetInitBalanceListsToJSONObjectResultData {
  /** 科目余额标识 */
  tag?: number;
  /** 辅助余额信息 */
  subAccountBalance?: GetInitBalanceListsToJSONObjectResultDataSubAccountBalance;
}

/**
 * 科目期初辅助余额查询-json出参辅助余额信息。
 */
export interface GetInitBalanceListsToJSONObjectResultDataSubAccountBalance {
  /** 科目编号 */
  code?: string;
  /** 本年累计贷方数量 */
  postedCrQty?: number;
  /** 期初余额 */
  endingBalance?: number;
  /** 本年累计贷方原币 */
  postedCr?: number;
  /** 期初数量 */
  openingQty?: number;
  /** 本年累计借方原币 */
  postedDr?: number;
  /** 本年累计借方数量 */
  postedDrQty?: number;
  /** 期初余额数量 */
  endingQty?: number;
  /** 本年累计贷方本位币 */
  basePostedCr?: number;
  /** 辅助核算详情 */
  glSubAccount?: GetInitBalanceListsToJSONObjectResultDataSubAccountBalanceGlSubAccount;
  /** 本年累计借方本位币 */
  basePostedDr?: number;
  /** 期初余额 */
  openingBalance?: number;
  /** 期末余额：本币 */
  baseEndingBalance?: number;
}

/**
 * 科目期初辅助余额查询-json出参辅助核算详情。
 */
export interface GetInitBalanceListsToJSONObjectResultDataSubAccountBalanceGlSubAccount {
  /** 客户 */
  custNo?: string;
  /** 供应商 */
  vendorNo?: string;
  /** 项目 */
  projectNo?: string;
  /** 部门 */
  departmentNo?: string;
  /** 员工 */
  employeeNo?: string;
  /** 存货、单位 */
  productNo?: string;
}

/**
 * 科目及期初数据模块。
 */
export function createKmjqcApi(client: ChanjetClient) {
  return {
    /**
     * 获取所有科目及期初数据。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.bookId 账套id
     * @returns 科目及期初数据列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/kmjqc
     */
    async getInitBalanceList(
      params: GetInitBalanceListParams,
    ): Promise<GetInitBalanceListResult[]> {
      return client.request<GetInitBalanceListResult[]>({
        method: 'GET',
        path: '/accounting/gl/glaccount/getInitBalanceList/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { bookId: params.bookId },
      });
    },

    /**
     * （外部接口）科目查询接口（支持单个和全部）。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.searchText 检索关键词
     * @param params.code 编码模糊检索
     * @param params.name 名称模糊检索
     * @returns 科目列表；常见错误码见 {@link GET_INIT_BALANCE_LISTS_ERRORS}
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/kmjqc
     */
    async getInitBalanceLists(
      params: GetInitBalanceListsParams,
    ): Promise<GetInitBalanceListsResult[]> {
      return client.request<GetInitBalanceListsResult[]>({
        method: 'GET',
        path: '/accounting/gl/glaccount/getInitBalanceLists/{bookid}',
        pathParams: { bookid: params.bookid },
        query: {
          ...(params.searchText !== undefined ? { searchText: params.searchText } : {}),
          ...(params.code !== undefined ? { code: params.code } : {}),
          ...(params.name !== undefined ? { name: params.name } : {}),
        },
      });
    },

    /**
     * （外部接口）试算平衡。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.isReorg 是否重分类
     * @returns 试算平衡结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/kmjqc
     */
    async trialBalance(params: TrialBalanceParams): Promise<TrialBalanceResult> {
      return client.request<TrialBalanceResult>({
        method: 'GET',
        path: '/accounting/gl/BalanceSheet/trialBalance/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { ...(params.isReorg !== undefined ? { isReorg: params.isReorg } : {}) },
      });
    },

    /**
     * （外部接口）新增科目：支持一级科目、子级科目、辅助核算、数量核算、外币及银行存款场景。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.glAccount 科目
     * @param params.glAccount[].code 科目编号
     * @param params.glAccount[].name 科目名称
     * @param params.glAccount[].hasSubsidiaryAccounting 是否辅助账核算
     * @param params.glAccount[].hasForeignCurrency 是否外币核算
     * @param params.glAccount[].hasQtyAccunting 是否数量核算
     * @param params.glAccount[].baseUomId 计量单位
     * @param params.glAccount[].drCrDirection 借贷方向：借方为1，贷方为-1
     * @param params.glAccount[].glAccountClassId 科目分类：1.资产，2.负债，3.权益，4.成本，5.损益
     * @param params.glAccount[].finAccountId 银行账号
     * @param params.glAccount[].currencyId 币种：外币币种
     * @param params.glAccount[].parentId 上级科目ID
     * @param params.glAccount[].isCodeType 针对API接口，如不知道父级科目id，则写true,并填写parentcode
     * @param params.glAccount[].parentCode 父级科目编码
     * @param params.glAccount[].customerNo 客户号
     * @param params.glAccount[].isCashItem 是否是现金等价物
     * @param params.glAccount[].finAccountName 银行存款1002科目中的银行的账号名称
     * @param params.glAccount[].finAccount 1002银行存款-银行账号
     * @param params.glAccount[].houseBankId 银行编码
     * @param params.assistantTypes 辅助核算类别
     * @param params.assistantDetail 辅助核算档案
     * @param params.assistantDetail[].glAccountId 科目Id
     * @param params.assistantDetail[].projectId 项目Id
     * @param params.assistantDetail[].departmentId 部门id
     * @param params.assistantDetail[].custId 客户id
     * @param params.assistantDetail[].vendorId 供应商id
     * @param params.assistantDetail[].employeeId 员工id
     * @param params.assistantDetail[].productId 库存id
     * @returns 新增科目的id
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/kmjqc
     */
    async addGlAccount(params: AddGlAccountParams): Promise<AddGlAccountResult> {
      return client.request<AddGlAccountResult>({
        method: 'POST',
        path: '/accounting/gl/glaccount/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          glAccount: params.glAccount,
          ...(params.assistantTypes !== undefined ? { assistantTypes: params.assistantTypes } : {}),
          ...(params.assistantDetail !== undefined
            ? { assistantDetail: params.assistantDetail }
            : {}),
        },
      });
    },

    /**
     * （外部接口）更新科目辅助余额。
     *
     * 注意：文档请求示例为数组 `[{...}]`，但参数表为单对象，以参数表为准。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.tag 科目余额新增标识
     * @param params.subAccountBalance 辅助余额信息
     * @param params.subAccountBalance.code 科目编号
     * @param params.subAccountBalance.postedCrQty 本年累计贷方数量
     * @param params.subAccountBalance.endingBalance 期初余额
     * @param params.subAccountBalance.postedCr 本年累计贷方原币
     * @param params.subAccountBalance.openingQty 期初数量
     * @param params.subAccountBalance.endingQty 期初余额数量
     * @param params.subAccountBalance.basePostedCr 本年累计贷方本位币
     * @param params.subAccountBalance.basePostedDr 本年累计借方本位币
     * @param params.subAccountBalance.openingBalance 期初余额
     * @param params.subAccountBalance.baseEndingBalance 期末余额：本币
     * @param params.subAccountBalance.glSubAccount 辅助核算详情
     * @param params.subAccountBalance.glSubAccount.custNo 客户
     * @param params.subAccountBalance.glSubAccount.vendorNo 供应商
     * @param params.subAccountBalance.glSubAccount.projectNo 项目
     * @param params.subAccountBalance.glSubAccount.departmentNo 部门
     * @param params.subAccountBalance.glSubAccount.employeeNo 员工
     * @param params.subAccountBalance.glSubAccount.productNo 存货、单位
     * @returns 更新结果，键为入参索引、值为科目辅助余额id
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/kmjqc
     */
    async addAssistaccounting(
      params: AddAssistaccountingParams,
    ): Promise<AddAssistaccountingResult> {
      return client.request<AddAssistaccountingResult>({
        method: 'POST',
        path: '/accounting/gl/subaccountbalance/addAssistaccounting/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { tag: params.tag, subAccountBalance: params.subAccountBalance },
      });
    },

    /**
     * （外部接口）科目期初辅助余额查询。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.bookId 账套id
     * @param params.glAccountCode 科目编号
     * @returns 科目期初辅助余额列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/kmjqc
     */
    async getSubAccountInitBalanceLists(
      params: GetSubAccountInitBalanceListsParams,
    ): Promise<GetSubAccountInitBalanceListsResult[]> {
      return client.request<GetSubAccountInitBalanceListsResult[]>({
        method: 'GET',
        path: '/accounting/gl/subaccountbalance/getInitBalanceLists/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { bookId: params.bookId, glAccountCode: params.glAccountCode },
      });
    },

    /**
     * （外部接口）新增科目余额：通过科目查询接口查询出的数据可用来进行科目余额的新增和修改。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.glAccount 科目信息
     * @param params.glAccount.baseEndingBalance 期末余额：本币
     * @returns Long 类型的 id
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/kmjqc
     */
    async updateBalanceDuiaWang(
      params: UpdateBalanceDuiaWangParams,
    ): Promise<UpdateBalanceDuiaWangResult> {
      return client.request<UpdateBalanceDuiaWangResult>({
        method: 'POST',
        path: '/accounting/gl/balance/updateBalanceDuiaWang/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { glAccount: params.glAccount },
      });
    },

    /**
     * （外部接口）修改科目：科目新增的几种场景的修改以及1002银行信息的修改。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.glAccount 科目
     * @param params.glAccount.code 科目编号
     * @param params.glAccount.name 科目名称
     * @param params.glAccount.hasSubsidiaryAccounting 是否辅助账核算
     * @param params.glAccount.hasForeignCurrency 是否外币核算
     * @param params.glAccount.hasQtyAccunting 是否数量核算
     * @param params.glAccount.baseUomId 计量单位
     * @param params.glAccount.drCrDirection 借贷方向：借方为1，贷方为-1
     * @param params.glAccount.glAccountClassId 科目分类：1.资产，2.负债，3.权益，4.成本，5.损益
     * @param params.glAccount.finAccountId 银行账号
     * @param params.glAccount.currencyId 币种：外币币种
     * @param params.glAccount.parentId 上级科目ID
     * @param params.glAccount.isCodeType 针对API接口，如不知道父级科目id，则写true,并填写parentcode
     * @param params.glAccount.parentCode 父级科目编码
     * @param params.glAccount.customerNo 客户号
     * @param params.glAccount.isCashItem 是否是现金等价物
     * @param params.glAccount.finAccountName 银行存款1002科目中的银行的账号名称
     * @param params.glAccount.finAccount 1002银行存款-银行账号
     * @param params.glAccount.houseBankId 银行编码
     * @param params.assistantTypes 辅助核算类别
     * @param params.assistantDetail 辅助核算档案
     * @param params.assistantDetail.glAccountId 科目Id
     * @param params.assistantDetail.projectId 项目Id
     * @param params.assistantDetail.departmentId 部门id
     * @param params.assistantDetail.custId 客户id
     * @param params.assistantDetail.vendorId 供应商id
     * @param params.assistantDetail.employeeId 员工id
     * @param params.assistantDetail.productId 库存id
     * @returns 更新结果，`result` 为更新是否成功，失败时 `errorMsg` 为错误信息
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/kmjqc
     */
    async updateAccountDuia(params: UpdateAccountDuiaParams): Promise<UpdateAccountDuiaResult> {
      return client.request<UpdateAccountDuiaResult>({
        method: 'POST',
        path: '/accounting/gl/glaccount/updateAccountDuia/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          glAccount: params.glAccount,
          ...(params.assistantTypes !== undefined ? { assistantTypes: params.assistantTypes } : {}),
          ...(params.assistantDetail !== undefined
            ? { assistantDetail: params.assistantDetail }
            : {}),
        },
      });
    },

    /**
     * （外部接口）更新科目辅助余额-json入参：入参是 json，字段信息与更新科目辅助余额接口相同。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.tag 科目余额新增标识
     * @param params.subAccountBalance 辅助余额信息
     * @param params.subAccountBalance.code 文档未提供说明
     * @param params.subAccountBalance.postedCrQty 文档未提供说明
     * @param params.subAccountBalance.endingBalance 文档未提供说明
     * @param params.subAccountBalance.postedCr 文档未提供说明
     * @param params.subAccountBalance.openingQty 文档未提供说明
     * @param params.subAccountBalance.endingQty 文档未提供说明
     * @param params.subAccountBalance.basePostedCr 文档未提供说明
     * @param params.subAccountBalance.basePostedDr 文档未提供说明
     * @param params.subAccountBalance.openingBalance 文档未提供说明
     * @param params.subAccountBalance.baseEndingBalance 文档未提供说明
     * @param params.subAccountBalance.glSubAccount 文档未提供说明
     * @param params.subAccountBalance.glSubAccount.custNo 文档未提供说明
     * @param params.subAccountBalance.glSubAccount.vendorNo 文档未提供说明
     * @param params.subAccountBalance.glSubAccount.projectNo 文档未提供说明
     * @param params.subAccountBalance.glSubAccount.departmentNo 文档未提供说明
     * @param params.subAccountBalance.glSubAccount.employeeNo 文档未提供说明
     * @param params.subAccountBalance.glSubAccount.productNo 文档未提供说明
     * @returns 更新结果，键为入参索引、值为科目辅助余额表id
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/kmjqc
     */
    async addAssistaccountingToJSONObject(
      params: AddAssistaccountingToJSONObjectParams,
    ): Promise<AddAssistaccountingToJSONObjectResult> {
      return client.request<AddAssistaccountingToJSONObjectResult>({
        method: 'POST',
        path: '/accounting/gl/subaccountbalance/addAssistaccountingToJSONObject/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { tag: params.tag, subAccountBalance: params.subAccountBalance },
      });
    },

    /**
     * （外部接口）科目期初辅助余额查询-json出参：与更新科目辅助余额入参JSON匹配查询。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.glAccountCode 科目编号
     * @returns 科目期初辅助余额列表，`datas` 为数据列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/kmjqc
     */
    async getInitBalanceListsToJSONObject(
      params: GetInitBalanceListsToJSONObjectParams,
    ): Promise<GetInitBalanceListsToJSONObjectResult> {
      return client.request<GetInitBalanceListsToJSONObjectResult>({
        method: 'GET',
        path: '/accounting/gl/subaccountbalance/getInitBalanceListsToJSONObject/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { glAccountCode: params.glAccountCode },
      });
    },
  };
}
