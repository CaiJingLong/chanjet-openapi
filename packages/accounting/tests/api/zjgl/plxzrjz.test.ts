import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '../../../src/client.js';
import { createPlxzrjzApi } from '../../../src/api/zjgl/plxzrjz.js';

function makeClient() {
  const request = vi.fn<(options: RequestOptions) => Promise<unknown>>();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createPlxzrjzApi', () => {
  it('映射路径参数与数组请求体', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([{ id: 1 }]);
    const api = createPlxzrjzApi(client);

    const items = [
      {
        bizDate: '2020-12-01',
        comments: '通天塔2',
        receiptAmount: '500',
        disbursementAmount: '0',
        sequenceNum: '-1',
        glAccountId: 1192084382285982,
      },
    ];
    await api.batchAdd({ bookid: 123, items });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/acctgplt/CashJournal/batchAdd/{bookid}',
      pathParams: { bookid: 123 },
      body: items,
    });
  });

  it('可选参数缺省时不写入单条日记账', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createPlxzrjzApi(client);

    await api.batchAdd({
      bookid: 123,
      items: [
        { bizDate: '2020-12-01', receiptAmount: '0', disbursementAmount: '0', sequenceNum: '1' },
      ],
    });

    const body = request.mock.calls[0]![0].body as Array<Record<string, unknown>>;
    expect(body[0]!.finAccountId).toBeUndefined();
    expect(body[0]!.comments).toBeUndefined();
  });

  it('错误路径：request 拒绝时向外抛错', async () => {
    const { client, request } = makeClient();
    request.mockRejectedValue(new Error('boom'));
    const api = createPlxzrjzApi(client);

    await expect(
      api.batchAdd({
        bookid: 123,
        items: [
          { bizDate: '2020-12-01', receiptAmount: '0', disbursementAmount: '0', sequenceNum: '1' },
        ],
      }),
    ).rejects.toThrow('boom');
  });
});
