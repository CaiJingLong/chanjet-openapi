import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjcwxxcxApi } from '../../../src/api/hkjcssz/hkjcwxxcx.js';

function setup() {
  const request = vi.fn();
  const client = { request } as unknown as ChanjetClient;
  return { client, request };
}

describe('createHkjcwxxcxApi', () => {
  it('以 POST 请求查询财务信息，映射 path/pathParams/query', async () => {
    const { client, request } = setup();
    request.mockResolvedValue({ bookCode: 'zl6twnrjv9' });
    const api = createHkjcwxxcxApi(client);

    const result = await api.accountBook({ bookid: '1490881242333184', tenantId: 't1' });

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/accounting/outside/accountBook/{bookid}',
      pathParams: { bookid: '1490881242333184' },
      query: { tenantId: 't1' },
    });
    expect(result).toEqual({ bookCode: 'zl6twnrjv9' });
  });

  it('bookid 支持 number 类型', async () => {
    const { client, request } = setup();
    request.mockResolvedValue({});
    const api = createHkjcwxxcxApi(client);

    await api.accountBook({ bookid: 123, tenantId: 't1' });

    expect(request).toHaveBeenCalledWith(expect.objectContaining({ pathParams: { bookid: 123 } }));
  });

  it('远端 HTTP 错误向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('请求失败'), {
      code: '000001',
      msg: '账套不存在',
      httpStatus: 500,
      url: '/accounting/accounting/outside/accountBook/123',
    });
    request.mockRejectedValue(err);
    const api = createHkjcwxxcxApi(client);

    await expect(api.accountBook({ bookid: '123', tenantId: 't1' })).rejects.toBe(err);
  });

  it('远端业务错误（code 非 0）向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('业务失败'), {
      code: 'E10001',
      msg: '账套不存在',
    });
    request.mockRejectedValue(err);
    const api = createHkjcwxxcxApi(client);

    await expect(api.accountBook({ bookid: '123', tenantId: 't1' })).rejects.toBe(err);
  });
});
