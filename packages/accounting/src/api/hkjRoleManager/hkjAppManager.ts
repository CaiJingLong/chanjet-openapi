/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjRoleManager/hkjAppManager
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjRoleManager/hkjAppManager.md
 */
import type { ChanjetClient } from '../../client.js';
/**
 * 错误码说明：本文档 7 个接口（应用管理员交接、获取账套的角色列表、给用户授权角色接口、
 * 获取所有账套用户角色关系列表、解绑用户的角色、获取好会计应用管理员列表、
 * 通过角色枚举获取拥有该角色的用户列表）的"错误码说明"表均为空（-），
 * 无官方业务错误码可收录，故本文件不定义错误码常量。
 */

/** 应用管理员交接请求参数。 */
export interface TransferAdminParams {
  /** 交接前管理员id，路径参数，必填 */
  userId: string;
  /** 交接后管理员id，查询参数，必填 */
  nextUserId: string;
}

/** 获取账套的角色列表请求参数。 */
export interface FindByTenantIdParams {
  /** 授权角色所在账套id，查询参数，必填 */
  tenantId: number;
}

/** 账套角色。 */
export interface FindByTenantIdResult {
  /** 角色id */
  id?: number;
  /** 角色名称 */
  name?: string;
  /** 角色描述 */
  description?: string;
  /** 应用id */
  appId?: number;
  /** 角色类型 */
  roleTypeEnum?: string;
  /** 企业id */
  enterpriseId?: number;
}

/** 给用户授权角色接口请求参数。 */
export interface AddUserRoleParams {
  /** 授权的用户角色信息（JSON 字符串，内含 roleId/tenantId/userIds/roleTypeEnum 等），请求体，必填 */
  roleJson: string;
}

/** 账套下单个用户的角色关系。 */
export interface FindTenantUserRoleListUserRole {
  roleTypeEnum?: string;
  roleId?: number;
  mobile?: string;
  roleName?: string;
  userName?: string;
  userId?: number;
  email?: string;
}

/** 单个账套的用户角色关系。 */
export interface FindTenantUserRoleListResult {
  tenantName?: string;
  tenantId?: number;
  userRoleList?: FindTenantUserRoleListUserRole[];
}

/** 解绑用户的角色请求参数。 */
export interface DeleteUserRoleParams {
  /** 要解绑的用户角色信息（JSON 字符串，内含 roleId/tenantId/userId 等），请求体，必填 */
  roleJson: string;
}

/** 获取好会计应用管理员列表请求参数。 */
export interface AdminListParams {
  /** 账套ID，路径参数，必填 */
  bookid: number;
}

/** 好会计应用管理员。 */
export interface AdminListResult {
  /** 用户ID */
  id?: number;
  /** 用户名称 */
  name?: string;
  /** 手机号 */
  mobile?: string;
  /** 邮箱 */
  email?: string;
}

/** 通过角色枚举获取拥有该角色的用户列表请求参数。 */
export interface FindByRoleTypeParams {
  /** 账套ID，路径参数，必填 */
  bookid: number;
  /** 角色枚举，包括：ACCOUNTING_SUPERVISOR=会计主管；ACCOUNTANT=会计，查询参数，必填 */
  roleTypeEnum: string;
}

/** 拥有指定角色的用户。 */
export interface FindByRoleTypeResult {
  /** 用户ID */
  id?: number;
  /** 用户名称 */
  name?: string;
  /** 用户手机号 */
  mobile?: string;
}

export function createHkjAppManagerApi(client: ChanjetClient) {
  return {
    /**
     * 应用管理员交接。
     *
     * @param params 请求参数
     * @param params.userId 交接前管理员id，路径参数，必填
     * @param params.nextUserId 交接后管理员id，查询参数，必填
     * @returns 成功无返回
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjRoleManager/hkjAppManager
     */
    transferAdmin(params: TransferAdminParams): Promise<void> {
      return client.request<void>({
        method: 'PUT',
        path: '/accounting/app/role/transferadmin/{userId}',
        pathParams: { userId: params.userId },
        query: { nextUserId: params.nextUserId },
      });
    },

    /**
     * 获取账套的角色列表。
     *
     * @param params 请求参数
     * @param params.tenantId 授权角色所在账套id，查询参数，必填
     * @returns 角色数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjRoleManager/hkjAppManager
     */
    findByTenantId(params: FindByTenantIdParams): Promise<FindByTenantIdResult[]> {
      return client.request<FindByTenantIdResult[]>({
        method: 'GET',
        path: '/accounting/author/role/findByTenantId',
        query: { tenantId: params.tenantId },
      });
    },

    /**
     * 给用户授权角色接口。
     *
     * @param params 请求参数
     * @param params.roleJson 授权的用户角色信息（JSON 字符串），请求体，必填
     * @returns 成功无返回
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjRoleManager/hkjAppManager
     */
    addUserRole(params: AddUserRoleParams): Promise<void> {
      return client.request<void>({
        method: 'POST',
        path: '/accounting/author/role/addUserRole',
        body: { roleJson: params.roleJson },
      });
    },

    /**
     * 获取所有账套用户角色关系列表。
     *
     * @returns 各账套的用户角色关系数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjRoleManager/hkjAppManager
     */
    findTenantUserRoleList(): Promise<FindTenantUserRoleListResult[]> {
      return client.request<FindTenantUserRoleListResult[]>({
        method: 'GET',
        path: '/accounting/author/role/findTenantUserRoleList',
      });
    },

    /**
     * 解绑用户的角色。
     *
     * @param params 请求参数
     * @param params.roleJson 要解绑的用户角色信息（JSON 字符串），请求体，必填
     * @returns 成功无返回
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjRoleManager/hkjAppManager
     */
    deleteUserRole(params: DeleteUserRoleParams): Promise<void> {
      return client.request<void>({
        method: 'DELETE',
        path: '/accounting/author/role/deleteUserRole',
        body: { roleJson: params.roleJson },
      });
    },

    /**
     * 获取好会计应用管理员列表。
     *
     * @param params 请求参数
     * @param params.bookid 账套ID，路径参数，必填
     * @returns 应用管理员数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjRoleManager/hkjAppManager
     */
    adminList(params: AdminListParams): Promise<AdminListResult[]> {
      return client.request<AdminListResult[]>({
        method: 'GET',
        path: '/accounting/setup/user/adminList/{bookid}',
        pathParams: { bookid: params.bookid },
      });
    },

    /**
     * 通过角色枚举获取拥有该角色的用户列表。
     *
     * @param params 请求参数
     * @param params.bookid 账套ID，路径参数，必填
     * @param params.roleTypeEnum 角色枚举（ACCOUNTING_SUPERVISOR=会计主管；ACCOUNTANT=会计），查询参数，必填
     * @returns 拥有该角色的用户数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjRoleManager/hkjAppManager
     */
    findByRoleType(params: FindByRoleTypeParams): Promise<FindByRoleTypeResult[]> {
      return client.request<FindByRoleTypeResult[]>({
        method: 'GET',
        path: '/accounting/openapi/role/findByRoleType/{bookid}',
        pathParams: { bookid: params.bookid },
        query: { roleTypeEnum: params.roleTypeEnum },
      });
    },
  };
}
