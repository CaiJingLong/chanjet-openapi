/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/pjhz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/pjgl/pjhz.md
 * 注: 本文档「错误码说明」表为空（仅一行 `- | -`），故本模块无错误码常量表。
 */
import type { ChanjetClient } from '../../client.js';

/**
 * 票据汇总表请求体。
 *
 * 请求地址: POST https://openapi.chanjet.com/accounting/easyacctg/bill/billSummaryPage/{bookid}
 */
export interface BillSummaryPageParams {
  /** 员工 userId */
  userId: number;
  /** 部门 ID */
  deptId: number;
  /** 授权给我的 */
  showAuth: boolean;
  /** 我的客户 */
  myCust: boolean;
  /** 助记码或名称 */
  codeOrName: string;
  /** 期间 */
  period: string;
  /** 页数 */
  pageCount: number;
  /** 每页条数 */
  pageSize: number;
}

/** 票据汇总表单行条目 */
export interface BillSummaryPageResultListItem {
  /** 客户 ID */
  id?: string;
  /** 助记码 */
  code?: string;
  /** 客户名称 */
  name?: string;
  /** 账套 ID */
  assocTenantId?: string;
  /** 账套 domain_name */
  bkDomainName?: string;
  /** 企业 domain_name */
  orgDomainName?: string;
  /** 销项普票金额 */
  outGoingNormorlInvoice?: string;
  /** 销项专票金额 */
  outGoingSpecialInvoice?: string;
  /** 进项专票（成本）金额 */
  incomingSpecialInvoiceInv?: string;
  /** 进项专票（费用）金额 */
  incomingSpecialInvoiceFee?: string;
  /** 进项普票（成本）金额 */
  incomingNormorlInvoiceInv?: string;
  /** 进项普票（费用）金额 */
  incomingNormorlInvoiceFee?: string;
  /** 非增值税费用票金额 */
  fee?: string;
  /** 是否有对账单数据 */
  isHasCashJournal?: boolean;
  /** 是否有工资数据 */
  isHasPayRoll?: boolean;
}

/** 票据汇总表返回数据 */
export interface BillSummaryPageResult {
  /** 汇总条数 */
  count?: number;
  /** 汇总列表 */
  list?: BillSummaryPageResultListItem[];
}

/** 票据汇总（pjhz）模块方法集 */
export interface PjhzApi {
  /**
   * 票据汇总列表。
   *
   * @param bookid 账套 ID，必填，作为路径参数
   * @param params 请求体
   * @param params.userId 员工 userId，必填
   * @param params.deptId 部门 ID，必填
   * @param params.showAuth 授权给我的，必填
   * @param params.myCust 我的客户，必填
   * @param params.codeOrName 助记码或名称，必填
   * @param params.period 期间，必填
   * @param params.pageCount 页数，必填
   * @param params.pageSize 每页条数，必填
   * @returns 票据汇总结果，`count` 为条数，`list` 为汇总列表
   * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
   * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/pjgl/pjhz#api-20043
   */
  billSummaryPage(bookid: string, params: BillSummaryPageParams): Promise<BillSummaryPageResult>;
}

/** 创建票据汇总（pjhz）模块 API 方法集 */
export function createPjhzApi(client: ChanjetClient): PjhzApi {
  return {
    billSummaryPage(bookid: string, params: BillSummaryPageParams): Promise<BillSummaryPageResult> {
      return client.request<BillSummaryPageResult>({
        method: 'POST',
        path: '/accounting/easyacctg/bill/billSummaryPage/{bookid}',
        pathParams: { bookid },
        body: params,
      });
    },
  };
}
