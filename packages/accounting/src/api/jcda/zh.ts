/**
 * 来源: https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/zh
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/jcda/zh.md
 */
import type { ChanjetClient } from '../../client.js';

/**
 * 新增账号请求参数。
 */
export interface AddParams {
  /** 账套id */
  bookid: string;
  /** 账号编码（唯一标识） */
  code: string;
  /** 账号名称（唯一标识） */
  name: string;
  /** 账号类型: CASH(现金)、BANK(银行)、WECHAT(微信)、ALIPAY(支付宝)、OTHER(其他)、YEEPAY(易宝支付) */
  typeEnum: string;
  /** 开户银行（如果账号类型为'现金'则此项必须为空、为'银行'此项必须非空） */
  openingBank?: string;
  /** 账号（如果账号类型为'现金'则此项必须为空、为'银行'此项必须非空） */
  accountNo?: string;
  /** 第三方ID */
  externalId?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 备注 */
  comments?: string;
}

/**
 * 新增账号返回结果。
 */
export interface AddResult {
  /** 账号编码 */
  code?: string;
}

/**
 * 删除账号请求参数。
 */
export interface RemoveParams {
  /** 账套id */
  bookid: string;
  /** 账号编码列表 */
  codes: string[];
}

/**
 * 删除账号返回结果。
 */
export interface RemoveResult {
  /** 成功删除的 code */
  success?: string[];
  /** 删除失败的 code */
  fail?: string[];
}

/**
 * 修改账号请求参数。
 */
export interface UpdateParams {
  /** 账套id */
  bookid: string;
  /** 账号编码（检索账号信息唯一条件） */
  code: string;
  /** 账号名称 */
  name?: string;
  /** 账号类型: CASH(现金)、BANK(银行)、WECHAT(微信)、ALIPAY(支付宝)、OTHER(其他)、YEEPAY(易宝支付) */
  typeEnum?: string;
  /** 开户银行（如果账号类型为'现金'则此项必须为空、为'银行'此项必须非空） */
  openingBank?: string;
  /** 账号（如果账号类型为'现金'则此项必须为空、为'银行'此项必须非空） */
  accountNo?: string;
  /** 第三方ID */
  externalId?: string;
  /** 币种编码 */
  currencyCode?: string;
  /** 备注 */
  comments?: string;
}

/**
 * 修改账号返回结果。
 */
export interface UpdateResult {
  /** 账号编码 */
  code?: string;
}

/**
 * 查询账号请求参数。
 */
export interface QueryParams {
  /** 账套id */
  bookid: string;
  /** 账号编码 */
  code: string;
}

/**
 * 查询账号返回结果。
 */
export interface QueryResult {
  /** 账号编码 */
  code?: string;
  /** 账号名称 */
  name?: string;
  /** 账号类型: CASH(现金)、BANK(银行)、WECHAT(微信)、ALIPAY(支付宝)、OTHER(其他)、YEEPAY(易宝支付) */
  typeEnum?: string;
  /** 开户银行 */
  openingBank?: string;
  /** 账号 */
  accountNo?: string;
  /** 备注 */
  comments?: string;
  /** 第三方ID */
  externalId?: string;
}

/**
 * 账号模块。
 */
export function createZhApi(client: ChanjetClient) {
  return {
    /**
     * 新增账号。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.code 账号编码（唯一标识）
     * @param params.name 账号名称（唯一标识）
     * @param params.typeEnum 账号类型: CASH(现金)、BANK(银行)、WECHAT(微信)、ALIPAY(支付宝)、OTHER(其他)、YEEPAY(易宝支付)
     * @param params.openingBank 开户银行（如果账号类型为'现金'则此项必须为空、为'银行'此项必须非空）
     * @param params.accountNo 账号（如果账号类型为'现金'则此项必须为空、为'银行'此项必须非空）
     * @param params.externalId 第三方ID
     * @param params.currencyCode 币种编码
     * @param params.comments 备注
     * @returns 新增结果，`code` 为账号编码
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/zh
     */
    async add(params: AddParams): Promise<AddResult> {
      return client.request<AddResult>({
        method: 'POST',
        path: '/accounting/openapi/cc/finaccount/add/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          code: params.code,
          name: params.name,
          typeEnum: params.typeEnum,
          ...(params.openingBank !== undefined ? { openingBank: params.openingBank } : {}),
          ...(params.accountNo !== undefined ? { accountNo: params.accountNo } : {}),
          ...(params.externalId !== undefined ? { externalId: params.externalId } : {}),
          ...(params.currencyCode !== undefined ? { currencyCode: params.currencyCode } : {}),
          ...(params.comments !== undefined ? { comments: params.comments } : {}),
        },
      });
    },

    /**
     * 删除账号。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.codes 账号编码列表
     * @returns 删除结果，`success` 为成功编码、`fail` 为失败编码
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/zh
     */
    async remove(params: RemoveParams): Promise<RemoveResult> {
      return client.request<RemoveResult>({
        method: 'POST',
        path: '/accounting/openapi/cc/finaccount/remove/{bookid}',
        pathParams: { bookid: params.bookid },
        body: params.codes,
      });
    },

    /**
     * 修改账号。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.code 账号编码（检索账号信息唯一条件）
     * @param params.name 账号名称
     * @param params.typeEnum 账号类型: CASH(现金)、BANK(银行)、WECHAT(微信)、ALIPAY(支付宝)、OTHER(其他)、YEEPAY(易宝支付)
     * @param params.openingBank 开户银行（如果账号类型为'现金'则此项必须为空、为'银行'此项必须非空）
     * @param params.accountNo 账号（如果账号类型为'现金'则此项必须为空、为'银行'此项必须非空）
     * @param params.externalId 第三方ID
     * @param params.currencyCode 币种编码
     * @param params.comments 备注
     * @returns 修改结果，`code` 为账号编码
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/zh
     */
    async update(params: UpdateParams): Promise<UpdateResult> {
      return client.request<UpdateResult>({
        method: 'POST',
        path: '/accounting/openapi/cc/finaccount/update/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          code: params.code,
          ...(params.name !== undefined ? { name: params.name } : {}),
          ...(params.typeEnum !== undefined ? { typeEnum: params.typeEnum } : {}),
          ...(params.openingBank !== undefined ? { openingBank: params.openingBank } : {}),
          ...(params.accountNo !== undefined ? { accountNo: params.accountNo } : {}),
          ...(params.externalId !== undefined ? { externalId: params.externalId } : {}),
          ...(params.currencyCode !== undefined ? { currencyCode: params.currencyCode } : {}),
          ...(params.comments !== undefined ? { comments: params.comments } : {}),
        },
      });
    },

    /**
     * 查询账号。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.code 账号编码
     * @returns 账号详情
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/zh
     */
    async query(params: QueryParams): Promise<QueryResult> {
      return client.request<QueryResult>({
        method: 'GET',
        path: '/accounting/openapi/cc/finaccount/query/{code}/{bookid}',
        pathParams: { code: params.code, bookid: params.bookid },
      });
    },
  };
}
