/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/ck
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/jcda/ck.md
 *
 * 文档各接口错误码说明表为空或未提供，故无错误码常量。
 */
import type { ChanjetClient } from '../../client.js';

/** 同步结果映射：键为第三方同步 id，值为系统生成的 id 或错误信息 */
type SyncResultMap = Record<string, string | number>;

/**
 * 同步仓库请求参数。
 */
export interface BatchUpserttParams {
  /** 账套id */
  bookid: string;
  /** 仓库列表 */
  items: BatchUpserttParamsItem[];
}

/**
 * 同步仓库请求体条目。
 */
export interface BatchUpserttParamsItem {
  /** 状态（A：启用、B：停用） */
  statusEnum: string;
  /** 仓库id */
  id: string;
  /** 仓库编码 */
  code: string;
  /** 仓库名称 */
  name: string;
}

/**
 * 同步仓库返回结果。
 */
export interface BatchUpserttResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 同步删除仓库请求参数。
 */
export interface RemoveParams {
  /** 账套id */
  bookid: string;
  /** 删除时间戳 */
  removeTime: number;
  /** 仓库id */
  id: number;
}

/**
 * 同步删除仓库返回结果。
 */
export interface RemoveResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 仓库基础档案模块。
 */
export function createCkApi(client: ChanjetClient) {
  return {
    /**
     * 同步仓库：好会计接受第三方仓库基础档案同步信息。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.items 仓库列表
     * @param params.items[].statusEnum 状态（A：启用、B：停用）
     * @param params.items[].id 仓库id
     * @param params.items[].code 仓库编码
     * @param params.items[].name 仓库名称
     * @returns 同步结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/ck
     */
    async batchUpsertt(params: BatchUpserttParams): Promise<BatchUpserttResult> {
      return client.request<BatchUpserttResult>({
        method: 'POST',
        path: '/accounting/document/integration/warehouse/batchUpsertt/{bookid}',
        pathParams: { bookid: params.bookid },
        body: params.items,
      });
    },

    /**
     * 同步删除仓库：好会计接受第三方仓库基础档案删除信息。
     *
     * 注意：文档参数表将 removeTime 列在 Path 下，但示例 URL 为 query string，
     * 本实现按示例放在 query，与参数表存在冲突。
     *
     * 注意：文档参数表仅有一个 body 字段（类型 string），但示例 body 为 {"id": xxx}，
     * 本实现按示例将 body 设为 { id: params.id }，与参数表格式存在冲突。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.removeTime 删除时间戳
     * @param params.id 仓库id
     * @returns 删除结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/jcda/ck
     */
    async remove(params: RemoveParams): Promise<RemoveResult> {
      return client.request<RemoveResult>({
        method: 'POST',
        path: '/accounting/document/integration/warehouse/remove/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { removeTime: params.removeTime },
        body: { id: params.id },
      });
    },
  };
}
