import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '../../../src/client.js';
import { createZdybbApi } from '../../../src/api/bb/zdybb.js';

/**
 * 构造一个仅记录 RequestOptions 的 ChanjetClient 替身。
 * 核心 client 尚在实现中，本测试只验证模块方法是否正确构造请求并透传结果/异常。
 */
function makeClient() {
  const calls: RequestOptions[] = [];
  const request = vi.fn(async <T>(options: RequestOptions): Promise<T> => {
    calls.push(options);
    return undefined as T;
  });
  const client = { request } as unknown as ChanjetClient;
  return { calls, client, request };
}

describe('createZdybbApi', () => {
  it('query 正确构造 path/pathParams/query', async () => {
    const { calls, client } = makeClient();
    const api = createZdybbApi(client);

    await api.query({
      bookid: 'abc',
      customizedDetailId: '1497840224305181',
      period: '2021-08',
    });

    expect(calls).toHaveLength(1);
    expect(calls[0]).toEqual({
      method: 'GET',
      path: '/accounting/fin/query/{bookid}',
      pathParams: { bookid: 'abc' },
      query: { customizedDetailId: '1497840224305181', period: '2021-08' },
    });
  });

  it('query 透传 client 异常', async () => {
    const { client, request } = makeClient();
    const api = createZdybbApi(client);
    const err = new Error('业务失败');
    request.mockRejectedValueOnce(err);

    await expect(api.query({ bookid: 'abc', customizedDetailId: 'c', period: 'p' })).rejects.toBe(
      err,
    );
  });
});
