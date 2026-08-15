import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '@chanjet-openapi/core';
import { createRjzdzjkApi } from '../../../src/api/zjgl/rjzdzjk.js';

function makeClient() {
  const request = vi.fn<(options: RequestOptions) => Promise<unknown>>();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createRjzdzjkApi', () => {
  it('映射路径参数与请求体', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue('对账完成');
    const api = createRjzdzjkApi(client);

    await api.checking({
      bookid: 123,
      count: 2,
      bizDate: '2020-12-02',
      receiptAmount: '890',
      disbursementAmount: '0',
      balanceAmount: '1404644.00',
      glAccountId: '1192084382285982',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/acctgplt/CashJournal/checking/{bookid}',
      pathParams: { bookid: 123 },
      body: {
        count: 2,
        bizDate: '2020-12-02',
        receiptAmount: '890',
        disbursementAmount: '0',
        balanceAmount: '1404644.00',
        glAccountId: '1192084382285982',
      },
    });
  });

  it('可选参数缺省时不写入请求体', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue('ok');
    const api = createRjzdzjkApi(client);

    await api.checking({
      bookid: 123,
      count: 2,
      bizDate: '2020-12-02',
      receiptAmount: '890',
      disbursementAmount: '0',
    });

    const body = request.mock.calls[0]![0].body as Record<string, unknown>;
    expect(body.balanceAmount).toBeUndefined();
    expect(body.glAccountId).toBeUndefined();
    expect(body.finAccountNo).toBeUndefined();
  });

  it('错误路径：request 拒绝时向外抛错', async () => {
    const { client, request } = makeClient();
    request.mockRejectedValue(new Error('boom'));
    const api = createRjzdzjkApi(client);

    await expect(
      api.checking({
        bookid: 123,
        count: 2,
        bizDate: '2020-12-02',
        receiptAmount: '890',
        disbursementAmount: '0',
      }),
    ).rejects.toThrow('boom');
  });
});
