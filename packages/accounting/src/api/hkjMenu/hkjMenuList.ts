/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjMenu/hkjMenuList
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/hkjMenu/hkjMenuList.md
 */
import type { ChanjetClient } from '@chanjet-openapi/core';
/**
 * 错误码说明：本文档两个接口（查询菜单列表、菜单查询）的"错误码说明"表均为空（-），
 * 无官方业务错误码可收录，故本文件不定义错误码常量。
 */

/** 查询菜单列表请求参数。 */
export interface GetRouteNodeParams {
  /** 账套id，路径参数（文档未单列路径参数表，由请求地址 {bookid} 推断），必填 */
  bookid: string;
}

/**
 * 查询菜单列表返回的单个路由节点。
 * 文档未提供输出参数表，字段由"响应示例"推导。
 */
export interface GetRouteNodeResult {
  lastUpdatedStamp?: number;
  openMulti?: boolean;
  createdUserId?: number;
  createdStamp?: number;
  routeParams?: Record<string, unknown>;
  closePrompt?: boolean;
  closeable?: boolean;
  lastUpdatedUserId?: number;
  path?: string;
  routeId?: string;
  isLocked?: boolean;
  name?: string;
  resourceAuth?: string;
  tenantId?: number;
  versionNo?: number;
  leavePrompt?: boolean;
  id?: number;
  activePrompt?: boolean;
  openTypeEnum?: string;
}

/** 菜单查询请求参数。 */
export interface GetMenuParams {
  /** 账套id，路径参数（文档未单列路径参数表，由请求地址 {bookid} 推断），必填 */
  bookid: string;
}

/** 菜单查询返回的单个菜单节点。 */
export interface GetMenuResult {
  /** 菜单节点 */
  menuNodeId?: number;
  /** 菜单节点类型：side-group, side-item, column-group, row-group, row-item, row-split-line */
  menuNodeType?: string;
  /** 显示名称 */
  displayName?: string;
  /** 别名，用于展示单据和历史的名称 */
  aliasName?: string;
  /** 左侧菜单树 */
  parentId?: string;
  routeId?: string;
  /** 文档表格标注 string 类型；响应示例中为递归菜单数组，属文档歧义，按表格原文标注 string */
  items?: string;
  /** 参数 */
  routeParams?: string;
  /** 路径 */
  path?: string;
  /** 认证 */
  auth?: string;
  /** 图标 */
  icon?: string;
  /** 修饰 */
  decoration?: Record<string, unknown>;
  /** 参数 */
  menuNodeParams?: Record<string, unknown>;
  /** 无权限标识:标记采购订单+历史这种特殊场景,无权限,前端置灰 */
  hasNoAuth?: boolean;
  /** 是否修改隐藏属性 */
  isModifyHidden?: boolean;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 前一个菜单id */
  referMenuId?: number;
  /** 参照菜单的位置，next-下面,prev-上面 */
  position?: string;
  /** 是否用户自定义 */
  isUserDefine?: boolean;
  /** 第二序列数字 */
  secondSequenceNum?: string;
  /** 一级菜单节点类型 */
  parentMenuNodeType?: string;
  /** 允许修改 */
  isAllowedModify?: boolean;
}

export function createHkjMenuListApi(client: ChanjetClient) {
  return {
    /**
     * 查询菜单列表。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @returns 路由节点数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjMenu/hkjMenuList
     */
    getRouteNode(params: GetRouteNodeParams): Promise<GetRouteNodeResult[]> {
      return client.request<GetRouteNodeResult[]>({
        method: 'GET',
        path: '/accounting/setup/menu/getRouteNode/{bookid}',
        pathParams: { bookid: params.bookid },
      });
    },

    /**
     * 菜单查询。
     *
     * @param params 请求参数
     * @param params.bookid 账套id，路径参数，必填
     * @returns 菜单节点数组
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/hkjMenu/hkjMenuList
     */
    getMenu(params: GetMenuParams): Promise<GetMenuResult[]> {
      return client.request<GetMenuResult[]>({
        method: 'GET',
        path: '/accounting/setup/menu/getMenu/{bookid}',
        pathParams: { bookid: params.bookid },
      });
    },
  };
}
