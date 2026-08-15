import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjgdzcxrApi } from '../../../src/api/hkjgdzc/hkjgdzcxr.js';

function makeMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createHkjgdzcxrApi', () => {
  it('映射路径参数', async () => {
    const { client, request } = makeMockClient();
    request.mockResolvedValue(1);

    const api = createHkjgdzcxrApi(client);
    await api.assetWrite({ bookid: '123' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/asset/FixedAsset/outside/assetWrite/{bookid}',
      pathParams: { bookid: '123' },
    });
  });

  it('传递 HTTP 错误状态码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('Server Error'), { httpStatus: 500 });
    request.mockRejectedValue(error);

    const api = createHkjgdzcxrApi(client);
    await expect(api.assetWrite({ bookid: '123' })).rejects.toMatchObject({ httpStatus: 500 });
  });

  it('传递业务错误码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('业务失败'), { code: 'E003', msg: '业务失败' });
    request.mockRejectedValue(error);

    const api = createHkjgdzcxrApi(client);
    await expect(api.assetWrite({ bookid: '123' })).rejects.toMatchObject({ code: 'E003' });
  });
});
