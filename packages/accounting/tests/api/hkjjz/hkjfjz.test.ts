import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createHkjfjzApi } from '../../../src/api/hkjjz/hkjfjz.js';

function setup() {
  const request = vi.fn();
  const client = { request } as unknown as ChanjetClient;
  return { client, request };
}

describe('createHkjfjzApi', () => {
  it('unCheckOut 以 POST 反结账，映射 path/pathParams/body', async () => {
    const { client, request } = setup();
    request.mockResolvedValue({ message: '亲,反结账成功' });
    const api = createHkjfjzApi(client);

    const result = await api.unCheckOut({ bookid: '123', period: '202107' });

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/CheckOut/outside/unCheckOut/{bookid}',
      pathParams: { bookid: '123' },
      body: { period: '202107' },
    });
    expect(result).toEqual({ message: '亲,反结账成功' });
  });

  it('远端 HTTP 错误向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('请求失败'), {
      code: '500',
      msg: '系统异常',
      httpStatus: 500,
      url: '/accounting/gl/CheckOut/outside/unCheckOut/123',
    });
    request.mockRejectedValue(err);
    const api = createHkjfjzApi(client);

    await expect(api.unCheckOut({ bookid: '123', period: '202107' })).rejects.toBe(err);
  });

  it('远端业务错误（code 非 000000）向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('业务失败'), {
      code: '000001',
      msg: '反结账失败',
    });
    request.mockRejectedValue(err);
    const api = createHkjfjzApi(client);

    await expect(api.unCheckOut({ bookid: '123', period: '202107' })).rejects.toBe(err);
  });
});
