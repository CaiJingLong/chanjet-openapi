import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createHkjxggdzcApi } from '../../../src/api/hkjgdzc/hkjxggdzc.js';

function makeMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createHkjxggdzcApi', () => {
  it('映射路径参数与请求体 object', async () => {
    const { client, request } = makeMockClient();
    request.mockResolvedValue({ message: '数据写入成功' });

    const api = createHkjxggdzcApi(client);
    await api.update({ bookid: '123', object: '{"code":"000001"}' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/asset/FixedAsset/outside/update/{bookid}',
      pathParams: { bookid: '123' },
      body: { object: '{"code":"000001"}' },
    });
  });

  it('传递 HTTP 错误状态码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('Server Error'), { httpStatus: 500 });
    request.mockRejectedValue(error);

    const api = createHkjxggdzcApi(client);
    await expect(api.update({ bookid: '123', object: '{}' })).rejects.toMatchObject({
      httpStatus: 500,
    });
  });

  it('传递业务错误码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('业务失败'), { code: 'E007', msg: '业务失败' });
    request.mockRejectedValue(error);

    const api = createHkjxggdzcApi(client);
    await expect(api.update({ bookid: '123', object: '{}' })).rejects.toMatchObject({
      code: 'E007',
    });
  });
});
