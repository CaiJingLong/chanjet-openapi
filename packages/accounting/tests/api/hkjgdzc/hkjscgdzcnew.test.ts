import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjscgdzcnewApi } from '../../../src/api/hkjgdzc/hkjscgdzcnew.js';

function makeMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createHkjscgdzcnewApi', () => {
  it('映射路径参数与请求体', async () => {
    const { client, request } = makeMockClient();
    request.mockResolvedValue({});

    const api = createHkjscgdzcnewApi(client);
    await api.deleteFixedAsset({ bookid: '123', period: '202401', ids: ['1', '2'] });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/asset/fixedAssetRestructure/deleteFixedAsset/{bookid}',
      pathParams: { bookid: '123' },
      body: { period: '202401', ids: ['1', '2'] },
    });
  });

  it('传递 HTTP 错误状态码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('Not Found'), { httpStatus: 404 });
    request.mockRejectedValue(error);

    const api = createHkjscgdzcnewApi(client);
    await expect(
      api.deleteFixedAsset({ bookid: '123', period: '202401', ids: ['1'] }),
    ).rejects.toMatchObject({ httpStatus: 404 });
  });

  it('传递业务错误码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('业务失败'), { code: 'E006', msg: '业务失败' });
    request.mockRejectedValue(error);

    const api = createHkjscgdzcnewApi(client);
    await expect(
      api.deleteFixedAsset({ bookid: '123', period: '202401', ids: ['1'] }),
    ).rejects.toMatchObject({ code: 'E006' });
  });
});
