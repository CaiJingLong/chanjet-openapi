import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '@chanjet-openapi/core';
import { createNsbdbApi } from '../../../src/api/bb/nsbdb.js';

function makeClient() {
  const requests: RequestOptions[] = [];
  const request = vi.fn(async <R>(options: RequestOptions): Promise<R> => {
    requests.push(options);
    return undefined as R;
  });
  const client = { request } as unknown as ChanjetClient;
  return { client, requests };
}

describe('createNsbdbApi.query', () => {
  it('将 queryParam 序列化为 json 字符串', async () => {
    const { client, requests } = makeClient();
    const api = createNsbdbApi(client);

    await api.query({ bookid: 'b1', queryParam: { month: 3, type: 'a' } });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.method).toBe('GET');
    expect(requests[0]?.path).toBe('/accounting/asr/TaxFluctuate/query/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({ queryParam: '{"month":3,"type":"a"}' });
  });

  it('客户端抛错时透传', async () => {
    const request = vi.fn().mockRejectedValue(new Error('boom'));
    const client = { request } as unknown as ChanjetClient;
    const api = createNsbdbApi(client);

    await expect(api.query({ bookid: 'b1', queryParam: {} })).rejects.toThrow('boom');
  });
});

describe('createNsbdbApi.queryTaxFluctuate', () => {
  it('构造正确的 path、pathParams 与 query', async () => {
    const { client, requests } = makeClient();
    const api = createNsbdbApi(client);

    await api.queryTaxFluctuate({ bookid: 'b1', period: '202608' });

    expect(requests).toHaveLength(1);
    expect(requests[0]?.method).toBe('GET');
    expect(requests[0]?.path).toBe('/accounting/asr/TaxFluctuate/queryTaxFluctuate/{bookid}');
    expect(requests[0]?.pathParams).toEqual({ bookid: 'b1' });
    expect(requests[0]?.query).toEqual({ period: '202608' });
  });

  it('客户端抛错时透传', async () => {
    const request = vi.fn().mockRejectedValue(new Error('boom'));
    const client = { request } as unknown as ChanjetClient;
    const api = createNsbdbApi(client);

    await expect(api.queryTaxFluctuate({ bookid: 'b1', period: '202608' })).rejects.toThrow('boom');
  });
});
