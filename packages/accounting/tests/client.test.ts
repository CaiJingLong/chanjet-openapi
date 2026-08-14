import { afterEach, describe, expect, it, vi } from 'vitest';
import { ChanjetClient } from '../src/client.js';
import type { RequestOptions, TokenProvider } from '../src/client.js';
import { ChanjetApiError } from '../src/errors.js';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

function textResponse(body: string, status = 200): Response {
  return new Response(body, { status });
}

function headersOf(init?: RequestInit): Record<string, string> {
  return (init?.headers ?? {}) as Record<string, string>;
}

function makeClient(overrides: Partial<ConstructorParameters<typeof ChanjetClient>[0]> = {}) {
  const fetchImpl = vi.fn<typeof fetch>(async () => jsonResponse({ code: '000000', data: {} }));
  const client = new ChanjetClient({
    appKey: 'test-app-key',
    appSecret: 'test-app-secret',
    openToken: 'test-open-token',
    fetchImpl,
    ...overrides,
  });
  return { client, fetchImpl };
}

afterEach(() => {
  vi.useRealTimers();
});

describe('ChanjetClient 请求形态', () => {
  it('替换路径占位符并做 URL 编码', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: '000000', data: 1 }));
    await client.request<number>({
      method: 'GET',
      path: '/accounting/gl/AcctgTrans/{bookid}/x/{sub}',
      pathParams: { bookid: 1212319719489536, sub: 'a/b c' },
    });
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const url = String(fetchImpl.mock.calls[0]?.[0]);
    expect(url).toBe(
      'https://openapi.chanjet.com/accounting/gl/AcctgTrans/1212319719489536/x/a%2Fb%20c',
    );
  });

  it('路径含占位符但缺 pathParams 时抛 TypeError', async () => {
    const { client } = makeClient();
    await expect(client.request({ method: 'GET', path: '/x/{bookid}' })).rejects.toThrow(
      '包含占位符但未提供 pathParams',
    );
  });

  it('占位符无对应值抛 TypeError', async () => {
    const { client } = makeClient();
    await expect(
      client.request({ method: 'GET', path: '/x/{bookid}', pathParams: { other: 1 } }),
    ).rejects.toThrow('缺少路径参数 bookid');
  });

  it('query 序列化：undefined/null 跳过，其余编码', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: '000000', data: 1 }));
    await client.request<number>({
      method: 'GET',
      path: '/search',
      query: { a: 'x y', b: 42, c: true, d: null, e: undefined },
    });
    const url = String(fetchImpl.mock.calls[0]?.[0]);
    expect(url).toBe('https://openapi.chanjet.com/search?a=x+y&b=42&c=true');
  });

  it('query 数组值序列化为重复键', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: '000000', data: 1 }));
    await client.request<number>({
      method: 'GET',
      path: '/search',
      query: { ids: ['a', 2], tag: 'x' },
    });
    const url = String(fetchImpl.mock.calls[0]?.[0]);
    expect(url).toBe('https://openapi.chanjet.com/search?ids=a&ids=2&tag=x');
  });

  it('POST 请求体 JSON 序列化', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: '000000', data: 1 }));
    const body = { name: '张三', nested: { n: 1 } };
    await client.request({ method: 'POST', path: '/x', body });
    const init = fetchImpl.mock.calls[0]?.[1];
    expect(init?.method).toBe('POST');
    expect(JSON.parse(init?.body as string)).toEqual(body);
  });

  it('GET 请求体 JSON 序列化（官方 getInvoiceInfo 等接口需要 GET+Body）', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: '000000', data: 1 }));
    await client.request({ method: 'GET', path: '/x', body: { a: 1 } });
    expect(JSON.parse(fetchImpl.mock.calls[0]?.[1]?.body as string)).toEqual({ a: 1 });
  });

  it('携带 Header 四件套', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: '000000', data: 1 }));
    await client.request({ method: 'GET', path: '/x' });
    const headers = headersOf(fetchImpl.mock.calls[0]?.[1]);
    expect(headers.appKey).toBe('test-app-key');
    expect(headers.appSecret).toBe('test-app-secret');
    expect(headers.openToken).toBe('test-open-token');
    expect(headers['Content-Type']).toBe('application/json');
  });

  it('静态 openToken 优先于 tokenProvider', async () => {
    const tokenProvider: TokenProvider = { getOpenToken: vi.fn(async () => 'dynamic-token') };
    const { client, fetchImpl } = makeClient({ tokenProvider });
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: '000000', data: 1 }));
    await client.request({ method: 'GET', path: '/x' });
    expect(tokenProvider.getOpenToken).not.toHaveBeenCalled();
    expect(headersOf(fetchImpl.mock.calls[0]?.[1]).openToken).toBe('test-open-token');
  });

  it('无静态 openToken 时每次请求调用 tokenProvider 取最新值', async () => {
    const getOpenToken = vi.fn(async () => 'dynamic-token');
    const { client, fetchImpl } = makeClient({
      openToken: undefined,
      tokenProvider: { getOpenToken },
    });
    fetchImpl.mockImplementation(async () => jsonResponse({ code: '000000', data: 1 }));
    await client.request({ method: 'GET', path: '/x' });
    await client.request({ method: 'GET', path: '/y' });
    expect(getOpenToken).toHaveBeenCalledTimes(2);
    expect(headersOf(fetchImpl.mock.calls[1]?.[1]).openToken).toBe('dynamic-token');
  });

  it('tokenProvider 返回空 token 抛 ChanjetApiError', async () => {
    const { client } = makeClient({
      openToken: undefined,
      tokenProvider: { getOpenToken: async () => '' },
    });
    await expect(client.request({ method: 'GET', path: '/x' })).rejects.toThrow(
      'tokenProvider 返回了空 openToken',
    );
  });

  it('openToken 与 tokenProvider 皆缺时抛 TypeError', async () => {
    const { client } = makeClient({ openToken: undefined });
    await expect(client.request({ method: 'GET', path: '/x' })).rejects.toThrow(
      '未配置 openToken 或 tokenProvider',
    );
  });

  it('构造时 appKey 为空抛 TypeError', () => {
    expect(() => new ChanjetClient({ appKey: '', appSecret: 's', openToken: 't' })).toThrow(
      'appKey 不能为空',
    );
  });

  it('构造时 appSecret 为空抛 TypeError', () => {
    expect(() => new ChanjetClient({ appKey: 'k', appSecret: '', openToken: 't' })).toThrow(
      'appSecret 不能为空',
    );
  });
});

describe('ChanjetClient 成功判定', () => {
  it('code 为 000000 返回 data', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: '000000', data: { id: 7 } }));
    await expect(client.request<{ id: number }>({ method: 'GET', path: '/x' })).resolves.toEqual({
      id: 7,
    });
  });

  it('successful 为 true 视为成功（即使无 code）', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ successful: true, data: 'ok' }));
    await expect(client.request<string>({ method: 'GET', path: '/x' })).resolves.toBe('ok');
  });

  it('successful 为 false 视为失败', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(
      jsonResponse({ successful: false, code: '000000', data: {}, message: '失败' }),
    );
    await expect(client.request({ method: 'GET', path: '/x' })).rejects.toBeInstanceOf(
      ChanjetApiError,
    );
  });

  it('code 非 000000（无 successful）视为失败', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(
      jsonResponse({ code: 'openApi.e9000', data: [], message: '其它错误,详见详细信息' }),
    );
    const err = await client
      .request({ method: 'GET', path: '/x' })
      .catch((e: unknown) => e as ChanjetApiError);
    expect(err).toBeInstanceOf(ChanjetApiError);
    expect((err as ChanjetApiError).code).toBe('openApi.e9000');
    expect((err as ChanjetApiError).msg).toBe('其它错误,详见详细信息');
  });

  it('successful 为 true 时优先于 code 判定', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ successful: true, code: 'gl.e0001', data: 5 }));
    await expect(client.request<number>({ method: 'GET', path: '/x' })).resolves.toBe(5);
  });

  it('无外壳字段的扁平 2xx 响应视为成功并返回整个对象', async () => {
    const { client, fetchImpl } = makeClient();
    const flat = { bookid: '123', name: '日记账' };
    fetchImpl.mockResolvedValueOnce(jsonResponse(flat));
    await expect(
      client.request<typeof flat>({ method: 'GET', path: '/zjgl/rjz' }),
    ).resolves.toEqual(flat);
  });

  it('code 缺失或空视为成功（返回 data）', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ data: { a: 1 } }));
    await expect(client.request<{ a: number }>({ method: 'GET', path: '/x' })).resolves.toEqual({
      a: 1,
    });
  });
});

describe('ChanjetClient 错误处理', () => {
  it('HTTP 非 2xx 抛 ChanjetApiError，透传 body 与 httpStatus', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: '4001', msg: 'appKey不能为空' }, 500));
    const err = await client
      .request({ method: 'GET', path: '/x' })
      .catch((e: unknown) => e as ChanjetApiError);
    expect(err).toBeInstanceOf(ChanjetApiError);
    expect((err as ChanjetApiError).httpStatus).toBe(500);
    expect((err as ChanjetApiError).code).toBe('4001');
    expect((err as ChanjetApiError).msg).toBe('appKey不能为空');
  });

  it('HTTP 非 2xx 且响应体为 null 时不透传字段', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(new Response('null', { status: 500 }));
    const err = await client
      .request({ method: 'GET', path: '/x' })
      .catch((e: unknown) => e as ChanjetApiError);
    expect(err).toBeInstanceOf(ChanjetApiError);
    expect((err as ChanjetApiError).httpStatus).toBe(500);
    expect((err as ChanjetApiError).code).toBeUndefined();
    expect((err as ChanjetApiError).msg).toBeUndefined();
  });

  it('HTTP 非 2xx 无 msg/message 时 msg 为 undefined', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: '500' }, 500));
    const err = await client
      .request({ method: 'GET', path: '/x' })
      .catch((e: unknown) => e as ChanjetApiError);
    expect((err as ChanjetApiError).code).toBe('500');
    expect((err as ChanjetApiError).msg).toBeUndefined();
  });

  it('HTTP 非 2xx 透传 msgArgs', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(
      jsonResponse({ code: '500', msgArgs: { indexedValues: ['x'] } }, 500),
    );
    const err = await client
      .request({ method: 'GET', path: '/x' })
      .catch((e: unknown) => e as ChanjetApiError);
    expect((err as ChanjetApiError).msgArgs).toEqual({ indexedValues: ['x'] });
  });

  it('2xx 响应体为 null 视为成功并原样返回', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(new Response('null', { status: 200 }));
    await expect(client.request<null>({ method: 'GET', path: '/x' })).resolves.toBeNull();
  });

  it('HTTP 非 2xx 响应体为空对象时不透传 code/msg', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({}, 500));
    const err = await client
      .request({ method: 'GET', path: '/x' })
      .catch((e: unknown) => e as ChanjetApiError);
    expect((err as ChanjetApiError).code).toBeUndefined();
    expect((err as ChanjetApiError).msg).toBeUndefined();
  });

  it('HTTP 非 2xx 透传 requestId', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: '500', requestId: 'req-1' }, 500));
    const err = await client
      .request({ method: 'GET', path: '/x' })
      .catch((e: unknown) => e as ChanjetApiError);
    expect((err as ChanjetApiError).requestId).toBe('req-1');
  });

  it('业务失败无 msg/message 时使用缺省消息', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: 'openApi.e9000' }));
    const err = await client
      .request({ method: 'GET', path: '/x' })
      .catch((e: unknown) => e as ChanjetApiError);
    expect((err as ChanjetApiError).message).toBe('畅捷通 API 业务失败');
  });

  it('未注入 fetchImpl 时使用全局 fetch', async () => {
    const globalFetch = vi.fn(async () => jsonResponse({ code: '000000', data: 1 }));
    vi.stubGlobal('fetch', globalFetch);
    try {
      const client = new ChanjetClient({ appKey: 'k', appSecret: 's', openToken: 't' });
      await expect(client.request<number>({ method: 'GET', path: '/x' })).resolves.toBe(1);
      expect(globalFetch).toHaveBeenCalledTimes(1);
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it('错误消息与 url 不泄漏 appSecret/openToken', async () => {
    const { client, fetchImpl } = makeClient({
      appSecret: 'supersecret',
      openToken: 'opentokensecret',
    });
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: 'openApi.e9000', message: '业务失败' }));
    const err = await client
      .request({ method: 'GET', path: '/x' })
      .catch((e: unknown) => e as ChanjetApiError);
    expect((err as ChanjetApiError).message).not.toContain('supersecret');
    expect((err as ChanjetApiError).message).not.toContain('opentokensecret');
    expect((err as ChanjetApiError).url).not.toContain('supersecret');
    expect((err as ChanjetApiError).url).not.toContain('opentokensecret');
  });

  it('requestEnvelope 2xx 业务失败不判定成败，返回完整外壳', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: 'openApi.e9000', data: {} }));
    await expect(client.requestEnvelope({ method: 'GET', path: '/x' })).resolves.toEqual({
      code: 'openApi.e9000',
      data: {},
    });
  });

  it('requestEnvelope HTTP 非 2xx 仍抛 ChanjetApiError', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(jsonResponse({ code: '500', msg: '服务器内部错误' }, 500));
    await expect(client.requestEnvelope({ method: 'GET', path: '/x' })).rejects.toBeInstanceOf(
      ChanjetApiError,
    );
  });

  it('2xx 空响应体视为空对象，request 返回 undefined data', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(textResponse(''));
    await expect(client.request<unknown>({ method: 'GET', path: '/x' })).resolves.toEqual({});
  });

  it('2xx 非法 JSON 抛 ChanjetApiError', async () => {
    const { client, fetchImpl } = makeClient();
    fetchImpl.mockResolvedValueOnce(textResponse('not json'));
    await expect(client.request({ method: 'GET', path: '/x' })).rejects.toThrow(
      '响应体不是合法 JSON',
    );
  });
});

describe('ChanjetClient 超时与重试', () => {
  it('超时触发 AbortController，作为网络错误抛出（POST 不重试）', async () => {
    vi.useFakeTimers();
    const fetchImpl = vi.fn<typeof fetch>((_url, init) => {
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new Error('aborted')));
      });
    });
    const client = new ChanjetClient({
      appKey: 'k',
      appSecret: 's',
      openToken: 't',
      timeoutMs: 1000,
      fetchImpl,
    });
    const promise = client.request({ method: 'POST', path: '/x', body: {} });
    const assertion = expect(promise).rejects.toBeInstanceOf(ChanjetApiError);
    await vi.advanceTimersByTimeAsync(1000);
    await assertion;
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it('GET 网络错误指数退避重试，第 3 次成功', async () => {
    vi.useFakeTimers();
    const fetchImpl = vi
      .fn<typeof fetch>()
      .mockRejectedValueOnce(new Error('network down'))
      .mockRejectedValueOnce(new Error('network down'))
      .mockResolvedValueOnce(jsonResponse({ code: '000000', data: 'ok' }));
    const client = new ChanjetClient({ appKey: 'k', appSecret: 's', openToken: 't', fetchImpl });
    const promise = client.request<string>({ method: 'GET', path: '/x' });
    const assertion = expect(promise).resolves.toBe('ok');
    await vi.advanceTimersByTimeAsync(500);
    await vi.advanceTimersByTimeAsync(1000);
    await assertion;
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it('GET 网络错误重试 2 次后仍失败则抛出', async () => {
    vi.useFakeTimers();
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new Error('network down'));
    const client = new ChanjetClient({ appKey: 'k', appSecret: 's', openToken: 't', fetchImpl });
    const promise = client.request({ method: 'GET', path: '/x' });
    const assertion = expect(promise).rejects.toBeInstanceOf(ChanjetApiError);
    await vi.advanceTimersByTimeAsync(1500);
    await assertion;
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it('POST 网络错误不重试', async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new Error('network down'));
    const client = new ChanjetClient({ appKey: 'k', appSecret: 's', openToken: 't', fetchImpl });
    await expect(client.request({ method: 'POST', path: '/x', body: {} })).rejects.toBeInstanceOf(
      ChanjetApiError,
    );
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });
});
