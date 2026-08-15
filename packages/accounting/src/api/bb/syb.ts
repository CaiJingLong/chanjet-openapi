/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/syb
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/bb/syb.md
 */
import type { ChanjetClient } from '@chanjet-openapi/core';

/**
 * 模块错误码说明：官方文档未提供「错误码说明」表，故本模块不定义错误码常量；
 * 业务失败码统一由 ChanjetApiError.code 透传官方原文。
 */

/** 获取损益表请求参数。 */
export interface IncomeStatementParams {
  /** 账套id，必填 */
  bookid: string;
  /** 报表期间，必填 */
  period: string;
  /** 是否季报，可选 */
  isReorg?: boolean;
  /** 是否仅查询缓存，可选 */
  isOnlyGetCache?: boolean;
}

/** 获取损益表结果项（文档未提供输出参数表，字段取自响应示例）。 */
export interface IncomeStatementResult {
  /** 项目id */
  id?: number;
  /** 是否可折叠 */
  foldable?: boolean;
  /** 可以被折叠到的行的行号 */
  parentRowNum?: number;
  /** 表格行号（从1开始计数） */
  rowNum?: number;
  /** 是否可编辑 */
  editable?: boolean;
  /** 项目名称 */
  expressionContent?: string;
  /** 项目名称前的空格数 */
  indentCount?: number;
  /** 公式描述 */
  expressionDesc?: string;
  /** 显示行次（收入支出表为第一列的科目编码） */
  rowText?: string;
  /** 本月金额 */
  monthAmount?: number;
  /** 本年累计 */
  thisYearAmount?: number;
  /** 上年同期累计（企业会计准则） */
  lastYearAmount?: number;
  /** 上年同期金额（典当行业报表） */
  lastAmount?: number;
  /** 本月数（民间非盈利会计制度） */
  monthAmountQualiValue?: IncomeStatementResultQualiValue;
  /** 本年数（民间非盈利会计制度） */
  thisYearAmountQualiValue?: IncomeStatementResultQualiValue;
  /** 公式表达式呈现（民间非盈利会计制度） */
  qualiDesc?: IncomeStatementResultQualiDesc;
  /** 一季度金额（季报） */
  q1Amount?: number;
  /** 二季度金额（季报） */
  q2Amount?: number;
  /** 三季度金额（季报） */
  q3Amount?: number;
  /** 四季度金额（季报） */
  q4Amount?: number;
}

/** 限定性/非限定性金额。 */
export interface IncomeStatementResultQualiValue {
  /** 限定性 */
  qualification?: number;
  /** 非限定性 */
  unQualification?: number;
}

/** 限定性/非限定性公式表达式。 */
export interface IncomeStatementResultQualiDesc {
  /** 限定性 */
  qualification?: string;
  /** 非限定性 */
  unQualification?: string;
}

/** 新版利润表请求参数。 */
export interface GetOldIncomeStatementParams {
  /** 账套id，必填 */
  bookid: string;
  /** 期间，必填 */
  period: string;
  /** 是否季报，可选 */
  isQuarter?: string;
  /** 07会计制度是否获取新版格式的报表，可选 */
  enableNewEdition?: string;
}

/** 新版利润表结果项（结构与获取损益表一致）。 */
export type GetOldIncomeStatementResult = IncomeStatementResult;

/** 损益表模块 API。 */
export function createSybApi(client: ChanjetClient) {
  return {
    /**
     * 获取损益表（包括：利润表，业务活动表，收入支出表）。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.period 报表期间，必填
     * @param params.isReorg 是否季报，可选
     * @param params.isOnlyGetCache 是否仅查询缓存，可选
     * @returns 损益表项目数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/syb
     */
    incomeStatement(params: IncomeStatementParams): Promise<IncomeStatementResult[]> {
      const { bookid, ...query } = params;
      return client.request<IncomeStatementResult[]>({
        method: 'GET',
        path: '/accounting/gl/IncomeStatement/{bookid}',
        pathParams: { bookid },
        query,
      });
    },

    /**
     * 新版利润表（新版报表接口获取）。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.period 期间，必填
     * @param params.isQuarter 是否季报，可选
     * @param params.enableNewEdition 07会计制度是否获取新版格式的报表，可选
     * @returns 损益表项目数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/syb
     */
    getOldIncomeStatement(
      params: GetOldIncomeStatementParams,
    ): Promise<GetOldIncomeStatementResult[]> {
      const { bookid, ...query } = params;
      return client.request<GetOldIncomeStatementResult[]>({
        method: 'GET',
        path: '/accounting/fin/getOldIncomeStatement/{bookid}',
        pathParams: { bookid },
        query,
      });
    },
  };
}
