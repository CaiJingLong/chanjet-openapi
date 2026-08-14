import { describe, it, expect, vi, type Mock } from 'vitest';
import { createPzApi } from '../../../src/api/cwxg/pz.js';
import type { ChanjetClient } from '../../../src/client.js';

function makeClient(): { client: ChanjetClient; request: Mock } {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createPzApi', () => {
  it('getInitBalanceList 映射 GET path、pathParams 与 query', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createPzApi(client);

    await api.getInitBalanceList({ bookid: 'bk1', bookId: 1495768378114048 });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/glaccount/getInitBalanceList/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { bookId: 1495768378114048 },
    });
  });

  it('initAcctgTrans 映射 POST path 与 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ acctgPeriod: '201801' });
    const api = createPzApi(client);

    await api.initAcctgTrans({ bookid: 'bk1', period: '201801', acctgTransCategoryId: 100001 });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/AcctgTrans/init/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { period: '201801', acctgTransCategoryId: 100001 },
    });
  });

  it('initAcctgTrans 缺省可选 body 字段时不发送', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createPzApi(client);

    await api.initAcctgTrans({ bookid: 'bk1' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/AcctgTrans/init/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: {},
    });
  });

  it('modifyAcctgTrans 映射 PUT path、query 与 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createPzApi(client);

    await api.modifyAcctgTrans({
      bookid: 'bk1',
      isInsert: false,
      isSave: false,
      acctgTransCategoryId: '100001',
      acctgPeriod: '202203',
      code: '001',
      bizDate: 1646841600000,
      details: [{ comments: '张三修改凭证', basePostedDr: 50 }],
      id: 1796979547045888,
      origCreatedUserName: '张三',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'PUT',
      path: '/accounting/gl/AcctgTrans/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { isInsert: false, isSave: false },
      body: {
        acctgTransCategoryId: '100001',
        acctgPeriod: '202203',
        code: '001',
        bizDate: 1646841600000,
        details: [{ comments: '张三修改凭证', basePostedDr: 50 }],
        id: 1796979547045888,
        origCreatedUserName: '张三',
      },
    });
  });

  it('modifyAcctgTrans 缺省 isInsert 与可选 body 字段时不发送', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createPzApi(client);

    await api.modifyAcctgTrans({
      bookid: 'bk1',
      isSave: false,
      acctgTransCategoryId: '100001',
      acctgPeriod: '202203',
      code: '001',
      bizDate: 1646841600000,
      details: [],
      id: 1796979547045888,
      origCreatedUserName: '张三',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'PUT',
      path: '/accounting/gl/AcctgTrans/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { isSave: false },
      body: {
        acctgTransCategoryId: '100001',
        acctgPeriod: '202203',
        code: '001',
        bizDate: 1646841600000,
        details: [],
        id: 1796979547045888,
        origCreatedUserName: '张三',
      },
    });
  });

  it('acctgTransFuzzySearch 映射 GET path 与 query', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ result: [], totalCount: '0' });
    const api = createPzApi(client);

    await api.acctgTransFuzzySearch({ bookid: 'bk1', searchParam: '{"period":"202006"}' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/AcctgTrans/acctgTransFuzzySearch/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { searchParam: '{"period":"202006"}' },
    });
  });

  it('acctgTransFuzzySearch 结果透传 comments 字段', async () => {
    const { client, request } = makeClient();
    const data = { result: [{ comments: '凭证日期', voucherNo: '001' }], totalCount: '1' };
    request.mockResolvedValue(data);
    const api = createPzApi(client);

    await expect(api.acctgTransFuzzySearch({ bookid: 'bk1', searchParam: '{}' })).resolves.toBe(
      data,
    );
  });

  it('printAcctgTrans 映射 POST query 全字段', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ resultObj: 'http://x.pdf' });
    const api = createPzApi(client);

    await api.printAcctgTrans({
      bookid: 'bk1',
      printStyle: 'style',
      printCount: '1',
      voucherIds: [1, 2],
      addCover: true,
      addLogo: false,
      rowSize: 5,
      leftMargin: 60,
      rightMargin: 26,
      topMargin: 40,
      bottomMargin: 40,
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/AcctgTrans/printAcctgTrans/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: {
        printStyle: 'style',
        printCount: '1',
        voucherIds: [1, 2],
        addCover: true,
        addLogo: false,
        rowSize: 5,
        leftMargin: 60,
        rightMargin: 26,
        topMargin: 40,
        bottomMargin: 40,
      },
    });
  });

  it('countByPeriod 映射 GET query', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ count: '1' });
    const api = createPzApi(client);

    await api.countByPeriod({ bookid: 'bk1', startPeriod: '201801', endPeriod: '201812' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/AcctgTrans/countByPeriod/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { startPeriod: '201801', endPeriod: '201812' },
    });
  });

  it('listAcctgTransCategory 缺省 status 时 query 为空', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createPzApi(client);

    await api.listAcctgTransCategory({ bookid: 'bk1' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/acctgTransCategory/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: {},
    });
  });

  it('listAcctgTransCategory 携带 status', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createPzApi(client);

    await api.listAcctgTransCategory({ bookid: 'bk1', status: 'A' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/acctgTransCategory/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { status: 'A' },
    });
  });

  it('getAttcList 映射 GET query', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createPzApi(client);

    await api.getAttcList({ bookid: 'bk1', acctgTransId: 123 });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/AcctgTrans/getAttcList/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { acctgTransId: 123 },
    });
  });

  it('removeAcctgTrans 映射 DELETE path 与 query', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createPzApi(client);

    await api.removeAcctgTrans({ bookid: 'bk1', acctgTransId: 123 });

    expect(request).toHaveBeenCalledWith({
      method: 'DELETE',
      path: '/accounting/gl/AcctgTrans/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { acctgTransId: 123 },
    });
  });

  it('acctgTransExactSearch 映射 GET query', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ result: [], totalCount: 0 });
    const api = createPzApi(client);

    await api.acctgTransExactSearch({ bookid: 'bk1', searchParam: '{"period":"202510"}' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/AcctgTrans/acctgTransExactSearch/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { searchParam: '{"period":"202510"}' },
    });
  });

  it('enableCategory 映射 POST query id', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createPzApi(client);

    await api.enableCategory({ bookid: 'bk1', id: '100004' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/acctgTransCategory/enableCategory/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { id: '100004' },
    });
  });

  it('disableCategory 映射 POST query id', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createPzApi(client);

    await api.disableCategory({ bookid: 'bk1', id: '100004' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/acctgTransCategory/disableCategory/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { id: '100004' },
    });
  });

  it('batchRemove 映射 DELETE body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createPzApi(client);

    await api.batchRemove({ bookid: 'bk1', removeIdArray: [1894648442389506, 1905943138795551] });

    expect(request).toHaveBeenCalledWith({
      method: 'DELETE',
      path: '/accounting/gl/AcctgTrans/batchRemove/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { removeIdArray: [1894648442389506, 1905943138795551] },
    });
  });

  it('saveAttc 映射 POST query 与 body 数组', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createPzApi(client);

    const attachments = [
      { attachmentName: '学生信息.pdf', attachmentSize: 1564, attachmentSuffix: 'pdf' },
    ];
    await api.saveAttc({ bookid: 'bk1', acctgTransId: 2547856987451, attachments });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/AcctgTrans/saveAttc/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { acctgTransId: 2547856987451 },
      body: attachments,
    });
  });

  it('getVoucherByIds 映射 POST body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ data: [], success: true });
    const api = createPzApi(client);

    await api.getVoucherByIds({
      bookid: 'bk1',
      acctgTransIds: [3479615651841002, 3493558237003778],
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/AcctgTrans/getVoucherByIds/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { acctgTransIds: [3479615651841002, 3493558237003778] },
    });
  });

  it('getRefInfoByAcctgTransIds 映射 POST body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ code: '0', data: [], success: true });
    const api = createPzApi(client);

    await api.getRefInfoByAcctgTransIds({ bookid: 'bk1', acctgTransIds: ['1', '2'] });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/acctgplt/getRefInfoByAcctgTransIds/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { acctgTransIds: ['1', '2'] },
    });
  });

  it('getVoucherById 映射 GET query', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ code: '000000', successful: true });
    const api = createPzApi(client);

    await api.getVoucherById({ bookid: 'bk1', voucherId: '3355675510966224' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/AcctgTrans/getVoucherById/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { voucherId: '3355675510966224' },
    });
  });

  it('getNewAttcList 映射 GET query', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createPzApi(client);

    await api.getNewAttcList({ bookid: 'bk1', acctgTransId: 123 });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/AcctgTrans/getNewAttcList/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { acctgTransId: 123 },
    });
  });

  it('getVoucherById 透传业务错误 gl.e0001', async () => {
    const { client, request } = makeClient();
    const err = { code: 'gl.e0001', msg: '', httpStatus: 400 };
    request.mockRejectedValue(err);
    const api = createPzApi(client);

    await expect(api.getVoucherById({ bookid: 'bk1', voucherId: 'x' })).rejects.toBe(err);
  });
});
