/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjjz/hkjjz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjjz/hkjjz.md
 */

import type { ChanjetClient, RequestOptions } from '../../client.js';

/**
 * （外部接口）结账请求参数。
 *
 * 官方错误码说明表为空，未收录任何错误码常量。
 */
export interface CheckOutParams {
  /** 账套ID，URL 路径参数 `{bookid}`，必填 */
  bookid: string;
  /** 区间，请求体字段，必填 */
  period: string;
  /** 是否重分类，请求体字段，必填 */
  isReOrg: boolean;
}

/** （外部接口）结账结果（响应 `data` 字段）。 */
export interface CheckOutResult {
  /** 内容 */
  message?: string;
  /** 是否显示提示（官方说明列为空） */
  isshowPrompt?: boolean;
}

/**
 * 结账状态查询（内部）请求参数。
 *
 * 官方错误码说明表为空，未收录任何错误码常量。
 */
export interface CheckOutPeriodParams {
  /** 账套id，URL 路径参数 `{bookid}`，必填 */
  bookid: string;
}

/**
 * 结账状态查询（内部）结果。
 *
 * 该接口响应为扁平结构（无标准 `code`/`success`/`data` 外壳），字段直接位于顶层。
 * 官方响应示例中的 `isSuccess` 未出现在输出参数表，故未收录。
 */
export interface CheckOutPeriodResult {
  /** 结账期间 */
  closePeriod?: string;
  /** 未结账期间集合 */
  data?: string[];
  /**
   * 最大凭证期间。
   *
   * 官方输出参数表类型为 `array<string>`，但响应示例为单个字符串（如 `"201805"`），
   * 存在文档歧义；此处按参数表取 `string[]`。
   */
  lastVoucherPeriod?: string[];
}

/**
 * 财务月结操作日志查询条件子项。
 *
 * 官方参数表将 `from`、`to` 标记为必填，但请求示例中 `type=value` 的子项仅含 `value`
 * 而无 `from`/`to`；同时 `value` 未出现在参数表、仅出现在请求示例。故将 `from`/`to`/`value`
 * 均定义为可选，按 `type` 取值使用：`type=between` 用 `from`/`to`，`type=value` 用 `value`。
 */
export interface QueryLogParam {
  /** 字段名称 */
  name: string;
  /** 开始时间（type=between 时使用） */
  from?: string;
  /** 结束时间（type=between 时使用） */
  to?: string;
  /** 类型：between（区间）或 value（值） */
  type: string;
  /** 值（type=value 时使用；官方参数表未列，取自请求示例） */
  value?: string;
}

/**
 * 财务月结操作日志请求参数。
 *
 * 官方未列路径参数表，`bookid` 据请求地址 `POST /accounting/syslog/queryLog/{bookid}` 推断为
 * URL 路径占位符。官方错误码说明表为空，未收录任何错误码常量。
 */
export interface QueryLogParams {
  /** 账套id，URL 路径参数 `{bookid}`，必填 */
  bookid: string;
  /** 页 */
  page: number;
  /** 数量 */
  pageSize: number;
  /** 入参 */
  params: QueryLogParam[];
}

/**
 * 财务月结操作日志条目。
 *
 * 官方响应示例中条目还包含 `code`、`transactionTypeEnum`、`clientName`、`bizDate`、
 * `resourceCategoryId`、`clientIp` 等字段，但输出参数表未列，故按参数表仅收录下列字段。
 */
export interface QueryLogItem {
  /** 操作内容：例如202302结账 或202302反结账 */
  operationContent?: string;
  /** 操作时间 */
  operationTime?: string;
  /** 财务月结 */
  resourceId?: string;
  /** 操作方式：手工操作 */
  sysOperationLogTypeEnum?: string;
  /** 操作人 */
  userId?: string;
}

/** 财务月结操作日志结果（扁平响应，无标准外壳）。 */
export interface QueryLogResult {
  /** 日志数组 */
  data?: QueryLogItem[];
  /** 返回数量 */
  total?: number;
}

/**
 * 好会计结账模块（结账、结账状态查询、财务月结操作日志）。
 *
 * @param client 好会计客户端实例
 * @returns 结账各接口方法
 */
export function createHkjjzApi(client: ChanjetClient) {
  return {
    /**
     * （外部接口）结账。
     *
     * @param params 结账参数
     * @param params.bookid 账套ID，URL 路径参数，必填
     * @param params.period 区间，请求体字段，必填
     * @param params.isReOrg 是否重分类，请求体字段，必填
     * @returns 结账结果，`message` 为返回内容、`isshowPrompt` 为是否显示提示
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjjz/hkjjz
     */
    checkOut(params: CheckOutParams): Promise<CheckOutResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/gl/CheckOut/outside/checkOut/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { period: params.period, isReOrg: params.isReOrg },
      };
      return client.request<CheckOutResult>(options);
    },

    /**
     * 结账状态查询（内部）——获取需要结账的期间。
     *
     * 该接口响应为扁平结构（无标准 `code`/`success`/`data` 外壳），故使用
     * `requestEnvelope` 返回完整响应体，而非仅 `data` 字段。
     *
     * @param params 查询参数
     * @param params.bookid 账套id，URL 路径参数，必填
     * @returns 结账期间与未结账期间集合
     * @throws {ChanjetApiError} 远端返回网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjjz/hkjjz
     */
    async checkOutPeriod(params: CheckOutPeriodParams): Promise<CheckOutPeriodResult> {
      const options: RequestOptions = {
        method: 'GET',
        path: '/accounting/gl/CheckOut/checkOutPeriod/{bookid}',
        pathParams: { bookid: params.bookid },
      };
      const envelope = await client.requestEnvelope<CheckOutPeriodResult>(options);
      return envelope as unknown as CheckOutPeriodResult;
    },

    /**
     * 财务月结操作日志。
     *
     * 该接口响应为扁平结构（无标准 `code`/`success`/`data` 外壳），故使用
     * `requestEnvelope` 返回完整响应体，而非仅 `data` 字段。
     *
     * @param params 查询参数
     * @param params.bookid 账套id，URL 路径参数，必填
     * @param params.page 页，请求体字段，必填
     * @param params.pageSize 数量，请求体字段，必填
     * @param params.params 入参，请求体字段，必填
     * @param params.params[].name 字段名称
     * @param params.params[].from 开始时间（type=between 时使用）
     * @param params.params[].to 结束时间（type=between 时使用）
     * @param params.params[].type 类型：between（区间）或 value（值）
     * @param params.params[].value 值（type=value 时使用）
     * @returns 财务月结操作日志，`data` 为日志数组、`total` 为返回数量
     * @throws {ChanjetApiError} 远端返回网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjjz/hkjjz
     */
    async queryLog(params: QueryLogParams): Promise<QueryLogResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/syslog/queryLog/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { page: params.page, pageSize: params.pageSize, params: params.params },
      };
      const envelope = await client.requestEnvelope<QueryLogResult>(options);
      return envelope as unknown as QueryLogResult;
    },
  };
}
