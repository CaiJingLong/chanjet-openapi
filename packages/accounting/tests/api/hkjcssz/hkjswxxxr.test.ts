import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createHkjswxxxrApi } from '../../../src/api/hkjcssz/hkjswxxxr.js';

function setup() {
  const request = vi.fn();
  const client = { request } as unknown as ChanjetClient;
  return { client, request };
}

describe('createHkjswxxxrApi', () => {
  it('以 POST 请求写入税务信息，映射 path/pathParams，无 query/body', async () => {
    const { client, request } = setup();
    request.mockResolvedValue({ message: '写入数据成功' });
    const api = createHkjswxxxrApi(client);

    const result = await api.taxSettingSave({ bookid: '123' });

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/accounting/outside/taxSetting/save/{bookid}',
      pathParams: { bookid: '123' },
    });
    expect(result).toEqual({ message: '写入数据成功' });
  });

  it('远端 HTTP 错误向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('请求失败'), {
      code: '000001',
      msg: '写入失败',
      httpStatus: 500,
      url: '/accounting/accounting/outside/taxSetting/save/123',
    });
    request.mockRejectedValue(err);
    const api = createHkjswxxxrApi(client);

    await expect(api.taxSettingSave({ bookid: '123' })).rejects.toBe(err);
  });

  it('远端业务错误（code 非 0）向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('业务失败'), {
      code: 'E10001',
      msg: '写入失败',
    });
    request.mockRejectedValue(err);
    const api = createHkjswxxxrApi(client);

    await expect(api.taxSettingSave({ bookid: '123' })).rejects.toBe(err);
  });
});
