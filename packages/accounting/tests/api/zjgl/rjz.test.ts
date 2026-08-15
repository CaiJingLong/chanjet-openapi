import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '@chanjet-openapi/core';
import { createRjzApi } from '../../../src/api/zjgl/rjz.js';

function makeClient() {
  const request = vi.fn<(options: RequestOptions) => Promise<unknown>>();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createRjzApi.list', () => {
  it('映射路径参数与查询参数', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ item: [] });
    const api = createRjzApi(client);

    await api.list({ bookid: 'bk1', period: '202606', glAccountId: 10553 });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/acctgplt/CashJournal/list/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { period: '202606', glAccountId: 10553 },
    });
  });

  it('错误路径：request 拒绝时向外抛错', async () => {
    const { client, request } = makeClient();
    request.mockRejectedValue(new Error('boom'));
    const api = createRjzApi(client);

    await expect(api.list({ bookid: 'bk1', period: '202606', glAccountId: 1 })).rejects.toThrow(
      'boom',
    );
  });
});

describe('createRjzApi.updateCashJournal', () => {
  it('映射路径参数与请求体', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue(1195249510907904);
    const api = createRjzApi(client);

    await api.updateCashJournal({
      bookid: 'bk1',
      id: '3598149920358778',
      body: { acctgPeriod: '202606', receiptAmount: 3242, id: 3598149920358778 },
    });

    expect(request).toHaveBeenCalledWith({
      method: 'PUT',
      path: '/accounting/acctgplt/CashJournal/{bookid}/{id}',
      pathParams: { bookid: 'bk1', id: '3598149920358778' },
      body: { acctgPeriod: '202606', receiptAmount: 3242, id: 3598149920358778 },
    });
  });

  it('可选参数缺省时不写入请求体', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue(1);
    const api = createRjzApi(client);

    await api.updateCashJournal({ bookid: 'bk1', id: '1', body: {} });

    expect(request.mock.calls[0]![0].body).toEqual({});
  });

  it('错误路径：request 拒绝时向外抛错', async () => {
    const { client, request } = makeClient();
    request.mockRejectedValue(new Error('boom'));
    const api = createRjzApi(client);

    await expect(api.updateCashJournal({ bookid: 'bk1', id: '1', body: {} })).rejects.toThrow(
      'boom',
    );
  });
});
