import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '../../../src/client.js';
import { createZcfzApi } from '../../../src/api/bb/zcfz.js';

function makeClient() {
  const requests: RequestOptions[] = [];
  const request = vi.fn(async <R>(options: RequestOptions): Promise<R> => {
    requests.push(options);
    return undefined as R;
  });
  const requestEnvelope = vi.fn(async <R>(options: RequestOptions): Promise<R> => {
    requests.push(options);
    return undefined as R;
  });
  const client = { request, requestEnvelope } as unknown as ChanjetClient;
  return { client, requests };
}

describe('createZcfzApi.balanceSheet', () => {
  it('构造正确的 path、pathParams 与 query', async () => {
    const { client, requests } = makeClient();
    const api = createZcfzApi(client);

    await api.balanceSheet({
      bookid: 'b1',
      period: '202608',
      isReorg: true,
      isOnlyGetCache: false,
    });

    expect(requests[0]?.method).toBe('GET');
    expect(requests[0]?.path).toBe('/accounting/gl/BalanceSheet/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({ period: '202608', isReorg: true, isOnlyGetCache: false });
  });

  it('可选参数缺省时不出现在 query', async () => {
    const { client, requests } = makeClient();
    const api = createZcfzApi(client);

    await api.balanceSheet({ bookid: 'b1', period: '202608' });

    expect(requests[0]?.query?.period).toBe('202608');
    expect(requests[0]?.query?.isReorg).toBeUndefined();
    expect(requests[0]?.query?.isOnlyGetCache).toBeUndefined();
  });
});

describe('createZcfzApi.receive', () => {
  it('构造正确的 path、pathParams 与 query', async () => {
    const { client, requests } = makeClient();
    const api = createZcfzApi(client);

    await api.receive({ bookid: 'b1', period: '202608' });

    expect(requests[0]?.path).toBe('/accounting/gl/statistics/receive/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({ period: '202608' });
  });
});

describe('createZcfzApi.getOldBalanceSheet', () => {
  it('构造正确的 path、pathParams 与 query', async () => {
    const { client, requests } = makeClient();
    const api = createZcfzApi(client);

    await api.getOldBalanceSheet({ bookid: 'b1', period: '202608', isReorg: 'true' });

    expect(requests[0]?.path).toBe('/accounting/fin/getOldBalanceSheet/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({ period: '202608', isReorg: 'true' });
  });
});

describe('createZcfzApi.check', () => {
  it('构造正确的 path、pathParams 与 query', async () => {
    const { client, requests } = makeClient();
    const api = createZcfzApi(client);

    await api.check({ bookid: 'b1', period: '202608' });

    expect(requests[0]?.path).toBe('/accounting/gl/BalanceSheet/check/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({ period: '202608' });
  });
});

describe('createZcfzApi.getNewBalanceSheet', () => {
  it('构造正确的 path、pathParams 与 query', async () => {
    const { client, requests } = makeClient();
    const api = createZcfzApi(client);

    await api.getNewBalanceSheet({ bookid: 'b1', period: '202608', isReorg: 'true' });

    expect(requests[0]?.path).toBe('/accounting/fin/getNewBalanceSheet/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({ period: '202608', isReorg: 'true' });
  });
});

describe('createZcfzApi 错误路径', () => {
  it('客户端抛错时透传', async () => {
    const request = vi.fn().mockRejectedValue(new Error('boom'));
    const client = { request } as unknown as ChanjetClient;
    const api = createZcfzApi(client);

    await expect(api.balanceSheet({ bookid: 'b1', period: '202608' })).rejects.toThrow('boom');
  });
});
