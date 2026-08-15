import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '@chanjet-openapi/core';
import { createNstjbApi } from '../../../src/api/bb/nstjb.js';

function makeClient() {
  const requests: RequestOptions[] = [];
  const request = vi.fn(async <R>(options: RequestOptions): Promise<R> => {
    requests.push(options);
    return undefined as R;
  });
  const client = { request } as unknown as ChanjetClient;
  return { client, requests };
}

describe('createNstjbApi', () => {
  it('构造正确的 path、pathParams 与 query', async () => {
    const { client, requests } = makeClient();
    const api = createNstjbApi(client);

    await api.getTaxStatistics({ bookid: 'b1', period: '202608' });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.method).toBe('GET');
    expect(requests[0]?.path).toBe('/accounting/asr/TaxStatistics/getTaxStatistics/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({ period: '202608' });
  });

  it('客户端抛错时透传', async () => {
    const request = vi.fn().mockRejectedValue(new Error('boom'));
    const client = { request } as unknown as ChanjetClient;
    const api = createNstjbApi(client);

    await expect(api.getTaxStatistics({ bookid: 'b1', period: '202608' })).rejects.toThrow('boom');
  });
});
