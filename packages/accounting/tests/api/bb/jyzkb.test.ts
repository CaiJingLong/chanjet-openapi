import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '@chanjet-openapi/core';
import { createJyzkbApi } from '../../../src/api/bb/jyzkb.js';

function makeClient() {
  const requests: RequestOptions[] = [];
  const request = vi.fn(async <R>(options: RequestOptions): Promise<R> => {
    requests.push(options);
    return undefined as R;
  });
  const client = { request } as unknown as ChanjetClient;
  return { client, requests };
}

describe('createJyzkbApi', () => {
  it('构造正确的 path、pathParams 与 query', async () => {
    const { client, requests } = makeClient();
    const api = createJyzkbApi(client);

    await api.stateOfOperation({ bookid: 'b1', year: '2026', needBusiness: 'true' });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.method).toBe('GET');
    expect(requests[0]?.path).toBe('/accounting/asr/Statistics/stateOfOperation/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({ year: '2026', needBusiness: 'true' });
  });

  it('客户端抛错时透传', async () => {
    const request = vi.fn().mockRejectedValue(new Error('boom'));
    const client = { request } as unknown as ChanjetClient;
    const api = createJyzkbApi(client);

    await expect(
      api.stateOfOperation({ bookid: 'b1', year: '2026', needBusiness: 'false' }),
    ).rejects.toThrow('boom');
  });
});
