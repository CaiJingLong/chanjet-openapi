/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgz/hkjscgz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjgz/hkjscgz.md
 *
 * 文档「错误码说明」表为空（| - | - |），故本模块无错误码常量。
 */

import type { ChanjetClient, RequestOptions } from '../../client.js';

/** （外部接口）删除工资请求参数 */
export interface DeletePayrollListParams {
  /** 账套 ID，URL 路径参数 `{bookid}`，必填 */
  bookid: string;
  /** 工资 ID 列表，请求体，必填；官方说明“多个以逗号分割”，示例为字符串数组 */
  payrollIdList: string[];
}

/**
 * 好会计工资——（外部接口）删除工资 API 工厂。
 *
 * @param client 好会计客户端实例
 */
export function createHkjscgzApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）删除工资。
     *
     * @param params 删除条件
     * @param params.bookid 账套 ID，URL 路径参数 `{bookid}`，必填
     * @param params.payrollIdList 工资 ID 列表（请求体），必填
     * @returns 成功时无返回数据（void）；响应体外壳含 `code` 与 `successful`，业务失败时抛错
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjgz/hkjscgz
     */
    deletePayrollList: (params: DeletePayrollListParams): Promise<void> => {
      const { bookid, payrollIdList } = params;
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/payroll/payrollEmployee/outside/deletePayrollList/{bookid}',
        pathParams: { bookid },
        body: { payrollIdList },
      };
      return client.request<void>(options);
    },
  };
}
