import { describe, it, expect, vi, type Mock } from 'vitest';
import { createPzxz00001Api } from '../../../src/api/cwxg/pzxz00001.js';
import type { ChanjetClient } from '../../../src/client.js';

function makeClient(): { client: ChanjetClient; request: Mock } {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createPzxz00001Api', () => {
  it('createCarryForwardAcctgTrans 映射 POST path 与 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ id: 1794691116564480 });
    const api = createPzxz00001Api(client);

    await api.createCarryForwardAcctgTrans({
      bookid: 'bk1',
      acctgTransCategoryId: 100001,
      acctgPeriod: '202203',
      bizTypeId: 100501,
      code: '001',
      carryForwardTemplateEnum: 'final1',
      boName: 'AcctgTrans',
      bizDate: 1646880088000,
      isCodeType: true,
      details: [{ comments: '张三做凭证', basePostedDr: 50 }],
      categoryCodeExist: true,
      isFinal: false,
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/AcctgTrans1/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: {
        acctgTransCategoryId: 100001,
        acctgPeriod: '202203',
        bizTypeId: 100501,
        code: '001',
        carryForwardTemplateEnum: 'final1',
        boName: 'AcctgTrans',
        bizDate: 1646880088000,
        isCodeType: true,
        details: [{ comments: '张三做凭证', basePostedDr: 50 }],
        categoryCodeExist: true,
        isFinal: false,
      },
    });
  });

  it('createSubsidiaryAcctgTrans 映射 POST path 与 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ id: 1789987457073152 });
    const api = createPzxz00001Api(client);

    await api.createSubsidiaryAcctgTrans({
      bookid: 'bk1',
      acctgTransCategoryId: 100001,
      acctgPeriod: '202207',
      bizTypeId: 100501,
      code: '003',
      boName: 'AcctgTrans',
      bizDate: 1657781002000,
      isCodeType: true,
      details: [{ basePostedDr: '50' }],
      categoryCodeExist: true,
      isFinal: false,
      origCreatedUserName: '张三',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/AcctgTrans5/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: {
        acctgTransCategoryId: 100001,
        acctgPeriod: '202207',
        bizTypeId: 100501,
        code: '003',
        boName: 'AcctgTrans',
        bizDate: 1657781002000,
        isCodeType: true,
        details: [{ basePostedDr: '50' }],
        categoryCodeExist: true,
        isFinal: false,
        origCreatedUserName: '张三',
      },
    });
  });

  it('createSubsidiaryAcctgTrans 携带 refVoucherId 时发送', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createPzxz00001Api(client);

    await api.createSubsidiaryAcctgTrans({
      bookid: 'bk1',
      acctgTransCategoryId: 100001,
      acctgPeriod: '202207',
      bizTypeId: 100501,
      code: '003',
      boName: 'AcctgTrans',
      bizDate: 1657781002000,
      refVoucherId: 3521142805364788,
      refVoucherCode: '888888',
      isCodeType: true,
      details: [],
      categoryCodeExist: true,
      isFinal: false,
      origCreatedUserName: '张三',
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({
          refVoucherId: 3521142805364788,
          refVoucherCode: '888888',
        }),
      }),
    );
  });

  it('createNonSubsidiaryAcctgTrans 缺省 attachmentList 时不发送', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createPzxz00001Api(client);

    await api.createNonSubsidiaryAcctgTrans({
      bookid: 'bk1',
      acctgTransCategoryId: 100001,
      acctgPeriod: '202203',
      bizTypeId: 100501,
      code: '002',
      boName: 'AcctgTrans',
      bizDate: 1646880088000,
      isCodeType: true,
      details: [{ basePostedDr: '50' }],
      categoryCodeExist: true,
      isFinal: false,
      origCreatedUserName: '张三',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/AcctgTrans3/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: {
        acctgTransCategoryId: 100001,
        acctgPeriod: '202203',
        bizTypeId: 100501,
        code: '002',
        boName: 'AcctgTrans',
        bizDate: 1646880088000,
        isCodeType: true,
        details: [{ basePostedDr: '50' }],
        categoryCodeExist: true,
        isFinal: false,
        origCreatedUserName: '张三',
      },
    });
  });

  it('createNonSubsidiaryAcctgTrans 携带 attachmentList 时发送', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createPzxz00001Api(client);

    const attachmentList = [
      {
        extendData: {
          attachmentName: 'Untitled.pdf',
          attachmentSize: '328169',
          attachmentSuffix: 'pdf',
        },
      },
    ];
    await api.createNonSubsidiaryAcctgTrans({
      bookid: 'bk1',
      acctgTransCategoryId: 100001,
      acctgPeriod: '202203',
      bizTypeId: 100501,
      code: '002',
      boName: 'AcctgTrans',
      bizDate: 1646880088000,
      isCodeType: true,
      attachmentList,
      details: [],
      categoryCodeExist: true,
      isFinal: false,
      origCreatedUserName: '张三',
    });

    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        body: expect.objectContaining({ attachmentList }),
      }),
    );
  });

  it('createRefVoucherAcctgTrans 映射 POST path 与 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createPzxz00001Api(client);

    await api.createRefVoucherAcctgTrans({
      bookid: 'bk1',
      acctgPeriod: '202207',
      code: '003',
      boName: 'AcctgTrans',
      bizDate: 1657781002000,
      refBoName: 'CashJournalEntry',
      refVoucherIds: ['1', '2'],
      isCodeType: true,
      categoryCodeExist: true,
      origCreatedUserName: '张三',
      acctgTransCategoryId: 100001,
      bizTypeId: 100501,
      details: [{ basePostedDr: '50' }],
      isFinal: false,
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/AcctgTrans4/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: {
        acctgPeriod: '202207',
        code: '003',
        boName: 'AcctgTrans',
        bizDate: 1657781002000,
        refBoName: 'CashJournalEntry',
        refVoucherIds: ['1', '2'],
        isCodeType: true,
        categoryCodeExist: true,
        origCreatedUserName: '张三',
        acctgTransCategoryId: 100001,
        bizTypeId: 100501,
        details: [{ basePostedDr: '50' }],
        isFinal: false,
      },
    });
  });

  it('createForeignCurrencyAcctgTrans 映射 POST path 与 body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({});
    const api = createPzxz00001Api(client);

    await api.createForeignCurrencyAcctgTrans({
      bookid: 'bk1',
      acctgTransCategoryId: 100001,
      acctgPeriod: '202207',
      bizTypeId: 100501,
      code: '003',
      boName: 'AcctgTrans',
      bizDate: 1657781002000,
      isCodeType: true,
      details: [{ exchangeRate: '7.0067', basePostedDr: 50 }],
      categoryCodeExist: true,
      isFinal: false,
      origCreatedUserName: '张三',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/AcctgTrans6/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: {
        acctgTransCategoryId: 100001,
        acctgPeriod: '202207',
        bizTypeId: 100501,
        code: '003',
        boName: 'AcctgTrans',
        bizDate: 1657781002000,
        isCodeType: true,
        details: [{ exchangeRate: '7.0067', basePostedDr: 50 }],
        categoryCodeExist: true,
        isFinal: false,
        origCreatedUserName: '张三',
      },
    });
  });

  it('queryCurrencyExchangeByPeriod 映射 GET path 与 query', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createPzxz00001Api(client);

    await api.queryCurrencyExchangeByPeriod({ bookid: 'bk1', currencyId: '10036', year: '2022' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/acctgplt/CurrencyExchange/queryByPeriod/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { currencyId: '10036', year: '2022' },
    });
  });

  it('externalFileUploadAcctgTransAttachment 映射 POST path 与 body 数组', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ data: [], success: true });
    const api = createPzxz00001Api(client);

    const items = [
      {
        acctgTransId: 2714085523196666,
        isItCovered: false,
        details: [
          {
            externalFileUrl: 'https://x.com/a.pdf',
            fileType: 'pdf',
            fileName: '如何写作',
            attachmentSize: 65,
          },
        ],
      },
    ];
    await api.externalFileUploadAcctgTransAttachment({ bookid: 'bk1', items });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/AcctgTrans/externalFileUploadAcctgTransAttachment/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: items,
    });
  });

  it('createCarryForwardAcctgTrans 透传业务错误', async () => {
    const { client, request } = makeClient();
    const err = { code: 'gl.e0001', msg: '', httpStatus: 400 };
    request.mockRejectedValue(err);
    const api = createPzxz00001Api(client);

    await expect(
      api.createCarryForwardAcctgTrans({
        bookid: 'bk1',
        acctgTransCategoryId: 100001,
        acctgPeriod: '202203',
        bizTypeId: 100501,
        code: '001',
        carryForwardTemplateEnum: 'final1',
        boName: 'AcctgTrans',
        bizDate: 1646880088000,
        isCodeType: true,
        details: [],
        categoryCodeExist: true,
        isFinal: false,
      }),
    ).rejects.toBe(err);
  });
});
