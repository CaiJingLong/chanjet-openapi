import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import {
  createClckdApi,
  type MaterialStockAddParams,
  type MaterialStockListParams,
  type MaterialStockRemoveParams,
  type MaterialStockUpdateParams,
} from '../../../src/api/hkjkchs/clckd.js';

function createMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createClckdApi', () => {
  it('listMaterialStock 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ currentPage: 1, rows: [] });
    const api = createClckdApi(client);

    const params: MaterialStockListParams = { page: 1, pageSize: '20' };
    await api.listMaterialStock('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/inv/materialstock/list/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('addMaterialStock 映射 path/body，bizTypeId 默认直接领料可选', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 100 });
    const api = createClckdApi(client);

    const params: MaterialStockAddParams = {
      bizDate: '2022-12-01',
      code: 'PS-1',
      detailList: [],
    };
    await api.addMaterialStock('book-1', params);

    const body = request.mock.calls[0]![0].body as MaterialStockAddParams;
    expect(body).toEqual(params);
    expect(body).not.toHaveProperty('bizTypeId');
    expect(request.mock.calls[0]![0].path).toBe(
      '/accounting/openapi/cc/materialstock/add/{bookid}',
    );
  });

  it('removeMaterialStock 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue([]);
    const api = createClckdApi(client);

    const params: MaterialStockRemoveParams = { ids: ['a'] };
    await api.removeMaterialStock('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/materialstock/remove/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('updateMaterialStock 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({});
    const api = createClckdApi(client);

    const params: MaterialStockUpdateParams = {
      id: 'v1',
      bizDate: '2022-12-01',
      code: 'PS-1',
      detailList: [],
    };
    await api.updateMaterialStock('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/materialstock/update/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('updateMaterialStock 业务错误向上抛', async () => {
    const { client, request } = createMockClient();
    request.mockRejectedValue(new Error('pub.e1002'));
    const api = createClckdApi(client);

    await expect(
      api.updateMaterialStock('book-1', {
        id: 'v1',
        bizDate: '2022-12-01',
        code: 'PS-1',
        detailList: [],
      }),
    ).rejects.toThrow('pub.e1002');
  });
});
