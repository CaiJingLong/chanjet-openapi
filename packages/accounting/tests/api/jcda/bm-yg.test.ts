import { describe, it, expect, vi, type Mock } from 'vitest';
import { createBmYgApi } from '../../../src/api/jcda/bm-yg.js';
import type { ChanjetClient } from '@chanjet-openapi/core';

function makeClient(): { client: ChanjetClient; request: Mock } {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createBmYgApi', () => {
  it('syncDepartment 映射数组 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createBmYgApi(client);

    const items = [{ code: '0010', id: 23345675, name: '总部', statusEnum: 'A' }];
    await api.syncDepartment({ bookid: 'bk1', items });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/department/batchUpsert/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: items,
    });
  });

  it('removeDepartment 映射 query 与 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createBmYgApi(client);

    await api.removeDepartment({ bookid: 'bk1', removeTime: '12345645', id: 21342534 });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/department/remove/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { removeTime: '12345645' },
      body: { id: 21342534 },
    });
  });

  it('queryDepartment 无 body 返回部门列表', async () => {
    const { client, request } = makeClient();
    const rows = [{ id: 100001, code: '01', name: '部门1', isLeafNode: true }];
    request.mockResolvedValue(rows);
    const api = createBmYgApi(client);

    const out = await api.queryDepartment({ bookid: 'bk1' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/open/department/query/{bookid}',
      pathParams: { bookid: 'bk1' },
    });
    expect(out).toBe(rows);
  });

  it('syncEmployee 映射数组 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createBmYgApi(client);

    const items = [
      {
        empCode: '0010',
        id: 23345675,
        name: '张三',
        statusEnum: 'A',
        mobile: '11111111111',
        identificationTypeEnum: 'SSN',
        identificationNo: '333333333',
        departmentId: 123456789,
      },
    ];
    await api.syncEmployee({ bookid: 'bk1', items });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/employee/batchUpsert/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: items,
    });
  });

  it('batchUpsertEmployee 映射外部接口数组 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ successResultMap: {} });
    const api = createBmYgApi(client);

    const items = [
      {
        empCode: '000001',
        id: 15407008456,
        name: '张三',
        statusEnum: 'A',
        mobile: '15652630551',
        identificationTypeEnum: 'SSN',
        identificationNo: '440102198001021230',
        departmentId: 1551227941027840,
        employtime: '2021-08-01',
        leavetime: '2021-08-20',
      },
    ];
    await api.batchUpsertEmployee({ bookid: 'bk1', items });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/doc/account/outside/batchUpsertEmployee/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: items,
    });
  });

  it('getDepartment 映射 body code', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createBmYgApi(client);

    await api.getDepartment({ bookid: 'bk1', code: '000001' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/doc/account/outside/getDepartment/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { code: '000001' },
    });
  });

  it('getEmployee 映射 body code', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createBmYgApi(client);

    await api.getEmployee({ bookid: 'bk1', code: '000001' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/doc/account/outside/getEmployee/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { code: '000001' },
    });
  });

  it('syncDepartment 透传业务错误', async () => {
    const { client, request } = makeClient();
    const err = { code: 'e1', msg: '部门编码重复', httpStatus: 400 };
    request.mockRejectedValue(err);
    const api = createBmYgApi(client);

    await expect(
      api.syncDepartment({
        bookid: 'bk1',
        items: [{ code: 'c', id: 1, name: 'n', statusEnum: 'A' }],
      }),
    ).rejects.toBe(err);
  });
});
