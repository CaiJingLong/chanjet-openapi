/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjcssz/hkjcwxxcx
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjcssz/hkjcwxxcx.md
 * 错误码: 文档「错误码说明」表为空（- | -），故无错误码常量。
 */

import type { ChanjetClient, RequestOptions } from '../../client.js';

/**
 * （外部接口）财务信息查询请求参数。
 *
 * 官方文档仅提供头部参数与 `tenantId` 查询参数，`bookid` 为 URL 路径占位符。
 */
export interface AccountBookParams {
  /** 账套 ID，URL 路径参数 `{bookid}`，必填 */
  bookid: string | number;
  /** 账套 ID，查询参数，必填 */
  tenantId: string;
}

/**
 * 财务信息查询结果（`data` 字段）。
 *
 * 官方文档未提供输出参数表，以下字段均取自响应示例 JSON；因缺失必填性说明，全部标记为可选。
 */
export interface AccountBookResult {
  /** 账套编码 */
  bookCode?: string;
  /** 会计准则体系 ID */
  acctgSystemId?: number;
  /** 出纳名称 */
  casherName?: string;
  /** 企业负责人名称 */
  tenantOwnerName?: string;
  /** 是否允许删除（字符串 "TRUE"/"FALSE"，官方原文为 string，非布尔） */
  isDeleteAllowed?: string;
  /** 是否主账套 */
  isMainTenant?: boolean;
  /** 审批人名称 */
  approverName?: string;
  /** 序列化版本号 */
  serialVersionUID?: number;
  /** 现金流量表期初期间（YYYYMM） */
  cashFlowOpeningPeriod?: string;
  /** 主应用 ID */
  primaryAppId?: number;
  /** 价格精度 */
  priceScale?: number;
  /** 是否需要会计传递审批 */
  acctgTransApprovalRequired?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 账套 ID */
  id?: number;
  /** 记账人名称 */
  bookkeeperName?: string;
  /** 是否启用自定义报表 */
  enableCustomizedReport?: boolean;
  /** 资产负债表重组（字符串 "TRUE"/"FALSE"，官方原文为 string，非布尔） */
  balanceSheetReorg?: string;
  /** 纳税人类型枚举 */
  taxpayerTypeEnum?: string;
  /** 创建人用户 ID */
  createdUserId?: number;
  /** 账套来源枚举 */
  bookSourceEnum?: string;
  /** 是否允许编辑 */
  isEditAllowed?: string;
  /** 启用次数 */
  enabledTimes?: number;
  /** 会计传递分组枚举 */
  acctgTransGroupEnum?: string;
  /** 是否隐藏 */
  isHidden?: boolean;
  /** 最新财务期初期间（YYYYMM） */
  latestFiOpenPeriod?: string;
  /** 科目编码长度（点分格式） */
  glAccountCodeLen?: string;
  /** 期初期间（YYYYMM） */
  openingPeriod?: string;
  /** 域名 */
  domainName?: string;
  /** 账套名称 */
  name?: string;
  /** 企业 ID */
  enterpriseId?: number;
}

/**
 * 好会计财税设置 —— 财务信息查询 API 工厂。
 *
 * @param client 好会计客户端实例
 */
export function createHkjcwxxcxApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）查询财务信息。
     *
     * @param params 查询条件
     * @param params.bookid 账套 ID，URL 路径参数 `{bookid}`，必填
     * @param params.tenantId 账套 ID，查询参数，必填
     * @returns 财务信息，`data` 字段内容
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjcssz/hkjcwxxcx
     */
    accountBook: (params: AccountBookParams): Promise<AccountBookResult> => {
      const { bookid, tenantId } = params;
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/accounting/outside/accountBook/{bookid}',
        pathParams: { bookid },
        query: { tenantId },
      };
      return client.request<AccountBookResult>(options);
    },
  };
}
