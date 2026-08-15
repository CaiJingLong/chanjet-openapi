import { describe, expect, it, vi, type Mock } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import { createPjhzApi } from '../../../src/api/pjgl/pjhz.js';

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

const BOOK_ID = '233344';

const FULL_BODY = {
  userId: 100000001,
  deptId: 200000001,
  showAuth: true,
  myCust: true,
  codeOrName: '助记码或名称',
  period: '201903',
  pageCount: 0,
  pageSize: 10,
};

describe('createPjhzApi.billSummaryPage', () => {
  it('映射 POST /accounting/easyacctg/bill/billSummaryPage/{bookid} 的路径参数与请求体', async () => {
    const client = makeClient();
    const api = createPjhzApi(client as unknown as ChanjetClient);

    client.request.mockResolvedValueOnce({ count: 1, list: [] });
    await api.billSummaryPage(BOOK_ID, FULL_BODY);

    expect(client.request).toHaveBeenCalledTimes(1);
    expect(client.request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/easyacctg/bill/billSummaryPage/{bookid}',
      pathParams: { bookid: BOOK_ID },
      body: FULL_BODY,
    });
  });

  it('业务码错误原样透传，不被吞掉', async () => {
    const client = makeClient();
    const api = createPjhzApi(client as unknown as ChanjetClient);

    const bizError = Object.assign(new Error('remote error'), {
      code: 'invoice.e2004',
      msg: '入参错误',
    });
    client.request.mockRejectedValueOnce(bizError);

    const promise = api.billSummaryPage(BOOK_ID, FULL_BODY);
    await expect(promise).rejects.toBe(bizError);
    await expect(promise).rejects.toMatchObject({ code: 'invoice.e2004' });
  });

  it('HTTP 状态错误透传', async () => {
    const client = makeClient();
    const api = createPjhzApi(client as unknown as ChanjetClient);

    const httpError = Object.assign(new Error('HTTP 500'), { httpStatus: 500 });
    client.request.mockRejectedValueOnce(httpError);

    await expect(api.billSummaryPage(BOOK_ID, FULL_BODY)).rejects.toMatchObject({
      httpStatus: 500,
    });
  });
});
