import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient, RequestOptions } from '@chanjet-openapi/core';
import { createHkjrjzxrApi } from '../../../src/api/zjgl/hkjrjzxr.js';

function makeClient() {
  const request = vi.fn<(options: RequestOptions) => Promise<unknown>>();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createHkjrjzxrApi', () => {
  it('映射路径参数与请求体', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue(1503375158542336);
    const api = createHkjrjzxrApi(client);

    const jsonObject = { code: '000000' };
    await api.journalWrite({ bookid: 'bk1', jsonObject });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/acctgplt/CashJournal/outside/journalWrite/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { jsonObject },
    });
  });

  it('错误路径：request 拒绝时向外抛错', async () => {
    const { client, request } = makeClient();
    request.mockRejectedValue(new Error('boom'));
    const api = createHkjrjzxrApi(client);

    await expect(api.journalWrite({ bookid: 'bk1', jsonObject: {} })).rejects.toThrow('boom');
  });
});
