import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import {
  createDbdApi,
  type StockTransferAddParams,
  type StockTransferListParams,
  type StockTransferRemoveParams,
  type StockTransferUpdateParams,
} from '../../../src/api/hkjkchs/dbd.js';

function createMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createDbdApi', () => {
  it('listStockTransfer 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ currentPage: 1, rows: [] });
    const api = createDbdApi(client);

    const params: StockTransferListParams = { page: 1, pageSize: '20', redBlueFlagEnum: 'BLUE' };
    await api.listStockTransfer('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/inv/stocktransfer/list/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('updateStockTransfer 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 1 });
    const api = createDbdApi(client);

    const params: StockTransferUpdateParams = {
      id: 'v1',
      bizDate: '2022-12-06',
      code: 'AL-1',
      bizTypeId: '100221',
      warehouseCode: '01',
      toWarehouseCode: 'DEFAULT',
      detailList: [],
    };
    await api.updateStockTransfer('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/stocktransfer/update/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('queryStockTransfer 映射 GET path（code + bookid 占位）', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 1, code: 'AL-1' });
    const api = createDbdApi(client);

    await api.queryStockTransfer('AL-1', 'book-1');

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/openapi/cc/stocktransfer/query/{code}/{bookid}',
      pathParams: { code: 'AL-1', bookid: 'book-1' },
    });
  });

  it('addStockTransfer 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 100 });
    const api = createDbdApi(client);

    const params: StockTransferAddParams = {
      bizDate: '2022-12-06',
      code: 'AL-1',
      bizTypeId: '100221',
      warehouseCode: '01',
      toWarehouseCode: 'DEFAULT',
      detailList: [],
    };
    await api.addStockTransfer('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/stocktransfer/add/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('removeStockTransfer 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue([]);
    const api = createDbdApi(client);

    const params: StockTransferRemoveParams = { ids: ['a'] };
    await api.removeStockTransfer('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/stocktransfer/remove/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('queryStockTransfer 业务错误向上抛', async () => {
    const { client, request } = createMockClient();
    request.mockRejectedValue(new Error('pub.e1002'));
    const api = createDbdApi(client);

    await expect(api.queryStockTransfer('AL-1', 'book-1')).rejects.toThrow('pub.e1002');
  });
});
