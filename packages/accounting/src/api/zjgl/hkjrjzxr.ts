/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/hkjrjzxr
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/zjgl/hkjrjzxr.md
 */

import type { ChanjetClient } from '../../client.js';

/**
 * 日记账写入的请求参数。
 *
 * 注：请求地址中的 {bookid} 为路径参数；请求体字段仅文档化了一个 `jsonObject`（object），
 * 未逐字段展开其结构，故此处以 `object` 承载。
 */
export interface JournalWriteParams {
  /** 账套ID，必填，对应 URL 路径中的 {bookid} */
  bookid: string;
  /** 请求数据，必填 */
  jsonObject: object;
}

/** 日记账写入的返回数据（响应 `data` 字段，为写入记录的 ID）。 */
export type JournalWriteResult = number;

/**
 * 日记账写入。
 *
 * @param params 请求参数
 * @param params.bookid 账套ID，必填，对应 URL 路径中的 {bookid}
 * @param params.jsonObject 请求数据，必填
 * @returns 写入记录的 ID
 * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
 * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/zjgl/hkjrjzxr
 */
export function createHkjrjzxrApi(client: ChanjetClient) {
  return {
    journalWrite(params: JournalWriteParams): Promise<JournalWriteResult> {
      const { bookid, jsonObject } = params;
      return client.request<JournalWriteResult>({
        method: 'POST',
        path: '/accounting/acctgplt/CashJournal/outside/journalWrite/{bookid}',
        pathParams: { bookid },
        body: jsonObject,
      });
    },
  };
}
