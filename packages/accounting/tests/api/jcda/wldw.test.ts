import { describe, it, expect, vi, type Mock } from 'vitest';
import { createWldwApi } from '../../../src/api/jcda/wldw.js';
import type { ChanjetClient } from '../../../src/client.js';

function makeClient(): { client: ChanjetClient; request: Mock } {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createWldwApi', () => {
  it('batchUpsertApi 映射数组 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ successResultMap: { a: 1 } });
    const api = createWldwApi(client);

    const items = [
      {
        editFlag: 'new',
        partyRoleTypeId: 100001,
        statusEnum: 'A',
        code: '000001',
        orgUnit: { orgUnitName: '张三有限公司' },
        id: 123456,
      },
    ];
    await api.batchUpsertApi({ bookid: 'bk1', items });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/custvendor/batchUpsertApi/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: items,
    });
  });

  it('remove 映射 query 与 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createWldwApi(client);

    await api.remove({ bookid: 'bk1', removeTime: 1648624483000, id: 6236112 });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/custvendor/remove/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { removeTime: 1648624483000 },
      body: { id: 6236112 },
    });
  });

  it('batchUpsert 映射数组 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createWldwApi(client);

    const items = [
      {
        code: '000001',
        orgUnit: { orgUnitName: '深圳阿里里牟科技有限公司' },
        orgUnitName: '深圳阿里里牟科技有限公司',
        primaryPartyCategoryCode: '00',
        partyRoleTypeId: 100001,
        statusEnum: 'A',
        editFlag: 'new',
        id: 11111121,
        isPurIncludingTax: false,
      },
    ];
    await api.batchUpsert({ bookid: 'bk1', items });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/custvendor/batchUpsert/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: items,
    });
  });

  it('query 映射 body 且缺省可选字段', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ totalPage: '1', count: '1', rows: [] });
    const api = createWldwApi(client);

    await api.query({ bookid: 'bk1', pageSize: 20, pageNo: 1 });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/open/custvendor/query/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { pageSize: 20, pageNo: 1 },
    });
  });

  it('update 映射 PUT body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createWldwApi(client);

    await api.update({
      bookid: 'bk1',
      code: 'api-custvendor006',
      partyRoleTypeId: { id: '100101' },
      partyCategory: { code: '00' },
      custVendorContactList: [{ contactName: '任青彬-修改', address1: '北京市' }],
    });

    expect(request).toHaveBeenCalledWith({
      method: 'PUT',
      path: '/accounting/document/open/custvendor/update/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: {
        code: 'api-custvendor006',
        partyRoleTypeId: { id: '100101' },
        partyCategory: { code: '00' },
        custVendorContactList: [{ contactName: '任青彬-修改', address1: '北京市' }],
      },
    });
  });

  it('update 透传业务错误 party.e2201', async () => {
    const { client, request } = makeClient();
    const err = { code: 'party.e2201', msg: '往来单位编码不能包含分号', httpStatus: 400 };
    request.mockRejectedValue(err);
    const api = createWldwApi(client);

    await expect(
      api.update({
        bookid: 'bk1',
        code: 'c',
        partyRoleTypeId: { id: '100001' },
        partyCategory: {},
      }),
    ).rejects.toBe(err);
  });
});
