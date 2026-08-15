import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjcxzclbApi } from '../../../src/api/hkjgdzc/hkjcxzclb.js';

function makeMockClient() {
  const requestEnvelope = vi.fn();
  return {
    client: { requestEnvelope } as unknown as ChanjetClient,
    requestEnvelope,
  };
}

describe('createHkjcxzclbApi', () => {
  it('映射路径参数与请求体', async () => {
    const { client, requestEnvelope } = makeMockClient();
    requestEnvelope.mockResolvedValue({ data: [] });

    const api = createHkjcxzclbApi(client);
    await api.queryFixedAsset({
      bookid: '123',
      pageSize: 10,
      page: 1,
      queryMethod: 'SIMPLE_QUERY',
      keyWords: '电脑',
      period: '202401',
    });

    expect(requestEnvelope).toHaveBeenCalledWith({
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
    const { client, requestEnvelope } = makeMockClient();
    requestEnvelope.mockResolvedValue({ data: [] });

    const api = createHkjcxzclbApi(client);
    await api.queryFixedAsset({
      bookid: '123',
      pageSize: 10,
      page: 1,
      queryMethod: 'SIMPLE_QUERY',
      period: '202401',
    });

    const options = requestEnvelope.mock.calls[0]![0];
    expect(options.body.keyWords).toBeUndefined();
  });

  it('传递 HTTP 错误状态码', async () => {
    const { client, requestEnvelope } = makeMockClient();
    const error = Object.assign(new Error('Bad Request'), { httpStatus: 400 });
    requestEnvelope.mockRejectedValue(error);

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
    const { client, requestEnvelope } = makeMockClient();
    const error = Object.assign(new Error('业务失败'), { code: 'E002', msg: '业务失败' });
    requestEnvelope.mockRejectedValue(error);

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
