import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '../../../src/client.js';
import { createHkjrjzjqcxApi } from '../../../src/api/zjgl/hkjrjzjqcx.js';

function makeClient() {
  const request = vi.fn<(options: RequestOptions) => Promise<unknown>>();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createHkjrjzjqcxApi', () => {
  it('映射路径参数与请求体', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ id: '1' });
    const api = createHkjrjzjqcxApi(client);

    await api.preciseQueryCashJournal({
      bookid: 'bk1',
      code: '100101',
      period: '202107-202107',
      otherParam: { comments: '1111', receipt: 'r', bizDate_begin: '2021-07-01' },
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/acctgplt/CashJournal/outside/preciseQueryCashJournal/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: {
        code: '100101',
        period: '202107-202107',
        otherParam: { comments: '1111', receipt: 'r', bizDate_begin: '2021-07-01' },
      },
    });
  });

  it('可选参数缺省时不写入 otherParam 子字段', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createHkjrjzjqcxApi(client);

    await api.preciseQueryCashJournal({
      bookid: 'bk1',
      code: '100101',
      period: '202107-202107',
      otherParam: {},
    });

    const body = request.mock.calls[0]![0].body as {
      otherParam: Record<string, unknown>;
    };
    expect(body.otherParam).toEqual({});
    expect(body.otherParam.receipt).toBeUndefined();
  });

  it('错误路径：request 拒绝时向外抛错', async () => {
    const { client, request } = makeClient();
    request.mockRejectedValue(new Error('boom'));
    const api = createHkjrjzjqcxApi(client);

    await expect(
      api.preciseQueryCashJournal({ bookid: 'bk1', code: 'c', period: 'p', otherParam: {} }),
    ).rejects.toThrow('boom');
  });
});
