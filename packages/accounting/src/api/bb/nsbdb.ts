/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/nsbdb
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/bb/nsbdb.md
 */
import type { ChanjetClient } from '../../client.js';

/**
 * 模块错误码说明：官方文档提供「错误码说明」表但内容为空（- | -），故本模块不定义错误码常量；
 * 业务失败码统一由 ChanjetApiError.code 透传官方原文。
 */

/** 纳税波动表（参数为 queryParam）请求参数。 */
export interface QueryParams {
  /** 账套ID，必填 */
  bookid: string;
  /** 查询条件对象，必填，序列化为 json 转义字符串后作为 query 参数 */
  queryParam: Record<string, unknown>;
}

/**
 * 纳税波动表（参数为 queryParam）结果项。
 *
 * 注：文档"输出参数"表将 `1`~`12` 月与 `year` 标注为 string，
 * 但响应示例中为数字；本类型严格按"输出参数"表标注为 string。
 */
export interface QueryResult {
  /** 1月 */
  '1'?: string;
  /** 2月 */
  '2'?: string;
  /** 3月 */
  '3'?: string;
  /** 4月 */
  '4'?: string;
  /** 5月 */
  '5'?: string;
  /** 6月 */
  '6'?: string;
  /** 7月 */
  '7'?: string;
  /** 8月 */
  '8'?: string;
  /** 9月 */
  '9'?: string;
  /** 10月 */
  '10'?: string;
  /** 11月 */
  '11'?: string;
  /** 12月 */
  '12'?: string;
  /** 科目编码 */
  glAccountCode?: string;
  /** 科目ID */
  glAccountId?: number;
  /** 科目名称 */
  glAccountName?: string;
  /** 是否应交增值税 */
  vatPaybel?: boolean;
  /** 年的金额 */
  year?: string;
}

/** 查询纳税波动表（参数为 period）请求参数。 */
export interface QueryTaxFluctuateParams {
  /** 账套id，必填 */
  bookid: string;
  /** 期间，必填 */
  period: string;
}

/** 查询纳税波动表（参数为 period）结果项。 */
export interface QueryTaxFluctuateResult {
  /** 11月金额 */
  _11?: number;
  /** 12月金额 */
  _12?: number;
  /** 科目名称 */
  glAccountName?: string;
  /** 全年金额 */
  year?: number;
  /** 是否是应交增值税 */
  vatPaybel?: boolean;
  /** 1月金额 */
  _1?: number;
  /** 应交增值税明细科目 */
  glAccountCodes?: QueryTaxFluctuateResultGlAccountCodesItem[];
  /** 2月金额 */
  _2?: number;
  /** 3月金额 */
  _3?: number;
  /** 4月金额 */
  _4?: number;
  /** 5月金额 */
  _5?: number;
  /** 6月金额 */
  _6?: number;
  /** 7月金额 */
  _7?: number;
  /** 8月金额 */
  _8?: number;
  /** 9月金额 */
  _9?: number;
  /** 10月金额 */
  _10?: number;
}

/** 应交增值税明细科目项。 */
export interface QueryTaxFluctuateResultGlAccountCodesItem {
  /** 科目编码 */
  no?: string;
  /** 科目id */
  id?: number;
}

/** 纳税波动表模块 API。 */
export function createNsbdbApi(client: ChanjetClient) {
  return {
    /**
     * 纳税波动表（参数为 queryParam）。
     *
     * @param params 查询条件
     * @param params.bookid 账套ID，必填
     * @param params.queryParam 查询条件对象，必填，序列化为 json 转义字符串后作为 query 参数
     * @returns 纳税波动表数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/nsbdb
     */
    query(params: QueryParams): Promise<QueryResult[]> {
      const { bookid, queryParam } = params;
      return client.request<QueryResult[]>({
        method: 'GET',
        path: '/accounting/asr/TaxFluctuate/query/{bookid}',
        pathParams: { bookid },
        query: { queryParam: JSON.stringify(queryParam) },
      });
    },

    /**
     * 查询纳税波动表（参数为 period）。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.period 期间，必填
     * @returns 纳税波动表数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/nsbdb
     */
    queryTaxFluctuate(params: QueryTaxFluctuateParams): Promise<QueryTaxFluctuateResult[]> {
      const { bookid, ...query } = params;
      return client.request<QueryTaxFluctuateResult[]>({
        method: 'GET',
        path: '/accounting/asr/TaxFluctuate/queryTaxFluctuate/{bookid}',
        pathParams: { bookid },
        query,
      });
    },
  };
}
