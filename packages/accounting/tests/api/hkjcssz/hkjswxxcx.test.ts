import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createHkjswxxcxApi } from '../../../src/api/hkjcssz/hkjswxxcx.js';

function setup() {
  const request = vi.fn();
  const client = { request } as unknown as ChanjetClient;
  return { client, request };
}

describe('createHkjswxxcxApi', () => {
  it('以 POST 请求查询税务信息，映射 path/pathParams/query', async () => {
    const { client, request } = setup();
    request.mockResolvedValue({ taxpayerTypeEnum: 'SMALL_TAXPAYER' });
    const api = createHkjswxxcxApi(client);

    const result = await api.taxSettingQuery({ bookid: '1490881242333184', period: '202107' });

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/accounting/outside/taxSetting/query/{bookid}',
      pathParams: { bookid: '1490881242333184' },
      query: { period: '202107' },
    });
    expect(result).toEqual({ taxpayerTypeEnum: 'SMALL_TAXPAYER' });
  });

  it('返回完整的嵌套税务信息结构', async () => {
    const { client, request } = setup();
    request.mockResolvedValue({
      taxpayerTypeEnum: 'SMALL_TAXPAYER',
      tenantHkjId: 1490881242333184,
      id: 1546701314588672,
      hkjTaxTypeVOs: [
        {
          tenantHkjVersionId: 1546701314588672,
          taxTypeId: 1,
          tenantId: 1490881242333184,
          id: 1546701314588673,
          taxSettingVOs: [
            {
              taxItemCode: 'enum_nsqx',
              tenantId: 1490881242333184,
              id: 1546701314588686,
              tenantHkjTaxTypeId: 1546701314588673,
              taxItemValueJson: { '2': '季' },
              taxItemId: 1,
            },
            {
              taxItemCode: 'value_jjdjbl_zzs',
              numericalValue: 0,
              tenantId: 1490881242333184,
              id: 1546701314588688,
              tenantHkjTaxTypeId: 1546701314588673,
              taxItemValueJson: {},
              taxItemId: 24,
            },
          ],
        },
      ],
      showSyncPrompt: true,
    });
    const api = createHkjswxxcxApi(client);

    const result = await api.taxSettingQuery({ bookid: '1', period: '202107' });

    expect(result.hkjTaxTypeVOs?.[0]?.taxSettingVOs?.[1]?.numericalValue).toBe(0);
    expect(result.hkjTaxTypeVOs?.[0]?.taxSettingVOs?.[0]?.taxItemValueJson).toEqual({ '2': '季' });
  });

  it('远端 HTTP 错误向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('请求失败'), {
      code: '000001',
      msg: '期间无效',
      httpStatus: 500,
      url: '/accounting/accounting/outside/taxSetting/query/123',
    });
    request.mockRejectedValue(err);
    const api = createHkjswxxcxApi(client);

    await expect(api.taxSettingQuery({ bookid: '123', period: '202107' })).rejects.toBe(err);
  });

  it('远端业务错误（code 非 0）向上传播', async () => {
    const { client, request } = setup();
    const err = Object.assign(new Error('业务失败'), {
      code: 'E10001',
      msg: '期间无效',
    });
    request.mockRejectedValue(err);
    const api = createHkjswxxcxApi(client);

    await expect(api.taxSettingQuery({ bookid: '123', period: '202107' })).rejects.toBe(err);
  });
});
