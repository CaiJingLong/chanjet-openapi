import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createHkjxzxggdzcApi } from '../../../src/api/hkjgdzc/hkjxzxggdzc.js';

function makeMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

const requiredParams = {
  bookid: '123',
  code: '000001',
  name: '电脑',
  fixedAssetTypeId: '1482527592808606',
  accuquiredPeriod: '202002',
  depnPatternEnum: 'STRAIGHT_LINE',
  baseOriginalValue: '1',
  usefulLifeMonths: '36',
  salvageValuePct: '0.05',
};

describe('createHkjxzxggdzcApi', () => {
  it('映射路径参数与必填请求体', async () => {
    const { client, request } = makeMockClient();
    request.mockResolvedValue(1);

    const api = createHkjxzxggdzcApi(client);
    await api.add(requiredParams);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/asset/FixedAsset/outside/add/{bookid}',
      pathParams: { bookid: '123' },
      body: {
        code: '000001',
        name: '电脑',
        fixedAssetTypeId: '1482527592808606',
        accuquiredPeriod: '202002',
        depnPatternEnum: 'STRAIGHT_LINE',
        baseOriginalValue: '1',
        usefulLifeMonths: '36',
        salvageValuePct: '0.05',
        expenseGlAccountId: undefined,
        expenseGlSubAccountId: undefined,
        depnGlAccountId: undefined,
        depnGlSubAccountId: undefined,
        bizEmployeeId: undefined,
        departmentId: undefined,
        place: undefined,
        specNo: undefined,
        entryPeriod: undefined,
        quantity: undefined,
        baseOpenningDepnAmount: undefined,
        baseCurrentDepnAmount: undefined,
      },
    });
  });

  it('可选参数缺省时为 undefined', async () => {
    const { client, request } = makeMockClient();
    request.mockResolvedValue(1);

    const api = createHkjxzxggdzcApi(client);
    await api.add({ ...requiredParams, specNo: '3.5米' });

    const options = request.mock.calls[0]![0];
    expect(options.body.specNo).toBe('3.5米');
    expect(options.body.departmentId).toBeUndefined();
  });

  it('传递 HTTP 错误状态码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('Bad Request'), { httpStatus: 400 });
    request.mockRejectedValue(error);

    const api = createHkjxzxggdzcApi(client);
    await expect(api.add(requiredParams)).rejects.toMatchObject({ httpStatus: 400 });
  });

  it('传递业务错误码', async () => {
    const { client, request } = makeMockClient();
    const error = Object.assign(new Error('业务失败'), { code: 'E008', msg: '业务失败' });
    request.mockRejectedValue(error);

    const api = createHkjxzxggdzcApi(client);
    await expect(api.add(requiredParams)).rejects.toMatchObject({ code: 'E008' });
  });
});
