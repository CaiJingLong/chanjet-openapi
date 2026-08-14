import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createPzpzApi } from '../../../src/api/sz/pzpz.js';

function makeClient() {
  const request = vi.fn();
  return { request, client: { request } as unknown as ChanjetClient };
}

describe('createPzpzApi', () => {
  it('getAcctgTransCategory 映射 path/query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue([]);
    const api = createPzpzApi(client);

    await api.getAcctgTransCategory({ bookid: '90001', status: 'A' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/acctgTransCategory/{bookid}',
      pathParams: { bookid: '90001' },
      query: { status: 'A' },
    });
  });

  it('getAcctgTransCategory 可选 status 缺省时不传 query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue([]);
    const api = createPzpzApi(client);

    await api.getAcctgTransCategory({ bookid: '90001' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/acctgTransCategory/{bookid}',
      pathParams: { bookid: '90001' },
      query: undefined,
    });
  });

  it('getDocSetting 映射 path/query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({ map: {} });
    const api = createPzpzApi(client);

    await api.getDocSetting({ bookid: '90001', settingName: 'PUBLIC' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/acctgplt/getDocSetting/{bookid}',
      pathParams: { bookid: '90001' },
      query: { settingName: 'PUBLIC' },
    });
  });

  it('saveSettingValue 映射 path', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createPzpzApi(client);

    await api.saveSettingValue({ bookid: '90001' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/setup/SettingValue/{bookid}',
      pathParams: { bookid: '90001' },
    });
  });

  it('upsertAcctgTransSettings 映射 path', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createPzpzApi(client);

    await api.upsertAcctgTransSettings({ bookId: '90001' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/acctgplt/upsertAcctgTransSettings/{bookId}',
      pathParams: { bookId: '90001' },
    });
  });

  it('disableCategory 映射 path/query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createPzpzApi(client);

    await api.disableCategory({ bookid: '90001', id: '100004' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/acctgTransCategory/disableCategory/{bookid}',
      pathParams: { bookid: '90001' },
      query: { id: '100004' },
    });
  });

  it('updatePayRollSettings 映射 path', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createPzpzApi(client);

    await api.updatePayRollSettings({ bookid: '90001' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/acctgplt/updatePayRollSettings/{bookid}',
      pathParams: { bookid: '90001' },
    });
  });

  it('enableCategory 可选 id 缺省时不传 query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createPzpzApi(client);

    await api.enableCategory({ bookid: '90001' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/acctgTransCategory/enableCategory/{bookid}',
      pathParams: { bookid: '90001' },
      query: undefined,
    });
  });

  it('传播 client.request 的异常（错误路径）', async () => {
    const { request, client } = makeClient();
    request.mockRejectedValue(new Error('gl.e9004'));
    const api = createPzpzApi(client);

    await expect(api.disableCategory({ bookid: '1', id: '100001' })).rejects.toThrow('gl.e9004');
  });
});
