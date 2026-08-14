/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgz/hkjgzjqcx
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgz/hkjgzjqcx.md
 *
 * 文档「错误码说明」表为空（| - | - |），故本模块无错误码常量。
 */

import type { ChanjetClient, RequestOptions } from '../../client.js';

/** （外部接口）精确查询工资请求参数 */
export interface GetPayrollListParams {
  /** 账套 ID，URL 路径参数 `{bookid}`，必填 */
  bookid: string;
  /** 区间，查询参数，必填 */
  acctgPeriod: string;
  /** 身份证号，查询参数，必填 */
  identificationNo: string;
}

/** （外部接口）精确查询工资结果（`data` 字段） */
export interface GetPayrollListResult {
  /** 个人负担养老保险 */
  persPension?: string;
  /** 国籍 */
  country?: string;
  /** 个人负担住房公积金 */
  persHousingFund?: string;
  /** 医疗保险（企业） */
  corpHeathcareIns?: string;
  /** 工伤保险（企业） */
  corpInjuryIns?: string;
  /** 下发状态 */
  releasedStatusEnum?: string;
  /** 基本工资 */
  yf?: string;
  /** 生育保险（企业） */
  corpMaternityIns?: string;
  /** 养老保险（企业） */
  corpPension?: string;
  /** 人员状态 */
  empStatus?: string;
  /** 大额医疗保险（企业） */
  corpLargeHeathcareIns?: string;
  /** 基本工资 */
  jbgz?: string;
  /** 人员报送失败原因 */
  sbyy?: string;
  /** 工资 ID */
  id?: number;
  /** 个人负担大额医疗保险 */
  persLargeHeathcareIns?: string;
  /** 实发金额 */
  amount?: string;
  /** 住房公积金（企业） */
  corpHousingFund?: string;
  /** 员工 */
  employeeId?: string;
  /** 应纳税额 */
  tax?: string;
  /** 失业保险（企业） */
  corpUnemplIns?: string;
  /** 个人负担失业保险 */
  persUnemplIns?: string;
  /** 工号 */
  empCode?: string;
  /** 姓名 */
  name?: string;
  /** 身份证号 */
  identificationNo?: string;
  /** 个人负担医疗保险 */
  persHeathcareIns?: string;
  /** 报送状态 */
  sbzt?: string;
}

/**
 * 好会计工资——（外部接口）精确查询工资 API 工厂。
 *
 * @param client 好会计客户端实例
 */
export function createHkjgzjqcxApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）精确查询工资。
     *
     * @param params 查询条件
     * @param params.bookid 账套 ID，URL 路径参数 `{bookid}`，必填
     * @param params.acctgPeriod 区间，查询参数，必填
     * @param params.identificationNo 身份证号，查询参数，必填
     * @returns 工资精确查询结果，`data` 字段内容
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgz/hkjgzjqcx
     */
    getPayrollList: (params: GetPayrollListParams): Promise<GetPayrollListResult> => {
      const { bookid, acctgPeriod, identificationNo } = params;
      const options: RequestOptions = {
        method: 'GET',
        path: '/accounting/payroll/payrollEmployee/outside/getPayrollList/{bookid}',
        pathParams: { bookid },
        query: { acctgPeriod, identificationNo },
      };
      return client.request<GetPayrollListResult>(options);
    },
  };
}
