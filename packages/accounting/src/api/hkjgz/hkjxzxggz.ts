/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgz/hkjxzxggz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgz/hkjxzxggz.md
 *
 * 文档无错误码说明章节，故本模块无错误码常量。
 */

import type { ChanjetClient, RequestOptions } from '../../client.js';

/** 工资加减项 */
export interface AddEmployeeParamsPayRollPubSubs {
  /** code */
  code?: string;
  /** 对应值 */
  value?: string;
  /** 对应 key */
  key?: string;
  /** 类型 */
  type?: string;
}

/** （外部接口）新增/修改工资请求参数 */
export interface AddEmployeeParams {
  /** 账套 ID，URL 路径参数 `{bookid}`，必填 */
  bookid: string;
  /** 姓名，必填 */
  name: string;
  /** 部门，必填 */
  department: string;
  /**
   * 身份证类型，必填。
   * SSN：居民身份证，ARMY_OFFICER：军官证，SOLDIER：士兵证，PASSPORT：中国护照，
   * ARMED_POLICE：武警警官证，MAINLAND_HK_MO_RESIDENT：港澳居民来往内地通行证，
   * HK_MO_RESIDENT：港澳居民居住证，MAINLAND_TAIWAN_RESIDENT：台湾居民来往大陆通行证，
   * TAIWAN_RESIDENT：台湾居民居住证，FOREIGN_PASSPORT：外国护照，
   * PERMANT_RESIDENT：外国人永久居留身份证，WORK_PERMIT_A：外国人工作许可证（A类），
   * WORK_PERMIT_B：外国人工作许可证（B类），WORK_PERMIT_C：外国人工作许可证（C类），
   * OTHER_IDENTIFICATION_TYPE：其他个人证件
   */
  identificationType: string;
  /** 身份证号，必填 */
  identificationNo: string;
  /** 国籍，必填。0：中国，1：中国澳门，2：中国台湾，3：中国香港……（完整清单见官方文档） */
  country: string;
  /** 性别，必填。0：保密 1：男 2：女 */
  sex: string;
  /** 出生日期，必填 */
  birthday: string;
  /** 手机号，必填 */
  phone: string;
  /** 人员状态，必填。1：正常 0：非正常 */
  empStatus: string;
  /** 工资 ID，修改时传入 */
  payrollId?: string;
  /** 雇佣时间 */
  employTime?: string;
  /** 受雇从业类型 */
  employmentType?: string;
  /** 是否扣除减除费用，0 否 1 是，缺省 1（由远端处理，客户端不补默认值） */
  isDeductExpenseDecuced?: number;
  /** 工资加减项 */
  payRollPubSubs?: AddEmployeeParamsPayRollPubSubs[];
  /** 区间，必填 */
  acctgPeriod: string;
}

/** （外部接口）新增/修改工资结果（`data` 字段） */
export interface AddEmployeeResult {
  /** 区间 */
  acctgPeriod?: string;
  /** 生日 */
  birthday?: string;
  /** 医疗保险（企业） */
  corpHeathcareIns?: string;
  /** 住房公积金（企业） */
  corpHousingFund?: string;
  /** 工伤保险（企业） */
  corpInjuryIns?: string;
  /** 生育保险（企业） */
  corpMaternityIns?: string;
  /** 养老保险（企业） */
  corpPension?: string;
  /** 失业保险（企业） */
  corpUnemplIns?: string;
  /** 国家 */
  country?: string;
  /** 减除费用 */
  deductionExpense?: string;
  /** 部门 */
  department?: string;
  /** 工号 */
  empCode?: string;
  /** 人员状态 */
  empStatus?: string;
  /** 雇佣时间 */
  employTime?: string;
  /** 员工 ID */
  employeeId?: string;
  /** 受雇从业类型 */
  employmentType?: string;
  /** 身份证号 */
  identificationNo?: string;
  /** 身份证类型 */
  identificationType?: string;
  /** 手机号 */
  mobileForTax?: string;
  /** 姓名 */
  name?: string;
  /** 自定义项（文档未提供说明） */
  payrollCustomizedInput?: object;
  /** 工资 ID */
  payrollId?: number;
  /** 医疗保险（个人） */
  persHeathcareIns?: string;
  /** 个人负担住房公积金 */
  persHousingFund?: string;
  /** 个人负担养老保险 */
  persPension?: string;
  /** 个人负担失业保险 */
  persUnemplIns?: string;
  /** 手机号 */
  phone?: string;
  /** 人员报送状态 */
  sbztValue?: string;
  /** 性别 */
  sex?: string;
  /** 数据来源 */
  sourceType?: string;
  /** 应纳税额 */
  tax?: string;
  /** 累计减除费用 */
  totalDeductionExpense?: string;
  /** 累计捐赠扣除 */
  totalDonationDeduction?: string;
  /** 累计收入额 */
  totalIncome?: string;
  /** 累计其他扣除 */
  totalOtherDeduction?: string;
  /** 累计已纳税所得额 */
  totalPrepaidTax?: string;
  /** 累计子女教育 */
  totalSpChildrenEdu?: string;
  /** 累计继续教育 */
  totalSpContinueEdu?: string;
  /** 累计房贷利息 */
  totalSpHousingInterest?: string;
  /** 累计住房租金 */
  totalSpHousingRent?: string;
  /** 累计赡养老人 */
  totalSpSupportParents?: string;
  /** 累计专项扣除 */
  totalSpecialDeduction?: string;
  /** 总税额 */
  totalTax?: string;
  /** 累计应纳税所得额 */
  totalTaxableIncome?: string;
  /** 强制覆盖员工信息标志 */
  updateEmployeeFlag?: boolean;
}

/**
 * 好会计工资——（外部接口）新增/修改工资 API 工厂。
 *
 * @param client 好会计客户端实例
 */
export function createHkjxzxggzApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）新增/修改工资。
     *
     * @param params 新增/修改工资内容
     * @param params.bookid 账套 ID，URL 路径参数 `{bookid}`，必填
     * @param params.name 姓名，必填
     * @param params.department 部门，必填
     * @param params.identificationType 身份证类型，必填
     * @param params.identificationNo 身份证号，必填
     * @param params.country 国籍，必填
     * @param params.sex 性别，必填（0：保密 1：男 2：女）
     * @param params.birthday 出生日期，必填
     * @param params.phone 手机号，必填
     * @param params.empStatus 人员状态，必填（1：正常 0：非正常）
     * @param params.payrollId 工资 ID，修改时传入
     * @param params.employTime 雇佣时间
     * @param params.employmentType 受雇从业类型
     * @param params.isDeductExpenseDecuced 是否扣除减除费用，0 否 1 是，缺省 1
     * @param params.payRollPubSubs 工资加减项
     * @param params.payRollPubSubs[].code code
     * @param params.payRollPubSubs[].value 对应值
     * @param params.payRollPubSubs[].key 对应 key
     * @param params.payRollPubSubs[].type 类型
     * @param params.acctgPeriod 区间，必填
     * @returns 新增/修改工资结果，`data` 字段内容
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgz/hkjxzxggz
     */
    addEmployee: (params: AddEmployeeParams): Promise<AddEmployeeResult> => {
      const { bookid, ...body } = params;
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/payroll/payrollEmployee/outside/addEmployee/{bookid}',
        pathParams: { bookid },
        body,
      };
      return client.request<AddEmployeeResult>(options);
    },
  };
}
