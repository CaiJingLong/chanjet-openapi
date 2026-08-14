/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgz/hkjgzxr
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgz/hkjgzxr.md
 *
 * 文档「错误码说明」表为空（| - | - |），故本模块无错误码常量。
 */

import type { ChanjetClient, RequestOptions } from '../../client.js';

/**
 * （外部接口）工资写入请求参数。
 *
 * 官方文档输入参数表仅列出头部参数，`bookid` 为 URL 路径占位符
 * （请求地址 `/accounting/payroll/payrollEmployee/outside/payrollWrite/{bookid}`）。
 */
export interface PayrollWriteParams {
  /** 账套 ID，URL 路径参数 `{bookid}`，必填 */
  bookid: string;
}

/** （外部接口）工资写入结果（`data` 字段） */
export interface PayrollWriteResult {
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
  /** 自定义项（官方文档说明为空） */
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
  /** 是否成功（官方文档输出参数 `data.successful` 类型为 string） */
  successful?: string;
}

/**
 * 好会计工资——（外部接口）工资写入 API 工厂。
 *
 * @param client 好会计客户端实例
 */
export function createHkjgzxrApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）工资写入。
     *
     * @param params 工资写入条件
     * @param params.bookid 账套 ID，URL 路径参数 `{bookid}`，必填
     * @returns 工资写入结果，`data` 字段内容
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgz/hkjgzxr
     */
    payrollWrite: (params: PayrollWriteParams): Promise<PayrollWriteResult> => {
      const { bookid } = params;
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/payroll/payrollEmployee/outside/payrollWrite/{bookid}',
        pathParams: { bookid },
      };
      return client.request<PayrollWriteResult>(options);
    },
  };
}
