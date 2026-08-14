import { describe, it, expect, vi, type Mock } from 'vitest';
import { createCkApi } from '../../../src/api/jcda/ck.js';
import type { ChanjetClient } from '../../../src/client.js';

function makeClient(): { client: ChanjetClient; request: Mock } {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createCkApi', () => {
  it('batchUpsertt 构造 POST 请求，映射 path 与数组 body', async () => {
    const { client, request } = makeClient();
    const result = { successResultMap: { a: 'b' } };
    request.mockResolvedValue(result);
    const api = createCkApi(client);

    const items = [
      { statusEnum: 'A', id: '1', code: '001', name: '仓库1' },
      { statusEnum: 'B', id: '2', code: '002', name: '仓库2' },
    ];
    const out = await api.batchUpsertt({ bookid: 'bk1', items });

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/warehouse/batchUpsertt/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: items,
    });
    expect(out).toBe(result);
  });

  it('remove 映射 path/query/body', async () => {
    const { client, request } = makeClient();
    const result = { successResultMap: {}, failResultMap: {} };
    request.mockResolvedValue(result);
    const api = createCkApi(client);

    const out = await api.remove({ bookid: 'bk1', removeTime: 12345645, id: 6236112 });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/warehouse/remove/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { removeTime: 12345645 },
      body: { id: 6236112 },
    });
    expect(out).toBe(result);
  });

  it('batchUpsertt 透传业务错误', async () => {
    const { client, request } = makeClient();
    const err = { code: 'e1', msg: '仓库编码重复', httpStatus: 400 };
    request.mockRejectedValue(err);
    const api = createCkApi(client);

    await expect(
      api.batchUpsertt({
        bookid: 'bk1',
        items: [{ statusEnum: 'A', id: '1', code: 'c', name: 'n' }],
      }),
    ).rejects.toBe(err);
  });

  it('remove 透传网络/业务错误', async () => {
    const { client, request } = makeClient();
    const err = { code: 'e2', msg: '删除失败', httpStatus: 500 };
    request.mockRejectedValue(err);
    const api = createCkApi(client);

    await expect(api.remove({ bookid: 'bk1', removeTime: 1, id: 2 })).rejects.toBe(err);
  });
});
