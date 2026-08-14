import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createHkjgzjqcxApi } from '../../../src/api/hkjgz/hkjgzjqcx.js';

function setup() {
  const request = vi.fn();
  const client = { request } as unknown as ChanjetClient;
  return { client, request };
}

describe('createHkjgzjqcxApi', () => {
  it('以 GET 请求精确查询工资，映射 path/pathParams/query', async () => {
    const { client, request } = setup();
    request.mockResolvedValue({ name: '李四', id: 1504877990903808 });
    const api = createHkjgzjqcxApi(client);

    const result = await api.getPayrollList({
      bookid: '123',
      acctgPeriod: '202107',
      identificationNo: '230802199208180910',
    });

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/payroll/payrollEmployee/outside/getPayrollList/{bookid}',
      pathParams: { bookid: '123' },
      query: { acctgPeriod: '202107', identificationNo: '230802199208180910' },
    });
    expect(result).toEqual({ name: '李四', id: 1504877990903808 });
  });

  it('远端 HTTP 错误向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('请求失败'), {
      code: '000001',
      msg: '账套不存在',
      httpStatus: 500,
    });
    request.mockRejectedValue(err);
    const api = createHkjgzjqcxApi(client);

    await expect(
      api.getPayrollList({
        bookid: '123',
        acctgPeriod: '202107',
        identificationNo: '230802199208180910',
      }),
    ).rejects.toBe(err);
  });

  it('远端业务错误向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('业务失败'), { code: 'E10001', msg: '查询失败' });
    request.mockRejectedValue(err);
    const api = createHkjgzjqcxApi(client);

    await expect(
      api.getPayrollList({
        bookid: '123',
        acctgPeriod: '202107',
        identificationNo: '230802199208180910',
      }),
    ).rejects.toBe(err);
  });
});
