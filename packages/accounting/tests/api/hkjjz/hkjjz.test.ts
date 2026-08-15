import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createHkjjzApi } from '../../../src/api/hkjjz/hkjjz.js';

function setup() {
  const request = vi.fn();
  const requestEnvelope = vi.fn();
  const client = { request, requestEnvelope } as unknown as ChanjetClient;
  return { client, request, requestEnvelope };
}

describe('createHkjjzApi', () => {
  describe('checkOut', () => {
    it('以 POST 结账，映射 path/pathParams/body', async () => {
      const { client, request } = setup();
      request.mockResolvedValue({ isshowPrompt: false, message: '亲,结账成功' });
      const api = createHkjjzApi(client);

      const result = await api.checkOut({ bookid: '123', period: '202107', isReOrg: false });

      expect(request).toHaveBeenCalledTimes(1);
      expect(request).toHaveBeenCalledWith({
        method: 'POST',
        path: '/accounting/gl/CheckOut/outside/checkOut/{bookid}',
        pathParams: { bookid: '123' },
        body: { period: '202107', isReOrg: false },
      });
      expect(result).toEqual({ isshowPrompt: false, message: '亲,结账成功' });
    });

    it('远端 HTTP 错误向上传播', async () => {
      const { client, request } = setup();
      const err = Object.assign(new Error('请求失败'), {
        code: '500',
        msg: '系统异常',
        httpStatus: 500,
        url: '/accounting/gl/CheckOut/outside/checkOut/123',
      });
      request.mockRejectedValue(err);
      const api = createHkjjzApi(client);

      await expect(api.checkOut({ bookid: '123', period: '202107', isReOrg: false })).rejects.toBe(
        err,
      );
    });

    it('远端业务错误（code 非 000000）向上传播', async () => {
      const { client, request } = setup();
      const err = Object.assign(new Error('业务失败'), { code: '000001', msg: '结账失败' });
      request.mockRejectedValue(err);
      const api = createHkjjzApi(client);

      await expect(api.checkOut({ bookid: '123', period: '202107', isReOrg: false })).rejects.toBe(
        err,
      );
    });
  });

  describe('checkOutPeriod', () => {
    it('以 GET 查询结账期间，映射 path/pathParams', async () => {
      const { client, requestEnvelope } = setup();
      requestEnvelope.mockResolvedValue({
        closePeriod: '201711',
        data: ['201712', '201801'],
        lastVoucherPeriod: ['201805'],
      });
      const api = createHkjjzApi(client);

      const result = await api.checkOutPeriod({ bookid: '123' });

      expect(requestEnvelope).toHaveBeenCalledTimes(1);
      expect(requestEnvelope).toHaveBeenCalledWith({
        method: 'GET',
        path: '/accounting/gl/CheckOut/checkOutPeriod/{bookid}',
        pathParams: { bookid: '123' },
      });
      expect(result).toEqual({
        closePeriod: '201711',
        data: ['201712', '201801'],
        lastVoucherPeriod: ['201805'],
      });
    });

    it('远端错误向上传播', async () => {
      const { client, requestEnvelope } = setup();
      const err = Object.assign(new Error('请求失败'), { code: '000001', msg: '账套不存在' });
      requestEnvelope.mockRejectedValue(err);
      const api = createHkjjzApi(client);

      await expect(api.checkOutPeriod({ bookid: '123' })).rejects.toBe(err);
    });
  });

  describe('queryLog', () => {
    it('以 POST 查询财务月结操作日志，映射 path/pathParams/body', async () => {
      const { client, requestEnvelope } = setup();
      requestEnvelope.mockResolvedValue({
        total: 1,
        data: [{ operationContent: '202302结账' }],
      });
      const api = createHkjjzApi(client);

      const result = await api.queryLog({
        bookid: '123',
        page: 1,
        pageSize: 100,
        params: [
          { name: 'operationTime', from: '1681920000000', to: '1681920000000', type: 'between' },
        ],
      });

      expect(requestEnvelope).toHaveBeenCalledTimes(1);
      expect(requestEnvelope).toHaveBeenCalledWith({
        method: 'POST',
        path: '/accounting/syslog/queryLog/{bookid}',
        pathParams: { bookid: '123' },
        body: {
          page: 1,
          pageSize: 100,
          params: [
            { name: 'operationTime', from: '1681920000000', to: '1681920000000', type: 'between' },
          ],
        },
      });
      expect(result).toEqual({
        total: 1,
        data: [{ operationContent: '202302结账' }],
      });
    });

    it('type=value 时仍需携带必填 from/to（参数表为准）', async () => {
      const { client, requestEnvelope } = setup();
      requestEnvelope.mockResolvedValue({ total: 0, data: [] });
      const api = createHkjjzApi(client);

      await api.queryLog({
        bookid: '123',
        page: 1,
        pageSize: 100,
        params: [{ name: 'resourceId', from: '1681920000000', to: '1681920000000', type: 'value' }],
      });

      expect(requestEnvelope).toHaveBeenCalledWith(
        expect.objectContaining({
          body: {
            page: 1,
            pageSize: 100,
            params: [
              { name: 'resourceId', from: '1681920000000', to: '1681920000000', type: 'value' },
            ],
          },
        }),
      );
    });

    it('远端错误向上传播', async () => {
      const { client, requestEnvelope } = setup();
      const err = Object.assign(new Error('业务失败'), { code: '000001', msg: '查询失败' });
      requestEnvelope.mockRejectedValue(err);
      const api = createHkjjzApi(client);

      await expect(
        api.queryLog({
          bookid: '123',
          page: 1,
          pageSize: 100,
          params: [],
        }),
      ).rejects.toBe(err);
    });
  });
});
