import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import {
  createRkdApi,
  type StockInAddParams,
  type StockInListParams,
  type StockInRemoveParams,
  type StockInUpdateParams,
  type StockInV2AddParams,
} from '../../../src/api/hkjkchs/rkd.js';

function createMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createRkdApi', () => {
  it('listStockIn 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ currentPage: 1, rows: [] });
    const api = createRkdApi(client);

    const params: StockInListParams = { page: 1, pageSize: '20', voucherStatusEnum: 'EFFECTIVE' };
    await api.listStockIn('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/inv/stockin/list/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('updateStockIn 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 1 });
    const api = createRkdApi(client);

    const params: StockInUpdateParams = {
      id: 'v1',
      bizDate: '2022-12-19',
      code: 'IC-1',
      bizTypeId: '100203',
      warehouseCode: '01',
      detailList: [],
    };
    await api.updateStockIn('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/stock/update/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('addStockIn 映射 path/body，可选参数缺省', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 100 });
    const api = createRkdApi(client);

    const params: StockInAddParams = {
      bizDate: '2022-12-20',
      code: 'IC-1',
      bizTypeId: '100203',
      warehouseCode: '01',
      detailList: [],
    };
    await api.addStockIn('book-1', params);

    const body = request.mock.calls[0]![0].body as StockInAddParams;
    expect(body).toEqual(params);
    expect(body).not.toHaveProperty('projectCode');
    expect(request.mock.calls[0]![0].path).toBe('/accounting/openapi/cc/stock/add/{bookid}');
  });

  it('removeStockIn 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue([]);
    const api = createRkdApi(client);

    const params: StockInRemoveParams = { ids: ['a'] };
    await api.removeStockIn('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/stock/remove/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('addStockInV2 映射 path（含 inoutFlag 占位）与 body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 100 });
    const api = createRkdApi(client);

    const params: StockInV2AddParams = {
      bizDate: '2022-12-20',
      code: 'IC-1',
      bizTypeId: '100203',
      warehouseCode: '01',
      detailList: [],
    };
    await api.addStockInV2('in', 'book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/stock/{inoutFlag}/add/{bookid}',
      pathParams: { inoutFlag: 'in', bookid: 'book-1' },
      body: params,
    });
  });

  it('addStockInV2 网络错误向上抛', async () => {
    const { client, request } = createMockClient();
    request.mockRejectedValue(new Error('timeout'));
    const api = createRkdApi(client);

    await expect(
      api.addStockInV2('in', 'book-1', {
        bizDate: '2022-12-20',
        code: 'IC-1',
        bizTypeId: '100203',
        warehouseCode: '01',
        detailList: [],
      }),
    ).rejects.toThrow('timeout');
  });
});
