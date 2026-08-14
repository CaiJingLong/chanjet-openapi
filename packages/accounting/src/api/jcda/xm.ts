/**
 * 来源: https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/xm
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/jcda/xm.md
 *
 * 文档各接口错误码说明表为空或未提供，故无错误码常量。
 */
import type { ChanjetClient } from '../../client.js';

/** 同步结果映射：键为第三方同步 id，值为系统生成的 id 或错误信息 */
type SyncResultMap = Record<string, string | number>;

/**
 * 同步删除项目请求参数。
 */
export interface RemoveParams {
  /** 账套id */
  bookid: string;
  /** 删除时间戳 */
  removeTime: number;
  /** id */
  id: number;
}

/**
 * 同步删除项目返回结果。
 */
export interface RemoveResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 项目同步请求参数。
 */
export interface BatchUpsertParams {
  /** 账套id */
  bookid: string;
  /** 项目列表 */
  items: BatchUpsertParamsItem[];
}

/**
 * 项目同步请求体条目。
 */
export interface BatchUpsertParamsItem {
  /** 关联项目分类 */
  id: number;
  /** 状态，允许值: "A", "I" */
  statusEnum: string;
  /** 项目名称 */
  name: string;
  /** 项目编码 */
  code: string;
}

/**
 * 项目同步返回结果。
 */
export interface BatchUpsertResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 查询项目请求参数。
 */
export interface QueryParams {
  /** 账套ID */
  bookid: string;
  /** 项目编码 */
  code: string;
  /** 项目名称 */
  name: string;
  /** 项目分类编码 */
  projectCategoryCode: string[];
  /** 每页数量（默认：20） */
  pageSize: number;
  /** 当前页（默认：1） */
  pageNo: number;
}

/**
 * 查询项目返回结果。
 */
export interface QueryResult {
  /** 总页数 */
  totalPage?: string;
  /** 总记录数 */
  count?: string;
  /** 项目列表 */
  rows?: QueryResultRow[];
}

/**
 * 查询项目列表条目。
 */
export interface QueryResultRow {
  /** 项目ID */
  id?: number;
  /** 项目名称 */
  name?: string;
  /** 项目编码 */
  code?: string;
  /** 项目备注 */
  comments?: string;
  /** 项目状态 */
  statusEnum?: QueryResultRowStatusEnum;
}

/**
 * 查询项目列表条目状态。
 */
export interface QueryResultRowStatusEnum {
  /** 项目状态标签 */
  label?: string;
}

/**
 * 项目修改请求参数。
 */
export interface UpdateParams {
  /** 账套id */
  bookid: string;
  /** 项目id */
  id: string;
  /** 项目编码 */
  code: string;
  /** 项目名称 */
  name: string;
  /** 启用状态 启用："A"，停用："I" */
  statusEnum: string;
  /** 备注 */
  comments?: string;
  /** 项目分类编码 */
  projectCategoryCode: string;
  /** 计划开始日期 */
  fromDate?: string;
  /** 计划结束日期 */
  thruDate?: string;
  /** 项目周期 */
  projectCycleDays?: string;
  /** 金额 */
  amount?: string;
  /** 部门编码 */
  departmentCode?: string;
  /** 客户编码 */
  custVendorCode?: string;
  /** 项目整体完工比例 */
  projectFinishedPct?: string;
  /** 自定义项 */
  customizedFieldList?: UpdateParamsCustomizedField[];
}

/**
 * 项目修改自定义项。
 */
export interface UpdateParamsCustomizedField {
  /** 自定义项名称 */
  name: string;
  /** 自定义项值 */
  value: string;
}

/**
 * 项目修改返回结果条目。
 *
 * 注意：文档输出参数表 data 类型为 object（单数），但响应示例为数组，
 * 本实现返回 UpdateResult[]（数组），与参数表存在冲突。
 */
export interface UpdateResult {
  /** 错误信息 */
  errorMessage?: string;
  /** 错误码 */
  errorCode?: string;
  /** 项目 id */
  id?: string;
}

/**
 * 项目基础档案模块。
 */
export function createXmApi(client: ChanjetClient) {
  return {
    /**
     * 同步删除项目：好会计接受第三方项目基础档案删除信息。
     *
     * 注意：文档参数表将 removeTime 列在 Body 下，但示例 URL 为 query string，
     * 本实现按示例放在 query，与参数表存在冲突。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.removeTime 删除时间戳
     * @param params.id id
     * @returns 删除结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/xm
     */
    async remove(params: RemoveParams): Promise<RemoveResult> {
      return client.request<RemoveResult>({
        method: 'POST',
        path: '/accounting/document/integration/project/remove/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { removeTime: params.removeTime },
        body: { id: params.id },
      });
    },

    /**
     * 项目同步：好业财、好会计、易代账等接受第三方往来资金基础档案同步信息。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.items 项目列表
     * @param params.items[].id 关联项目分类
     * @param params.items[].statusEnum 状态，允许值: "A", "I"
     * @param params.items[].name 项目名称
     * @param params.items[].code 项目编码
     * @returns 同步结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/xm
     */
    async batchUpsert(params: BatchUpsertParams): Promise<BatchUpsertResult> {
      return client.request<BatchUpsertResult>({
        method: 'POST',
        path: '/accounting/document/integration/project/batchUpsert/{bookid}',
        pathParams: { bookid: params.bookid },
        body: params.items,
      });
    },

    /**
     * 查询项目。
     *
     * @param params 请求参数
     * @param params.bookid 账套ID
     * @param params.code 项目编码
     * @param params.name 项目名称
     * @param params.projectCategoryCode 项目分类编码
     * @param params.pageSize 每页数量（默认：20）
     * @param params.pageNo 当前页（默认：1）
     * @returns 项目分页结果，`rows` 为项目列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/xm
     */
    async query(params: QueryParams): Promise<QueryResult> {
      return client.request<QueryResult>({
        method: 'POST',
        path: '/accounting/document/open/project/query/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          code: params.code,
          name: params.name,
          projectCategoryCode: params.projectCategoryCode,
          pageSize: params.pageSize,
          pageNo: params.pageNo,
        },
      });
    },

    /**
     * 项目修改。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.id 项目id
     * @param params.code 项目编码
     * @param params.name 项目名称
     * @param params.statusEnum 启用状态 启用："A"，停用："I"
     * @param params.comments 备注
     * @param params.projectCategoryCode 项目分类编码
     * @param params.fromDate 计划开始日期
     * @param params.thruDate 计划结束日期
     * @param params.projectCycleDays 项目周期
     * @param params.amount 金额
     * @param params.departmentCode 部门编码
     * @param params.custVendorCode 客户编码
     * @param params.projectFinishedPct 项目整体完工比例
     * @param params.customizedFieldList 自定义项
     * @param params.customizedFieldList[].name 自定义项名称
     * @param params.customizedFieldList[].value 自定义项值
     * @returns 修改结果列表，每项包含错误信息、错误码与项目 id
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/xm
     */
    async update(params: UpdateParams): Promise<UpdateResult[]> {
      return client.request<UpdateResult[]>({
        method: 'POST',
        path: '/accounting/openapi/cc/project/update/{bookid}',
        pathParams: { bookid: params.bookid },
        body: {
          id: params.id,
          code: params.code,
          name: params.name,
          statusEnum: params.statusEnum,
          projectCategoryCode: params.projectCategoryCode,
          ...(params.comments !== undefined ? { comments: params.comments } : {}),
          ...(params.fromDate !== undefined ? { fromDate: params.fromDate } : {}),
          ...(params.thruDate !== undefined ? { thruDate: params.thruDate } : {}),
          ...(params.projectCycleDays !== undefined
            ? { projectCycleDays: params.projectCycleDays }
            : {}),
          ...(params.amount !== undefined ? { amount: params.amount } : {}),
          ...(params.departmentCode !== undefined ? { departmentCode: params.departmentCode } : {}),
          ...(params.custVendorCode !== undefined ? { custVendorCode: params.custVendorCode } : {}),
          ...(params.projectFinishedPct !== undefined
            ? { projectFinishedPct: params.projectFinishedPct }
            : {}),
          ...(params.customizedFieldList !== undefined
            ? { customizedFieldList: params.customizedFieldList }
            : {}),
        },
      });
    },
  };
}
