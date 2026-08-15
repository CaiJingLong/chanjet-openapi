import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjjqcxgdzcApi } from '../../../src/api/hkjgdzc/hkjjqcxgdzc.js';

function makeMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createHkjjqcxgdzcApi', () => {
  it('映射路径参数与查询参数', async () => {
    const { client, request } = makeMockClient();
    request.mockResolvedValue({});

    const api = createHkjjqcxgdzcApi(client);
    await api.preciseQueryAssets({ bookid: '123', code: '000001', period: '202107' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/asset/FixedAsset/outside/preciseQueryAssets/{bookid}',
      pathParams: { bookid: '123' },
      query: { code: '000001', period: '202107' },
    });
  });

  it('传递 HTTP 错误状态码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('Not Found'), { httpStatus: 404 });
    request.mockRejectedValue(error);

    const api = createHkjjqcxgdzcApi(client);
    await expect(
      api.preciseQueryAssets({ bookid: '123', code: '000001', period: '202107' }),
    ).rejects.toMatchObject({ httpStatus: 404 });
  });

  it('传递业务错误码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('业务失败'), { code: 'E004', msg: '业务失败' });
    request.mockRejectedValue(error);

    const api = createHkjjqcxgdzcApi(client);
    await expect(
      api.preciseQueryAssets({ bookid: '123', code: '000001', period: '202107' }),
    ).rejects.toMatchObject({ code: 'E004' });
  });
});
