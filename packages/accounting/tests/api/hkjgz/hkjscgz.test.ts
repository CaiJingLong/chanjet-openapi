import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjscgzApi } from '../../../src/api/hkjgz/hkjscgz.js';

function setup() {
  const request = vi.fn();
  const client = { request } as unknown as ChanjetClient;
  return { client, request };
}

describe('createHkjscgzApi', () => {
  it('以 POST 请求删除工资，映射 path/pathParams/body', async () => {
    const { client, request } = setup();
    request.mockResolvedValue(undefined);
    const api = createHkjscgzApi(client);

    const result = await api.deletePayrollList({
      bookid: '123',
      payrollIdList: ['1504775314341888', '1504775314341889'],
    });

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/payroll/payrollEmployee/outside/deletePayrollList/{bookid}',
      pathParams: { bookid: '123' },
      body: { payrollIdList: ['1504775314341888', '1504775314341889'] },
    });
    expect(result).toBeUndefined();
  });

  it('远端错误向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('业务失败'), { code: 'E10001', msg: '删除失败' });
    request.mockRejectedValue(err);
    const api = createHkjscgzApi(client);

    await expect(
      api.deletePayrollList({ bookid: '123', payrollIdList: ['1504775314341888'] }),
    ).rejects.toBe(err);
  });
});
