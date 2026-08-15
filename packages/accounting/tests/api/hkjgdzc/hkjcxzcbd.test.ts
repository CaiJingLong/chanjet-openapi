import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjcxzcbdApi } from '../../../src/api/hkjgdzc/hkjcxzcbd.js';

function makeMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createHkjcxzcbdApi', () => {
  it('映射路径参数与请求体', async () => {
    const { client, request } = makeMockClient();
    request.mockResolvedValue([]);

    const api = createHkjcxzcbdApi(client);
    await api.getModifyEntryList({ bookid: '123', code: '000001', period: '202109' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/asset/FixedAsset/outside/getModifyEntryList/{bookid}',
      pathParams: { bookid: '123' },
      body: { code: '000001', period: '202109' },
    });
  });

  it('传递 HTTP 错误状态码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('Not Found'), { httpStatus: 404 });
    request.mockRejectedValue(error);

    const api = createHkjcxzcbdApi(client);
    await expect(
      api.getModifyEntryList({ bookid: '123', code: '000001', period: '202109' }),
    ).rejects.toMatchObject({ httpStatus: 404 });
  });

  it('传递业务错误码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('业务失败'), { code: 'E001', msg: '业务失败' });
    request.mockRejectedValue(error);

    const api = createHkjcxzcbdApi(client);
    await expect(
      api.getModifyEntryList({ bookid: '123', code: '000001', period: '202109' }),
    ).rejects.toMatchObject({ code: 'E001' });
  });
});
