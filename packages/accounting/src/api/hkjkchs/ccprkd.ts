/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/ccprkd
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjkchs/ccprkd.md
 */

import type { ChanjetClient, RequestOptions } from '../../client.js';

/** 产成品入库单自定义项 */
export interface FinishedGoodsStockCustomizedField {
  /** 自定义项名称 */
  name: string;
  /** 自定义项值 */
  value: string;
}

/** 产成品入库单货位明细 */
export interface FinishedGoodsStockWareLocationDetail {
  /** 货位编码 */
  wareLocationCode: string;
  /** 数量1 */
  transQty: string;
  /** 数量2 */
  trans2Qty?: string;
}

/** 产成品入库单商品属性 */
export interface FinishedGoodsStockProductSpec {
  /** 属性名称（属性档案中存在） */
  name?: string;
  /** 属性值（属性档案中存在） */
  value?: string;
}

/** 产成品入库单新增明细序列号 */
export interface FinishedGoodsStockSerialNoDetail {
  /** 序列号 */
  serialNo: string;
  /** 数量1 */
  transQty: string;
  /** 数量2 */
  trans2Qty?: string;
}

/** 产成品入库单新增明细 */
export interface FinishedGoodsStockAddDetail {
  /** 商品编码 */
  productCode: string;
  /** 仓库编码 */
  warehouseCode: string;
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
  /** 属性 */
  productSpecId?: FinishedGoodsStockProductSpec[];
  /** 数量 */
  transQty: string;
  /** 单位2 (浮动商品时可输入) */
  trans2UomName?: string;
  /** 数量2 (浮动商品时可输入) */
  trans2Qty?: string;
  /** 包装数量 */
  hierarchyPkgQtysText?: string;
  /** 成本单价 */
  costPrice: string;
  /** 成本金额 */
  costAmount: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 货位明细信息 */
  wareLocationDetailList?: FinishedGoodsStockWareLocationDetail[];
  /** 序列号信息 */
  serialNoDetailList?: FinishedGoodsStockSerialNoDetail[];
  /** 是否合格 "UNQUALIFIED"：不合格 "QUALIFIED"：合格 */
  qualityStatusEnum?: string;
  /** 不合格原因 "MATERILA_QUALITY"：材料工艺 "PROCESSING"：加工工艺 "OTHERS"：其他 */
  unqualifiedReasonEnum?: string;
  /** 来源单据id */
  refVoucherId?: number;
  /** 来源单据，生产加工单填写"MpManufactureOrder" */
  refBoName?: string;
  /** 来源单据明细id */
  refVoucherDetailId?: number;
  /** 来源单据明细 生产加工单明细填写"MpManufactureOrderDetail" */
  refDetailBoName?: string;
}

/** 产成品入库单修改明细 */
export interface FinishedGoodsStockUpdateDetail {
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
  wareLocationDetailList?: FinishedGoodsStockWareLocationDetail[];
}

/** 产成品入库单列表请求参数 */
export interface FinishedGoodsStockListParams {
  /** 开始时间 */
  startDate?: string;
  /** 结束时间 */
  endDate?: string;
  /** 单据编号 */
  voucherCode?: string;
  /** 外部单据编号 */
  voucherExternalCode?: string;
  id?: string[];
  /** 页数 */
  page: number;
  /** 页行数 */
  pageSize: string;
}

/** 产成品入库单修改请求参数 */
export interface FinishedGoodsStockUpdateParams {
  /** 产成品入库单id */
  id: string;
  /** 单据日期 */
  bizDate: string;
  /** 单据编号 */
  code: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编码 */
  contractNo?: string;
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
  /** 自定义项 */
  customizedField?: FinishedGoodsStockCustomizedField[];
  /** 明细列表 */
  detailList: FinishedGoodsStockUpdateDetail[];
}

/** 产成品入库单新增请求参数 */
export interface FinishedGoodsStockAddParams {
  /** 单据日期 */
  bizDate: string;
  /** 单据编号 单据编码设置为手工编码时，录入好业财系统的code，编码设置为自动编码时，录入好业财系统的external_code */
  code: string;
  /** 项目编码 */
  projectCode?: string;
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
  /** 来源单据id */
  refVoucherId?: number;
  /** 来源单据名称 生产加工单填写"MpManufactureOrder" */
  refBoName?: string;
  /** 自定义项 */
  customizedField?: FinishedGoodsStockCustomizedField[];
  /** 明细列表 */
  detailList: FinishedGoodsStockAddDetail[];
}

/** 产成品入库单删除请求参数 */
export interface FinishedGoodsStockRemoveParams {
  /** ID列表（新增时返回的产成品入库单id） */
  ids: string[];
}

/** 产成品入库单列表响应货位明细 */
export interface FinishedGoodsStockListWareLocationDetail {
  /** 数量1 */
  transQty?: number;
  /** 货位名称 */
  wareLocationName?: string;
  /** 数量2 */
  trans2Qty?: number;
  /** 货位编码 */
  wareLocationCode?: string;
}

/** 产成品入库单列表响应明细 */
export interface FinishedGoodsStockListDetail {
  /** 包装数量 */
  hierarchyPkgQtysText?: string;
  /** 失效日期 */
  inventoryLotExpirationDate?: string;
  /** 仓库名称 */
  warehouseName?: string;
  /** 批号 */
  inventoryLotNo?: string;
  /** 商品名称 */
  productName?: string;
  /** 仓库编码 */
  warehouseCode?: string;
  /** 采购单位名称 */
  transUomName?: string;
  /** 货位名称（逗号分隔） */
  wareLocationNames?: string;
  /** 项目编码 */
  projectCode?: string;
  /** 货位数量（逗号分隔） */
  wareLocationQtys?: string;
  /** 货位明细列表 */
  warelocationDetailList?: FinishedGoodsStockListWareLocationDetail[];
  /** 货位编码（逗号分隔） */
  wareLocationCodes?: string;
  /** 生产日期 */
  inventoryLotCreationDate?: string;
  /** 属性1 */
  productFeature1?: string;
  /** 商品条码 */
  itemBarcode?: string;
  /** 属性2 */
  productFeature2?: string;
  /** 属性组合名称 */
  productSpecName?: string;
  /** 成本单价 */
  costPrice?: number;
  /** 成本金额 */
  costAmount?: number;
  /** 数量2 */
  trans2Qty?: number;
  /** 商品基本单位名称 */
  productBaseUomName?: string;
  /** 商品编码 */
  productCode?: string;
  /** 数量 */
  transQty?: number;
  /** 项目名称 */
  projectName?: string;
  /** 单位2名称 */
  trans2UomName?: string;
}

/** 产成品入库单列表响应行 */
export interface FinishedGoodsStockListRow {
  /** 部门名称 */
  departmentName?: string;
  /** 来源平台 */
  srcWebsiteEnum?: string;
  /** 单据状态 */
  voucherStatusEnum?: string;
  /** 单据编号 */
  code?: string;
  /** 备注 */
  comments?: string;
  /** 外部单据编号 */
  externalCode?: string;
  /** 单据日期 */
  bizDate?: string;
  /** 业务员名称 */
  bizEmployeeName?: string;
  /** 部门编码 */
  departmentCode?: string;
  /** 明细列表 */
  voucherDetailList?: FinishedGoodsStockListDetail[];
  /** 业务员编码 */
  bizEmployeeCode?: string;
  /** 红蓝标志 */
  redBlueFlagEnum?: string;
}

/** 产成品入库单列表响应数据 */
export interface FinishedGoodsStockListResult {
  /** 当前页行数 */
  currentPageSize?: number;
  /** 总页数 */
  totalPage?: number;
  /** 总条数 */
  count?: number;
  /** 当前页 */
  currentPage?: number;
  /** 行数据 */
  rows?: FinishedGoodsStockListRow[];
}

/** 产成品入库单修改响应数据 */
export interface FinishedGoodsStockUpdateResult {
  /** 错误ID */
  id?: number;
}

/** 产成品入库单新增响应数据 */
export interface FinishedGoodsStockAddResult {
  /** 错误ID（成功时为产成品入库单ID） */
  id?: number;
}

/** 产成品入库单删除失败项 */
export interface FinishedGoodsStockRemoveFailure {
  /** 单据id */
  code?: string;
  /** 错误码 */
  errorCode?: string;
  /** 错误信息 */
  msg?: string;
}

/** 产成品入库单删除响应数据 */
export type FinishedGoodsStockRemoveResult = FinishedGoodsStockRemoveFailure[];

/**
 * 好会计库存核算——产成品入库单模块。
 *
 * @param client 好会计客户端实例
 * @returns 产成品入库单各接口方法
 */
export function createCcprkdApi(client: ChanjetClient) {
  return {
    /**
     * ISV产成品入库单列表接口。
     *
     * @param bookid 账套id
     * @param params 查询条件
     * @param params.startDate 开始时间，可选
     * @param params.endDate 结束时间，可选
     * @param params.voucherCode 单据编号，可选
     * @param params.voucherExternalCode 外部单据编号，可选
     * @param params.id 单据id列表，可选
     * @param params.page 页数，必填
     * @param params.pageSize 页行数，必填
     * @returns 产成品入库单分页结果，`rows` 为单据数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/ccprkd
     */
    listFinishedGoodsStock(
      bookid: string,
      params: FinishedGoodsStockListParams,
    ): Promise<FinishedGoodsStockListResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/inv/finishedgoodsstock/list/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<FinishedGoodsStockListResult>(options);
    },

    /**
     * ISV产成品入库单修改接口。
     *
     * @param bookid 账套id
     * @param params 产成品入库单内容
     * @param params.id 产成品入库单id，必填
     * @param params.bizDate 单据日期，必填
     * @param params.code 单据编号，必填
     * @param params.projectCode 项目编码，可选
     * @param params.contractNo 合同编码，可选
     * @param params.redBlueFlagEnum 红蓝标志，值为RED或者BLUE，可选
     * @param params.warehouseCode 仓库编码，必填
     * @param params.departmentCode 部门编码，可选
     * @param params.bizEmployeeCode 业务员编码，可选
     * @param params.comments 备注，可选
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
     * @param params.detailList[].wareLocationDetailList[].wareLocationCode 货位编码
     * @param params.detailList[].wareLocationDetailList[].transQty 数量1
     * @param params.detailList[].wareLocationDetailList[].trans2Qty 数量2
     * @returns 修改结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/ccprkd
     */
    updateFinishedGoodsStock(
      bookid: string,
      params: FinishedGoodsStockUpdateParams,
    ): Promise<FinishedGoodsStockUpdateResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/finishedgoodsstock/update/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<FinishedGoodsStockUpdateResult>(options);
    },

    /**
     * ISV产成品入库单新增接口。
     *
     * @param bookid 账套id
     * @param params 产成品入库单内容
     * @param params.bizDate 单据日期，必填
     * @param params.code 单据编号，必填
     * @param params.projectCode 项目编码，可选
     * @param params.redBlueFlagEnum 红蓝标志，值为RED或者BLUE，可选
     * @param params.warehouseCode 仓库编码，必填
     * @param params.departmentCode 部门编码，可选
     * @param params.bizEmployeeCode 业务员编码，可选
     * @param params.comments 备注，可选
     * @param params.contractNo 合同编号，可选
     * @param params.refVoucherId 来源单据id，可选
     * @param params.refBoName 来源单据名称 生产加工单填写"MpManufactureOrder"，可选
     * @param params.customizedField 自定义项，可选
     * @param params.customizedField[].name 自定义项名称
     * @param params.customizedField[].value 自定义项值
     * @param params.detailList 明细列表，必填
     * @param params.detailList[].productCode 商品编码
     * @param params.detailList[].warehouseCode 仓库编码
     * @param params.detailList[].itemBarcode 商品条码
     * @param params.detailList[].transUomName 采购单位
     * @param params.detailList[].inventoryLotNo 批号
     * @param params.detailList[].inventoryLotCreationDate 生产日期
     * @param params.detailList[].inventoryLotExpirationDate 失效日期
     * @param params.detailList[].productSpecId 属性
     * @param params.detailList[].productSpecId[].name 属性名称（属性档案中存在）
     * @param params.detailList[].productSpecId[].value 属性值（属性档案中存在）
     * @param params.detailList[].transQty 数量
     * @param params.detailList[].trans2UomName 单位2 (浮动商品时可输入)
     * @param params.detailList[].trans2Qty 数量2 (浮动商品时可输入)
     * @param params.detailList[].hierarchyPkgQtysText 包装数量
     * @param params.detailList[].costPrice 成本单价
     * @param params.detailList[].costAmount 成本金额
     * @param params.detailList[].projectCode 项目编码
     * @param params.detailList[].contractNo 合同编码
     * @param params.detailList[].wareLocationDetailList 货位明细信息
     * @param params.detailList[].wareLocationDetailList[].wareLocationCode 货位编码
     * @param params.detailList[].wareLocationDetailList[].transQty 数量1
     * @param params.detailList[].wareLocationDetailList[].trans2Qty 数量2
     * @param params.detailList[].serialNoDetailList 序列号信息
     * @param params.detailList[].serialNoDetailList[].serialNo 序列号
     * @param params.detailList[].serialNoDetailList[].transQty 数量1
     * @param params.detailList[].serialNoDetailList[].trans2Qty 数量2
     * @param params.detailList[].qualityStatusEnum 是否合格
     * @param params.detailList[].unqualifiedReasonEnum 不合格原因
     * @param params.detailList[].refVoucherId 来源单据id
     * @param params.detailList[].refBoName 来源单据
     * @param params.detailList[].refVoucherDetailId 来源单据明细id
     * @param params.detailList[].refDetailBoName 来源单据明细
     * @returns 新增结果，`id` 为产成品入库单ID
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/ccprkd
     */
    addFinishedGoodsStock(
      bookid: string,
      params: FinishedGoodsStockAddParams,
    ): Promise<FinishedGoodsStockAddResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/finishedgoodsstock/add/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<FinishedGoodsStockAddResult>(options);
    },

    /**
     * ISV产成品入库单删除接口。
     *
     * @param bookid 账套id
     * @param params 删除条件
     * @param params.ids ID列表（新增时返回的产成品入库单id），必填
     * @returns 各ID的删除结果（含失败项的错误码与信息）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/ccprkd
     */
    removeFinishedGoodsStock(
      bookid: string,
      params: FinishedGoodsStockRemoveParams,
    ): Promise<FinishedGoodsStockRemoveResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/finishedgoodsstock/remove/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<FinishedGoodsStockRemoveResult>(options);
    },
  };
}
