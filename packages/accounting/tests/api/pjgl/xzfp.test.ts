import { describe, expect, it, vi, type Mock } from 'vitest';
import type { ChanjetClient } from '../../../src/client.js';
import { createXzfpApi } from '../../../src/api/pjgl/xzfp.js';

interface MockClient {
  request: Mock;
  requestEnvelope: Mock;
}

function makeClient(): MockClient {
  return {
    request: vi.fn(),
    requestEnvelope: vi.fn(),
  };
}

const BOOK_ID = '23456543';

describe('createXzfpApi', () => {
  describe('addAllInvoices（批量新增发票）', () => {
    it('映射 POST /accounting/invoice/Invoice/addAllInvoices/{bookid}，body 为发票数组', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      const body = [
        {
          custVendor: '用友政务',
          invoiceNo: '12345678',
          invoiceCode: '12345678',
          inOutTypeEnum: 'INCOMING',
          bizDate: '2018-10-10',
          comments: 'XX_BANK',
          noteTypeEnum: 'NORMORL_INVOICE',
          currencyId: 1001,
          taxNo: '1234445',
          taxPct: '12',
          totalAmountWithoutTax: '110',
          totalTax: '15',
          totalAmountWithTax: '125',
          baseTotalAmountWithoutTax: '110',
          baseTotalTax: '15',
          baseTotalAmountWithTax: '125',
          invoiceDetailVOs: [
            {
              invoiceProductName: '123',
              taxPct: '2',
              taxationItemEnum: '001',
              taxationMethodEnum: '001',
              baseAmountWithoutTax: '1',
              baseAmountWithTax: '2',
              baseTax: '1',
              amountWithTax: '2',
              amountWithoutTax: '1',
              tax: '1',
            },
          ],
        },
      ];

      client.request.mockResolvedValueOnce(undefined);
      await api.addAllInvoices(BOOK_ID, body);

      expect(client.request).toHaveBeenCalledWith({
        method: 'POST',
        path: '/accounting/invoice/Invoice/addAllInvoices/{bookid}',
        pathParams: { bookid: BOOK_ID },
        body,
      });
    });
  });

  describe('addInvoice（新增发票）', () => {
    it('映射 POST /accounting/invoice/Invoice/{bookid}，可选字段缺省时不携带', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      const body = {
        custVendor: '用友政务',
        invoiceNo: '12345678',
        inOutTypeEnum: 'INCOMING',
        bizDate: '2018-10-10',
        comments: 'XX_BANK',
        noteTypeEnum: 'NORMORL_INVOICE',
        currencyId: 1001,
        taxNo: '1234445',
        totalAmountWithoutTax: 110,
        totalTax: 15,
        totalAmountWithTax: 125,
        baseTotalAmountWithoutTax: 110,
        baseTotalTax: 15,
        baseTotalAmountWithTax: 125,
        invoiceDetailVOs: [
          {
            invoiceProductSpecNo: '盒装',
            taxPct: 0.13,
            taxationItemEnum: '001',
            taxationMethodEnum: '001',
            baseAmountWithoutTax: 1,
            baseAmountWithTax: 2,
            baseTax: 1,
            amountWithTax: 2,
            amountWithoutTax: 1,
            tax: 1,
          },
        ],
      };

      client.request.mockResolvedValueOnce({});
      await api.addInvoice(BOOK_ID, body);

      expect(client.request).toHaveBeenCalledWith({
        method: 'POST',
        path: '/accounting/invoice/Invoice/{bookid}',
        pathParams: { bookid: BOOK_ID },
        body,
      });
    });
  });

  describe('getFee（费用信息）', () => {
    it('映射 GET /accounting/wap/Invoice/getFee/{bookid}，query 为 id', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      client.request.mockResolvedValueOnce({});
      await api.getFee(BOOK_ID, { id: 1027981276086272 });

      expect(client.request).toHaveBeenCalledWith({
        method: 'GET',
        path: '/accounting/wap/Invoice/getFee/{bookid}',
        pathParams: { bookid: BOOK_ID },
        query: { id: 1027981276086272 },
      });
    });
  });

  describe('listInvoice（发票列表）', () => {
    it('映射 GET /accounting/wap/Invoice/listInvoice/{bookid}，query 透传', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      const query = {
        tenantId: '233344',
        periods: '202002-202002',
        page: 1,
        pageSize: 10,
        all: 'true',
      };
      client.request.mockResolvedValueOnce({});
      await api.listInvoice(BOOK_ID, query);

      expect(client.request).toHaveBeenCalledWith({
        method: 'GET',
        path: '/accounting/wap/Invoice/listInvoice/{bookid}',
        pathParams: { bookid: BOOK_ID },
        query,
      });
    });
  });

  describe('getInvoice（查询发票以及关联的凭证）', () => {
    it('映射 GET /accounting/wap/Invoice/getInvoice/{bookid}，query 为 id', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      client.request.mockResolvedValueOnce({});
      await api.getInvoice(BOOK_ID, { id: 1016408615419904 });

      expect(client.request).toHaveBeenCalledWith({
        method: 'GET',
        path: '/accounting/wap/Invoice/getInvoice/{bookid}',
        pathParams: { bookid: BOOK_ID },
        query: { id: 1016408615419904 },
      });
    });
  });

  describe('feeToVoucher（费用生成凭证）', () => {
    it('映射 POST /accounting/third/Invoice/feeToVoucher/{bookid}，无 body/query', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      client.request.mockResolvedValueOnce(true);
      await api.feeToVoucher(BOOK_ID);

      expect(client.request).toHaveBeenCalledWith({
        method: 'POST',
        path: '/accounting/third/Invoice/feeToVoucher/{bookid}',
        pathParams: { bookid: BOOK_ID },
      });
    });
  });

  describe('updateFee（修改费用单）', () => {
    it('映射 PUT /accounting/voucher/fee/{bookid}，无 body/query', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      client.request.mockResolvedValueOnce(undefined);
      await api.updateFee(BOOK_ID);

      expect(client.request).toHaveBeenCalledWith({
        method: 'PUT',
        path: '/accounting/voucher/fee/{bookid}',
        pathParams: { bookid: BOOK_ID },
      });
    });
  });

  describe('typeList（界面枚举值合集）', () => {
    it('映射 GET /accounting/third/Invoice/typeList/{bookid}，无 query', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      client.request.mockResolvedValueOnce({});
      await api.typeList(BOOK_ID);

      expect(client.request).toHaveBeenCalledWith({
        method: 'GET',
        path: '/accounting/third/Invoice/typeList/{bookid}',
        pathParams: { bookid: BOOK_ID },
      });
    });
  });

  describe('invoiceToVoucher（发票生成凭证）', () => {
    it('映射 POST /accounting/third/Invoice/invoiceToVoucher/{bookid}，无 body', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      client.request.mockResolvedValueOnce(true);
      await api.invoiceToVoucher(BOOK_ID);

      expect(client.request).toHaveBeenCalledWith({
        method: 'POST',
        path: '/accounting/third/Invoice/invoiceToVoucher/{bookid}',
        pathParams: { bookid: BOOK_ID },
      });
    });
  });

  describe('updateInvoice（修改发票）', () => {
    it('映射 PUT /accounting/invoice/Invoice/{bookid}，body 仅参数表字段', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      const body = {
        custVendor: '用友政务',
        invoiceNo: '12345678',
        inOutTypeEnum: 'INCOMING',
        baseTotalAmountWithoutTax: 110,
        baseTotalTax: 15,
      };

      client.request.mockResolvedValueOnce({});
      await api.updateInvoice(BOOK_ID, body);

      expect(client.request).toHaveBeenCalledWith({
        method: 'PUT',
        path: '/accounting/invoice/Invoice/{bookid}',
        pathParams: { bookid: BOOK_ID },
        body,
      });
    });
  });

  describe('allInvoice（发票汇总数据）', () => {
    it('映射 GET /accounting/wap/AutoInvoice/allInvoice/{bookid}，query 为 period', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      client.request.mockResolvedValueOnce({});
      await api.allInvoice(BOOK_ID, { period: '202005' });

      expect(client.request).toHaveBeenCalledWith({
        method: 'GET',
        path: '/accounting/wap/AutoInvoice/allInvoice/{bookid}',
        pathParams: { bookid: BOOK_ID },
        query: { period: '202005' },
      });
    });
  });

  describe('getInvoiceOrderStats（采集数电发票日志接口）', () => {
    it('映射 POST /accounting/invoice/BasicService/getInvoiceOrderStats/{bookid}，body 透传', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      const body = { beginPeriod: '202403', endPeriod: '202405', bookId: 270111111196950 };
      client.request.mockResolvedValueOnce([]);
      await api.getInvoiceOrderStats(BOOK_ID, body);

      expect(client.request).toHaveBeenCalledWith({
        method: 'POST',
        path: '/accounting/invoice/BasicService/getInvoiceOrderStats/{bookid}',
        pathParams: { bookid: BOOK_ID },
        body,
      });
    });

    it('业务错误码 invoice.e210 原样透传', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      const err = Object.assign(new Error('remote'), { code: 'invoice.e210', msg: '入参校验错误' });
      client.request.mockRejectedValueOnce(err);

      await expect(
        api.getInvoiceOrderStats(BOOK_ID, {
          beginPeriod: '202403',
          endPeriod: '202405',
          bookId: 1,
        }),
      ).rejects.toMatchObject({ code: 'invoice.e210' });
    });
  });

  describe('importData（上传文件接口）', () => {
    it('映射 POST /accounting/invoice/InvoiceScan/importData/{bookid}，body 透传', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      const body = { urls: [{ url: 'https://example.com/a.pdf' }], src: 'SCAN', client: 'FEISHU' };
      client.request.mockResolvedValueOnce({});
      await api.importData(BOOK_ID, body);

      expect(client.request).toHaveBeenCalledWith({
        method: 'POST',
        path: '/accounting/invoice/InvoiceScan/importData/{bookid}',
        pathParams: { bookid: BOOK_ID },
        body,
      });
    });
  });

  describe('deleteInvoice（删除发票）', () => {
    it('映射 DELETE /accounting/invoice/Invoice/{bookid}，query 为 id', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      client.request.mockResolvedValueOnce(undefined);
      await api.deleteInvoice(BOOK_ID, { id: 986453791475159 });

      expect(client.request).toHaveBeenCalledWith({
        method: 'DELETE',
        path: '/accounting/invoice/Invoice/{bookid}',
        pathParams: { bookid: BOOK_ID },
        query: { id: 986453791475159 },
      });
    });
  });

  describe('getInvoiceInfo（外部接口查询发票信息）', () => {
    it('映射 GET /accounting/invoice/invoiceSyn/getInvoiceInfo/{bookid}，body 为 invoiceStr', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      const body = {
        invoiceStr: '{"invoiceNo":"39164266","invoiceCode":"39164266","id":123123}',
      };
      client.request.mockResolvedValueOnce({});
      await api.getInvoiceInfo(BOOK_ID, body);

      expect(client.request).toHaveBeenCalledWith({
        method: 'GET',
        path: '/accounting/invoice/invoiceSyn/getInvoiceInfo/{bookid}',
        pathParams: { bookid: BOOK_ID },
        body,
      });
    });
  });

  describe('addInvoiceExternal（外部接口新增发票）', () => {
    it('映射 POST /accounting/invoice/invoiceSyn/addInvoice/{bookid}，body 透传', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      const body = {
        invoiceNo: '11111155',
        inOutTypeEnum: 'OUTGOING',
        notetypeenum: 'SPECIAL_INVOICE',
      };
      client.request.mockResolvedValueOnce({ id: 1590468789141504 });
      await api.addInvoiceExternal(BOOK_ID, body);

      expect(client.request).toHaveBeenCalledWith({
        method: 'POST',
        path: '/accounting/invoice/invoiceSyn/addInvoice/{bookid}',
        pathParams: { bookid: BOOK_ID },
        body,
      });
    });
  });

  describe('错误路径', () => {
    it('HTTP 状态错误透传', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      const httpError = Object.assign(new Error('HTTP 400'), { httpStatus: 400 });
      client.request.mockRejectedValueOnce(httpError);

      await expect(api.deleteInvoice(BOOK_ID, { id: 1 })).rejects.toMatchObject({
        httpStatus: 400,
      });
    });

    it('新增发票业务错误码透传', async () => {
      const client = makeClient();
      const api = createXzfpApi(client as unknown as ChanjetClient);

      const err = Object.assign(new Error('remote'), { code: 'invoice.e2004', msg: '' });
      client.request.mockRejectedValueOnce(err);

      await expect(
        api.addInvoice(BOOK_ID, {
          custVendor: 'x',
          invoiceNo: '1',
          inOutTypeEnum: 'INCOMING',
          bizDate: '2020-01-01',
          comments: '',
          noteTypeEnum: 'NORMORL_INVOICE',
          currencyId: 100001,
          taxNo: '1',
          totalAmountWithoutTax: 1,
          totalTax: 1,
          totalAmountWithTax: 1,
          baseTotalAmountWithoutTax: 1,
          baseTotalTax: 1,
          baseTotalAmountWithTax: 1,
          invoiceDetailVOs: [],
        }),
      ).rejects.toMatchObject({ code: 'invoice.e2004' });
    });
  });
});
