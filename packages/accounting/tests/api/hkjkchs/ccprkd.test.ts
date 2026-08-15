import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import {
  createCcprkdApi,
  type FinishedGoodsStockAddParams,
  type FinishedGoodsStockListParams,
  type FinishedGoodsStockRemoveParams,
  type FinishedGoodsStockUpdateParams,
} from '../../../src/api/hkjkchs/ccprkd.js';

function createMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createCcprkdApi', () => {
  it('listFinishedGoodsStock 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ currentPage: 1, rows: [] });
    const api = createCcprkdApi(client);

    const params: FinishedGoodsStockListParams = {
      page: 1,
      pageSize: '20',
      startDate: '2022-12-01',
      voucherCode: 'MC-1',
    };
    await api.listFinishedGoodsStock('book-1', params);

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/inv/finishedgoodsstock/list/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('listFinishedGoodsStock 可选参数缺省不序列化', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ rows: [] });
    const api = createCcprkdApi(client);

    await api.listFinishedGoodsStock('book-1', { page: 1, pageSize: '20' });

    const body = request.mock.calls[0]![0].body as FinishedGoodsStockListParams;
    expect(body).toEqual({ page: 1, pageSize: '20' });
    expect(body).not.toHaveProperty('startDate');
  });

  it('listFinishedGoodsStock 网络错误向上抛', async () => {
    const { client, request } = createMockClient();
    request.mockRejectedValue(new Error('network down'));
    const api = createCcprkdApi(client);

    await expect(api.listFinishedGoodsStock('book-1', { page: 1, pageSize: '20' })).rejects.toThrow(
      'network down',
    );
  });

  it('updateFinishedGoodsStock 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 1 });
    const api = createCcprkdApi(client);

    const params: FinishedGoodsStockUpdateParams = {
      id: 'v1',
      bizDate: '2022-12-12',
      code: 'PS-1',
      warehouseCode: '01',
      detailList: [],
    };
    await api.updateFinishedGoodsStock('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/finishedgoodsstock/update/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('addFinishedGoodsStock 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 100 });
    const api = createCcprkdApi(client);

    const params: FinishedGoodsStockAddParams = {
      bizDate: '2022-12-12',
      code: 'PS-1',
      warehouseCode: '01',
      detailList: [],
    };
    await api.addFinishedGoodsStock('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/finishedgoodsstock/add/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('removeFinishedGoodsStock 映射 path/body，返回删除失败项数组', async () => {
    const { client, request } = createMockClient();
    const result = [{ code: '1', errorCode: 'pub.e1002', msg: '记录不存在' }];
    request.mockResolvedValue(result);
    const api = createCcprkdApi(client);

    const params: FinishedGoodsStockRemoveParams = { ids: ['a', 'b'] };
    const res = await api.removeFinishedGoodsStock('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/finishedgoodsstock/remove/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
    expect(res).toEqual(result);
  });

  it('removeFinishedGoodsStock 业务错误向上抛', async () => {
    const { client, request } = createMockClient();
    const err = new Error('pub.e1002');
    request.mockRejectedValue(err);
    const api = createCcprkdApi(client);

    await expect(api.removeFinishedGoodsStock('book-1', { ids: ['a'] })).rejects.toThrow(
      'pub.e1002',
    );
  });
});
