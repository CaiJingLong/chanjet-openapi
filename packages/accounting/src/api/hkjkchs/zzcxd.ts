/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/zzcxd
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjkchs/zzcxd.md
 * 注意: 文档未提供错误码说明表，故无错误码常量。
 */

import type { ChanjetClient, RequestOptions } from '@chanjet-openapi/core';

/** 组装拆卸单自定义项 */
export interface AssemblyCustomizedField {
  /** 自定义项名称 */
  name: string;
  /** 自定义项值 */
  value: string;
}

/** 组装拆卸单货位明细 */
export interface AssemblyWareLocationDetail {
  /** 货位编码 */
  wareLocationCode: string;
  /** 数量1 */
  transQty: string;
  /** 数量2 */
  trans2Qty?: string;
}

/** 组装拆卸单父件（新增） */
export interface AssemblyParentProduct {
  /** 商品编码 */
  productCode: string;
  /** 调出仓库编码 */
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
  /** 父id，随机值。保证和childlist里的一致 */
  fatherId: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 货位明细信息 */
  wareLocationDetailList?: AssemblyWareLocationDetail[];
}

/** 组装拆卸单子件（新增） */
export interface AssemblyChildProduct {
  /** 商品编码 */
  productCode: string;
  /** 仓库编码 */
  warehouseCode: string;
  /** 文档未提供说明 */
  transUomName: string;
  /** 文档未提供说明 */
  transQty?: string;
  /** 文档未提供说明 */
  trans2UomName?: string;
  /** 文档未提供说明 */
  trans2Qty?: string;
  /** 文档未提供说明 */
  hierarchyPkgQtysText?: string;
  /** 文档未提供说明 */
  costPrice: string;
  /** 文档未提供说明 */
  costAmount: string;
  /** 父id，该值和parentList里的fatherId保持一致 */
  fatherId: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 文档未提供说明 */
  wareLocationDetailList?: AssemblyWareLocationDetail[];
}

/** 组装拆卸单父件（修改） */
export interface AssemblyUpdateParentProduct {
  /** 文档参数表无 id，但请求示例包含 id */
  id?: string;
  /** 商品编码 */
  productCode: string;
  /** 调出仓库编码 */
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
  /** 父id，随机值。保证和childlist里的一致 */
  fatherId: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 编辑标识，固定值update */
  editFlag: string;
  /** 货位明细信息 */
  wareLocationDetailList?: AssemblyWareLocationDetail[];
}

/** 组装拆卸单子件（修改） */
export interface AssemblyUpdateChildProduct {
  /** 文档参数表无 id，但请求示例包含 id */
  id?: string;
  /** 商品编码 */
  productCode: string;
  /** 仓库编码 */
  warehouseCode: string;
  /** 文档未提供说明 */
  transUomName: string;
  /** 文档未提供说明 */
  transQty?: string;
  /** 文档未提供说明 */
  trans2UomName?: string;
  /** 文档未提供说明 */
  trans2Qty?: string;
  /** 文档未提供说明 */
  hierarchyPkgQtysText?: string;
  /** 文档未提供说明 */
  costPrice?: string;
  /** 文档未提供说明 */
  costAmount?: string;
  /** 父id，该值和parentList里的fatherId保持一致 */
  fatherId: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编号 */
  contractNo?: string;
  /** 编辑标识，固定值 update */
  editFlag: string;
  /** 货位明细信息 */
  wareLocationDetailList?: AssemblyWareLocationDetail[];
}

/** 组装拆卸单列表请求参数 */
export interface AssemblyListParams {
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

/** 组装拆卸单修改请求参数 */
export interface AssemblyUpdateParams {
  /** 单据日期 */
  bizDate: string;
  /** 单据编号 */
  code: string;
  /** 业主类型，组装100251 ，拆卸100252 */
  bizTypeId: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 红蓝标志，值为RED或者BLUE */
  redBlueFlagEnum?: string;
  /** 子件仓库编码 */
  warehouseCode: string;
  /** 父件仓库编码 */
  fahterWarehouseCode: string;
  /** 部门编码 */
  departmentCode?: string;
  /** 业务员编码 */
  bizEmployeeCode?: string;
  /** 备注 */
  comments?: string;
  /** 自定义项（参数表为 customizedField，示例为 customizedFieldList，以参数表为准） */
  customizedField?: AssemblyCustomizedField[];
  /** 父件列表 */
  parentProductList: AssemblyUpdateParentProduct[];
  /** 子件列表 */
  childProductList: AssemblyUpdateChildProduct[];
  /** 文档参数表无 id，但请求示例包含顶层 id */
  id?: string;
}

/** 组装拆卸单新增请求参数 */
export interface AssemblyAddParams {
  /** 单据日期 */
  bizDate: string;
  /** 单据编号 单据编码设置为手工编码时，录入好业财系统的code，编码设置为自动编码时，录入好业财系统的external_code */
  code: string;
  /** 业主类型，组装100251 ，拆卸100252 */
  bizTypeId: string;
  /** 项目编码 */
  projectCode?: string;
  /** 合同编码 */
  contractNo?: string;
  /** 红蓝标志，值为RED或者BLUE */
  redBlueFlagEnum?: string;
  /** 子件仓库编码 */
  warehouseCode: string;
  /** 父件仓库编码 */
  fahterWarehouseCode: string;
  /** 部门编码 */
  departmentCode?: string;
  /** 业务员编码 */
  bizEmployeeCode?: string;
  /** 备注 */
  comments?: string;
  /** 自定义项（参数表为 customizedField，示例为 customizedFieldList，以参数表为准） */
  customizedField?: AssemblyCustomizedField[];
  /** 父件列表 */
  parentProductList: AssemblyParentProduct[];
  /** 子件列表 */
  childProductList: AssemblyChildProduct[];
}

/** 组装拆卸单删除请求参数 */
export interface AssemblyRemoveParams {
  /** ID列表（新增时返回的材料出库id） */
  ids: string[];
}

/** 组装拆卸单列表响应货位明细 */
export interface AssemblyListWareLocationDetail {
  /** 数量2 */
  trans2Qty?: number;
  /** 数量1 */
  transQty?: number;
  /** 货位编码 */
  wareLocationCode?: string;
  /** 货位名称 */
  wareLocationName?: string;
}

/** 组装拆卸单列表响应明细 */
export interface AssemblyListDetail {
  /** 成本金额 */
  costAmount?: number;
  /** 成本单价 */
  costPrice?: number;
  /** 明细类型 ChildAssemblyDetail / ParentAssemblyDetail */
  detailType?: string;
  /** 包装数量 */
  hierarchyPkgQtysText?: string;
  /** 商品基本单位名称 */
  productBaseUomName?: string;
  /** 商品编码 */
  productCode?: string;
  /** 商品名称 */
  productName?: string;
  /** 属性组合编码 */
  productSpecNo?: string;
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
  warelocationDetailList?: AssemblyListWareLocationDetail[];
}

/** 组装拆卸单列表响应行 */
export interface AssemblyListRow {
  /** 单据日期 */
  bizDate?: string;
  /** 业务类型ID */
  bizTypeId?: string;
  /** 业务类型名称 */
  bizTypeName?: string;
  /** 单据编号 */
  code?: string;
  /** 备注 */
  comments?: string;
  /** 外部单据编号 */
  externalCode?: string;
  /** 红蓝标志 */
  redBlueFlagEnum?: string;
  /** 来源平台 */
  srcWebsiteEnum?: string;
  /** 明细列表 */
  voucherDetailList?: AssemblyListDetail[];
  /** 单据状态 */
  voucherStatusEnum?: string;
}

/** 组装拆卸单列表响应数据 */
export interface AssemblyListResult {
  /** 总条数 */
  count?: number;
  /** 当前页 */
  currentPage?: number;
  /** 当前页行数 */
  currentPageSize?: number;
  /** 行数据 */
  rows?: AssemblyListRow[];
  /** 总页数 */
  totalPage?: number;
}

/** 组装拆卸单修改响应数据 */
export interface AssemblyUpdateResult {
  /** 错误ID（成功时为组装拆卸单ID） */
  id?: number;
}

/** 组装拆卸单新增响应数据 */
export interface AssemblyAddResult {
  /** 错误ID（成功时为组装拆卸单ID） */
  id?: number;
}

/** 组装拆卸单删除失败项 */
export interface AssemblyRemoveFailure {
  /** 单据id */
  code?: string;
  /** 错误码 */
  errorCode?: string;
  /** 错误信息 */
  msg?: string;
}

/** 组装拆卸单删除响应数据 */
export type AssemblyRemoveResult = AssemblyRemoveFailure[];

/**
 * 好会计库存核算——组装拆卸单模块。
 *
 * @param client 好会计客户端实例
 * @returns 组装拆卸单各接口方法
 */
export function createZzcxdApi(client: ChanjetClient) {
  return {
    /**
     * ISV组装拆卸单列表接口。
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
     * @returns 组装拆卸单分页结果，`rows` 为单据数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/zzcxd
     */
    listAssembly(bookid: string, params: AssemblyListParams): Promise<AssemblyListResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/inv/assembly/list/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<AssemblyListResult>(options);
    },

    /**
     * ISV组装拆卸单修改接口。
     *
     * @param bookid 账套id
     * @param params 组装拆卸单内容
     * @param params.bizDate 单据日期，必填
     * @param params.code 单据编号，必填
     * @param params.bizTypeId 业主类型，组装100251 ，拆卸100252，必填
     * @param params.projectCode 项目编码，可选
     * @param params.contractNo 合同编码，可选
     * @param params.redBlueFlagEnum 红蓝标志，值为RED或者BLUE，可选
     * @param params.warehouseCode 子件仓库编码，必填
     * @param params.fahterWarehouseCode 父件仓库编码，必填
     * @param params.departmentCode 部门编码，可选
     * @param params.bizEmployeeCode 业务员编码，可选
     * @param params.comments 备注，可选
     * @param params.customizedField 自定义项，可选
     * @param params.customizedField[].name 自定义项名称
     * @param params.customizedField[].value 自定义项值
     * @param params.parentProductList 父件列表，必填
     * @param params.parentProductList[].productCode 商品编码
     * @param params.parentProductList[].warehouseCode 调出仓库编码
     * @param params.parentProductList[].productSpecNo 属性组合编码
     * @param params.parentProductList[].itemBarcode 商品条码
     * @param params.parentProductList[].transUomName 采购单位
     * @param params.parentProductList[].inventoryLotNo 批号
     * @param params.parentProductList[].inventoryLotCreationDate 生产日期
     * @param params.parentProductList[].inventoryLotExpirationDate 失效日期
     * @param params.parentProductList[].transQty 数量
     * @param params.parentProductList[].trans2UomName 单位2
     * @param params.parentProductList[].trans2Qty 数量2
     * @param params.parentProductList[].hierarchyPkgQtysText 包装数量
     * @param params.parentProductList[].costPrice 调出成本
     * @param params.parentProductList[].costAmount 调出金额金额
     * @param params.parentProductList[].fatherId 父id，随机值
     * @param params.parentProductList[].projectCode 项目编码
     * @param params.parentProductList[].contractNo 合同编码
     * @param params.parentProductList[].editFlag 固定值update
     * @param params.parentProductList[].wareLocationDetailList 货位明细信息
     * @param params.childProductList 子件列表，必填
     * @param params.childProductList[].productCode 商品编码
     * @param params.childProductList[].warehouseCode 仓库编码
     * @param params.childProductList[].transUomName 文档未提供说明
     * @param params.childProductList[].transQty 文档未提供说明
     * @param params.childProductList[].trans2UomName 文档未提供说明
     * @param params.childProductList[].trans2Qty 文档未提供说明
     * @param params.childProductList[].hierarchyPkgQtysText 文档未提供说明
     * @param params.childProductList[].costPrice 文档未提供说明
     * @param params.childProductList[].costAmount 文档未提供说明
     * @param params.childProductList[].fatherId 父id，该值和parentList里的fatherId保持一致
     * @param params.childProductList[].projectCode 项目编码
     * @param params.childProductList[].contractNo 合同编号
     * @param params.childProductList[].editFlag 固定值 update
     * @param params.childProductList[].wareLocationDetailList 货位明细信息
     * @returns 修改结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/zzcxd
     */
    updateAssembly(bookid: string, params: AssemblyUpdateParams): Promise<AssemblyUpdateResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/assembly/update/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<AssemblyUpdateResult>(options);
    },

    /**
     * ISV组装拆卸单新增接口。
     *
     * @param bookid 账套id
     * @param params 组装拆卸单内容
     * @param params.bizDate 单据日期，必填
     * @param params.code 单据编号，必填
     * @param params.bizTypeId 业主类型，组装100251 ，拆卸100252，必填
     * @param params.projectCode 项目编码，可选
     * @param params.contractNo 合同编码，可选
     * @param params.redBlueFlagEnum 红蓝标志，值为RED或者BLUE，可选
     * @param params.warehouseCode 子件仓库编码，必填
     * @param params.fahterWarehouseCode 父件仓库编码，必填
     * @param params.departmentCode 部门编码，可选
     * @param params.bizEmployeeCode 业务员编码，可选
     * @param params.comments 备注，可选
     * @param params.customizedField 自定义项，可选
     * @param params.customizedField[].name 自定义项名称
     * @param params.customizedField[].value 自定义项值
     * @param params.parentProductList 父件列表，必填
     * @param params.parentProductList[].productCode 商品编码
     * @param params.parentProductList[].warehouseCode 调出仓库编码
     * @param params.parentProductList[].productSpecNo 属性组合编码
     * @param params.parentProductList[].itemBarcode 商品条码
     * @param params.parentProductList[].transUomName 采购单位
     * @param params.parentProductList[].inventoryLotNo 批号
     * @param params.parentProductList[].inventoryLotCreationDate 生产日期
     * @param params.parentProductList[].inventoryLotExpirationDate 失效日期
     * @param params.parentProductList[].transQty 数量
     * @param params.parentProductList[].trans2UomName 单位2
     * @param params.parentProductList[].trans2Qty 数量2
     * @param params.parentProductList[].hierarchyPkgQtysText 包装数量
     * @param params.parentProductList[].costPrice 调出成本
     * @param params.parentProductList[].costAmount 调出金额金额
     * @param params.parentProductList[].fatherId 父id，随机值
     * @param params.parentProductList[].projectCode 项目编码
     * @param params.parentProductList[].contractNo 合同编码
     * @param params.parentProductList[].wareLocationDetailList 货位明细信息
     * @param params.childProductList 子件列表，必填
     * @param params.childProductList[].productCode 商品编码
     * @param params.childProductList[].warehouseCode 仓库编码
     * @param params.childProductList[].transUomName 文档未提供说明
     * @param params.childProductList[].transQty 文档未提供说明
     * @param params.childProductList[].trans2UomName 文档未提供说明
     * @param params.childProductList[].trans2Qty 文档未提供说明
     * @param params.childProductList[].hierarchyPkgQtysText 文档未提供说明
     * @param params.childProductList[].costPrice 文档未提供说明
     * @param params.childProductList[].costAmount 文档未提供说明
     * @param params.childProductList[].fatherId 父id，该值和parentList里的fatherId保持一致
     * @param params.childProductList[].projectCode 项目编码
     * @param params.childProductList[].contractNo 合同编码
     * @param params.childProductList[].wareLocationDetailList 文档未提供说明
     * @returns 新增结果，`id` 为组装拆卸单ID
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/zzcxd
     */
    addAssembly(bookid: string, params: AssemblyAddParams): Promise<AssemblyAddResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/assembly/add/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<AssemblyAddResult>(options);
    },

    /**
     * ISV组装拆卸单删除接口。
     *
     * @param bookid 账套id
     * @param params 删除条件
     * @param params.ids ID列表（新增时返回的材料出库id），必填
     * @returns 各ID的删除结果（含失败项的错误码与信息）
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjkchs/zzcxd
     */
    removeAssembly(bookid: string, params: AssemblyRemoveParams): Promise<AssemblyRemoveResult> {
      const options: RequestOptions = {
        method: 'POST',
        path: '/accounting/openapi/cc/assembly/remove/{bookid}',
        pathParams: { bookid },
        body: params,
      };
      return client.request<AssemblyRemoveResult>(options);
    },
  };
}
