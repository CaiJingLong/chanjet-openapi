/**
 * 来源: https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/jldw
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/jcda/jldw.md
 */
import type { ChanjetClient } from '../../client.js';

/** 同步结果映射：键为第三方同步 id，值为系统生成的 id 或错误信息 */
type SyncResultMap = Record<string, string | number>;

/**
 * 同步删除计量单位请求参数。
 */
export interface RemoveParams {
  /** 账套id */
  bookid: string;
  /** 删除时间 */
  removeTime: string;
  /** 计量单位ID */
  id: number;
}

/**
 * 同步删除计量单位返回结果。
 */
export interface RemoveResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 新增计量单位请求参数。
 */
export interface BatchUpsertParams {
  /** 账套id */
  bookid: string;
  /** 计量单位列表 */
  items: BatchUpsertParamsItem[];
}

/**
 * 新增计量单位请求体条目。
 */
export interface BatchUpsertParamsItem {
  /** 计量单位名称 */
  uomName: string;
  /** 状态（A：启用、B：停用） */
  statusEnum: string;
}

/**
 * 新增计量单位返回结果。
 */
export interface BatchUpsertResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 币种查询请求参数。
 */
export interface QueryAllCurrencyParams {
  /** 账套id */
  bookid: string;
}

/**
 * 币种查询返回结果条目。
 */
export interface QueryAllCurrencyResult {
  /** 币种代码 例如：港元就是：HKD */
  code?: string;
  /** 小数刻度 */
  decimalScale?: number;
  /** 备注 */
  description?: string;
  /** 唯一标识 */
  id?: number;
  /** 币种名称 */
  name?: string;
  /** A：启用 */
  statusEnum?: string;
  /** 象征 */
  symbol?: string;
}

/**
 * 计量单位与币种模块。
 */
export function createJldwApi(client: ChanjetClient) {
  return {
    /**
     * 同步删除计量单位。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.removeTime 删除时间
     * @param params.id 计量单位ID
     * @returns 删除结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/jldw
     */
    async remove(params: RemoveParams): Promise<RemoveResult> {
      return client.request<RemoveResult>({
        method: 'POST',
        path: '/accounting/document/integration/uom/remove/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { removeTime: params.removeTime },
        body: { id: params.id },
      });
    },

    /**
     * 新增计量单位。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.items 计量单位列表
     * @param params.items[].uomName 计量单位名称
     * @param params.items[].statusEnum 状态（A：启用、B：停用）
     * @returns 同步结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/jldw
     */
    async batchUpsert(params: BatchUpsertParams): Promise<BatchUpsertResult> {
      return client.request<BatchUpsertResult>({
        method: 'POST',
        path: '/accounting/document/integration/uom/batchUpsert/{bookid}',
        pathParams: { bookid: params.bookid },
        body: params.items,
      });
    },

    /**
     * 币种查询：全部币种查询。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @returns 币种列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/jldw
     */
    async queryAllCurrency(params: QueryAllCurrencyParams): Promise<QueryAllCurrencyResult[]> {
      return client.request<QueryAllCurrencyResult[]>({
        method: 'GET',
        path: '/accounting/acctgplt/FavoriteCurrency/queryAllCurrency/{bookid}',
        pathParams: { bookid: params.bookid },
      });
    },
  };
}
