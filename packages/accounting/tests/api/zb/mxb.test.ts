import { describe, it, expect, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createMxbApi } from '../../../src/api/zb/mxb.js';

function makeClient() {
  const request = vi.fn();
  const requestEnvelope = vi.fn();
  const client = { request, requestEnvelope } as unknown as ChanjetClient;
  return { client, request, requestEnvelope };
}

const queryPagingRequired = {
  queryParam: '{"startPeriod":"202504","endPeriod":"202512","pageNum":1,"pageSize":20}',
  pageSize: '20',
  pageCount: '1',
  subsidiaryTag: '0',
  startPeriod: '202504',
  endPeriod: '202512',
  startGlAccountCode: '1001',
  endGlAccountCode: '1001',
};

describe('createMxbApi', () => {
  describe('queryPaging', () => {
    it('映射 GET 路径与 query 参数', async () => {
      const { client, requestEnvelope } = makeClient();
      requestEnvelope.mockResolvedValue({ totalCount: '1', data: [] });
      const api = createMxbApi(client);

      await api.queryPaging('book123', queryPagingRequired);

      expect(requestEnvelope).toHaveBeenCalledTimes(1);
      const options = requestEnvelope.mock.calls[0]![0];
      expect(options.method).toBe('GET');
      expect(options.path).toBe('/accounting/gl/SubsidiaryLedge/queryPaging/{bookid}');
      expect(options.pathParams).toEqual({ bookid: 'book123' });
      expect(options.query).toEqual(queryPagingRequired);
    });

    it('可选参数缺省时不加入 query', async () => {
      const { client, requestEnvelope } = makeClient();
      requestEnvelope.mockResolvedValue({});
      const api = createMxbApi(client);

      await api.queryPaging('b', queryPagingRequired);

      const query = requestEnvelope.mock.calls[0]![0].query as Record<string, unknown>;
      expect(query).not.toHaveProperty('onlyDisplayLeaf');
      expect(query).not.toHaveProperty('queryType');
      expect(query).not.toHaveProperty('showAssistant');
    });

    it('可选参数显式传入时透传', async () => {
      const { client, requestEnvelope } = makeClient();
      requestEnvelope.mockResolvedValue({});
      const api = createMxbApi(client);

      await api.queryPaging('b', {
        ...queryPagingRequired,
        onlyDisplayLeaf: true,
        queryType: 'simple',
        showAssistant: true,
      });

      const query = requestEnvelope.mock.calls[0]![0].query as Record<string, unknown>;
      expect(query.onlyDisplayLeaf).toBe(true);
      expect(query.queryType).toBe('simple');
      expect(query.showAssistant).toBe(true);
    });

    it('传播 client.requestEnvelope 抛出的错误', async () => {
      const { client, requestEnvelope } = makeClient();
      const err = new Error('boom');
      requestEnvelope.mockRejectedValue(err);
      const api = createMxbApi(client);

      await expect(api.queryPaging('b', queryPagingRequired)).rejects.toBe(err);
    });
  });

  describe('query（序时账）', () => {
    it('将 object 型 queryParam 序列化为 JSON 串', async () => {
      const { client, requestEnvelope } = makeClient();
      requestEnvelope.mockResolvedValue({ data: [], totalCount: 0 });
      const api = createMxbApi(client);

      await api.query('book1', { queryParam: { startPeriod: '202106', endPeriod: '202106' } });

      const options = requestEnvelope.mock.calls[0]![0];
      expect(options.method).toBe('GET');
      expect(options.path).toBe('/accounting/gl/ChronologicBook/query/{bookid}');
      expect(options.pathParams).toEqual({ bookid: 'book1' });
      expect(options.query).toEqual({
        queryParam: '{"startPeriod":"202106","endPeriod":"202106"}',
      });
    });

    it('传播 client.requestEnvelope 抛出的错误', async () => {
      const { client, requestEnvelope } = makeClient();
      requestEnvelope.mockRejectedValue(new Error('boom'));
      const api = createMxbApi(client);

      await expect(api.query('b', { queryParam: {} })).rejects.toThrow('boom');
    });
  });

  describe('queryGlSubDetail', () => {
    it('映射 POST 路径与请求体', async () => {
      const { client, request } = makeClient();
      request.mockResolvedValue({ dataList: [], totalCount: 0 });
      const api = createMxbApi(client);

      const params = {
        startPeriod: '202408',
        pageCount: 1,
        startTreeLevel: 1,
        endPeriod: '202408',
        containsDisable: true,
        queryItemData: { project_id: ['1871223410526162'] },
        endTreeLevel: 6,
        glAccountId: 2853644307791977,
        pageSize: 200,
        typeIdList: ['1', '2', '3', '4', '5'],
        showSubInfo: true,
      };

      await api.queryGlSubDetail(2853644307791977, params);

      const options = request.mock.calls[0]![0];
      expect(options.method).toBe('POST');
      expect(options.path).toBe('/accounting/gl/Ledge/queryGlSubDetail/{bookid}');
      expect(options.pathParams).toEqual({ bookid: 2853644307791977 });
      expect(options.body).toEqual(params);
    });

    it('传播 client.request 抛出的错误', async () => {
      const { client, request } = makeClient();
      request.mockRejectedValue(new Error('boom'));
      const api = createMxbApi(client);

      await expect(api.queryGlSubDetail(1, { pageCount: 1, pageSize: 20 })).rejects.toThrow('boom');
    });
  });

  describe('queryPagingJson', () => {
    it('映射 POST 路径与请求体', async () => {
      const { client, request } = makeClient();
      request.mockResolvedValue({ data: [], totalCount: 0 });
      const api = createMxbApi(client);

      const params = {
        queryType: 'simple',
        startPeriod: '202603',
        endPeriod: '202603',
        startGlAccountCode: '1001',
        endGlAccountCode: '1001',
        pageCount: 1,
        pageSize: 200,
      };

      await api.queryPagingJson('book1', params);

      const options = request.mock.calls[0]![0];
      expect(options.method).toBe('POST');
      expect(options.path).toBe('/accounting/gl/SubsidiaryLedge/queryPagingJson/{bookid}');
      expect(options.pathParams).toEqual({ bookid: 'book1' });
      expect(options.body).toEqual(params);
    });

    it('传播 client.request 抛出的错误', async () => {
      const { client, request } = makeClient();
      request.mockRejectedValue(new Error('boom'));
      const api = createMxbApi(client);

      await expect(api.queryPagingJson('b', { pageCount: 1, pageSize: 20 })).rejects.toThrow(
        'boom',
      );
    });
  });
});
