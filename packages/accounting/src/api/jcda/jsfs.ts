/**
 * 来源: https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/jsfs
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/jcda/jsfs.md
 */
import type { ChanjetClient } from '../../client.js';

/**
 * 新增结算方式请求参数。
 */
export interface AddParams {
  /** 账套id */
  bookid: string;
  /** 结算方式名称 */
  name: string;
  /** 单据编码（唯一标识） */
  code: string;
  /** 第三方ID */
  externalId?: string;
  /** 备注 */
  comments?: string;
}

/**
 * 新增结算方式返回结果。
 */
export interface AddResult {
  /** 结算方式ID */
  id?: number;
}

/**
 * 删除结算方式请求参数。
 */
export interface RemoveParams {
  /** 账套id */
  bookid: string;
  /** 结算方式编码列表 */
  codes: string[];
}

/**
 * 删除结算方式返回结果。
 */
export interface RemoveResult {
  /** 删除成功的 code */
  success?: string[];
  /** 删除失败的 code */
  fail?: string[];
}

/**
 * 修改结算方式请求参数。
 */
export interface UpdateParams {
  /** 账套id */
  bookid: string;
  /** 结算方式编码（唯一标识） */
  code: string;
  /** 结算方式名称 */
  name?: string;
  /** 备注 */
  comments?: string;
  /** 第三方ID */
  externalId?: string;
}

/**
 * 修改结算方式返回结果。
 */
export interface UpdateResult {
  /** 结算方式编码 */
  code?: string;
}

/**
 * 查询结算方式请求参数。
 */
export interface QueryParams {
  /** 账套id */
  bookid: string;
  /** 结算方式编码 */
  code: string;
}

/**
 * 查询结算方式返回结果。
 */
export interface QueryResult {
  /** 结算方式名称 */
  name?: string;
  /** 单据编码 */
  code?: string;
  /** 第三方ID */
  externalId?: string;
  /** 备注 */
  comments?: string;
}

/**
 * 结算方式模块。
 */
export function createJsfsApi(client: ChanjetClient) {
  return {
    /**
     * 新增结算方式。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.name 结算方式名称
     * @param params.code 单据编码（唯一标识）
     * @param params.externalId 第三方ID
     * @param params.comments 备注
     * @returns 新增结果，`id` 为结算方式ID
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/jsfs
     */
    async add(params: AddParams): Promise<AddResult> {
      return client.request<AddResult>({
        method: 'POST',
        path: '/accounting/openapi/cc/paymentmethodtype/add/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          name: params.name,
          code: params.code,
          ...(params.externalId !== undefined ? { externalId: params.externalId } : {}),
          ...(params.comments !== undefined ? { comments: params.comments } : {}),
        },
      });
    },

    /**
     * 删除结算方式。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.codes 结算方式编码列表
     * @returns 删除结果，`success` 为成功编码、`fail` 为失败编码
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/jsfs
     */
    async remove(params: RemoveParams): Promise<RemoveResult> {
      return client.request<RemoveResult>({
        method: 'POST',
        path: '/accounting/openapi/cc/paymentmethodtype/remove/{bookid}',
        pathParams: { bookid: params.bookid },
        body: params.codes,
      });
    },

    /**
     * 修改结算方式。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.code 结算方式编码（唯一标识）
     * @param params.name 结算方式名称
     * @param params.comments 备注
     * @param params.externalId 第三方ID
     * @returns 修改结果，`code` 为结算方式编码
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/jsfs
     */
    async update(params: UpdateParams): Promise<UpdateResult> {
      return client.request<UpdateResult>({
        method: 'POST',
        path: '/accounting/openapi/cc/paymentmethodtype/update/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          code: params.code,
          ...(params.name !== undefined ? { name: params.name } : {}),
          ...(params.comments !== undefined ? { comments: params.comments } : {}),
          ...(params.externalId !== undefined ? { externalId: params.externalId } : {}),
        },
      });
    },

    /**
     * 查询结算方式。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.code 结算方式编码
     * @returns 结算方式详情
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/jsfs
     */
    async query(params: QueryParams): Promise<QueryResult> {
      return client.request<QueryResult>({
        method: 'GET',
        path: '/accounting/openapi/cc/paymentmethodtype/query/{code}/{bookid}',
        pathParams: { code: params.code, bookid: params.bookid },
      });
    },
  };
}
