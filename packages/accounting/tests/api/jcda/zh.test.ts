import { describe, it, expect, vi, type Mock } from 'vitest';
import { createZhApi } from '../../../src/api/jcda/zh.js';
import type { ChanjetClient } from '../../../src/client.js';

function makeClient(): { client: ChanjetClient; request: Mock } {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createZhApi', () => {
  it('add 映射 path 与完整 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ code: 'jxkjsk' });
    const api = createZhApi(client);

    const out = await api.add({
      bookid: 'bk1',
      code: 'jxkjsk',
      name: '北京极速科技收款',
      typeEnum: 'CASH',
      openingBank: '中国银行',
      accountNo: '66621200123122',
      currencyCode: 'CNY',
      externalId: 'dg18612',
      comments: '新增测试',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/finaccount/add/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: {
        code: 'jxkjsk',
        name: '北京极速科技收款',
        typeEnum: 'CASH',
        openingBank: '中国银行',
        accountNo: '66621200123122',
        currencyCode: 'CNY',
        externalId: 'dg18612',
        comments: '新增测试',
      },
    });
    expect(out).toEqual({ code: 'jxkjsk' });
  });

  it('add 缺省可选参数时不携带', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createZhApi(client);

    await api.add({ bookid: 'bk1', code: 'c', name: 'n', typeEnum: 'CASH' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/finaccount/add/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { code: 'c', name: 'n', typeEnum: 'CASH' },
    });
  });

  it('remove 映射数组 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ success: ['jxkjsk'], fail: ['bjhyzh'] });
    const api = createZhApi(client);

    await api.remove({ bookid: 'bk1', codes: ['jxkjsk', 'bjhyzh'] });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/finaccount/remove/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: ['jxkjsk', 'bjhyzh'],
    });
  });

  it('update 缺省可选参数', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ code: 'jxkjsk' });
    const api = createZhApi(client);

    await api.update({ bookid: 'bk1', code: 'jxkjsk' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/finaccount/update/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { code: 'jxkjsk' },
    });
  });

  it('query 映射两个 path 参数', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ code: 'dgyh-01', name: '对公银行1' });
    const api = createZhApi(client);

    await api.query({ bookid: 'bk1', code: 'dgyh-01' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/openapi/cc/finaccount/query/{code}/{bookid}',
      pathParams: { code: 'dgyh-01', bookid: 'bk1' },
    });
  });

  it('update 透传业务错误', async () => {
    const { client, request } = makeClient();
    const err = { code: 'openapi.e9999', msg: '账号编码不存在', httpStatus: 400 };
    request.mockRejectedValue(err);
    const api = createZhApi(client);

    await expect(api.update({ bookid: 'bk1', code: 'c' })).rejects.toBe(err);
  });
});
