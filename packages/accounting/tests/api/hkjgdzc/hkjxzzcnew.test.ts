import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjxzzcnewApi } from '../../../src/api/hkjgdzc/hkjxzzcnew.js';

function makeMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

const requiredParams = {
  bookid: '123',
  code: '000391',
  name: '新增一个资产',
  fixedAssetArchivesAttributeId: 10001,
  fixedAssetTypeId: 2553495358932371,
  depnPatternEnum: 'STRAIGHT_LINE',
  usefulLifeMonthsCnt: 240,
  baseOriginalAmount: '10000',
  accuquiredPeriod: '202401',
  entryPeriod: '202401',
  salvageValuePct: '5',
};

describe('createHkjxzzcnewApi', () => {
  it('映射路径参数与必填请求体', async () => {
    const { client, request } = makeMockClient();
    request.mockResolvedValue(1);

    const api = createHkjxzzcnewApi(client);
    await api.addFixedAsset(requiredParams);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/asset/fixedAssetRestructure/addFixedAsset/{bookid}',
      pathParams: { bookid: '123' },
      body: {
        code: '000391',
        name: '新增一个资产',
        fixedAssetArchivesAttributeId: 10001,
        fixedAssetTypeId: 2553495358932371,
        expenseGlAccountId: undefined,
        depnGlAccountId: undefined,
        quantity: undefined,
        specNo: undefined,
        depnPatternEnum: 'STRAIGHT_LINE',
        usefulLifeMonthsCnt: 240,
        baseOriginalAmount: '10000',
        baseOpenningDepnAmount: undefined,
        baseCurrentDepnAmount: undefined,
        accuquiredPeriod: '202401',
        entryPeriod: '202401',
        salvageValuePct: '5',
        place: undefined,
        bizEmployeeId: undefined,
        departmentId: undefined,
      },
    });
  });

  it('可选参数缺省时为 undefined', async () => {
    const { client, request } = makeMockClient();
    request.mockResolvedValue(1);

    const api = createHkjxzzcnewApi(client);
    await api.addFixedAsset({ ...requiredParams, quantity: '10' });

    const options = request.mock.calls[0]![0];
    expect(options.body.quantity).toBe('10');
    expect(options.body.specNo).toBeUndefined();
  });

  it('传递 HTTP 错误状态码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('Bad Request'), { httpStatus: 400 });
    request.mockRejectedValue(error);

    const api = createHkjxzzcnewApi(client);
    await expect(api.addFixedAsset(requiredParams)).rejects.toMatchObject({ httpStatus: 400 });
  });

  it('传递业务错误码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('业务失败'), { code: 'E009', msg: '业务失败' });
    request.mockRejectedValue(error);

    const api = createHkjxzzcnewApi(client);
    await expect(api.addFixedAsset(requiredParams)).rejects.toMatchObject({ code: 'E009' });
  });
});
