import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '../../../src/client.js';
import { createSybApi } from '../../../src/api/bb/syb.js';

function makeClient() {
  const requests: RequestOptions[] = [];
  const request = vi.fn(async <R>(options: RequestOptions): Promise<R> => {
    requests.push(options);
    return undefined as R;
  });
  const client = { request } as unknown as ChanjetClient;
  return { client, requests };
}

describe('createSybApi.incomeStatement', () => {
  it('构造正确的 path、pathParams 与 query', async () => {
    const { client, requests } = makeClient();
    const api = createSybApi(client);

    await api.incomeStatement({
      bookid: 'b1',
      period: '202608',
      isReorg: true,
      isOnlyGetCache: false,
    });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.method).toBe('GET');
    expect(requests[0]?.path).toBe('/accounting/gl/IncomeStatement/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({ period: '202608', isReorg: true, isOnlyGetCache: false });
  });

  it('可选参数缺省时不出现在 query', async () => {
    const { client, requests } = makeClient();
    const api = createSybApi(client);

    await api.incomeStatement({ bookid: 'b1', period: '202608' });

    expect(requests[0]?.query?.period).toBe('202608');
    expect(requests[0]?.query?.isReorg).toBeUndefined();
    expect(requests[0]?.query?.isOnlyGetCache).toBeUndefined();
  });

  it('客户端抛错时透传', async () => {
    const request = vi.fn().mockRejectedValue(new Error('boom'));
    const client = { request } as unknown as ChanjetClient;
    const api = createSybApi(client);

    await expect(api.incomeStatement({ bookid: 'b1', period: '202608' })).rejects.toThrow('boom');
  });
});

describe('createSybApi.getOldIncomeStatement', () => {
  it('构造正确的 path、pathParams 与 query', async () => {
    const { client, requests } = makeClient();
    const api = createSybApi(client);

    await api.getOldIncomeStatement({
      bookid: 'b1',
      period: '202608',
      isQuarter: 'true',
      enableNewEdition: 'true',
    });

    expect(requests[0]?.path).toBe('/accounting/fin/getOldIncomeStatement/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({
      period: '202608',
      isQuarter: 'true',
      enableNewEdition: 'true',
    });
  });

  it('客户端抛错时透传', async () => {
    const request = vi.fn().mockRejectedValue(new Error('boom'));
    const client = { request } as unknown as ChanjetClient;
    const api = createSybApi(client);

    await expect(api.getOldIncomeStatement({ bookid: 'b1', period: '202608' })).rejects.toThrow(
      'boom',
    );
  });
});
