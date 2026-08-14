import { describe, it, expect, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createKmyebApi } from '../../../src/api/zb/kmyeb.js';

function makeClient() {
  const request = vi.fn();
  const client = { request } as unknown as ChanjetClient;
  return { client, request };
}

describe('createKmyebApi', () => {
  describe('rpt（查询科目余额表）', () => {
    it('映射 POST 路径与请求体', async () => {
      const { client, request } = makeClient();
      request.mockResolvedValue([]);
      const api = createKmyebApi(client);

      const params = {
        period: '201801-201801',
        type: '1',
        showAssistant: true,
        showHidden: true,
        showYearAcc: true,
        onlyShowLeaf: false,
        startGlAccountCode: '1101',
        endGlAccountCode: '1201',
        showEmptyRow: true,
      };

      await api.rpt('book123', params);

      const options = request.mock.calls[0]![0];
      expect(options.method).toBe('POST');
      expect(options.path).toBe('/accounting/gl/balance/rpt/{bookid}');
      expect(options.pathParams).toEqual({ bookid: 'book123' });
      expect(options.body).toEqual(params);
    });

    it('单科目查询传 glAccountCode 时不要求 startGlAccountCode/endGlAccountCode', async () => {
      const { client, request } = makeClient();
      request.mockResolvedValue([]);
      const api = createKmyebApi(client);

      await api.rpt('b', {
        period: '201801-201801',
        type: '0',
        glAccountCode: '1001',
        startGlAccountCode: '',
        endGlAccountCode: '',
      });

      expect(request.mock.calls[0]![0].body).toEqual({
        period: '201801-201801',
        type: '0',
        glAccountCode: '1001',
        startGlAccountCode: '',
        endGlAccountCode: '',
      });
    });

    it('传播 client.request 抛出的错误', async () => {
      const { client, request } = makeClient();
      request.mockRejectedValue(new Error('boom'));
      const api = createKmyebApi(client);

      await expect(
        api.rpt('b', {
          period: '201801-201801',
          type: '0',
          startGlAccountCode: '1101',
          endGlAccountCode: '1201',
        }),
      ).rejects.toThrow('boom');
    });
  });

  describe('queryGlSubBalance', () => {
    it('映射 POST 路径与请求体', async () => {
      const { client, request } = makeClient();
      request.mockResolvedValue({ data: [], subTypeCodes: [] });
      const api = createKmyebApi(client);

      const params = {
        period: '202408-202408',
        glSubAccountTypeId: 0,
        showYearAmount: false,
        queryItemData: { project_id: ['1871223410526162'] },
        glAccountId: 2853644307791977,
      };

      await api.queryGlSubBalance('book1', params);

      const options = request.mock.calls[0]![0];
      expect(options.method).toBe('POST');
      expect(options.path).toBe('/accounting/gl/Ledge/queryGlSubBalance/{bookid}');
      expect(options.pathParams).toEqual({ bookid: 'book1' });
      expect(options.body).toEqual(params);
    });

    it('可选参数缺省时不加入请求体', async () => {
      const { client, request } = makeClient();
      request.mockResolvedValue({});
      const api = createKmyebApi(client);

      await api.queryGlSubBalance('b', { period: '202408-202408', glSubAccountTypeId: 0 });

      const body = request.mock.calls[0]![0].body as Record<string, unknown>;
      expect(body).not.toHaveProperty('showYearAmount');
      expect(body).not.toHaveProperty('queryItemData');
      expect(body).not.toHaveProperty('glAccountId');
    });

    it('传播 client.request 抛出的错误', async () => {
      const { client, request } = makeClient();
      request.mockRejectedValue(new Error('boom'));
      const api = createKmyebApi(client);

      await expect(
        api.queryGlSubBalance('b', { period: '202408-202408', glSubAccountTypeId: 0 }),
      ).rejects.toThrow('boom');
    });
  });
});
