import { describe, it, expect, vi, type Mock } from 'vitest';
import { createJsfsApi } from '../../../src/api/jcda/jsfs.js';
import type { ChanjetClient } from '@chanjet-openapi/core';

function makeClient(): { client: ChanjetClient; request: Mock } {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createJsfsApi', () => {
  it('add 映射 path 与完整 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ id: 975865062883328 });
    const api = createJsfsApi(client);

    const out = await api.add({
      bookid: 'bk1',
      name: '对公银行1',
      code: 'dgyh-01',
      externalId: '419846',
      comments: '新增测试',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/paymentmethodtype/add/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { name: '对公银行1', code: 'dgyh-01', externalId: '419846', comments: '新增测试' },
    });
    expect(out).toEqual({ id: 975865062883328 });
  });

  it('add 缺省可选参数时不携带 externalId/comments', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ id: 1 });
    const api = createJsfsApi(client);

    await api.add({ bookid: 'bk1', name: 'n', code: 'c' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/paymentmethodtype/add/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { name: 'n', code: 'c' },
    });
  });

  it('remove 映射数组 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ success: ['dgyh-01'], fail: ['bjwx'] });
    const api = createJsfsApi(client);

    const out = await api.remove({ bookid: 'bk1', codes: ['dgyh-01', 'bjwx'] });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/paymentmethodtype/remove/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: ['dgyh-01', 'bjwx'],
    });
    expect(out).toEqual({ success: ['dgyh-01'], fail: ['bjwx'] });
  });

  it('update 映射 body 且缺省可选参数', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ code: 'dgyh-01' });
    const api = createJsfsApi(client);

    await api.update({ bookid: 'bk1', code: 'dgyh-01', name: '对公银行1' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/paymentmethodtype/update/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { code: 'dgyh-01', name: '对公银行1' },
    });
  });

  it('query 映射两个 path 参数', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ code: 'dgyh-01', name: '对公银行1' });
    const api = createJsfsApi(client);

    await api.query({ bookid: 'bk1', code: 'dgyh-01' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/openapi/cc/paymentmethodtype/query/{code}/{bookid}',
      pathParams: { code: 'dgyh-01', bookid: 'bk1' },
    });
  });

  it('add 透传业务错误', async () => {
    const { client, request } = makeClient();
    const err = { code: 'openapi.e9999', msg: '结算方式编码已存在', httpStatus: 400 };
    request.mockRejectedValue(err);
    const api = createJsfsApi(client);

    await expect(api.add({ bookid: 'bk1', name: 'n', code: 'c' })).rejects.toBe(err);
  });
});
