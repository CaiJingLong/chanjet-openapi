import { describe, it, expect, vi, type Mock } from 'vitest';
import { createSpApi } from '../../../src/api/jcda/sp.js';
import type { ChanjetClient } from '@chanjet-openapi/core';

function makeClient(): { client: ChanjetClient; request: Mock } {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createSpApi', () => {
  it('batchUpsert 映射 path、query 与数组 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ successResultMap: { a: 1 } });
    const api = createSpApi(client);

    const items = [
      {
        code: '0010',
        id: 23345675,
        name: '手机',
        productUOMSetting: { baseUomId: '1805042935267431', baseUomName: '千克' },
        specNo: '2000*8000',
      },
    ];
    await api.batchUpsert({ bookid: 'bk1', async: true, items });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/product/batchUpsert/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { async: true },
      body: items,
    });
  });

  it('batchUpsert 缺省 async 时 query 为空', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createSpApi(client);

    await api.batchUpsert({
      bookid: 'bk1',
      items: [
        {
          code: 'c',
          id: 1,
          name: 'n',
          productUOMSetting: { baseUomId: '1', baseUomName: 'u' },
          specNo: 's',
        },
      ],
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({ query: {}, body: expect.any(Array) }),
    );
  });

  it('query 映射 body 且缺省可选字段', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ totalPage: '1', count: '1', rows: [] });
    const api = createSpApi(client);

    await api.query({ bookid: 'bk1', pageSize: '20', page: '1' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/open/product/query/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { pageSize: '20', page: '1' },
    });
  });

  it('remove 映射 path/query/body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createSpApi(client);

    await api.remove({ bookid: 'bk1', removeTime: '12345645', id: 21342534 });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/product/remove/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { removeTime: '12345645' },
      body: { id: 21342534 },
    });
  });

  it('query 透传业务错误', async () => {
    const { client, request } = makeClient();
    const err = { code: 'inv.e3001', msg: '商品不存在', httpStatus: 400 };
    request.mockRejectedValue(err);
    const api = createSpApi(client);

    await expect(api.query({ bookid: 'bk1', pageSize: '20', page: '1' })).rejects.toBe(err);
  });
});
