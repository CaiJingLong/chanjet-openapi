/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgz/hkjblxzxggz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgz/hkjblxzxggz.md
 *
 * 文档无错误码说明章节，故本模块无错误码常量。
 */

import type { ChanjetClient, RequestOptions } from '../../client.js';

/** 工资加减项 */
export interface AddBatchEmployeeItemPayRollPubSubs {
  /** code */
  code?: string;
  /** 对应值 */
  value?: string;
  /** 对应 key */
  key?: string;
  /** 类型 */
  type?: string;
}

/** 批量新增/修改工资请求体中的单个工资项 */
export interface AddBatchEmployeeItem {
  /** 姓名，必填 */
  name: string;
  /** 部门，必填 */
  department: string;
  /** 身份证类型，必填 */
  identificationType: string;
  /** 身份证号，必填 */
  identificationNo: string;
  /** 国籍，必填 */
  country: string;
  /** 性别，必填 */
  sex: string;
  /** 出生日期，必填 */
  birthday: string;
  /** 手机号，必填 */
  phone: string;
  /** 人员状态，必填 */
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
  payRollPubSubs?: AddBatchEmployeeItemPayRollPubSubs[];
  /** 区间，必填 */
  acctgPeriod: string;
}

/**
 * （外部接口）批量新增/修改工资请求参数。
 *
 * 程序偏离说明：官方输入参数表按单个对象逐字段列示，但请求示例为数组
 * （`[ { ...员工工资字段... } ]`），即一次可提交多条工资记录。实现按数组建模，
 * 此偏离以示例为准（接口标题为「批量」），`employees` 对应请求体数组，
 * 数组元素类型 `AddBatchEmployeeItem` 与参数表字段逐字对齐。
 */
export interface AddBatchEmployeeParams {
  /** 账套 ID，URL 路径参数 `{bookid}`，必填 */
  bookid: string;
  /** 批量工资数据，请求体数组 */
  employees: AddBatchEmployeeItem[];
}

/**
 * 批量新增/修改工资返回数据（单个员工工资结果）。
 *
 * 程序偏离说明：官方输出参数表将 `data` 标注为 object，但响应示例为数组
 * （`data: [ { ... }, { ... } ]`）。因接口为批量操作，实现按数组建模、
 * 以示例为准，此处 `AddBatchEmployeeResult` 为数组元素类型，
 * 字段与输出参数表逐字对齐。
 */
export interface AddBatchEmployeeResult {
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
  /** 扩展信息（输出参数表未列，仅出现在响应示例中） */
  extInfo?: {
    /** 是否成功 */
    success?: boolean;
    /** 错误信息 */
    errorMsg?: string;
  };
}

/**
 * 好会计工资——（外部接口）批量新增/修改工资 API 工厂。
 *
 * @param client 好会计客户端实例
 */
export function createHkjblxzxggzApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）批量新增/修改工资。
     *
     * @param params 批量新增/修改条件
     * @param params.bookid 账套 ID，URL 路径参数 `{bookid}`，必填
     * @param params.employees 批量工资数据（请求体数组），必填
     * @param params.employees[].name 姓名，必填
     * @param params.employees[].department 部门，必填
     * @param params.employees[].identificationType 身份证类型，必填
     * @param params.employees[].identificationNo 身份证号，必填
     * @param params.employees[].country 国籍，必填
     * @param params.employees[].sex 性别，必填
     * @param params.employees[].birthday 出生日期，必填
     * @param params.employees[].phone 手机号，必填
     * @param params.employees[].empStatus 人员状态，必填
     * @param params.employees[].payrollId 工资 ID，修改时传入
     * @param params.employees[].employTime 雇佣时间
     * @param params.employees[].employmentType 受雇从业类型
     * @param params.employees[].isDeductExpenseDecuced 是否扣除减除费用，0 否 1 是，缺省 1
     * @param params.employees[].payRollPubSubs 工资加减项
     * @param params.employees[].payRollPubSubs[].code code
     * @param params.employees[].payRollPubSubs[].value 对应值
     * @param params.employees[].payRollPubSubs[].key 对应 key
     * @param params.employees[].payRollPubSubs[].type 类型
     * @param params.employees[].acctgPeriod 区间，必填
     * @returns 批量工资结果数组，每项为单个员工的工资结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgz/hkjblxzxggz
     */
    addBatchEmployee: (params: AddBatchEmployeeParams): Promise<AddBatchEmployeeResult[]> => {
      const { bookid, employees } = params;
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/payroll/payrollEmployee/outside/addBatchEmployee/{bookid}',
        pathParams: { bookid },
        body: employees,
      };
      return client.request<AddBatchEmployeeResult[]>(options);
    },
  };
}
