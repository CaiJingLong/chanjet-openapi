import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '@chanjet-openapi/core';
import { createYstjbApi } from '../../../src/api/bb/ystjb.js';

function makeClient() {
  const requests: RequestOptions[] = [];
  const request = vi.fn(async <R>(options: RequestOptions): Promise<R> => {
    requests.push(options);
    return undefined as R;
  });
  const client = { request } as unknown as ChanjetClient;
  return { client, requests };
}

describe('createYstjbApi.receive', () => {
  it('构造正确的 path、pathParams 与 query', async () => {
    const { client, requests } = makeClient();
    const api = createYstjbApi(client);

    await api.receive({ bookid: 'b1', period: '202608' });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.method).toBe('GET');
    expect(requests[0]?.path).toBe('/accounting/gl/statistics/receive/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({ period: '202608' });
  });

  it('客户端抛错时透传', async () => {
    const request = vi.fn().mockRejectedValue(new Error('boom'));
    const client = { request } as unknown as ChanjetClient;
    const api = createYstjbApi(client);

    await expect(api.receive({ bookid: 'b1', period: '202608' })).rejects.toThrow('boom');
  });
});

describe('createYstjbApi.revceivePayTime', () => {
  it('构造正确的 path 与 pathParams（无 query）', async () => {
    const { client, requests } = makeClient();
    const api = createYstjbApi(client);

    await api.revceivePayTime({ bookid: 'b1' });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.method).toBe('GET');
    expect(requests[0]?.path).toBe('/accounting/gl/Index/revceivePayTime/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toBeUndefined();
  });

  it('客户端抛错时透传', async () => {
    const request = vi.fn().mockRejectedValue(new Error('boom'));
    const client = { request } as unknown as ChanjetClient;
    const api = createYstjbApi(client);

    await expect(api.revceivePayTime({ bookid: 'b1' })).rejects.toThrow('boom');
  });
});
