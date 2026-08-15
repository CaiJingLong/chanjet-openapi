import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import {
  createCkdApi,
  type StockOutAddParams,
  type StockOutListParams,
  type StockOutRemoveParams,
  type StockOutUpdateParams,
  type StockOutV2AddParams,
} from '../../../src/api/hkjkchs/ckd.js';

function createMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createCkdApi', () => {
  it('listStockOut 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ currentPage: 1, rows: [] });
    const api = createCkdApi(client);

    const params: StockOutListParams = { page: 1, pageSize: '20' };
    await api.listStockOut('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/inv/stockout/list/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('updateStockOut 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 1 });
    const api = createCkdApi(client);

    const params: StockOutUpdateParams = {
      id: 'v1',
      bizDate: '2022-12-19',
      code: 'IC-1',
      bizTypeId: '100213',
      warehouseCode: '01',
      detailList: [],
    };
    await api.updateStockOut('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/stock/update/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('addStockOut 映射 path（含文档末尾斜杠）与 body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 100 });
    const api = createCkdApi(client);

    const params: StockOutAddParams = {
      bizDate: '2022-12-20',
      code: 'IC-1',
      bizTypeId: '100213',
      warehouseCode: '01',
      detailList: [],
    };
    await api.addStockOut('book-1', params);

    expect(request.mock.calls[0]![0].path).toBe('/accounting/openapi/cc/stock/add/{bookid}/');
    expect(request.mock.calls[0]![0].pathParams).toEqual({ bookid: 'book-1' });
    expect(request.mock.calls[0]![0].body).toEqual(params);
  });

  it('removeStockOut 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue([]);
    const api = createCkdApi(client);

    const params: StockOutRemoveParams = { ids: ['a'] };
    await api.removeStockOut('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/stock/remove/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('addStockOutV2 映射 path（含 inoutFlag 占位）与 body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 100 });
    const api = createCkdApi(client);

    const params: StockOutV2AddParams = {
      bizDate: '2022-12-20',
      code: 'IC-1',
      bizTypeId: '100213',
      warehouseCode: '01',
      detailList: [],
    };
    await api.addStockOutV2('out', 'book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/stock/{inoutFlag}/add/{bookid}',
      pathParams: { inoutFlag: 'out', bookid: 'book-1' },
      body: params,
    });
  });

  it('addStockOutV2 网络错误向上抛', async () => {
    const { client, request } = createMockClient();
    request.mockRejectedValue(new Error('timeout'));
    const api = createCkdApi(client);

    await expect(
      api.addStockOutV2('out', 'book-1', {
        bizDate: '2022-12-20',
        code: 'IC-1',
        bizTypeId: '100213',
        warehouseCode: '01',
        detailList: [],
      }),
    ).rejects.toThrow('timeout');
  });
});
