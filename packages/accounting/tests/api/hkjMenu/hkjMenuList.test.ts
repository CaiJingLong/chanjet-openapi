import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjMenuListApi } from '../../../src/api/hkjMenu/hkjMenuList.js';

function makeClient() {
  const request = vi.fn();
  return { request, client: { request } as unknown as ChanjetClient };
}

describe('createHkjMenuListApi', () => {
  it('getRouteNode 映射 path 占位', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue([]);
    const api = createHkjMenuListApi(client);

    await api.getRouteNode({ bookid: '90001' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/setup/menu/getRouteNode/{bookid}',
      pathParams: { bookid: '90001' },
    });
  });

  it('getMenu 映射 path 占位', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue([]);
    const api = createHkjMenuListApi(client);

    await api.getMenu({ bookid: '90001' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/setup/menu/getMenu/{bookid}',
      pathParams: { bookid: '90001' },
    });
  });

  it('传播 client.request 的异常（错误路径）', async () => {
    const { request, client } = makeClient();
    request.mockRejectedValue(new Error('auth error'));
    const api = createHkjMenuListApi(client);

    await expect(api.getRouteNode({ bookid: '1' })).rejects.toThrow('auth error');
  });
});
