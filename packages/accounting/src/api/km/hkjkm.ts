/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/km/hkjkm
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/km/hkjkm.md
 */
import type { ChanjetClient } from '../../client.js';

/** 调整科目级次返回的 data：成功无返回值，失败返回错误信息字符串。 */
export type AdjustSubjectCodeLenResult = string;

/** 调整科目级次请求参数。 */
export interface AdjustSubjectCodeLenParams {
  /** 账套id，路径参数，必填 */
  bookid: string;
  /** 调整后的科目编码，查询参数，必填 */
  newCodeLen: string;
}

/** 调整科目级次错误码表（文档"错误码说明"逐条收录）。 */
export const HJKKM_ERROR_CODES = {
  GL_E1022: { code: 'gl.e1022', message: '存在 xx 级编码首位不为0的科目' },
  GL_E1020: { code: 'gl.e1020', message: '调整后的科目层级与调整前的不匹配' },
  GL_E1021: { code: 'gl.e1021', message: '非一级科目编码长度只能从2-4间调整' },
} as const;

export function createHkjkmApi(client: ChanjetClient) {
  return {
    /**
     * 调整科目级次。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.newCodeLen 调整后的科目编码，查询参数，必填
     * @returns 成功无返回值；失败返回错误信息字符串（data）
     * @throws {ChanjetApiError} 远端返回业务错误（gl.e1020 / gl.e1021 / gl.e1022）、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/km/hkjkm
     */
    adjustSubjectCodeLen(params: AdjustSubjectCodeLenParams): Promise<AdjustSubjectCodeLenResult> {
      return client.request<AdjustSubjectCodeLenResult>({
        method: 'GET',
        path: '/accounting/gl/glaccount/adjustSubjectCodeLen/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { newCodeLen: params.newCodeLen },
      });
    },
  };
}
