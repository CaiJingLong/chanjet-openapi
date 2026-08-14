import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '../../../src/client.js';
import { createAqcxxjllbApi } from '../../../src/api/bb/aqcxxjllb.js';

function makeClient() {
  const requests: RequestOptions[] = [];
  const request = vi.fn(async <R>(options: RequestOptions): Promise<R> => {
    requests.push(options);
    return undefined as R;
  });
  const client = { request } as unknown as ChanjetClient;
  return { client, requests };
}

describe('createAqcxxjllbApi', () => {
  it('构造正确的 path、pathParams 与 query', async () => {
    const { client, requests } = makeClient();
    const api = createAqcxxjllbApi(client);

    await api.cashFlow({ bookid: 'b1', period: '202608', isQuarter: true });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.method).toBe('GET');
    expect(requests[0]?.path).toBe('/accounting/gl/CashFlow/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({ period: '202608', isQuarter: true });
  });

  it('可选参数 isQuarter 缺省时不出现在 query', async () => {
    const { client, requests } = makeClient();
    const api = createAqcxxjllbApi(client);

    await api.cashFlow({ bookid: 'b1', period: '202608' });

    expect(requests[0]?.query?.period).toBe('202608');
    expect(requests[0]?.query?.isQuarter).toBeUndefined();
  });

  it('客户端抛错时透传', async () => {
    const request = vi.fn().mockRejectedValue(new Error('boom'));
    const client = { request } as unknown as ChanjetClient;
    const api = createAqcxxjllbApi(client);

    await expect(api.cashFlow({ bookid: 'b1', period: '202608' })).rejects.toThrow('boom');
  });
});
