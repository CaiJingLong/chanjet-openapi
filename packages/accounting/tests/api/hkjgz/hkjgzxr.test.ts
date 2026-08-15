import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjgzxrApi } from '../../../src/api/hkjgz/hkjgzxr.js';

function setup() {
  const request = vi.fn();
  const client = { request } as unknown as ChanjetClient;
  return { client, request };
}

describe('createHkjgzxrApi', () => {
  it('以 POST 请求工资写入，映射 path/pathParams（无 body/query）', async () => {
    const { client, request } = setup();
    request.mockResolvedValue({ acctgPeriod: '202108', name: 'MrLTest1' });
    const api = createHkjgzxrApi(client);

    const result = await api.payrollWrite({ bookid: '123' });

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/payroll/payrollEmployee/outside/payrollWrite/{bookid}',
      pathParams: { bookid: '123' },
    });
    expect(result).toEqual({ acctgPeriod: '202108', name: 'MrLTest1' });
  });

  it('远端错误向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('业务失败'), { code: 'E10001', msg: '写入失败' });
    request.mockRejectedValue(err);
    const api = createHkjgzxrApi(client);

    await expect(api.payrollWrite({ bookid: '123' })).rejects.toBe(err);
  });
});
