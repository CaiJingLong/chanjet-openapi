/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/ckd
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjkchs/ckd.md
 * 注意: 文档五个接口均未提供错误码说明表，故无错误码常量。
 */

import type { ChanjetClient, RequestOptions } from '../../client.js';

/** 其他出库单自定义项 */
export interface StockOutCustomizedField {
  /** 自定义项名称 */
  name: string;
  /** 自定义项值 */
  value: string;
}

/** 其他出入库单V2明细自定义项（name/value 为可选，与新增/修改接口的 customizedField 必填性不同） */
export interface StockOutV2CustomizedField {
  /** 文档未提供说明 */
  name?: string;
  /** 文档未提供说明 */
  value?: string;
}

/** 其他出库单货位明细（新增） */
export interface StockOutWareLocationDetail {
  /** 货位编码 */
  wareLocationCode: string;
  /** 数量1 */
  transQty: string;
  /** 数量2 */
  trans2Qty?: string;
}

/** 其他出库单货位明细（修改，字段均可选） */
export interface StockOutUpdateWareLocationDetail {
  /** 货位编码 */
  wareLocationCode?: string;
  /** 数量1 */
  transQty?: string;
  /** 数量2 */
  trans2Qty?: string;
}

/** 其他出库单商品属性 */
export interface StockOutProductSpec {
  /** 属性名称（属性档案中存在） */
  name: string;
  /** 属性值（属性档案中存在） */
  value: string;
}

/** 其他出库单修改序列号明细 */
export interface StockOutUpdateSerialNoDetail {
  /** 序列号孙表id（修改时为必填；不填表示新增） */
  id?: number;
  /** 序列号 */
  serialNo?: string;
  /** 数量1 */
  transQty?: string;
  /** 数量2 */
  trans2Qty?: string;
  /** 序列号档案id */
  productSerialNoId?: number;
  /** 序列号档案来源单据id */
  refVoucherId?: number;
  /** 序列号档案生成方式 */
  generatedMethod?: string;
  /** 序列号档案的序列号 */
  productSerialNo?: string;
}

/** 其他出库单修改明细 */
export interface StockOutUpdateDetail {
  /** 商品编码 */
  productCode: string;
  /** 明细id */
  id: string;
  /** 仓库编码 */
  warehouseCode: string;
  /** 属性组合编码 */
  productSpecNo?: string;
  /** 商品条码 */
  itemBarcode?: string;
  /** 采购单位 */
  transUomName?: string;
  /** 批号 */
  inventoryLotNo?: string;
  /** 生产日期 */
  inventoryLotCreationDate?: number;
  /** 失效日期 */
  inventoryLotExpirationDate?: string;
  /** 数量 */
  transQty: string;
  /** 单位2 */
  trans2UomName?: string;
  /** 数量2 */
  trans2Qty?: string;
  /** 包装数量 */
  hierarchyPkgQtysText?: string;
  /** 调出成本 */
  costPrice: string;
  /** 调出金额金额 */
  costAmount: string;
  /** 编辑标识（更新：update，删除：delete，新增：new，无变化：old） */
  editFlag: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 货位明细信息 */
  wareLocationDetailList?: StockOutUpdateWareLocationDetail[];
  /** 序列号 */
  serialNoDetailList?: StockOutUpdateSerialNoDetail[];
}

/** 其他出库单新增明细 */
export interface StockOutAddDetail {
  /** 商品编码 */
  productCode: string;
  /** 属性 */
  productSpecId?: StockOutProductSpec[];
  /** 仓库编码 */
  warehouseCode: string;
  /** 属性组合编码 */
  productSpecNo?: string;
  /** 商品条码 */
  itemBarcode?: string;
  /** 采购单位 */
  transUomName?: string;
  /** 批号 */
  inventoryLotNo?: string;
  /** 生产日期 */
  inventoryLotCreationDate?: number;
  /** 失效日期 */
  inventoryLotExpirationDate?: string;
  /** 数量 */
  transQty: string;
  /** 单位2 */
  trans2UomName?: string;
  /** 数量2 */
  trans2Qty?: string;
  /** 包装数量 */
  hierarchyPkgQtysText?: string;
  /** 单价 */
  costPrice: string;
  /** 金额 */
  costAmount: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 货位明细信息 */
  wareLocationDetailList?: StockOutWareLocationDetail[];
  /** 要货仓库编码，当业务类型是调拨/100217时 ，必填 */
  requireWarehouseCode?: string;
}

/** 其他出库单列表请求参数 */
export interface StockOutListParams {
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 单据编号（参数表为 string，示例为数组，以参数表为准） */
  voucherCode?: string;
  /** 外部单据编号（参数表为 string，示例为数组，以参数表为准） */
  voucherExternalCode?: string;
  /** 单据状态： SUBMITTED 未生效 EFFECTIVE 已生效 */
  voucherStatusEnum?: string;
  /** 页数 */
  page: number;
  /** 页行数（参数表为 string，示例为数字，以参数表为准） */
  pageSize: string;
}

/** 其他出库单修改请求参数 */
export interface StockOutUpdateParams {
  /** 产成品入库单id */
  id: string;
  /** 单据日期 */
  bizDate: string;
  /** 单据编号 */
  code: string;
  /** 项目编码 */
  projectCode?: string;
  /** 业务类型ID 其他出库单 100213。入库方向：盘盈 100201 受赠 100202 其它 100203 组装 100208 拆卸 100209；出库方向：盘亏 100211 赠送 100212 调拨 100217 其它 100213 销售出库 100214 组装 100218 拆卸 100219 */
  bizTypeId: string;
  /** 红蓝标志，值为RED或者BLUE */
  redBlueFlagEnum?: string;
  /** 仓库编码 */
  warehouseCode: string;
  /** 部门编码 */
  departmentCode?: string;
  /** 业务员编码 */
  bizEmployeeCode?: string;
  /** 备注 */
  comments?: string;
  /** 合同编号 */
  contractNo?: string;
  /** 自定义项 */
  customizedField?: StockOutCustomizedField[];
  /** 明细列表 */
  detailList: StockOutUpdateDetail[];
}

/** 其他出库单新增请求参数 */
export interface StockOutAddParams {
  /** 单据日期 */
  bizDate: string;
  /** 单据编号 */
  code: string;
  /** 项目编码 */
  projectCode?: string;
  /** 业务类型ID 100213。入库方向：盘盈 100201 受赠 100202 其它 100203 组装 100208 拆卸 100209；出库方向：盘亏 100211 赠送 100212 调拨 100217 其它 100213 销售出库 100214 组装 100218 拆卸 100219 */
  bizTypeId: string;
  /** 红蓝标志，值为RED或者BLUE */
  redBlueFlagEnum?: string;
  /** 仓库编码 */
  warehouseCode: string;
  /** 部门编码 */
  departmentCode?: string;
  /** 业务员编码 */
  bizEmployeeCode?: string;
  /** 备注 */
  comments?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 自定义项 */
  customizedField?: StockOutCustomizedField[];
  /** 明细列表 */
  detailList: StockOutAddDetail[];
}

/** 其他出库单删除请求参数 */
export interface StockOutRemoveParams {
  /** ID列表（新增时返回的产成品入库单id） */
  ids: string[];
}

/** 其他出入库单V2新增请求参数（出库方向） */
export interface StockOutV2AddParams {
  /** 单据日期 */
  bizDate: string;
  /** 单据编号 单据编码设置为手工编码时，录入好业财系统的code，编码设置为自动编码时，录入好业财系统的external_code */
  code: string;
  /** 项目编码 */
  projectCode?: string;
  /** 业务类型ID。入库方向：盘盈 100201 受赠 100202 其它 100203 组装 100208 拆卸 100209；出库方向：盘亏 100211 赠送 100212 调拨 100217 其它 100213 销售出库 100214 组装 100218 拆卸 100219 */
  bizTypeId: string;
  /** 红蓝标志，值为RED或者BLUE */
  redBlueFlagEnum?: string;
  /** 仓库编码 */
  warehouseCode: string;
  /** 部门编码 */
  departmentCode?: string;
  /** 业务员编码 */
  bizEmployeeCode?: string;
  /** 供应商编码（客户编码） */
  custVendorCode?: string;
  /** 备注 */
  comments?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 自定义项 */
  customizedField?: StockOutCustomizedField[];
  /** 明细列表 */
  detailList: StockOutV2Detail[];
}

/** 其他出入库单V2明细 */
export interface StockOutV2Detail {
  /** 商品编码 */
  productCode: string;
  /** 属性 */
  productSpecId?: StockOutProductSpec[];
  /** 仓库编码 */
  warehouseCode: string;
  /** 属性组合编码 */
  productSpecNo?: string;
  /** 商品条码 */
  itemBarcode?: string;
  /** 采购单位 */
  transUomName?: string;
  /** 批号 */
  inventoryLotNo?: string;
  /** 生产日期 */
  inventoryLotCreationDate?: number;
  /** 失效日期 */
  inventoryLotExpirationDate?: string;
  /** 数量 */
  transQty: string;
  /** 单位2 */
  trans2UomName?: string;
  /** 数量2 */
  trans2Qty?: string;
  /** 包装数量 */
  hierarchyPkgQtysText?: string;
  /** 单价 */
  costPrice: string;
  /** 金额 */
  costAmount: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 手工指定成本 */
  isManualCostPrice?: boolean;
  /** 明细自定义项（V2 接口子项 name/value 为可选，与新增/修改接口的 customizedField 必填性不同） */
  customizedField?: StockOutV2CustomizedField[];
  /** 货位明细信息 */
  wareLocationDetailList?: StockOutWareLocationDetail[];
  /** 序列号 */
  serialNoDetailList?: StockOutV2SerialNoDetail[];
}

/** 其他出入库单V2序列号明细 */
export interface StockOutV2SerialNoDetail {
  /** 序列号 */
  serialNo: string;
  /** 数量1 */
  transQty: string;
  /** 数量2 */
  trans2Qty?: string;
}

/** 其他出库单列表响应序列号明细 */
export interface StockOutListSerialNoDetail {
  /** 数量1 */
  transQty?: number;
  /** 序列号档案生成方式 */
  generatedMethod?: string;
  /** 序列号孙表id */
  id?: number;
  /** 序列号档案id */
  productSerialNoId?: number;
  /** 序列号档案来源单据id */
  refVoucherId?: number;
  /** 序列号档案的序列号 */
  productSerialNo?: string;
  /** 序列号 */
  serialNo?: string;
}

/** 其他出库单列表响应货位明细 */
export interface StockOutListWareLocationDetail {
  /** 数量1 */
  transQty?: number;
  /** 货位名称 */
  wareLocationName?: string;
  /** 数量2 */
  trans2Qty?: number;
  /** 货位编码 */
  wareLocationCode?: string;
}

/** 其他出库单列表响应明细 */
export interface StockOutListDetail {
  /** 序列号明细列表 */
  serialNoDetailList?: StockOutListSerialNoDetail[];
  /** 包装数量 */
  hierarchyPkgQtysText?: string;
  /** 商品条码 */
  itemBarcode?: string;
  /** 成本单价 */
  costPrice?: number;
  /** 成本金额 */
  costAmount?: number;
  /** 数量2 */
  trans2Qty?: number;
  /** 商品基本单位名称 */
  productBaseUomName?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 商品名称 */
  productName?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 采购单位名称 */
  transUomName?: string;
  /** 商品编码 */
  productCode?: string;
  /** 货位名称（逗号分隔） */
  wareLocationNames?: string;
  /** 数量 */
  transQty?: number;
  /** 货位数量（逗号分隔） */
  wareLocationQtys?: string;
  /** 货位明细列表 */
  warelocationDetailList?: StockOutListWareLocationDetail[];
  /** 属性组合编码 */
  productSpecNo?: string;
  /** 货位编码（逗号分隔） */
  wareLocationCodes?: string;
  /** 单位2名称 */
  trans2UomName?: string;
}

/** 其他出库单列表响应行 */
export interface StockOutListRow {
  /** 业务类型ID */
  bizTypeId?: string;
  /** 来源平台 */
  srcWebsiteEnum?: string;
  /** 单据状态 */
  voucherStatusEnum?: string;
  /** 单据编号 */
  code?: string;
  /** 单据日期 */
  bizDate?: string;
  /** 业务员名称 */
  bizEmployeeName?: string;
  /** 明细列表 */
  voucherDetailList?: StockOutListDetail[];
  /** 业务员编码 */
  bizEmployeeCode?: string;
  /** 业务类型名称 */
  bizTypeName?: string;
  /** 红蓝标志 */
  redBlueFlagEnum?: string;
}

/** 其他出库单列表响应数据 */
export interface StockOutListResult {
  /** 当前页行数 */
  currentPageSize?: number;
  /** 总页数 */
  totalPage?: number;
  /** 总条数 */
  count?: number;
  /** 当前页 */
  currentPage?: number;
  /** 行数据 */
  rows?: StockOutListRow[];
}

/** 其他出库单修改响应数据 */
export interface StockOutUpdateResult {
  /** 错误ID */
  id?: number;
}

/** 其他出库单新增响应数据 */
export interface StockOutAddResult {
  /** 错误ID（成功时为调拨单ID） */
  id?: number;
}

/** 其他出库单删除失败项 */
export interface StockOutRemoveFailure {
  /** 单据id */
  code?: string;
  /** 错误码 */
  errorCode?: string;
  /** 错误信息 */
  msg?: string;
}

/** 其他出库单删除响应数据 */
export type StockOutRemoveResult = StockOutRemoveFailure[];

/** 其他出入库单V2新增响应数据 */
export interface StockOutV2AddResult {
  /** 错误ID（成功时为调拨单ID） */
  id?: number;
}

/**
 * 好会计库存核算——其他出库单模块。
 *
 * @param client 好会计客户端实例
 * @returns 其他出库单各接口方法
 */
export function createCkdApi(client: ChanjetClient) {
  return {
    /**
     * ISV其他出库单列表接口。
     *
     * @param bookid 账套id
     * @param params 查询条件
     * @param params.startDate 开始时间，可选
     * @param params.endDate 结束时间，可选
     * @param params.voucherCode 单据编号，可选
     * @param params.voucherExternalCode 外部单据编号，可选
     * @param params.voucherStatusEnum 单据状态： SUBMITTED 未生效 EFFECTIVE 已生效，可选
     * @param params.page 页数，必填
     * @param params.pageSize 页行数，必填
     * @returns 其他出库单分页结果，`rows` 为单据数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/ckd
     */
    listStockOut(bookid: string, params: StockOutListParams): Promise<StockOutListResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/inv/stockout/list/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<StockOutListResult>(options);
    },

    /**
     * 其他出库单修改接口。
     *
     * @param bookid 账套id
     * @param params 其他出库单内容
     * @param params.id 产成品入库单id，必填
     * @param params.bizDate 单据日期，必填
     * @param params.code 单据编号，必填
     * @param params.projectCode 项目编码，可选
     * @param params.bizTypeId 业务类型ID 其他出库单 100213，必填
     * @param params.redBlueFlagEnum 红蓝标志，值为RED或者BLUE，可选
     * @param params.warehouseCode 仓库编码，必填
     * @param params.departmentCode 部门编码，可选
     * @param params.bizEmployeeCode 业务员编码，可选
     * @param params.comments 备注，可选
     * @param params.contractNo 合同编号，可选
     * @param params.customizedField 自定义项，可选
     * @param params.customizedField[].name 自定义项名称
     * @param params.customizedField[].value 自定义项值
     * @param params.detailList 明细列表，必填
     * @param params.detailList[].productCode 商品编码
     * @param params.detailList[].id 明细id
     * @param params.detailList[].warehouseCode 仓库编码
     * @param params.detailList[].productSpecNo 属性组合编码
     * @param params.detailList[].itemBarcode 商品条码
     * @param params.detailList[].transUomName 采购单位
     * @param params.detailList[].inventoryLotNo 批号
     * @param params.detailList[].inventoryLotCreationDate 生产日期
     * @param params.detailList[].inventoryLotExpirationDate 失效日期
     * @param params.detailList[].transQty 数量
     * @param params.detailList[].trans2UomName 单位2
     * @param params.detailList[].trans2Qty 数量2
     * @param params.detailList[].hierarchyPkgQtysText 包装数量
     * @param params.detailList[].costPrice 调出成本
     * @param params.detailList[].costAmount 调出金额金额
     * @param params.detailList[].editFlag 编辑标识（更新：update，删除：delete，新增：new，无变化：old）
     * @param params.detailList[].projectCode 项目编码
     * @param params.detailList[].contractNo 合同编码
     * @param params.detailList[].wareLocationDetailList 货位明细信息
     * @param params.detailList[].serialNoDetailList 序列号
     * @param params.detailList[].serialNoDetailList[].id 序列号孙表id
     * @param params.detailList[].serialNoDetailList[].serialNo 序列号
     * @param params.detailList[].serialNoDetailList[].transQty 数量1
     * @param params.detailList[].serialNoDetailList[].trans2Qty 数量2
     * @param params.detailList[].serialNoDetailList[].productSerialNoId 序列号档案id
     * @param params.detailList[].serialNoDetailList[].refVoucherId 序列号档案来源单据id
     * @param params.detailList[].serialNoDetailList[].generatedMethod 序列号档案生成方式
     * @param params.detailList[].serialNoDetailList[].productSerialNo 序列号档案的序列号
     * @returns 修改结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/ckd
     */
    updateStockOut(bookid: string, params: StockOutUpdateParams): Promise<StockOutUpdateResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/stock/update/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<StockOutUpdateResult>(options);
    },

    /**
     * ISV其他出库单新增接口。
     *
     * @param bookid 账套id
     * @param params 其他出库单内容
     * @param params.bizDate 单据日期，必填
     * @param params.code 单据编号，必填
     * @param params.projectCode 项目编码，可选
     * @param params.bizTypeId 业务类型ID 100213，必填
     * @param params.redBlueFlagEnum 红蓝标志，值为RED或者BLUE，可选
     * @param params.warehouseCode 仓库编码，必填
     * @param params.departmentCode 部门编码，可选
     * @param params.bizEmployeeCode 业务员编码，可选
     * @param params.comments 备注，可选
     * @param params.contractNo 合同编码，可选
     * @param params.customizedField 自定义项，可选
     * @param params.customizedField[].name 自定义项名称
     * @param params.customizedField[].value 自定义项值
     * @param params.detailList 明细列表，必填
     * @param params.detailList[].productCode 商品编码
     * @param params.detailList[].productSpecId 属性
     * @param params.detailList[].productSpecId[].name 属性名称（属性档案中存在）
     * @param params.detailList[].productSpecId[].value 属性值（属性档案中存在）
     * @param params.detailList[].warehouseCode 仓库编码
     * @param params.detailList[].productSpecNo 属性组合编码
     * @param params.detailList[].itemBarcode 商品条码
     * @param params.detailList[].transUomName 采购单位
     * @param params.detailList[].inventoryLotNo 批号
     * @param params.detailList[].inventoryLotCreationDate 生产日期
     * @param params.detailList[].inventoryLotExpirationDate 失效日期
     * @param params.detailList[].transQty 数量
     * @param params.detailList[].trans2UomName 单位2
     * @param params.detailList[].trans2Qty 数量2
     * @param params.detailList[].hierarchyPkgQtysText 包装数量
     * @param params.detailList[].costPrice 单价
     * @param params.detailList[].costAmount 金额
     * @param params.detailList[].projectCode 项目编码
     * @param params.detailList[].contractNo 合同编码
     * @param params.detailList[].wareLocationDetailList 货位明细信息
     * @param params.detailList[].requireWarehouseCode 要货仓库编码，当业务类型是调拨/100217时 ，必填
     * @returns 新增结果，`id` 为调拨单ID
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/ckd
     */
    addStockOut(bookid: string, params: StockOutAddParams): Promise<StockOutAddResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/stock/add/{bookid}/',
        pathParams: { bookid },
        body: params,
      };
      return client.request<StockOutAddResult>(options);
    },

    /**
     * ISV其他出库单删除接口。
     *
     * @param bookid 账套id
     * @param params 删除条件
     * @param params.ids ID列表（新增时返回的产成品入库单id），必填
     * @returns 各ID的删除结果（含失败项的错误码与信息）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/ckd
     */
    removeStockOut(bookid: string, params: StockOutRemoveParams): Promise<StockOutRemoveResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/stock/remove/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<StockOutRemoveResult>(options);
    },

    /**
     * ISV其他出入库单新增接口V2（删除、审核、弃审参照单据公共接口部分）。
     *
     * @param inoutFlag 出入库方向，入库方向传 `in`，出库方向传 `out`
     * @param bookid 账套id
     * @param params 其他出入库单内容
     * @param params.bizDate 单据日期，必填
     * @param params.code 单据编号，必填
     * @param params.projectCode 项目编码，可选
     * @param params.bizTypeId 业务类型ID，必填
     * @param params.redBlueFlagEnum 红蓝标志，值为RED或者BLUE，可选
     * @param params.warehouseCode 仓库编码，必填
     * @param params.departmentCode 部门编码，可选
     * @param params.bizEmployeeCode 业务员编码，可选
     * @param params.custVendorCode 供应商编码（客户编码），可选
     * @param params.comments 备注，可选
     * @param params.contractNo 合同编码，可选
     * @param params.customizedField 自定义项，可选
     * @param params.customizedField[].name 自定义项名称
     * @param params.customizedField[].value 自定义项值
     * @param params.detailList 明细列表，必填
     * @param params.detailList[].productCode 商品编码
     * @param params.detailList[].productSpecId 属性
     * @param params.detailList[].warehouseCode 仓库编码
     * @param params.detailList[].productSpecNo 属性组合编码
     * @param params.detailList[].itemBarcode 商品条码
     * @param params.detailList[].transUomName 采购单位
     * @param params.detailList[].inventoryLotNo 批号
     * @param params.detailList[].inventoryLotCreationDate 生产日期
     * @param params.detailList[].inventoryLotExpirationDate 失效日期
     * @param params.detailList[].transQty 数量
     * @param params.detailList[].trans2UomName 单位2
     * @param params.detailList[].trans2Qty 数量2
     * @param params.detailList[].hierarchyPkgQtysText 包装数量
     * @param params.detailList[].costPrice 单价
     * @param params.detailList[].costAmount 金额
     * @param params.detailList[].projectCode 项目编码
     * @param params.detailList[].contractNo 合同编码
     * @param params.detailList[].isManualCostPrice 手工指定成本
     * @param params.detailList[].customizedField 明细自定义项
     * @param params.detailList[].wareLocationDetailList 货位明细信息
     * @param params.detailList[].serialNoDetailList 序列号
     * @returns 新增结果，`id` 为调拨单ID
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/ckd
     */
    addStockOutV2(
      inoutFlag: string,
      bookid: string,
      params: StockOutV2AddParams,
    ): Promise<StockOutV2AddResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/stock/{inoutFlag}/add/{bookid}',
        pathParams: { inoutFlag, bookid },
        body: params,
      };
      return client.request<StockOutV2AddResult>(options);
    },
  };
}
