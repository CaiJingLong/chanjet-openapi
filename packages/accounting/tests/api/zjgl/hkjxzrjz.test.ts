import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '@chanjet-openapi/core';
import { createHkjxzrjzApi } from '../../../src/api/zjgl/hkjxzrjz.js';

function makeClient() {
  const request = vi.fn<(options: RequestOptions) => Promise<unknown>>();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createHkjxzrjzApi', () => {
  it('映射路径参数与请求体', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue(1503375158542336);
    const api = createHkjxzrjzApi(client);

    await api.addCashJournal({
      bookid: 'bk1',
      receiptAmount: '99999',
      comments: '10000',
      bizDate: '2021-07-09',
      couterpartyAccountName: '零散客户',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/acctgplt/CashJournal/outside/addCashJournal/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: {
        receiptAmount: '99999',
        comments: '10000',
        bizDate: '2021-07-09',
        couterpartyAccountName: '零散客户',
      },
    });
  });

  it('可选参数缺省时不写入请求体', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue(1);
    const api = createHkjxzrjzApi(client);

    await api.addCashJournal({ bookid: 'bk1' });

    const body = request.mock.calls[0]![0].body as Record<string, unknown>;
    expect(body.finAccountId).toBeUndefined();
    expect(body.glAccountId).toBeUndefined();
    expect(body).toEqual({});
  });

  it('错误路径：request 拒绝时向外抛错', async () => {
    const { client, request } = makeClient();
    request.mockRejectedValue(new Error('boom'));
    const api = createHkjxzrjzApi(client);

    await expect(api.addCashJournal({ bookid: 'bk1' })).rejects.toThrow('boom');
  });
});
