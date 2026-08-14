import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '../../../src/client.js';
import { createYftjbApi } from '../../../src/api/bb/yftjb.js';

function makeClient() {
  const requests: RequestOptions[] = [];
  const request = vi.fn(async <R>(options: RequestOptions): Promise<R> => {
    requests.push(options);
    return undefined as R;
  });
  const client = { request } as unknown as ChanjetClient;
  return { client, requests };
}

describe('createYftjbApi', () => {
  it('构造正确的 path、pathParams 与 query', async () => {
    const { client, requests } = makeClient();
    const api = createYftjbApi(client);

    await api.pay({ bookid: 'b1', period: '202608' });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.method).toBe('GET');
    expect(requests[0]?.path).toBe('/accounting/gl/statistics/pay/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({ period: '202608' });
  });

  it('客户端抛错时透传', async () => {
    const request = vi.fn().mockRejectedValue(new Error('boom'));
    const client = { request } as unknown as ChanjetClient;
    const api = createYftjbApi(client);

    await expect(api.pay({ bookid: 'b1', period: '202608' })).rejects.toThrow('boom');
  });
});
