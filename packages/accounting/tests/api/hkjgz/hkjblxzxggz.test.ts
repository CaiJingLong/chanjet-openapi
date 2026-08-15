import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjblxzxggzApi } from '../../../src/api/hkjgz/hkjblxzxggz.js';

function setup() {
  const request = vi.fn();
  const client = { request } as unknown as ChanjetClient;
  return { client, request };
}

describe('createHkjblxzxggzApi', () => {
  it('以 POST 请求批量新增/修改工资，映射 path/pathParams/body', async () => {
    const { client, request } = setup();
    request.mockResolvedValue([{ name: '张三', acctgPeriod: '202107' }]);
    const api = createHkjblxzxggzApi(client);

    const employees = [
      {
        name: '张三',
        department: 'cc',
        identificationType: '居民身份证',
        identificationNo: '230802199208180910',
        country: '中国',
        sex: '男',
        birthday: '1992-08-18',
        phone: '15555555555',
        empStatus: '正常',
        payRollPubSubs: [{ code: 'jbgz', value: '5000', key: '*基本工资', type: '' }],
        acctgPeriod: '202107',
      },
    ];
    const result = await api.addBatchEmployee({ bookid: '123', employees });

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/payroll/payrollEmployee/outside/addBatchEmployee/{bookid}',
      pathParams: { bookid: '123' },
      body: employees,
    });
    expect(result).toEqual([{ name: '张三', acctgPeriod: '202107' }]);
  });

  it('可选参数缺省时不写入 body', async () => {
    const { client, request } = setup();
    request.mockResolvedValue([]);
    const api = createHkjblxzxggzApi(client);

    await api.addBatchEmployee({
      bookid: '123',
      employees: [
        {
          name: '李四',
          department: 'cc',
          identificationType: '居民身份证',
          identificationNo: '230802199208180910',
          country: '中国',
          sex: '女',
          birthday: '1990-01-01',
          phone: '15555555556',
          empStatus: '正常',
          acctgPeriod: '202107',
        },
      ],
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        body: [
          {
            name: '李四',
            department: 'cc',
            identificationType: '居民身份证',
            identificationNo: '230802199208180910',
            country: '中国',
            sex: '女',
            birthday: '1990-01-01',
            phone: '15555555556',
            empStatus: '正常',
            acctgPeriod: '202107',
          },
        ],
      }),
    );
  });

  it('远端错误向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('业务失败'), {
      code: 'E10001',
      msg: '无效的数据',
      httpStatus: 400,
    });
    request.mockRejectedValue(err);
    const api = createHkjblxzxggzApi(client);

    await expect(
      api.addBatchEmployee({
        bookid: '123',
        employees: [
          {
            name: '李四',
            department: 'cc',
            identificationType: '居民身份证',
            identificationNo: '230802199208180910',
            country: '中国',
            sex: '女',
            birthday: '1990-01-01',
            phone: '15555555556',
            empStatus: '正常',
            acctgPeriod: '202107',
          },
        ],
      }),
    ).rejects.toBe(err);
  });
});
