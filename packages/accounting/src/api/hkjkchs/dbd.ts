/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/dbd
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjkchs/dbd.md
 */

import type { ChanjetClient, RequestOptions } from '../../client.js';

/** 调拨单自定义项 */
export interface StockTransferCustomizedField {
  /** 自定义项名称 */
  name: string;
  /** 自定义项值 */
  value: string;
}

/** 调拨单货位明细 */
export interface StockTransferWareLocationDetail {
  /** 货位编码 */
  wareLocationCode: string;
  /** 数量1 */
  transQty: string;
  /** 数量2 */
  trans2Qty?: string;
}

/** 调拨单商品属性 */
export interface StockTransferProductSpec {
  /** 属性名称（属性档案中存在） */
  name?: string;
  /** 属性值（属性档案中存在） */
  value?: string;
}

/** 调拨单修改序列号明细 */
export interface StockTransferUpdateSerialNoDetail {
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
  /** 序列号档案生成方式（对应查询接口中的snGeneratedMethodEnum.value） */
  generatedMethod?: string;
  /** 序列号档案的序列号 */
  productSerialNo?: string;
}

/** 调拨单新增序列号明细 */
export interface StockTransferSerialNoDetail {
  /** 序列号 */
  serialNo: string;
  /** 数量1 */
  transQty: string;
  /** 数量2 */
  trans2Qty?: string;
}

/** 调拨单修改明细 */
export interface StockTransferUpdateDetail {
  /** 商品编码 */
  productCode: string;
  /** 明细id */
  id: string;
  /** 调出仓库编码 */
  warehouseCode: string;
  /** 调入仓库编码 */
  toWarehouseCode: string;
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
  /** 调入成本 */
  toCostPrice: string;
  /** 调入金额 */
  toCostAmount: string;
  /** 差异金额 */
  deltaCostAmount: string;
  /** 编辑标识（更新：update，删除：delete，新增：new，无变化：old） */
  editFlag: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编号 */
  contractNo?: string;
  /** 调出货位明细信息 */
  wareLocationDetailList?: StockTransferWareLocationDetail[];
  /** 调入货位明细信息 */
  toWareLocationDetailList?: StockTransferWareLocationDetail[];
  /** 序列号 */
  serialNoDetailList?: StockTransferUpdateSerialNoDetail[];
}

/** 调拨单新增明细 */
export interface StockTransferAddDetail {
  /** 商品编码 */
  productCode: string;
  /** 来源单据明细ID */
  refVoucherDetailId?: string;
  /** 来源单据明细（来源于销售订单填写：SalesOrderDetail） */
  refDetailBoName?: string;
  /** 来源单据id */
  refVoucherId?: string;
  /** 来源单据（来源于销售订单填写：SalesOrder） */
  refBoName?: string;
  /** 调出仓库编码 */
  warehouseCode: string;
  /** 调入仓库编码 */
  toWarehouseCode: string;
  /** 商品属性 */
  productSpecId?: StockTransferProductSpec[];
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
  /** 调入成本 */
  toCostPrice: string;
  /** 调入金额 */
  toCostAmount: string;
  /** 差异金额 */
  deltaCostAmount: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 调出货位信息 */
  wareLocationDetailList?: StockTransferWareLocationDetail[];
  /** 调入货位信息 */
  toWareLocationDetailList?: StockTransferWareLocationDetail[];
  /** 序列号 */
  serialNoDetailList?: StockTransferSerialNoDetail[];
}

/** 调拨单列表请求参数 */
export interface StockTransferListParams {
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 单据编号 */
  voucherCode?: string;
  /** 外部单据编号 */
  voucherExternalCode?: string;
  /** 单据方向 */
  redBlueFlagEnum?: string;
  /** 单据状态： SUBMITTED 未生效 EFFECTIVE 已生效 */
  voucherStatusEnum?: string;
  /** 页数 */
  page: number;
  /** 页行数 */
  pageSize: string;
}

/** 调拨单修改请求参数 */
export interface StockTransferUpdateParams {
  /** 调拨单id */
  id: string;
  /** 单据日期 */
  bizDate: string;
  /** 单据编号 */
  code: string;
  /** 业主类型，同价调拨100221，异价调拨100222 */
  bizTypeId: string;
  /** 项目编码 */
  projectCode?: string;
  /** 红蓝标志，值为RED或者BLUE */
  redBlueFlagEnum?: string;
  /** 调出仓库编码 */
  warehouseCode: string;
  /** 调入仓库编码 */
  toWarehouseCode: string;
  /** 部门编码 */
  departmentCode?: string;
  /** 业务员编码 */
  bizEmployeeCode?: string;
  /** 备注 */
  comments?: string;
  /** 合同编号 */
  contractNo?: string;
  /** 自定义项 */
  customizedField?: StockTransferCustomizedField[];
  /** 明细列表 */
  detailList: StockTransferUpdateDetail[];
}

/** 调拨单新增请求参数 */
export interface StockTransferAddParams {
  /** 单据日期 */
  bizDate: string;
  /** 单据编号 单据编码设置为手工编码时，录入好业财系统的code，编码设置为自动编码时，录入好业财系统的external_code */
  code: string;
  /** 来源单据（销售订单：SalesOrder） */
  refBoName?: string;
  /** 来源单据ID */
  refVoucherId?: number;
  /** 业务类型，同价调拨100221，异价调拨100222 调拨入库 100207 调拨出库 100217 */
  bizTypeId: string;
  /** 项目编码 */
  projectCode?: string;
  /** 红蓝标志，值为RED或者BLUE */
  redBlueFlagEnum?: string;
  /** 调出仓库编码 */
  warehouseCode: string;
  /** 调入仓库编码 */
  toWarehouseCode: string;
  /** 部门编码 */
  departmentCode?: string;
  /** 业务员编码 */
  bizEmployeeCode?: string;
  /** 备注 */
  comments?: string;
  /** 合同编号 */
  contractNo?: string;
  /** 自定义项 */
  customizedField?: StockTransferCustomizedField[];
  /** 明细列表 */
  detailList: StockTransferAddDetail[];
}

/** 调拨单删除请求参数 */
export interface StockTransferRemoveParams {
  /** ID列表（新增时返回的材料出库id） */
  ids: string[];
}

/** 调拨单列表响应货位明细 */
export interface StockTransferListWareLocationDetail {
  /** 数量2 */
  trans2Qty?: number;
  /** 数量1 */
  transQty?: number;
  /** 货位编码 */
  wareLocationCode?: string;
  /** 货位名称 */
  wareLocationName?: string;
}

/** 调拨单列表响应明细 */
export interface StockTransferListDetail {
  /** 成本金额 */
  costAmount?: number;
  /** 成本单价 */
  costPrice?: number;
  /** 差异金额 */
  deltaCostAmount?: number;
  /** 包装数量 */
  hierarchyPkgQtysText?: string;
  /** 商品条码 */
  itemBarcode?: string;
  /** 商品基本单位名称 */
  productBaseUomName?: string;
  /** 商品编码 */
  productCode?: string;
  /** 商品名称 */
  productName?: string;
  /** 属性组合编码 */
  productSpecNo?: string;
  /** 项目编码 */
  projectCode?: string;
  /** 项目名称 */
  projectName?: string;
  /** 调入金额 */
  toCostAmount?: number;
  /** 调入成本 */
  toCostPrice?: number;
  /** 调入仓库编码 */
  toWarehouseCode?: string;
  /** 调入仓库名称 */
  toWarehouseName?: string;
  /** 数量2 */
  trans2Qty?: number;
  /** 单位2名称 */
  trans2UomName?: string;
  /** 数量 */
  transQty?: number;
  /** 采购单位名称 */
  transUomName?: string;
  /** 调出仓库编码 */
  warehouseCode?: string;
  /** 调出仓库名称 */
  warehouseName?: string;
  /** 货位编码（逗号分隔） */
  wareLocationCodes?: string;
  /** 货位名称（逗号分隔） */
  wareLocationNames?: string;
  /** 货位数量（逗号分隔） */
  wareLocationQtys?: string;
  /** 货位明细列表 */
  warelocationDetailList?: StockTransferListWareLocationDetail[];
  /** 调入货位编码（逗号分隔） */
  toWareLocationCodes?: string;
  /** 调入货位名称（逗号分隔） */
  toWareLocationNames?: string;
  /** 调入货位数量（逗号分隔） */
  toWareLocationQtys?: string;
  /** 调入货位明细列表 */
  toWarelocationDetailList?: StockTransferListWareLocationDetail[];
}

/** 调拨单列表响应行 */
export interface StockTransferListRow {
  /** 单据日期 */
  bizDate?: string;
  /** 业务员编码 */
  bizEmployeeCode?: string;
  /** 业务员名称 */
  bizEmployeeName?: string;
  /** 业务类型ID */
  bizTypeId?: string;
  /** 业务类型名称 */
  bizTypeName?: string;
  /** 单据编号 */
  code?: string;
  /** 备注 */
  comments?: string;
  /** 部门编码 */
  departmentCode?: string;
  /** 部门名称 */
  departmentName?: string;
  /** 外部单据编号 */
  externalCode?: string;
  /** 红蓝标志 */
  redBlueFlagEnum?: string;
  /** 来源平台 */
  srcWebsiteEnum?: string;
  /** 总差异金额 */
  totalDeltaCostAmount?: number;
  /** 明细列表 */
  voucherDetailList?: StockTransferListDetail[];
  /** 单据状态 */
  voucherStatusEnum?: string;
}

/** 调拨单列表响应数据 */
export interface StockTransferListResult {
  /** 总条数 */
  count?: number;
  /** 当前页 */
  currentPage?: number;
  /** 当前页行数 */
  currentPageSize?: number;
  /** 行数据 */
  rows?: StockTransferListRow[];
  /** 总页数 */
  totalPage?: number;
}

/** 调拨单修改响应数据 */
export interface StockTransferUpdateResult {
  /** 错误ID */
  id?: number;
}

/** 调拨单新增响应数据 */
export interface StockTransferAddResult {
  /** 错误ID（成功时为调拨单ID） */
  id?: number;
}

/** 调拨单删除失败项 */
export interface StockTransferRemoveFailure {
  /** 单据id */
  code?: string;
  /** 错误码 */
  errorCode?: string;
  /** 错误信息 */
  msg?: string;
}

/** 调拨单删除响应数据 */
export type StockTransferRemoveResult = StockTransferRemoveFailure[];

/** 调拨单详情——业务类型 */
export interface StockTransferQueryBizType {
  /** 业务类型id */
  id?: number;
  /** 业务类型名称 */
  name?: string;
}

/** 调拨单详情——业务员 */
export interface StockTransferQueryEmployee {
  /** 业务员id */
  id?: number;
  /** 员工编码 */
  empCode?: string;
  /** 业务员名称 */
  name?: string;
}

/** 调拨单详情——仓库 */
export interface StockTransferQueryWarehouse {
  /** 仓库id */
  id?: number;
  /** 仓库编码 */
  code?: string;
  /** 仓库名称 */
  name?: string;
  /** 仓库备注 */
  comments?: string;
}

/** 调拨单详情——用户 */
export interface StockTransferQueryUser {
  /** 用户id */
  id?: number;
  /** 用户名称 */
  name?: string;
}

/** 调拨单详情——单位 */
export interface StockTransferQueryUom {
  /** 单位id */
  id?: number;
  /** 单位名称 */
  uomName?: string;
}

/** 调拨单详情——主单据引用 */
export interface StockTransferQueryMasterVoucher {
  /** 主单据id */
  id?: number;
  /** 主单据编号 */
  code?: string;
}

/** 调拨单详情——商品 */
export interface StockTransferQueryProduct {
  /** 商品编码 */
  code?: string;
  /** 商品名称 */
  name?: string;
}

/** 调拨单详情——明细仓库 */
export interface StockTransferQueryDetailWarehouse {
  /** 仓库编码 */
  code?: string;
  /** 仓库名称 */
  name?: string;
}

/** 调拨单详情——货位明细 */
export interface StockTransferQueryWareLocation {
  /** 数量2 */
  trans2Qty?: number;
  /** 数量1 */
  transQty?: number;
  /** 货位编码 */
  wareLocationCode?: string;
  /** 货位名称 */
  wareLocationName?: string;
}

/** 调拨单详情——序列号生成方式 */
export interface StockTransferQuerySnGeneratedMethod {
  /** 生成方式值 */
  value?: string;
  /** 生成方式标签 */
  label?: string;
}

/** 调拨单详情——序列号档案 */
export interface StockTransferQuerySerialNoProduct {
  /** 序列号档案id */
  id?: number;
  /** 序列号档案来源单据id */
  refVoucherId?: number;
  /** 序列号档案的序列号 */
  serialNo?: string;
  /** 序列号档案生成方式 */
  snGeneratedMethodEnum?: StockTransferQuerySnGeneratedMethod;
}

/** 调拨单详情——序列号明细 */
export interface StockTransferQuerySerialNo {
  /** 序列号孙表id */
  id?: number;
  /** 序列号 */
  serialNo?: string;
  /** 数量1 */
  transQty?: number;
  /** 数量2 */
  trans2Qty?: number;
  /** 序列号档案 */
  productSerialNoId?: StockTransferQuerySerialNoProduct;
}

/** 调拨单详情——明细 */
export interface StockTransferQueryDetail {
  /** 明细id */
  id?: number;
  /** 商品条码 */
  itemBarcode?: string;
  /** 基本数量 */
  baseQty?: number;
  /** 基本单位 */
  baseUomId?: StockTransferQueryUom;
  /** 数量 */
  transQty?: number;
  /** 采购单位 */
  transUomId?: StockTransferQueryUom;
  /** 成本单价 */
  costPrice?: number;
  /** 成本金额 */
  costAmount?: number;
  /** 调入成本 */
  toCostPrice?: number;
  /** 调入金额 */
  toCostAmount?: number;
  /** 差异金额 */
  deltaCostAmount?: number;
  /** 包装数量 */
  hierarchyPkgQtysText?: string;
  /** 换算率 */
  transToBaseRate?: number;
  /** 主单据引用 */
  masterVoucherId?: StockTransferQueryMasterVoucher;
  /** 商品 */
  product?: StockTransferQueryProduct;
  /** 调出仓库 */
  warehouseId?: StockTransferQueryDetailWarehouse;
  /** 调入仓库 */
  toWarehouseId?: StockTransferQueryDetailWarehouse;
  /** 货位编码（逗号分隔） */
  wareLocationCodes?: string;
  /** 货位名称（逗号分隔） */
  wareLocationNames?: string;
  /** 货位数量（逗号分隔） */
  wareLocationQtys?: string;
  /** 货位明细列表 */
  warelocationDetailList?: StockTransferQueryWareLocation[];
  /** 调入货位编码（逗号分隔） */
  toWareLocationCodes?: string;
  /** 调入货位名称（逗号分隔） */
  toWareLocationNames?: string;
  /** 调入货位数量（逗号分隔） */
  toWareLocationQtys?: string;
  /** 调入货位明细列表 */
  toWarelocationDetailList?: StockTransferQueryWareLocation[];
  /** 序列号明细列表 */
  serialNoDetailList?: StockTransferQuerySerialNo[];
}

/** 调拨单详情响应数据 */
export interface StockTransferQueryResult {
  /** 单据id */
  id?: number;
  /** 单据编号 */
  code?: string;
  /** 单据日期（时间戳） */
  bizDate?: number;
  /** 业务类型 */
  bizTypeId?: StockTransferQueryBizType;
  /** 业务员 */
  bizEmployeeId?: StockTransferQueryEmployee;
  /** 调出仓库 */
  warehouseId?: StockTransferQueryWarehouse;
  /** 调入仓库 */
  toWarehouseId?: StockTransferQueryWarehouse;
  /** 红蓝标志 */
  redBlueFlagEnum?: string;
  /** 总成本金额 */
  totalCostAmount?: number;
  /** 总差异金额 */
  totalDeltaCostAmount?: number;
  /** 总调入金额 */
  totalToCostAmount?: number;
  /** 创建人 */
  createdUserId?: StockTransferQueryUser;
  /** 创建时间（时间戳） */
  createdStamp?: number;
  /** 审核日期（时间戳） */
  approvedDate?: number;
  /** 审核人 */
  approvedUserId?: StockTransferQueryUser;
  /** 明细列表 */
  detailList?: StockTransferQueryDetail[];
}

/**
 * 好会计库存核算——调拨单模块。
 *
 * @param client 好会计客户端实例
 * @returns 调拨单各接口方法
 */
export function createDbdApi(client: ChanjetClient) {
  return {
    /**
     * ISV调拨单列表接口。
     *
     * @param bookid 账套id
     * @param params 查询条件
     * @param params.startDate 开始时间，可选
     * @param params.endDate 结束时间，可选
     * @param params.voucherCode 单据编号，可选
     * @param params.voucherExternalCode 外部单据编号，可选
     * @param params.redBlueFlagEnum 单据方向，可选
     * @param params.voucherStatusEnum 单据状态： SUBMITTED 未生效 EFFECTIVE 已生效，可选
     * @param params.page 页数，必填
     * @param params.pageSize 页行数，必填
     * @returns 调拨单分页结果，`rows` 为单据数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/dbd
     */
    listStockTransfer(
      bookid: string,
      params: StockTransferListParams,
    ): Promise<StockTransferListResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/inv/stocktransfer/list/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<StockTransferListResult>(options);
    },

    /**
     * ISV调拨单修改接口。
     *
     * @param bookid 账套id
     * @param params 调拨单内容
     * @param params.id 调拨单id，必填
     * @param params.bizDate 单据日期，必填
     * @param params.code 单据编号，必填
     * @param params.bizTypeId 业主类型，同价调拨100221，异价调拨100222，必填
     * @param params.projectCode 项目编码，可选
     * @param params.redBlueFlagEnum 红蓝标志，值为RED或者BLUE，可选
     * @param params.warehouseCode 调出仓库编码，必填
     * @param params.toWarehouseCode 调入仓库编码，必填
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
     * @param params.detailList[].warehouseCode 调出仓库编码
     * @param params.detailList[].toWarehouseCode 调入仓库编码
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
     * @param params.detailList[].toCostPrice 调入成本
     * @param params.detailList[].toCostAmount 调入金额
     * @param params.detailList[].deltaCostAmount 差异金额
     * @param params.detailList[].editFlag 编辑标识（更新：update，删除：delete，新增：new，无变化：old）
     * @param params.detailList[].projectCode 项目编码
     * @param params.detailList[].contractNo 合同编号
     * @param params.detailList[].wareLocationDetailList 调出货位明细信息
     * @param params.detailList[].toWareLocationDetailList 调入货位明细信息
     * @param params.detailList[].serialNoDetailList 序列号
     * @returns 修改结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/dbd
     */
    updateStockTransfer(
      bookid: string,
      params: StockTransferUpdateParams,
    ): Promise<StockTransferUpdateResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/stocktransfer/update/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<StockTransferUpdateResult>(options);
    },

    /**
     * ISV根据ID查询调拨单详情。
     *
     * 注意：官方文档路径参数表将此路径占位符命名为 `id`（单据id），但请求地址中的占位符为 `{code}`，
     * 本实现按请求地址逐字符对齐，使用 `code` 作为路径参数名。
     *
     * @param code 单据编号（官方路径参数表中名为 `id`，含义为单据id）
     * @param bookid 帐套id
     * @returns 调拨单详情
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/dbd
     */
    queryStockTransfer(code: string, bookid: string): Promise<StockTransferQueryResult> {
      const options: RequestOptions = {
        method: 'GET',
        path: '/accounting/openapi/cc/stocktransfer/query/{code}/{bookid}',
        pathParams: { code, bookid },
      };
      return client.request<StockTransferQueryResult>(options);
    },

    /**
     * ISV调拨单新增接口。
     *
     * @param bookid 账套id
     * @param params 调拨单内容
     * @param params.bizDate 单据日期，必填
     * @param params.code 单据编号，必填
     * @param params.refBoName 来源单据（销售订单：SalesOrder），可选
     * @param params.refVoucherId 来源单据ID，可选
     * @param params.bizTypeId 业务类型，同价调拨100221，异价调拨100222 调拨入库 100207 调拨出库 100217，必填
     * @param params.projectCode 项目编码，可选
     * @param params.redBlueFlagEnum 红蓝标志，值为RED或者BLUE，可选
     * @param params.warehouseCode 调出仓库编码，必填
     * @param params.toWarehouseCode 调入仓库编码，必填
     * @param params.departmentCode 部门编码，可选
     * @param params.bizEmployeeCode 业务员编码，可选
     * @param params.comments 备注，可选
     * @param params.contractNo 合同编号，可选
     * @param params.customizedField 自定义项，可选
     * @param params.customizedField[].name 自定义项名称
     * @param params.customizedField[].value 自定义项值
     * @param params.detailList 明细列表，必填
     * @param params.detailList[].productCode 商品编码
     * @param params.detailList[].refVoucherDetailId 来源单据明细ID
     * @param params.detailList[].refDetailBoName 来源单据明细
     * @param params.detailList[].refVoucherId 来源单据id
     * @param params.detailList[].refBoName 来源单据
     * @param params.detailList[].warehouseCode 调出仓库编码
     * @param params.detailList[].toWarehouseCode 调入仓库编码
     * @param params.detailList[].productSpecId 商品属性
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
     * @param params.detailList[].toCostPrice 调入成本
     * @param params.detailList[].toCostAmount 调入金额
     * @param params.detailList[].deltaCostAmount 差异金额
     * @param params.detailList[].projectCode 项目编码
     * @param params.detailList[].contractNo 合同编码
     * @param params.detailList[].wareLocationDetailList 调出货位信息
     * @param params.detailList[].toWareLocationDetailList 调入货位信息
     * @param params.detailList[].serialNoDetailList 序列号
     * @returns 新增结果，`id` 为调拨单ID
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/dbd
     */
    addStockTransfer(
      bookid: string,
      params: StockTransferAddParams,
    ): Promise<StockTransferAddResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/stocktransfer/add/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<StockTransferAddResult>(options);
    },

    /**
     * ISV调拨单删除接口。
     *
     * @param bookid 账套id
     * @param params 删除条件
     * @param params.ids ID列表（新增时返回的材料出库id），必填
     * @returns 各ID的删除结果（含失败项的错误码与信息）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/dbd
     */
    removeStockTransfer(
      bookid: string,
      params: StockTransferRemoveParams,
    ): Promise<StockTransferRemoveResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/stocktransfer/remove/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<StockTransferRemoveResult>(options);
    },
  };
}
