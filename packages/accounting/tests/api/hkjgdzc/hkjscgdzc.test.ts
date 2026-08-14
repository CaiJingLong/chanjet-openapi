import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createHkjscgdzcApi } from '../../../src/api/hkjgdzc/hkjscgdzc.js';

function makeMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createHkjscgdzcApi', () => {
  it('映射路径参数 bookid 与 ids', async () => {
    const { client, request } = makeMockClient();
    request.mockResolvedValue(undefined);

    const api = createHkjscgdzcApi(client);
    await api.delete({ bookid: '123', ids: '1,2,3' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/asset/FixedAsset/outside/delete/{bookid}/{ids}',
      pathParams: { bookid: '123', ids: '1,2,3' },
    });
  });

  it('传递 HTTP 错误状态码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('Bad Request'), { httpStatus: 400 });
    request.mockRejectedValue(error);

    const api = createHkjscgdzcApi(client);
    await expect(api.delete({ bookid: '123', ids: '1' })).rejects.toMatchObject({
      httpStatus: 400,
    });
  });

  it('传递业务错误码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('业务失败'), { code: 'E005', msg: '业务失败' });
    request.mockRejectedValue(error);

    const api = createHkjscgdzcApi(client);
    await expect(api.delete({ bookid: '123', ids: '1' })).rejects.toMatchObject({ code: 'E005' });
  });
});
