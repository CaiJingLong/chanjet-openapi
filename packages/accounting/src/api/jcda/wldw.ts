/**
 * 来源: https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/wldw
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/jcda/wldw.md
 */
import type { ChanjetClient } from '../../client.js';

/** 同步结果映射：键为第三方同步 id，值为系统生成的 id 或错误信息 */
type SyncResultMap = Record<string, string | number>;

/**
 * 往来单位同步（简略版）请求参数。
 */
export interface BatchUpsertApiParams {
  /** 账套id */
  bookid: string;
  /** 往来单位列表 */
  items: BatchUpsertApiParamsItem[];
}

/**
 * 往来单位同步（简略版）请求体条目。
 */
export interface BatchUpsertApiParamsItem {
  /** 状态标识：new写死即可，新增 */
  editFlag: string;
  /** 100001--客户 */
  partyRoleTypeId: number;
  /** A，启用，I,不启用 */
  statusEnum: string;
  /** 往来单位的编码 */
  code: string;
  /** 往来单位分类编码 */
  primaryPartyCategoryCode?: string;
  /** 组织单元 */
  orgUnit: BatchUpsertApiParamsItemOrgUnit;
  /** 第三方同步方准备同步数据的id */
  id: number;
  /** 基础信息 */
  custVendorContactList?: BatchUpsertApiParamsItemCustVendorContact[];
}

/**
 * 往来单位同步（简略版）组织单元。
 */
export interface BatchUpsertApiParamsItemOrgUnit {
  /** 往来单位的名称 */
  orgUnitName: string;
  /** 税号 */
  taxNo?: string;
  /** 银行账号 */
  bankAccountNo?: string;
}

/**
 * 往来单位同步（简略版）基础信息。
 */
export interface BatchUpsertApiParamsItemCustVendorContact {
  /** 联系人 */
  contactName?: string;
  /** 手机号 */
  telephone?: string;
}

/**
 * 往来单位同步（简略版）返回结果。
 */
export interface BatchUpsertApiResult {
  /** 同步成功的数据，{A:B,C:D} A是同步到系统中自动生成的往来单位，B是第三方自己同步过来的id 若返回为空则便是同步失败 */
  successResultMap: Record<string, number>;
}

/**
 * 同步删除往来单位请求参数。
 */
export interface RemoveParams {
  /** 账套id */
  bookid: string;
  /** 删除时间戳,13位，必填并且一定要大于所要删除的数据当初存入的时间 */
  removeTime: number;
  /** 此id是客户传递过来的id而不是系统生成的id */
  id: number;
}

/**
 * 同步删除往来单位返回结果。
 */
export interface RemoveResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 往来单位同步请求参数。
 */
export interface BatchUpsertParams {
  /** 账套id */
  bookid: string;
  /** 往来单位列表 */
  items: BatchUpsertParamsItem[];
}

/**
 * 往来单位同步请求体条目。
 */
export interface BatchUpsertParamsItem {
  /** 往来单位编码(使用系统生成编码时，不传编码；用户手动填写的编码，传编码) */
  code: string;
  /** 组织单元 */
  orgUnit: BatchUpsertParamsItemOrgUnit;
  /** 往来单位名称 */
  orgUnitName: string;
  /** 往来单位分类编码(无分类编码字段，默认使用"未分类"分类) */
  primaryPartyCategoryCode: string;
  /** 往来单位性质(客户:100001、供应商:100101、客户/供应商:100400) */
  partyRoleTypeId: number;
  /** 往来单位启用状态(启用:"A"，停用:"I") */
  statusEnum: string;
  /** 联系人列表 */
  custVendorContactList?: BatchUpsertParamsItemCustVendorContact[];
  /** 联系人名称 */
  contactName?: string;
  /** 顺序号 */
  sequenceNum?: string;
  /** 邮箱 */
  email?: string;
  /** QQ号 */
  qq?: string;
  /** 微信号 */
  wechat?: string;
  /** 联系电话 */
  telephone?: string;
  /** 省/州 */
  province?: string;
  /** 城市 */
  city?: string;
  /** 区/县 */
  disctrict?: string;
  /** 地址信息 */
  address1?: string;
  /** 邮编 */
  geoCode?: string;
  /** 是否默认主联系人 */
  isDefault?: boolean;
  /** 操作类型，(未修改:"old",新增:"new",更新:"update",删除:delete) */
  editFlag: string;
  /** 往来单位id */
  id: number;
  /** 供应商采购价格是否含税 */
  isPurIncludingTax: boolean;
  /** 分管人员 */
  adminByEmployeeId?: number;
  /** 描述 */
  description?: string;
  /** 分管部门 */
  adminByDepartmentId?: string;
  /** 客户价格设置(客户属性，商品折扣和价格等级二选一，价格等级:"PRICING_BY_LEVEL"、折扣:"PRICING_BY_DISCOUNT") */
  pricingMethodEnum?: string;
  /** 客户折扣 */
  defaultDiscount?: string;
  /** 账期 */
  paymentTermsEnum?: string;
  /** 开始日期 */
  openingDate?: number;
  /** 结账周期：记录一个结账周期包含的月数 */
  billingPeriod?: number;
  /** 对账日：对账日必须在1~28之间 */
  reconciliationDay?: number;
  /** 对账偏移月份：对账月份偏移结账月份的数量 */
  reconciliationAddMonths?: number;
  /** 结款日：表示结款日期 */
  paymentDay?: number;
  /** 款偏移月份：结款月份偏移对账月份的数量 */
  paymentAddMonths?: number;
  /** 客户等级(客户属性，大客户:"LARGE"、重要客户:"IMPORTANT"、一般客户:"NORMAL") */
  custLevelEnum?: string;
  /** 创建日期 */
  createdStamp?: number;
  /** 最后更新日期 */
  lastUpdatedStamp?: number;
  /** 应收余额 */
  arAmount?: string;
  /** 预收金额 */
  arPrepaidAmount?: string;
  /** 结算单位(客户属性) */
  billtoCustVendorId?: string;
  /** 客户标签列表 */
  custLabelList?: BatchUpsertParamsItemCustLabel[];
  /** 来源平台(Web:"DESKTOP",手机端:"MOBILE",ALI_1688:"ALI_1688",PDA:"PDA",旺铺:"MSHOP") */
  srcWebsiteEnum?: string;
  /** 企业法人 */
  legalRepresentative?: string;
  /** 开户银行 */
  openingBank?: string;
  /** 银行账号 */
  bankAccountNo?: string;
  /** 纳税人识别号 */
  taxNo?: string;
}

/**
 * 往来单位同步组织单元。
 */
export interface BatchUpsertParamsItemOrgUnit {
  /** 往来单位名称 */
  orgUnitName?: string;
}

/**
 * 往来单位同步联系人。
 */
export interface BatchUpsertParamsItemCustVendorContact {
  /** 客户名称 */
  contactName?: string;
  /** email */
  email?: string;
  /** qq */
  qq?: string;
  /** 传真号 */
  fax?: string;
  /** 微信号 */
  wechat?: string;
  /** 联系电话 */
  telephone?: string;
  /** 省/州 */
  province?: string;
  /** 城市 */
  city?: string;
  /** 区/县 */
  disctrict?: string;
  /** 地址信息 */
  address1?: string;
  /** 邮编 */
  geoCode?: string;
  /** 操作类型，(未修改:"old",新增:"new",更新:"update",删除:delete) */
  editFlag?: string;
}

/**
 * 往来单位同步客户标签。
 */
export interface BatchUpsertParamsItemCustLabel {
  /** 客户标签-客户 */
  label?: string;
}

/**
 * 往来单位同步返回结果。
 */
export interface BatchUpsertResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 查询往来单位请求参数。
 */
export interface QueryParams {
  /** 账套id */
  bookid: string;
  /** 往来单位编码 */
  code?: string;
  /** 往来单位名称 */
  name?: string;
  /** 根据编码和名称模糊查询条件 */
  searchText?: string;
  /** 每页数量（默认：20） */
  pageSize: number;
  /** 当前页（默认：1） */
  pageNo: number;
}

/**
 * 查询往来单位返回结果。
 */
export interface QueryResult {
  /** 总页数 */
  totalPage?: string;
  /** 总记录数 */
  count?: string;
  /** 往来单位列表 */
  rows?: QueryResultRow[];
}

/**
 * 查询往来单位列表条目。
 */
export interface QueryResultRow {
  /** 往来单位ID */
  id?: number;
  /** 往来单位编码 */
  code?: string;
  /** 往来单位名称 */
  partyName?: string;
  /** 分类 */
  partyCategory?: QueryResultRowPartyCategory;
  /** 往来单位属于客户还是供应商，100001：客户；100101：供应商 */
  partyRoleTypeId?: string;
  /** 价格等级 */
  pricingMethodEnum?: QueryResultRowPricingMethodEnum;
  /** 账期 */
  paymentTermsEnum?: QueryResultRowPaymentTermsEnum;
  /** 状态 */
  statusEnum?: QueryResultRowStatusEnum;
  /** 联系人 */
  custVendorContactList?: QueryResultRowCustVendorContact[];
}

/**
 * 查询往来单位分类。
 */
export interface QueryResultRowPartyCategory {
  /** 分类编码 */
  code?: string;
  /** 分类名称 */
  name?: string;
}

/**
 * 查询往来单位价格等级。
 */
export interface QueryResultRowPricingMethodEnum {
  /** 价格等级 */
  value?: string;
  /** 价格等级label */
  label?: string;
}

/**
 * 查询往来单位账期。
 */
export interface QueryResultRowPaymentTermsEnum {
  /** 账期 */
  value?: string;
  /** 账期 */
  label?: string;
}

/**
 * 查询往来单位状态。
 */
export interface QueryResultRowStatusEnum {
  /** 状态 */
  label?: string;
}

/**
 * 查询往来单位联系人。
 */
export interface QueryResultRowCustVendorContact {
  /** 联系人姓名 */
  contactName?: string;
  /** 联系人地址 */
  address1?: string;
  /** 联系人电话 */
  telephone?: string;
}

/**
 * 修改往来单位请求参数。
 */
export interface UpdateParams {
  /** 账套id */
  bookid: string;
  /** 往来单位编码 */
  code: string;
  /** 往来单位性质 */
  partyRoleTypeId: UpdateParamsPartyRoleTypeId;
  /** 往来单位分类 */
  partyCategory: UpdateParamsPartyCategory;
  /** 往来单位联系人 */
  custVendorContactList?: UpdateParamsCustVendorContact[];
}

/**
 * 修改往来单位性质。
 */
export interface UpdateParamsPartyRoleTypeId {
  /** 往来单位性质ID(100101-供应商，100001-客户，100400-客户/供应商) */
  id: string;
}

/**
 * 修改往来单位分类。
 */
export interface UpdateParamsPartyCategory {
  /** 往来单位分类编码 */
  code?: string;
}

/**
 * 修改往来单位联系人。
 */
export interface UpdateParamsCustVendorContact {
  /** 往来单位联系人名称 */
  contactName: string;
  /** 往来单位联系人地址 */
  address1?: string;
  /** 联系电话 */
  telephone?: string;
  /** 电子邮件 */
  email?: string;
  /** 联系人备注 */
  comments?: string;
}

/**
 * 修改往来单位返回结果条目。
 */
export interface UpdateResult {
  /** 往来单位编码 */
  code?: string;
  /** 错误码 */
  errorCode?: string;
  /** 错误描述 */
  errMessage?: string;
}

/**
 * 修改往来单位常见错误码。
 */
export const UPDATE_CUSTVENDOR_ERRORS = {
  PARTY_E2201: { code: 'party.e2201', message: '往来单位编码不能包含分号' },
  PARTY_E2202: { code: 'party.e2202', message: '请选择正确的往来单位类型' },
  PARTY_E2203: { code: 'party.e2203', message: '请选择正确的往来单位性质' },
  PARTY_E2204: { code: 'party.e2204', message: '客户不能设置采购价格含税' },
  PARTY_E2205: { code: 'party.e2205', message: '供应商不能设置结算单位' },
  PARTY_E2206: { code: 'party.e2206', message: '供应商不能设置客户折扣' },
  PARTY_E2207: { code: 'party.e2207', message: '供应商不能设置客户等级' },
  PARTY_E2208: { code: 'party.e2208', message: '供应商不能设置客户标签' },
  PARTY_E2209: { code: 'party.e2209', message: '往来单位不能挂到非叶子分类上' },
  PARTY_E2211: { code: 'party.e2211', message: '每月结账日取值范围为[1~31]' },
  PARTY_E2212: { code: 'party.e2212', message: '账期不能小于0' },
} as const;

/**
 * 往来单位基础档案模块。
 */
export function createWldwApi(client: ChanjetClient) {
  return {
    /**
     * 往来单位同步（简略版）：只能同步名称、code编码信息。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.items 往来单位列表
     * @param params.items[].editFlag 状态标识：new写死即可，新增
     * @param params.items[].partyRoleTypeId 100001--客户
     * @param params.items[].statusEnum A，启用，I,不启用
     * @param params.items[].code 往来单位的编码
     * @param params.items[].primaryPartyCategoryCode 往来单位分类编码
     * @param params.items[].orgUnit 组织单元
     * @param params.items[].orgUnit.orgUnitName 往来单位的名称
     * @param params.items[].orgUnit.taxNo 税号
     * @param params.items[].orgUnit.bankAccountNo 银行账号
     * @param params.items[].id 第三方同步方准备同步数据的id
     * @param params.items[].custVendorContactList 基础信息
     * @param params.items[].custVendorContactList[].contactName 联系人
     * @param params.items[].custVendorContactList[].telephone 手机号
     * @returns 同步成功的数据，键为系统生成的往来单位id、值为第三方同步过来的id
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/wldw
     */
    async batchUpsertApi(params: BatchUpsertApiParams): Promise<BatchUpsertApiResult> {
      return client.request<BatchUpsertApiResult>({
        method: 'POST',
        path: '/accounting/document/integration/custvendor/batchUpsertApi/{bookid}',
        pathParams: { bookid: params.bookid },
        body: params.items,
      });
    },

    /**
     * 同步删除往来单位：好会计接受第三方往来单位基础档案删除信息。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.removeTime 删除时间戳,13位，必填并且一定要大于所要删除的数据当初存入的时间
     * @param params.id 此id是客户传递过来的id而不是系统生成的id
     * @returns 删除结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/wldw
     */
    async remove(params: RemoveParams): Promise<RemoveResult> {
      return client.request<RemoveResult>({
        method: 'POST',
        path: '/accounting/document/integration/custvendor/remove/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { removeTime: params.removeTime },
        body: { id: params.id },
      });
    },

    /**
     * 往来单位同步：好会计接受第三方往来资金基础档案同步信息。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.items 往来单位列表
     * @param params.items[].code 往来单位编码
     * @param params.items[].orgUnit 组织单元
     * @param params.items[].orgUnit.orgUnitName 往来单位名称
     * @param params.items[].orgUnitName 往来单位名称
     * @param params.items[].primaryPartyCategoryCode 往来单位分类编码
     * @param params.items[].partyRoleTypeId 往来单位性质(客户:100001、供应商:100101、客户/供应商:100400)
     * @param params.items[].statusEnum 往来单位启用状态(启用:"A"，停用:"I")
     * @param params.items[].custVendorContactList 联系人列表
     * @param params.items[].contactName 联系人名称
     * @param params.items[].sequenceNum 顺序号
     * @param params.items[].email 邮箱
     * @param params.items[].qq QQ号
     * @param params.items[].wechat 微信号
     * @param params.items[].telephone 联系电话
     * @param params.items[].province 省/州
     * @param params.items[].city 城市
     * @param params.items[].disctrict 区/县
     * @param params.items[].address1 地址信息
     * @param params.items[].geoCode 邮编
     * @param params.items[].isDefault 是否默认主联系人
     * @param params.items[].editFlag 操作类型，(未修改:"old",新增:"new",更新:"update",删除:delete)
     * @param params.items[].id 往来单位id
     * @param params.items[].isPurIncludingTax 供应商采购价格是否含税
     * @param params.items[].adminByEmployeeId 分管人员
     * @param params.items[].description 描述
     * @param params.items[].adminByDepartmentId 分管部门
     * @param params.items[].pricingMethodEnum 客户价格设置
     * @param params.items[].defaultDiscount 客户折扣
     * @param params.items[].paymentTermsEnum 账期
     * @param params.items[].openingDate 开始日期
     * @param params.items[].billingPeriod 结账周期
     * @param params.items[].reconciliationDay 对账日
     * @param params.items[].reconciliationAddMonths 对账偏移月份
     * @param params.items[].paymentDay 结款日
     * @param params.items[].paymentAddMonths 款偏移月份
     * @param params.items[].custLevelEnum 客户等级
     * @param params.items[].createdStamp 创建日期
     * @param params.items[].lastUpdatedStamp 最后更新日期
     * @param params.items[].arAmount 应收余额
     * @param params.items[].arPrepaidAmount 预收金额
     * @param params.items[].billtoCustVendorId 结算单位(客户属性)
     * @param params.items[].custLabelList 客户标签列表
     * @param params.items[].srcWebsiteEnum 来源平台
     * @param params.items[].legalRepresentative 企业法人
     * @param params.items[].openingBank 开户银行
     * @param params.items[].bankAccountNo 银行账号
     * @param params.items[].taxNo 纳税人识别号
     * @returns 同步结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/wldw
     */
    async batchUpsert(params: BatchUpsertParams): Promise<BatchUpsertResult> {
      return client.request<BatchUpsertResult>({
        method: 'POST',
        path: '/accounting/document/integration/custvendor/batchUpsert/{bookid}',
        pathParams: { bookid: params.bookid },
        body: params.items,
      });
    },

    /**
     * 查询往来单位。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.code 往来单位编码
     * @param params.name 往来单位名称
     * @param params.searchText 根据编码和名称模糊查询条件
     * @param params.pageSize 每页数量（默认：20）
     * @param params.pageNo 当前页（默认：1）
     * @returns 往来单位分页结果，`rows` 为往来单位列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/wldw
     */
    async query(params: QueryParams): Promise<QueryResult> {
      return client.request<QueryResult>({
        method: 'POST',
        path: '/accounting/document/open/custvendor/query/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          ...(params.code !== undefined ? { code: params.code } : {}),
          ...(params.name !== undefined ? { name: params.name } : {}),
          ...(params.searchText !== undefined ? { searchText: params.searchText } : {}),
          pageSize: params.pageSize,
          pageNo: params.pageNo,
        },
      });
    },

    /**
     * 修改往来单位。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.code 往来单位编码
     * @param params.partyRoleTypeId 往来单位性质
     * @param params.partyRoleTypeId.id 往来单位性质ID(100101-供应商，100001-客户，100400-客户/供应商)
     * @param params.partyCategory 往来单位分类
     * @param params.partyCategory.code 往来单位分类编码
     * @param params.custVendorContactList 往来单位联系人
     * @param params.custVendorContactList[].contactName 往来单位联系人名称
     * @param params.custVendorContactList[].address1 往来单位联系人地址
     * @param params.custVendorContactList[].telephone 联系电话
     * @param params.custVendorContactList[].email 电子邮件
     * @param params.custVendorContactList[].comments 联系人备注
     * @returns 修改结果列表，每项包含编码、错误码与错误描述；常见错误码见 {@link UPDATE_CUSTVENDOR_ERRORS}
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/wldw
     */
    async update(params: UpdateParams): Promise<UpdateResult[]> {
      return client.request<UpdateResult[]>({
        method: 'PUT',
        path: '/accounting/document/open/custvendor/update/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          code: params.code,
          partyRoleTypeId: params.partyRoleTypeId,
          partyCategory: params.partyCategory,
          ...(params.custVendorContactList !== undefined
            ? { custVendorContactList: params.custVendorContactList }
            : {}),
        },
      });
    },
  };
}
