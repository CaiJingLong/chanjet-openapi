/**
 * 来源: https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/sp
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/jcda/sp.md
 *
 * 文档各接口错误码说明表为空或未提供，故无错误码常量。
 */
import type { ChanjetClient } from '../../client.js';

/** 同步结果映射：键为第三方同步 id，值为系统生成的 id 或错误信息 */
type SyncResultMap = Record<string, string | number>;

/**
 * 批量同步商品请求参数。
 */
export interface BatchUpsertParams {
  /** 账套id */
  bookid: string;
  /** true为异步处理 */
  async?: boolean;
  /** 商品列表 */
  items: BatchUpsertParamsItem[];
}

/**
 * 批量同步商品请求体条目。
 */
export interface BatchUpsertParamsItem {
  /** 商品编码 */
  code: string;
  /** 商品id */
  id: number;
  /** 商品名称 */
  name: string;
  /** 计量单位设置 */
  productUOMSetting: BatchUpsertParamsItemProductUOMSetting;
  /** 规格型号 */
  specNo: string;
}

/**
 * 批量同步商品计量单位设置。
 */
export interface BatchUpsertParamsItemProductUOMSetting {
  /**
   * 计量单位id。
   *
   * 注意：文档参数表类型为 string，但示例为 integer，本实现按参数表用 string，
   * 与示例存在冲突。
   */
  baseUomId: string;
  /** 计量单位名称 */
  baseUomName: string;
}

/**
 * 批量同步商品返回结果。
 */
export interface BatchUpsertResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 查询商品请求参数。
 */
export interface QueryParams {
  /** 账套id */
  bookid: string;
  /** 商品编码 */
  code?: string;
  /** 商品名称 */
  name?: string;
  /** 规格 */
  specNo?: string;
  /** 分类编码 */
  productCategoryCode?: string;
  /** 每页数量（默认：20） */
  pageSize: string;
  /** 当前页（默认：1） */
  page: string;
}

/**
 * 查询商品返回结果。
 */
export interface QueryResult {
  /** 总页数 */
  totalPage?: string;
  /** 总记录数 */
  count?: string;
  /** 商品列表 */
  rows?: QueryResultRow[];
}

/**
 * 查询商品列表条目。
 */
export interface QueryResultRow {
  /** 商品ID */
  id?: string;
  /** 商品编码 */
  code?: string;
  /** 商品名称 */
  name?: string;
}

/**
 * 同步删除商品请求参数。
 */
export interface RemoveParams {
  /** 账套ID */
  bookid: string;
  /** 删除时间 */
  removeTime: string;
  /** 商品ID */
  id: number;
}

/**
 * 同步删除商品返回结果。
 */
export interface RemoveResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 商品基础档案模块。
 */
export function createSpApi(client: ChanjetClient) {
  return {
    /**
     * 批量同步商品。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.async true为异步处理
     * @param params.items 商品列表
     * @param params.items[].code 商品编码
     * @param params.items[].id 商品id
     * @param params.items[].name 商品名称
     * @param params.items[].productUOMSetting 计量单位设置
     * @param params.items[].productUOMSetting.baseUomId 计量单位id
     * @param params.items[].productUOMSetting.baseUomName 计量单位名称
     * @param params.items[].specNo 规格型号
     * @returns 同步结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/sp
     */
    async batchUpsert(params: BatchUpsertParams): Promise<BatchUpsertResult> {
      return client.request<BatchUpsertResult>({
        method: 'POST',
        path: '/accounting/document/integration/product/batchUpsert/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { ...(params.async !== undefined ? { async: params.async } : {}) },
        body: params.items,
      });
    },

    /**
     * 查询商品。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.code 商品编码
     * @param params.name 商品名称
     * @param params.specNo 规格
     * @param params.productCategoryCode 分类编码
     * @param params.pageSize 每页数量（默认：20）
     * @param params.page 当前页（默认：1）
     * @returns 商品分页结果，`rows` 为商品列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/sp
     */
    async query(params: QueryParams): Promise<QueryResult> {
      return client.request<QueryResult>({
        method: 'POST',
        path: '/accounting/document/open/product/query/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          ...(params.code !== undefined ? { code: params.code } : {}),
          ...(params.name !== undefined ? { name: params.name } : {}),
          ...(params.specNo !== undefined ? { specNo: params.specNo } : {}),
          ...(params.productCategoryCode !== undefined
            ? { productCategoryCode: params.productCategoryCode }
            : {}),
          pageSize: params.pageSize,
          page: params.page,
        },
      });
    },

    /**
     * 同步删除商品。
     *
     * @param params 请求参数
     * @param params.bookid 账套ID
     * @param params.removeTime 删除时间
     * @param params.id 商品ID
     * @returns 删除结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/sp
     */
    async remove(params: RemoveParams): Promise<RemoveResult> {
      return client.request<RemoveResult>({
        method: 'POST',
        path: '/accounting/document/integration/product/remove/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { removeTime: params.removeTime },
        body: { id: params.id },
      });
    },
  };
}
