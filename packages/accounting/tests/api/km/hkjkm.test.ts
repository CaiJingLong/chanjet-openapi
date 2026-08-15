import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjkmApi } from '../../../src/api/km/hkjkm.js';

function makeClient() {
  const request = vi.fn();
  return { request, client: { request } as unknown as ChanjetClient };
}

describe('createHkjkmApi.adjustSubjectCodeLen', () => {
  it('映射 path 占位与 query 参数', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue('');
    const api = createHkjkmApi(client);

    await api.adjustSubjectCodeLen({ bookid: '90001', newCodeLen: '4.2.2.2' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/glaccount/adjustSubjectCodeLen/{bookid}',
      pathParams: { bookid: '90001' },
      query: { newCodeLen: '4.2.2.2' },
    });
  });

  it('返回 client.request 解析的 data', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue('错误信息');
    const api = createHkjkmApi(client);

    await expect(api.adjustSubjectCodeLen({ bookid: '1', newCodeLen: '4' })).resolves.toBe(
      '错误信息',
    );
  });

  it('传播 client.request 的异常（业务错误路径）', async () => {
    const { request, client } = makeClient();
    const err = new Error('gl.e1020');
    request.mockRejectedValue(err);
    const api = createHkjkmApi(client);

    await expect(api.adjustSubjectCodeLen({ bookid: '1', newCodeLen: '4' })).rejects.toThrow(
      'gl.e1020',
    );
  });
});
