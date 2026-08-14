/**
 * 来源: https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/bm-yg
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/jcda/bm-yg.md
 */
import type { ChanjetClient } from '../../client.js';

/** 同步结果映射：键为第三方同步 id，值为系统生成的 id 或错误信息 */
type SyncResultMap = Record<string, string | number>;

/**
 * 同步部门请求参数。
 */
export interface SyncDepartmentParams {
  /** 账套id */
  bookid: string;
  /** 部门列表 */
  items: SyncDepartmentParamsItem[];
}

/**
 * 同步部门请求体条目。
 */
export interface SyncDepartmentParamsItem {
  /** 部门编码 */
  code: string;
  /** 部门名称 */
  name: string;
  /** 部门id */
  id: number;
  /** 状态 I: 无效, A: 有效 */
  statusEnum: string;
}

/**
 * 同步部门返回结果。
 */
export interface SyncDepartmentResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 同步删除部门请求参数。
 */
export interface RemoveDepartmentParams {
  /** 账套id */
  bookid: string;
  /** 删除时间 */
  removeTime: string;
  /** 部门ID */
  id: number;
}

/**
 * 同步删除部门返回结果。
 */
export interface RemoveDepartmentResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 查询所有部门请求参数。
 */
export interface QueryDepartmentParams {
  /** 账套id */
  bookid: string;
}

/**
 * 查询所有部门返回结果条目。
 */
export interface QueryDepartmentResult {
  /** 部门Id */
  id?: number;
  /** 部门编码 */
  code?: string;
  /** 部门名称 */
  name?: string;
  /** 部门描述 */
  description?: string;
  /** 部门状态 A：启用 I：停用 */
  statusEnum?: string;
  /** 是否叶子节点 */
  isLeafNode?: boolean;
  /** 上级部门Id */
  parentId?: number;
}

/**
 * 同步员工请求参数。
 */
export interface SyncEmployeeParams {
  /** 账套id */
  bookid: string;
  /** 员工列表 */
  items: SyncEmployeeParamsItem[];
}

/**
 * 同步员工请求体条目。
 */
export interface SyncEmployeeParamsItem {
  /** 员工编码 */
  empCode: string;
  /** 员工名称 */
  name: string;
  /** 员工id */
  id: number;
  /** 状态 I: 无效, A: 有效 */
  statusEnum: string;
  /** 手机号 */
  mobile: string;
  /** 证照类型 SSN-居民身份证、ARMY_OFFICER-军官证、SOLDIER-士兵证、PASSPORT-中国护照、ARMED_POLICE-武警警官证 */
  identificationTypeEnum: string;
  /** 证照号码 */
  identificationNo: string;
  /** 所属部门 */
  departmentId: number;
}

/**
 * 同步员工返回结果。
 */
export interface SyncEmployeeResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 同步删除员工请求参数。
 */
export interface RemoveEmployeeParams {
  /** 账套id */
  bookid: string;
  /** 删除时间 */
  removeTime: string;
  /** 员工ID */
  id: number;
}

/**
 * 同步删除员工返回结果。
 */
export interface RemoveEmployeeResult {
  /** 同步成功的结果 */
  successResultMap?: SyncResultMap;
  /** 同步失败的结果 */
  failResultMap?: SyncResultMap;
}

/**
 * 查询所有员工请求参数。
 */
export interface QueryEmployeeParams {
  /** 账套id */
  bookid: string;
}

/**
 * 查询所有员工返回结果条目。
 */
export interface QueryEmployeeResult {
  /** 员工Id */
  id?: number;
  /** 员工编码 */
  empCode?: string;
  /** 员工名称 */
  name?: string;
  /** 所属部门Id */
  departmentId?: number;
  /** 职务 */
  position?: string;
  /** 手机号 */
  mobile?: string;
  /** 邮箱 */
  email?: string;
  /** 是否启用 */
  isActive?: boolean;
  /** 是否部门负责人 */
  isDeptAdmin?: boolean;
  /** CIA用户Id */
  userId?: number;
}

/**
 * （外部接口）批量同步员工请求参数。
 */
export interface BatchUpsertEmployeeParams {
  /** 账套id */
  bookid: string;
  /** 员工列表 */
  items: BatchUpsertEmployeeParamsItem[];
}

/**
 * （外部接口）批量同步员工请求体条目。
 */
export interface BatchUpsertEmployeeParamsItem {
  /** 员工编码 */
  empCode: string;
  /** 员工名称 */
  name: string;
  /** 员工id */
  id: number;
  /** 状态 I: 无效, A: 有效 */
  statusEnum: string;
  /** 手机号 */
  mobile: string;
  /** 证照类型 SSN-居民身份证、ARMY_OFFICER-军官证、SOLDIER-士兵证、PASSPORT-中国护照、ARMED_POLICE-武警警官证 */
  identificationTypeEnum: string;
  /** 证照号码 */
  identificationNo: string;
  /** 所属部门id */
  departmentId: number;
  /** 入职时间 */
  employtime: string;
  /** 离职时间 */
  leavetime: string;
}

/**
 * （外部接口）批量同步员工返回结果。
 */
export interface BatchUpsertEmployeeResult {
  /** 失败返回的结果 */
  failResultMap?: SyncResultMap;
  /** 成功返回的结果 */
  successResultMap?: SyncResultMap;
}

/**
 * （外部接口）精确查询部门请求参数。
 */
export interface GetDepartmentParams {
  /** 账套id */
  bookid: string;
  /** 部门编码 */
  code: string;
}

/**
 * （外部接口）精确查询部门返回结果条目。
 */
export interface GetDepartmentResult {
  /** 部门Id */
  id?: number;
  /** 部门编码 */
  code: string;
  /** 部门名称 */
  name: string;
  /** 部门描述 */
  description?: string;
  /** 部门状态 A：启用 I：停用 */
  statusEnum: string;
  /** 是否叶子节点 */
  isLeafNode: boolean;
  /** 上级部门Id */
  parentId?: number;
}

/**
 * （外部接口）精确查询员工请求参数。
 */
export interface GetEmployeeParams {
  /** 账套id */
  bookid: string;
  /** 员工编码 */
  code: string;
}

/**
 * （外部接口）精确查询员工返回结果条目。
 */
export interface GetEmployeeResult {
  /** 员工Id */
  id?: number;
  /** 员工编码 */
  empCode?: string;
  /** 员工名称 */
  name?: string;
  /** 所属部门Id */
  departmentId?: number;
  /** 职务 */
  position?: string;
  /** 手机号 */
  mobile?: string;
  /** 邮箱 */
  email?: string;
  /** 是否启用 */
  isActive?: boolean;
  /** 是否部门负责人 */
  isDeptAdmin?: boolean;
  /** CIA用户Id */
  userId?: number;
  /** 证照类型 SSN-居民身份证、ARMY_OFFICER-军官证、SOLDIER-士兵证、PASSPORT-中国护照、ARMED_POLICE-武警警官证 */
  identificationTypeEnum?: string;
  /** 证照号码 */
  identificationNo?: string;
  /** 入职时间 */
  employtime?: string;
  /** 离职时间 */
  leavetime?: string;
}

/**
 * 部门与员工基础档案模块。
 */
export function createBmYgApi(client: ChanjetClient) {
  return {
    /**
     * 同步部门。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.items 部门列表
     * @param params.items[].code 部门编码
     * @param params.items[].name 部门名称
     * @param params.items[].id 部门id
     * @param params.items[].statusEnum 状态 I: 无效, A: 有效
     * @returns 同步结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/bm-yg
     */
    async syncDepartment(params: SyncDepartmentParams): Promise<SyncDepartmentResult> {
      return client.request<SyncDepartmentResult>({
        method: 'POST',
        path: '/accounting/document/integration/department/batchUpsert/{bookid}',
        pathParams: { bookid: params.bookid },
        body: params.items,
      });
    },

    /**
     * 同步删除部门。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.removeTime 删除时间
     * @param params.id 部门ID
     * @returns 删除结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/bm-yg
     */
    async removeDepartment(params: RemoveDepartmentParams): Promise<RemoveDepartmentResult> {
      return client.request<RemoveDepartmentResult>({
        method: 'POST',
        path: '/accounting/document/integration/department/remove/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { removeTime: params.removeTime },
        body: { id: params.id },
      });
    },

    /**
     * 查询所有部门：获取所有部门，返回部门列表。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @returns 部门列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/bm-yg
     */
    async queryDepartment(params: QueryDepartmentParams): Promise<QueryDepartmentResult[]> {
      return client.request<QueryDepartmentResult[]>({
        method: 'POST',
        path: '/accounting/document/open/department/query/{bookid}',
        pathParams: { bookid: params.bookid },
      });
    },

    /**
     * 同步员工。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.items 员工列表
     * @param params.items[].empCode 员工编码
     * @param params.items[].name 员工名称
     * @param params.items[].id 员工id
     * @param params.items[].statusEnum 状态 I: 无效, A: 有效
     * @param params.items[].mobile 手机号
     * @param params.items[].identificationTypeEnum 证照类型
     * @param params.items[].identificationNo 证照号码
     * @param params.items[].departmentId 所属部门
     * @returns 同步结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/bm-yg
     */
    async syncEmployee(params: SyncEmployeeParams): Promise<SyncEmployeeResult> {
      return client.request<SyncEmployeeResult>({
        method: 'POST',
        path: '/accounting/document/integration/employee/batchUpsert/{bookid}',
        pathParams: { bookid: params.bookid },
        body: params.items,
      });
    },

    /**
     * 同步删除员工。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.removeTime 删除时间
     * @param params.id 员工ID
     * @returns 删除结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/bm-yg
     */
    async removeEmployee(params: RemoveEmployeeParams): Promise<RemoveEmployeeResult> {
      return client.request<RemoveEmployeeResult>({
        method: 'POST',
        path: '/accounting/document/integration/employee/remove/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { removeTime: params.removeTime },
        body: { id: params.id },
      });
    },

    /**
     * 查询所有员工：查询员工接口，返回所有员工。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @returns 员工列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/bm-yg
     */
    async queryEmployee(params: QueryEmployeeParams): Promise<QueryEmployeeResult[]> {
      return client.request<QueryEmployeeResult[]>({
        method: 'POST',
        path: '/accounting/document/open/employee/query/{bookid}',
        pathParams: { bookid: params.bookid },
      });
    },

    /**
     * （外部接口）批量同步员工。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.items 员工列表
     * @param params.items[].empCode 员工编码
     * @param params.items[].name 员工名称
     * @param params.items[].id 员工id
     * @param params.items[].statusEnum 状态 I: 无效, A: 有效
     * @param params.items[].mobile 手机号
     * @param params.items[].identificationTypeEnum 证照类型
     * @param params.items[].identificationNo 证照号码
     * @param params.items[].departmentId 所属部门id
     * @param params.items[].employtime 入职时间
     * @param params.items[].leavetime 离职时间
     * @returns 同步结果，`successResultMap` 为成功结果、`failResultMap` 为失败结果
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/bm-yg
     */
    async batchUpsertEmployee(
      params: BatchUpsertEmployeeParams,
    ): Promise<BatchUpsertEmployeeResult> {
      return client.request<BatchUpsertEmployeeResult>({
        method: 'POST',
        path: '/accounting/doc/account/outside/batchUpsertEmployee/{bookid}',
        pathParams: { bookid: params.bookid },
        body: params.items,
      });
    },

    /**
     * （外部接口）精确查询部门。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.code 部门编码
     * @returns 部门列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/bm-yg
     */
    async getDepartment(params: GetDepartmentParams): Promise<GetDepartmentResult[]> {
      return client.request<GetDepartmentResult[]>({
        method: 'POST',
        path: '/accounting/doc/account/outside/getDepartment/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { code: params.code },
      });
    },

    /**
     * （外部接口）精确查询员工。
     *
     * @param params 请求参数
     * @param params.bookid 账套id
     * @param params.code 员工编码
     * @returns 员工列表
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://openapi.chanjet.com/md/docs/file/apiFile/accounting/jcda/bm-yg
     */
    async getEmployee(params: GetEmployeeParams): Promise<GetEmployeeResult[]> {
      return client.request<GetEmployeeResult[]>({
        method: 'POST',
        path: '/accounting/doc/account/outside/getEmployee/{bookid}',
        pathParams: { bookid: params.bookid },
        body: { code: params.code },
      });
    },
  };
}
