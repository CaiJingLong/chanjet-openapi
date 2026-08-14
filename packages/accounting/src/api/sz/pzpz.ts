/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/sz/pzpz
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/sz/pzpz.md
 */
import type { ChanjetClient } from '../../client.js';

/** 查询凭证类别请求参数。 */
export interface GetAcctgTransCategoryParams {
  /** 账套id，路径参数，必填 */
  bookid: string;
  /** 启用/禁用：A-启用，I-禁用，传空查全部，查询参数，可选 */
  status?: string;
}

/** 凭证类别。 */
export interface GetAcctgTransCategoryResult {
  /** 凭证类型编码 */
  code?: string;
  /** 名称 */
  name?: string;
  /** id */
  id?: number;
  /** 全称 */
  longName?: string;
  /** 启用/禁用 A-启用，I-禁用 */
  status?: string;
}

/** 获取凭证配置信息请求参数。 */
export interface GetDocSettingParams {
  /** 账套id，路径参数，必填 */
  bookid: string;
  /** 配置项名称（如 PUBLIC/INVOICEIN/INVOICEOUT/CASHJOURNAL/PAYROLL/FIXEDASSET）。
   * 文档将 settingName 列于"路径参数"表，但请求地址仅含 {bookid} 占位，按查询参数处理。必填 */
  settingName: string;
}

/** 获取凭证配置信息返回结果。 */
export interface GetDocSettingResult {
  /** Map类型 */
  map?: Record<string, unknown>;
}

/** 保存凭证设置公共选项请求参数。 */
export interface SaveSettingValueParams {
  /** 账套id，路径参数（文档"查询参数"表另列同名 bookid，属重复，按路径参数处理），必填 */
  bookid: string;
}

/** 保存凭证配置-销项发票请求参数。 */
export interface UpsertAcctgTransSettingsParams {
  /** 账套id，路径参数（文档请求地址缺少 /accounting 前缀与 {bookId} 占位，按同模块相邻接口推断），必填 */
  bookId: string;
}

/** 禁用凭证类别请求参数。 */
export interface DisableCategoryParams {
  /** 账套id，路径参数，必填 */
  bookid: string;
  /** 凭证类别id：100001 记账凭证 / 100002 收款凭证 / 100003 付款凭证 / 100004 现金收款凭证 /
   * 100005 现金付款凭证 / 100006 银行收款凭证 / 100007 银行付款凭证 / 100008 现金凭证 /
   * 100009 银行凭证 / 100010 转账凭证。查询参数（请求示例 ?id=），必填 */
  id: string;
}

/** 跨账套-凭证配置-工资表-个人公司相关科目请求参数。 */
export interface UpdatePayRollSettingsParams {
  /** 账套id，路径参数，必填 */
  bookid: string;
}

/** 启用凭证类别请求参数。 */
export interface EnableCategoryParams {
  /** 账套id，路径参数，必填 */
  bookid: string;
  /** 类别id（100001..100010，含义同禁用凭证类别），查询参数（请求示例 ?id=），可选 */
  id?: string;
}

/** 凭证配置错误码表（文档"错误码说明"逐条收录）。 */
export const PZPZ_ERROR_CODES = {
  GL_E9004: { code: 'gl.e9004', message: '不能禁用已经使用的凭证类型' },
  GL_E0001: { code: 'gl.e0001', message: '' },
} as const;

export function createPzpzApi(client: ChanjetClient) {
  return {
    /**
     * 查询凭证类别。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.status 启用/禁用（A-启用，I-禁用，传空查全部），查询参数，可选
     * @returns 凭证类别数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/sz/pzpz
     */
    getAcctgTransCategory(
      params: GetAcctgTransCategoryParams,
    ): Promise<GetAcctgTransCategoryResult[]> {
      return client.request<GetAcctgTransCategoryResult[]>({
        method: 'GET',
        path: '/accounting/gl/acctgTransCategory/{bookid}',
        pathParams: { bookid: params.bookid },
        query: params.status === undefined ? undefined : { status: params.status },
      });
    },

    /**
     * 获取凭证配置信息。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.settingName 配置项名称（如 PUBLIC/INVOICEIN/INVOICEOUT/CASHJOURNAL/PAYROLL/FIXEDASSET），查询参数，必填
     * @returns 配置数据，map 为 Map 类型
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败（文档标注 HTTP 500）
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/sz/pzpz
     */
    getDocSetting(params: GetDocSettingParams): Promise<GetDocSettingResult> {
      return client.request<GetDocSettingResult>({
        method: 'GET',
        path: '/accounting/gl/acctgplt/getDocSetting/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { settingName: params.settingName },
      });
    },

    /**
     * 保存凭证设置公共选项。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @returns 成功无返回
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/sz/pzpz
     */
    saveSettingValue(params: SaveSettingValueParams): Promise<void> {
      return client.request<void>({
        method: 'POST',
        path: '/accounting/setup/SettingValue/{bookid}',
        pathParams: { bookid: params.bookid },
      });
    },

    /**
     * 保存凭证配置-销项发票。
     *
     * @param params 请求参数
     * @param params.bookId 账套id，路径参数，必填
     * @returns 成功无返回
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/sz/pzpz
     */
    upsertAcctgTransSettings(params: UpsertAcctgTransSettingsParams): Promise<void> {
      return client.request<void>({
        method: 'POST',
        path: '/accounting/gl/acctgplt/upsertAcctgTransSettings/{bookId}',
        pathParams: { bookId: params.bookId },
      });
    },

    /**
     * 禁用凭证类别。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.id 凭证类别id（100001..100010），查询参数，必填
     * @returns 成功无返回
     * @throws {ChanjetApiError} 远端返回业务错误（gl.e9004 不能禁用已经使用的凭证类型）、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/sz/pzpz
     */
    disableCategory(params: DisableCategoryParams): Promise<void> {
      return client.request<void>({
        method: 'POST',
        path: '/accounting/gl/acctgTransCategory/disableCategory/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { id: params.id },
      });
    },

    /**
     * 跨账套-凭证配置-工资表-个人公司相关科目。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @returns 成功无返回
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/sz/pzpz
     */
    updatePayRollSettings(params: UpdatePayRollSettingsParams): Promise<void> {
      return client.request<void>({
        method: 'POST',
        path: '/accounting/gl/acctgplt/updatePayRollSettings/{bookid}',
        pathParams: { bookid: params.bookid },
      });
    },

    /**
     * 启用凭证类别。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @param params.id 类别id（100001..100010），查询参数，可选
     * @returns 成功无返回
     * @throws {ChanjetApiError} 远端返回业务错误（gl.e0001）、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/sz/pzpz
     */
    enableCategory(params: EnableCategoryParams): Promise<void> {
      return client.request<void>({
        method: 'POST',
        path: '/accounting/gl/acctgTransCategory/enableCategory/{bookid}',
        pathParams: { bookid: params.bookid },
        query: params.id === undefined ? undefined : { id: params.id },
      });
    },
  };
}
