import { describe, it, expect, vi, type Mock } from 'vitest';
import { createXmApi } from '../../../src/api/jcda/xm.js';
import type { ChanjetClient } from '../../../src/client.js';

function makeClient(): { client: ChanjetClient; request: Mock } {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createXmApi', () => {
  it('remove 映射 path/query/body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ successResultMap: {} });
    const api = createXmApi(client);

    await api.remove({ bookid: 'bk1', removeTime: 12345645, id: 6236112 });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/project/remove/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { removeTime: 12345645 },
      body: { id: 6236112 },
    });
  });

  it('batchUpsert 映射数组 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createXmApi(client);

    const items = [{ id: 1, statusEnum: 'A', name: '工行', code: 'c' }];
    await api.batchUpsert({ bookid: 'bk1', items });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/project/batchUpsert/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: items,
    });
  });

  it('query 映射 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ totalPage: '1', count: '1', rows: [] });
    const api = createXmApi(client);

    await api.query({
      bookid: 'bk1',
      code: '000001',
      name: '马德里',
      projectCategoryCode: ['分类1'],
      pageSize: 20,
      pageNo: 1,
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/open/project/query/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: {
        code: '000001',
        name: '马德里',
        projectCategoryCode: ['分类1'],
        pageSize: 20,
        pageNo: 1,
      },
    });
  });

  it('update 映射 body 且缺省可选参数', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createXmApi(client);

    await api.update({
      bookid: 'bk1',
      id: '2259487325422068',
      code: '776688',
      name: 'openapi项目update',
      statusEnum: 'A',
      projectCategoryCode: '01',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/project/update/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: {
        id: '2259487325422068',
        code: '776688',
        name: 'openapi项目update',
        statusEnum: 'A',
        projectCategoryCode: '01',
      },
    });
  });

  it('update 携带 customizedFieldList', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createXmApi(client);

    await api.update({
      bookid: 'bk1',
      id: '1',
      code: 'c',
      name: 'n',
      statusEnum: 'A',
      projectCategoryCode: '01',
      customizedFieldList: [{ name: 'name', value: 'there8888' }],
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({
          customizedFieldList: [{ name: 'name', value: 'there8888' }],
        }),
      }),
    );
  });

  it('update 透传业务错误', async () => {
    const { client, request } = makeClient();
    const err = { code: 'inv.e3001', msg: '项目名称重复', httpStatus: 400 };
    request.mockRejectedValue(err);
    const api = createXmApi(client);

    await expect(
      api.update({
        bookid: 'bk1',
        id: '1',
        code: 'c',
        name: 'n',
        statusEnum: 'A',
        projectCategoryCode: '01',
      }),
    ).rejects.toBe(err);
  });
});
