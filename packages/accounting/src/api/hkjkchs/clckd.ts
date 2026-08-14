/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/clckd
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjkchs/clckd.md
 */

import type { ChanjetClient, RequestOptions } from '../../client.js';

/** 材料出库单自定义项 */
export interface MaterialStockCustomizedField {
  /** 自定义项名称 */
  name: string;
  /** 自定义项值 */
  value: string;
}

/** 材料出库单货位明细 */
export interface MaterialStockWareLocationDetail {
  /** 货位编码 */
  wareLocationCode: string;
  /** 数量1 */
  transQty: string;
  /** 数量2 */
  trans2Qty?: string;
}

/** 材料出库单新增明细 */
export interface MaterialStockAddDetail {
  /** 商品编码 */
  productCode: string;
  /** 仓库编码 */
  warehouseCode: string;
  /** 属性组合编码 */
  productSpecNo?: string;
  /** 商品条码 */
  itemBarcode?: string;
  /** 采购单位 */
  transUomName: string;
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
  /** 来源单据id */
  refVoucherId?: number;
  /** 来源单据，生产加工单填MpManufactureOrder */
  refBoName?: string;
  /** 来源单据明细id */
  refVoucherDetailId?: number;
  /** 来源单据明细，生产加工单明细填MpManufactureOrderMaterialDetail */
  refDetailBoName?: string;
  /** 货位明细信息 */
  wareLocationDetailList?: MaterialStockWareLocationDetail[];
  /** 明细备注 */
  comments?: string;
}

/** 材料出库单修改明细 */
export interface MaterialStockUpdateDetail {
  /** 商品编码 */
  productCode: string;
  /** 明细行id */
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
  /** 单价 */
  costPrice: string;
  /** 金额 */
  costAmount: string;
  /** 编辑标识（更新：update，删除：delete，新增：new，无变化：old） */
  editFlag: string;
  /** 合同编号 */
  contractNo?: string;
  /** 项目编码 */
  projectCode?: string;
  /** 货位明细信息 */
  wareLocationDetailList?: MaterialStockWareLocationDetail[];
}

/** 材料出库单列表请求参数 */
export interface MaterialStockListParams {
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 单据编号 */
  voucherCode?: string;
  /** 外部单据编号 */
  voucherExternalCode?: string;
  /** 页数 */
  page: number;
  /** 页行数 */
  pageSize: string;
}

/** 材料出库单新增请求参数 */
export interface MaterialStockAddParams {
  /** 单据日期 */
  bizDate: string;
  /** 业务类型，100813 工程领料 ，100276 直接领料，100831 自制领料 ， 100832 共耗领料，100833 生产补料，默认直接领料 */
  bizTypeId?: number;
  /** 单据编号 单据编码设置为手工编码时，录入好业财系统的code，编码设置为自动编码时，录入好业财系统的external_code */
  code: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 红蓝标志，值为RED或者BLUE */
  redBlueFlagEnum?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 部门编码 */
  departmentCode?: string;
  /** 业务员编码 */
  bizEmployeeCode?: string;
  /** 备注 */
  comments?: string;
  /** 来源单据id */
  refVoucherId?: number;
  /** 来源单据 生产加工单填 MpManufactureOrder */
  refBoName?: string;
  /** 自定义项 */
  customizedField?: MaterialStockCustomizedField[];
  /** 材料列表 */
  detailList: MaterialStockAddDetail[];
}

/** 材料出库单删除请求参数 */
export interface MaterialStockRemoveParams {
  /** ID列表（新增时返回的材料出库id） */
  ids: string[];
}

/** 材料出库单修改请求参数 */
export interface MaterialStockUpdateParams {
  /** 材料出库id */
  id: string;
  /** 单据日期 */
  bizDate: string;
  /** 业务类型id */
  bizTypeId?: number;
  /** 单据编号 */
  code: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 红蓝标志，值为RED或者BLUE */
  redBlueFlagEnum?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 部门编码 */
  departmentCode?: string;
  /** 业务员编码 */
  bizEmployeeCode?: string;
  /** 备注 */
  comments?: string;
  /** 自定义项 */
  customizedField?: MaterialStockCustomizedField[];
  /** 材料列表 */
  detailList: MaterialStockUpdateDetail[];
}

/** 材料出库单列表响应货位明细 */
export interface MaterialStockListWareLocationDetail {
  /** 数量2 */
  trans2Qty?: number;
  /** 数量1 */
  transQty?: number;
  /** 货位编码 */
  wareLocationCode?: string;
  /** 货位名称 */
  wareLocationName?: string;
}

/** 材料出库单列表响应明细 */
export interface MaterialStockListDetail {
  /** 成本金额 */
  costAmount?: number;
  /** 成本单价 */
  costPrice?: number;
  /** 包装数量 */
  hierarchyPkgQtysText?: string;
  /** 生产日期 */
  inventoryLotCreationDate?: string;
  /** 失效日期 */
  inventoryLotExpirationDate?: string;
  /** 批号 */
  inventoryLotNo?: string;
  /** 商品条码 */
  itemBarcode?: string;
  /** 商品基本单位名称 */
  productBaseUomName?: string;
  /** 商品编码 */
  productCode?: string;
  /** 属性1 */
  productFeature1?: string;
  /** 属性2 */
  productFeature2?: string;
  /** 商品名称 */
  productName?: string;
  /** 属性组合名称 */
  productSpecName?: string;
  /** 项目编码 */
  projectCode?: string;
  /** 项目名称 */
  projectName?: string;
  /** 数量2 */
  trans2Qty?: number;
  /** 单位2名称 */
  trans2UomName?: string;
  /** 数量 */
  transQty?: number;
  /** 采购单位名称 */
  transUomName?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 货位编码（逗号分隔） */
  wareLocationCodes?: string;
  /** 货位名称（逗号分隔） */
  wareLocationNames?: string;
  /** 货位数量（逗号分隔） */
  wareLocationQtys?: string;
  /** 货位明细列表 */
  warelocationDetailList?: MaterialStockListWareLocationDetail[];
}

/** 材料出库单列表响应行 */
export interface MaterialStockListRow {
  /** 单据日期 */
  bizDate?: string;
  /** 业务员编码 */
  bizEmployeeCode?: string;
  /** 业务员名称 */
  bizEmployeeName?: string;
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
  /** 明细列表 */
  voucherDetailList?: MaterialStockListDetail[];
  /** 单据状态 */
  voucherStatusEnum?: string;
}

/** 材料出库单列表响应数据 */
export interface MaterialStockListResult {
  /** 总条数 */
  count?: number;
  /** 当前页 */
  currentPage?: number;
  /** 当前页行数 */
  currentPageSize?: number;
  /** 行数据 */
  rows?: MaterialStockListRow[];
  /** 总页数 */
  totalPage?: number;
}

/** 材料出库单新增响应数据 */
export interface MaterialStockAddResult {
  /** 错误ID（成功时为材料出库单ID） */
  id?: number;
}

/** 材料出库单删除失败项 */
export interface MaterialStockRemoveFailure {
  /** 单据id */
  code?: string;
  /** 错误码 */
  errorCode?: string;
  /** 错误信息 */
  msg?: string;
}

/** 材料出库单删除响应数据 */
export type MaterialStockRemoveResult = MaterialStockRemoveFailure[];

/** 材料出库单修改响应数据 */
export type MaterialStockUpdateResult = Record<string, never>;

/**
 * 好会计库存核算——材料出库单模块。
 *
 * @param client 好会计客户端实例
 * @returns 材料出库单各接口方法
 */
export function createClckdApi(client: ChanjetClient) {
  return {
    /**
     * ISV材料出库单列表接口。
     *
     * @param bookid 账套id
     * @param params 查询条件
     * @param params.startDate 开始时间，可选
     * @param params.endDate 结束时间，可选
     * @param params.voucherCode 单据编号，可选
     * @param params.voucherExternalCode 外部单据编号，可选
     * @param params.page 页数，必填
     * @param params.pageSize 页行数，必填
     * @returns 材料出库单分页结果，`rows` 为单据数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/clckd
     */
    listMaterialStock(
      bookid: string,
      params: MaterialStockListParams,
    ): Promise<MaterialStockListResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/inv/materialstock/list/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<MaterialStockListResult>(options);
    },

    /**
     * ISV材料出库单新增接口。
     *
     * @param bookid 账套id
     * @param params 材料出库单内容
     * @param params.bizDate 单据日期，必填
     * @param params.bizTypeId 业务类型，100813 工程领料 ，100276 直接领料，100831 自制领料 ， 100832 共耗领料，100833 生产补料，默认直接领料，可选
     * @param params.code 单据编号，必填
     * @param params.projectCode 项目编码，可选
     * @param params.contractNo 合同编码，可选
     * @param params.redBlueFlagEnum 红蓝标志，值为RED或者BLUE，可选
     * @param params.warehouseCode 仓库编码，可选
     * @param params.departmentCode 部门编码，可选
     * @param params.bizEmployeeCode 业务员编码，可选
     * @param params.comments 备注，可选
     * @param params.refVoucherId 来源单据id，可选
     * @param params.refBoName 来源单据 生产加工单填 MpManufactureOrder，可选
     * @param params.customizedField 自定义项，可选
     * @param params.customizedField[].name 自定义项名称
     * @param params.customizedField[].value 自定义项值
     * @param params.detailList 材料列表，必填
     * @param params.detailList[].productCode 商品编码
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
     * @param params.detailList[].refVoucherId 来源单据id
     * @param params.detailList[].refBoName 来源单据
     * @param params.detailList[].refVoucherDetailId 来源单据明细id
     * @param params.detailList[].refDetailBoName 来源单据明细
     * @param params.detailList[].wareLocationDetailList 货位明细信息
     * @param params.detailList[].comments 明细备注
     * @returns 新增结果，`id` 为材料出库单ID
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/clckd
     */
    addMaterialStock(
      bookid: string,
      params: MaterialStockAddParams,
    ): Promise<MaterialStockAddResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/materialstock/add/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<MaterialStockAddResult>(options);
    },

    /**
     * ISV材料出库单删除接口。
     *
     * @param bookid 账套id
     * @param params 删除条件
     * @param params.ids ID列表（新增时返回的材料出库id），必填
     * @returns 各ID的删除结果（含失败项的错误码与信息）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/clckd
     */
    removeMaterialStock(
      bookid: string,
      params: MaterialStockRemoveParams,
    ): Promise<MaterialStockRemoveResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/materialstock/remove/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<MaterialStockRemoveResult>(options);
    },

    /**
     * ISV材料出库单修改接口。
     *
     * @param bookid 账套id
     * @param params 材料出库单内容
     * @param params.id 材料出库id，必填
     * @param params.bizDate 单据日期，必填
     * @param params.bizTypeId 业务类型id，可选
     * @param params.code 单据编号，必填
     * @param params.projectCode 项目编码，可选
     * @param params.contractNo 合同编码，可选
     * @param params.redBlueFlagEnum 红蓝标志，值为RED或者BLUE，可选
     * @param params.warehouseCode 仓库编码，可选
     * @param params.departmentCode 部门编码，可选
     * @param params.bizEmployeeCode 业务员编码，可选
     * @param params.comments 备注，可选
     * @param params.customizedField 自定义项，可选
     * @param params.customizedField[].name 自定义项名称
     * @param params.customizedField[].value 自定义项值
     * @param params.detailList 材料列表，必填
     * @param params.detailList[].productCode 商品编码
     * @param params.detailList[].id 明细行id
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
     * @param params.detailList[].editFlag 编辑标识（更新：update，删除：delete，新增：new，无变化：old）
     * @param params.detailList[].contractNo 合同编号
     * @param params.detailList[].projectCode 项目编码
     * @param params.detailList[].wareLocationDetailList 货位明细信息
     * @returns 修改结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/clckd
     */
    updateMaterialStock(
      bookid: string,
      params: MaterialStockUpdateParams,
    ): Promise<MaterialStockUpdateResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/materialstock/update/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<MaterialStockUpdateResult>(options);
    },
  };
}
