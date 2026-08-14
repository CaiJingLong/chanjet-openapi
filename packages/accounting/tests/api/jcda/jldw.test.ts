import { describe, it, expect, vi, type Mock } from 'vitest';
import { createJldwApi } from '../../../src/api/jcda/jldw.js';
import type { ChanjetClient } from '../../../src/client.js';

function makeClient(): { client: ChanjetClient; request: Mock } {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createJldwApi', () => {
  it('remove 映射 query 与 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createJldwApi(client);

    await api.remove({ bookid: 'bk1', removeTime: '12345645', id: 21342534 });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/uom/remove/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { removeTime: '12345645' },
      body: { id: 21342534 },
    });
  });

  it('batchUpsert 映射数组 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createJldwApi(client);

    const items = [{ uomName: 'hahaha', statusEnum: 'A' }];
    await api.batchUpsert({ bookid: 'bk1', items });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/uom/batchUpsert/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: items,
    });
  });

  it('queryAllCurrency 映射 GET path', async () => {
    const { client, request } = makeClient();
    const rows = [{ code: 'HKD', name: '港元', id: 10001, decimalScale: 2 }];
    request.mockResolvedValue(rows);
    const api = createJldwApi(client);

    const out = await api.queryAllCurrency({ bookid: 'bk1' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/acctgplt/FavoriteCurrency/queryAllCurrency/{bookid}',
      pathParams: { bookid: 'bk1' },
    });
    expect(out).toBe(rows);
  });

  it('remove 透传业务错误', async () => {
    const { client, request } = makeClient();
    const err = { code: 'e1', msg: '计量单位删除失败', httpStatus: 400 };
    request.mockRejectedValue(err);
    const api = createJldwApi(client);

    await expect(api.remove({ bookid: 'bk1', removeTime: '1', id: 2 })).rejects.toBe(err);
  });
});
