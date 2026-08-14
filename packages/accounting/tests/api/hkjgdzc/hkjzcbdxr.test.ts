import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createHkjzcbdxrApi } from '../../../src/api/hkjgdzc/hkjzcbdxr.js';

function makeMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createHkjzcbdxrApi', () => {
  it('映射路径参数、查询参数与请求体', async () => {
    const { client, request } = makeMockClient();
    request.mockResolvedValue({ message: '数据写入成功' });

    const api = createHkjzcbdxrApi(client);
    await api.changeWrite({
      bookid: '123',
      propName: 'baseOriginalValue',
      jsonObject: ['{"modifiedValue":1}', '{"modifiedValue":2}'],
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/asset/FixedAsset/outside/changeWrite/{bookid}',
      pathParams: { bookid: '123' },
      query: { propName: 'baseOriginalValue' },
      body: { jsonObject: ['{"modifiedValue":1}', '{"modifiedValue":2}'] },
    });
  });

  it('传递 HTTP 错误状态码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('Bad Request'), { httpStatus: 400 });
    request.mockRejectedValue(error);

    const api = createHkjzcbdxrApi(client);
    await expect(
      api.changeWrite({ bookid: '123', propName: 'baseOriginalValue', jsonObject: [] }),
    ).rejects.toMatchObject({ httpStatus: 400 });
  });

  it('传递业务错误码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('业务失败'), { code: 'E010', msg: '业务失败' });
    request.mockRejectedValue(error);

    const api = createHkjzcbdxrApi(client);
    await expect(
      api.changeWrite({ bookid: '123', propName: 'baseOriginalValue', jsonObject: [] }),
    ).rejects.toMatchObject({ code: 'E010' });
  });
});
