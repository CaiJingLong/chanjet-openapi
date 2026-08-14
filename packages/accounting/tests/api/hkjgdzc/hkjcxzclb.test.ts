import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createHkjcxzclbApi } from '../../../src/api/hkjgdzc/hkjcxzclb.js';

function makeMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createHkjcxzclbApi', () => {
  it('映射路径参数与请求体', async () => {
    const { client, request } = makeMockClient();
    request.mockResolvedValue([]);

    const api = createHkjcxzclbApi(client);
    await api.queryFixedAsset({
      bookid: '123',
      pageSize: 10,
      page: 1,
      queryMethod: 'SIMPLE_QUERY',
      keyWords: '电脑',
      period: '202401',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/asset/fixedAssetRestructure/queryFixedAsset/{bookid}',
      pathParams: { bookid: '123' },
      body: {
        pageSize: 10,
        page: 1,
        queryMethod: 'SIMPLE_QUERY',
        keyWords: '电脑',
        period: '202401',
      },
    });
  });

  it('可选参数 keyWords 缺省时为 undefined', async () => {
    const { client, request } = makeMockClient();
    request.mockResolvedValue([]);

    const api = createHkjcxzclbApi(client);
    await api.queryFixedAsset({
      bookid: '123',
      pageSize: 10,
      page: 1,
      queryMethod: 'SIMPLE_QUERY',
      period: '202401',
    });

    const options = request.mock.calls[0]![0];
    expect(options.body.keyWords).toBeUndefined();
  });

  it('传递 HTTP 错误状态码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('Bad Request'), { httpStatus: 400 });
    request.mockRejectedValue(error);

    const api = createHkjcxzclbApi(client);
    await expect(
      api.queryFixedAsset({
        bookid: '123',
        pageSize: 10,
        page: 1,
        queryMethod: 'SIMPLE_QUERY',
        period: '202401',
      }),
    ).rejects.toMatchObject({ httpStatus: 400 });
  });

  it('传递业务错误码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('业务失败'), { code: 'E002', msg: '业务失败' });
    request.mockRejectedValue(error);

    const api = createHkjcxzclbApi(client);
    await expect(
      api.queryFixedAsset({
        bookid: '123',
        pageSize: 10,
        page: 1,
        queryMethod: 'SIMPLE_QUERY',
        period: '202401',
      }),
    ).rejects.toMatchObject({ code: 'E002' });
  });
});
