import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createHkjxzxggzApi } from '../../../src/api/hkjgz/hkjxzxggz.js';

function setup() {
  const request = vi.fn();
  const client = { request } as unknown as ChanjetClient;
  return { client, request };
}

const requiredBody = {
  name: 'MrLuoTest',
  department: 'cc',
  identificationType: '居民身份证',
  identificationNo: '230802199208180910',
  country: '中国',
  sex: '男',
  birthday: '1992-08-18',
  phone: '15555555555',
  empStatus: '正常',
  acctgPeriod: '202107',
};

describe('createHkjxzxggzApi', () => {
  it('以 POST 请求新增/修改工资，映射 path/pathParams/body（bookid 不入 body）', async () => {
    const { client, request } = setup();
    request.mockResolvedValue({ name: 'MrLTest1', acctgPeriod: '202108' });
    const api = createHkjxzxggzApi(client);

    const result = await api.addEmployee({ bookid: '123', ...requiredBody });

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/payroll/payrollEmployee/outside/addEmployee/{bookid}',
      pathParams: { bookid: '123' },
      body: requiredBody,
    });
    expect(result).toEqual({ name: 'MrLTest1', acctgPeriod: '202108' });
  });

  it('可选参数传入时透传到 body', async () => {
    const { client, request } = setup();
    request.mockResolvedValue({});
    const api = createHkjxzxggzApi(client);

    await api.addEmployee({
      bookid: '123',
      ...requiredBody,
      payrollId: 'p1',
      employTime: '2021-07-01',
      employmentType: '雇员',
      isDeductExpenseDecuced: 1,
      payRollPubSubs: [{ code: 'jbgz', value: '5000', key: '*基本工资', type: '' }],
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        body: {
          ...requiredBody,
          payrollId: 'p1',
          employTime: '2021-07-01',
          employmentType: '雇员',
          isDeductExpenseDecuced: 1,
          payRollPubSubs: [{ code: 'jbgz', value: '5000', key: '*基本工资', type: '' }],
        },
      }),
    );
  });

  it('远端错误向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('业务失败'), { code: 'E10001', msg: '新增失败' });
    request.mockRejectedValue(err);
    const api = createHkjxzxggzApi(client);

    await expect(api.addEmployee({ bookid: '123', ...requiredBody })).rejects.toBe(err);
  });
});
