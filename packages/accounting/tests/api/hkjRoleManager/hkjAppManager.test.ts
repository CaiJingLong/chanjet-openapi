import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjAppManagerApi } from '../../../src/api/hkjRoleManager/hkjAppManager.js';

function makeClient() {
  const request = vi.fn();
  return { request, client: { request } as unknown as ChanjetClient };
}

describe('createHkjAppManagerApi', () => {
  it('transferAdmin 映射 path/query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createHkjAppManagerApi(client);

    await api.transferAdmin({ userId: '100', nextUserId: '200' });

    expect(request).toHaveBeenCalledWith({
      method: 'PUT',
      path: '/accounting/app/role/transferadmin/{userId}',
      pathParams: { userId: '100' },
      query: { nextUserId: '200' },
    });
  });

  it('findByTenantId 映射 query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue([]);
    const api = createHkjAppManagerApi(client);

    await api.findByTenantId({ tenantId: 123 });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/author/role/findByTenantId',
      query: { tenantId: 123 },
    });
  });

  it('addUserRole 映射 body', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createHkjAppManagerApi(client);

    await api.addUserRole({ roleJson: '{"roleId":1}' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/author/role/addUserRole',
      body: { roleJson: '{"roleId":1}' },
    });
  });

  it('findTenantUserRoleList 无参数', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue([]);
    const api = createHkjAppManagerApi(client);

    await api.findTenantUserRoleList();

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/author/role/findTenantUserRoleList',
    });
  });

  it('deleteUserRole 映射 body', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createHkjAppManagerApi(client);

    await api.deleteUserRole({ roleJson: '{"userId":1}' });

    expect(request).toHaveBeenCalledWith({
      method: 'DELETE',
      path: '/accounting/author/role/deleteUserRole',
      body: { roleJson: '{"userId":1}' },
    });
  });

  it('adminList 映射 path', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue([]);
    const api = createHkjAppManagerApi(client);

    await api.adminList({ bookid: 90001 });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/setup/user/adminList/{bookid}',
      pathParams: { bookid: 90001 },
    });
  });

  it('findByRoleType 映射 path/query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue([]);
    const api = createHkjAppManagerApi(client);

    await api.findByRoleType({ bookid: 90001, roleTypeEnum: 'ACCOUNTANT' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/openapi/role/findByRoleType/{bookid}',
      pathParams: { bookid: 90001 },
      query: { roleTypeEnum: 'ACCOUNTANT' },
    });
  });

  it('传播 client.request 的异常（错误路径）', async () => {
    const { request, client } = makeClient();
    request.mockRejectedValue(new Error('forbidden'));
    const api = createHkjAppManagerApi(client);

    await expect(api.adminList({ bookid: 1 })).rejects.toThrow('forbidden');
  });
});
