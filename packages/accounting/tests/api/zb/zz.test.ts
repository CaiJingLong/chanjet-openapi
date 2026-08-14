import { describe, it, expect, vi } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createZzApi } from '../../../src/api/zb/zz.js';

function makeClient() {
  const request = vi.fn();
  const client = { request } as unknown as ChanjetClient;
  return { client, request };
}

describe('createZzApi', () => {
  describe('query（总账查询）', () => {
    it('映射 GET 路径并将 object 型 queryParam 序列化为 JSON 串', async () => {
      const { client, request } = makeClient();
      request.mockResolvedValue([]);
      const api = createZzApi(client);

      await api.query('book123', { queryParam: { startPeriod: '201801', endPeriod: '201812' } });

      const options = request.mock.calls[0]![0];
      expect(options.method).toBe('GET');
      expect(options.path).toBe('/accounting/gl/TotalLedge/query/{bookid}');
      expect(options.pathParams).toEqual({ bookid: 'book123' });
      expect(options.query).toEqual({
        queryParam: '{"startPeriod":"201801","endPeriod":"201812"}',
      });
    });

    it('传播 client.request 抛出的错误', async () => {
      const { client, request } = makeClient();
      request.mockRejectedValue(new Error('boom'));
      const api = createZzApi(client);

      await expect(api.query('b', { queryParam: {} })).rejects.toThrow('boom');
    });
  });
});
