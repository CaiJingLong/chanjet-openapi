/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/zcfz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/bb/zcfz.md
 */
import type { ChanjetClient } from '../../client.js';

/**
 * 模块错误码说明：官方文档未提供「错误码说明」表，故本模块不定义错误码常量；
 * 业务失败码统一由 ChanjetApiError.code 透传官方原文。
 */

/** 获取资产负债表请求参数。 */
export interface BalanceSheetParams {
  /** 账套id，必填 */
  bookid: string;
  /** 报表期间，必填 */
  period: string;
  /** 是否重分类，可选 */
  isReorg?: boolean;
  /** 是否仅查询缓存，可选 */
  isOnlyGetCache?: boolean;
}

/** 资产负债表结果项（文档未提供输出参数表，字段取自响应示例）。 */
export interface BalanceSheetResult {
  /** 资产 */
  asset?: BalanceSheetResultAsset;
  /** 负债及所有者权益 */
  equity?: BalanceSheetResultEquity;
  /** 是否可折叠 */
  foldable?: boolean;
  /** 可以被折叠到的行的行号 */
  parentRowNum?: number;
  /** 表格行号（从1开始计数） */
  rowNum?: number;
}

/** 资产侧项目。 */
export interface BalanceSheetResultAsset {
  /** 项目id */
  itemId?: number;
  /** 期末余额 */
  baseEndingBalance?: number;
  /** 年初余额 */
  yearBaseOpeningBalance?: number;
  /** 公式是否可编辑 */
  editable?: boolean;
  /** 项目名称 */
  expressionContent?: string;
  /** 公式描述 */
  expressionDesc?: string;
  /** 名称前的空格数 */
  indentCount?: number;
  /** 报表显示的行次 */
  rowText?: string;
}

/** 负债及所有者权益侧项目。 */
export interface BalanceSheetResultEquity {
  /** 项目id */
  itemId?: number;
  /** 期末余额 */
  baseEndingBalance?: number;
  /** 年初余额 */
  yearBaseOpeningBalance?: number;
  /** 公式是否可编辑 */
  editable?: boolean;
  /** 项目名称 */
  expressionContent?: string;
  /** 公式描述 */
  expressionDesc?: string;
  /** 名称前的空格数 */
  indentCount?: number;
  /** 报表显示的行次 */
  rowText?: string;
}

/** 应收统计表请求参数。 */
export interface ReceiveParams {
  /** 账套id，必填 */
  bookid: string;
  /** 期间(yyyyMM)，必填 */
  period: string;
}

/** 应收统计表结果项（文档未提供输出参数表，字段取自响应示例）。 */
export interface ReceiveResult {
  /** 本年贷方累计 */
  yearDfAccumulate?: number;
  /** 客户辅助项编码 */
  assistantCustomerCode?: string;
  /** 是否入账（示例为字符串 "false"） */
  isentry?: string;
  /** 客户辅助项 */
  assistantCustomer?: number;
  /** 账龄天数 */
  spanDay?: number;
  /** 临时标识 */
  tempFlag?: boolean;
  /** 科目id */
  subjectId?: number;
  /** 本期借方余额 */
  currentPeriodJfBalance?: number;
  /** 本年借方累计 */
  yearJfAccumulate?: number;
  /** 辅助项id */
  assistantId?: number;
  /** 供应商辅助项 */
  assistantProvider?: number;
  /** 期初余额 */
  initBalance?: number;
  /** id */
  id?: number;
  /** 辅助项账 */
  assistantAccount?: number;
  /** 本期贷方余额 */
  currentPeriodDfBalance?: number;
  /** 期末余额 */
  endbalance?: number;
  /** 科目名称 */
  subjectName?: string;
}

/** 新版资产负债表接口请求参数。 */
export interface GetOldBalanceSheetParams {
  /** 账套id，必填 */
  bookid: string;
  /** 期间，必填 */
  period: string;
  /** 是否重分类，可选 */
  isReorg?: string;
}

/** 新版资产负债表接口结果项（结构与获取资产负债表一致）。 */
export type GetOldBalanceSheetResult = BalanceSheetResult;

/** 资产负债表状态检查请求参数。 */
export interface CheckParams {
  /** 账套id，必填 */
  bookid: string;
  /** 期间，必填 */
  period: string;
}

/** 资产负债表状态检查结果。 */
export interface CheckResult {
  /** 不平衡原因；为空表示平衡 */
  message?: string;
}

/** 获取新版结构化资产负债表请求参数。 */
export interface GetNewBalanceSheetParams {
  /** 账套id，必填 */
  bookid: string;
  /** 期间，必填 */
  period: string;
  /** 是否重分类，可选 */
  isReorg?: string;
}

/** 获取新版结构化资产负债表结果。 */
export interface GetNewBalanceSheetResult {
  /** 状态码 */
  code?: string;
  /** 结构化数据 */
  data?: GetNewBalanceSheetResultDataItem[];
  /** 是否成功 */
  successful?: boolean;
}

/** 新版结构化资产负债表行。 */
export interface GetNewBalanceSheetResultDataItem {
  /** 资产期末余额 */
  assetBaseEndingBalance?: number;
  /** 资产名称 */
  assetExpressionContent?: string;
  /** 资产行次 */
  assetRowText?: string;
  /** 资产年初余额 */
  assetYearBaseOpeningBalance?: number;
  /** 是否可编辑 */
  editable?: boolean;
  /** 负债和所有者权益期末余额 */
  equityBaseEndingBalance?: number;
  /** 负债和所有者权益名称 */
  equityExpressionContent?: string;
  /** 负债和所有者权益行次 */
  equityRowText?: string;
  /** 负债和所有者权益年初余额 */
  equityYearBaseOpeningBalance?: number;
}

/** 资产负债表模块 API。 */
export function createZcfzApi(client: ChanjetClient) {
  return {
    /**
     * 获取资产负债表。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.period 报表期间，必填
     * @param params.isReorg 是否重分类，可选
     * @param params.isOnlyGetCache 是否仅查询缓存，可选
     * @returns 资产负债表项目数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/zcfz
     */
    balanceSheet(params: BalanceSheetParams): Promise<BalanceSheetResult[]> {
      const { bookid, ...query } = params;
      return client.request<BalanceSheetResult[]>({
        method: 'GET',
        path: '/accounting/gl/BalanceSheet/{bookid}',
        pathParams: { bookid },
        query,
      });
    },

    /**
     * 应收统计表。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.period 期间(yyyyMM)，必填
     * @returns 应收统计表数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/zcfz
     */
    receive(params: ReceiveParams): Promise<ReceiveResult[]> {
      const { bookid, ...query } = params;
      return client.request<ReceiveResult[]>({
        method: 'GET',
        path: '/accounting/gl/statistics/receive/{bookid}',
        pathParams: { bookid },
        query,
      });
    },

    /**
     * 新版资产负债表接口（新版资产负债表获取数据）。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.period 期间，必填
     * @param params.isReorg 是否重分类，可选
     * @returns 资产负债表项目数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/zcfz
     */
    getOldBalanceSheet(params: GetOldBalanceSheetParams): Promise<GetOldBalanceSheetResult[]> {
      const { bookid, ...query } = params;
      return client.request<GetOldBalanceSheetResult[]>({
        method: 'GET',
        path: '/accounting/fin/getOldBalanceSheet/{bookid}',
        pathParams: { bookid },
        query,
      });
    },

    /**
     * 资产负债表状态检查。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.period 期间，必填
     * @returns 状态检查结果，`message` 为空表示平衡
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/zcfz
     */
    check(params: CheckParams): Promise<CheckResult> {
      const { bookid, ...query } = params;
      return client.request<CheckResult>({
        method: 'GET',
        path: '/accounting/gl/BalanceSheet/check/{bookid}',
        pathParams: { bookid },
        query,
      });
    },

    /**
     * 获取新版结构化资产负债表。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.period 期间，必填
     * @param params.isReorg 是否重分类，可选
     * @returns 新版结构化资产负债表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/zcfz
     */
    getNewBalanceSheet(params: GetNewBalanceSheetParams): Promise<GetNewBalanceSheetResult> {
      const { bookid, ...query } = params;
      return client.request<GetNewBalanceSheetResult>({
        method: 'GET',
        path: '/accounting/fin/getNewBalanceSheet/{bookid}',
        pathParams: { bookid },
        query,
      });
    },
  };
}
