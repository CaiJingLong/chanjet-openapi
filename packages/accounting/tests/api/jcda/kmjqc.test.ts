import { describe, it, expect, vi, type Mock } from 'vitest';
import { createKmjqcApi } from '../../../src/api/jcda/kmjqc.js';
import type { ChanjetClient } from '../../../src/client.js';

function makeClient(): { client: ChanjetClient; request: Mock } {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createKmjqcApi', () => {
  it('getInitBalanceList 映射 GET path 与 query', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createKmjqcApi(client);

    await api.getInitBalanceList({ bookid: 'bk1', bookId: 1495768378114048 });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/glaccount/getInitBalanceList/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { bookId: 1495768378114048 },
    });
  });

  it('getInitBalanceLists 缺省可选检索条件时 query 为空', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createKmjqcApi(client);

    await api.getInitBalanceLists({ bookid: 'bk1' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/glaccount/getInitBalanceLists/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: {},
    });
  });

  it('getInitBalanceLists 携带检索条件', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createKmjqcApi(client);

    await api.getInitBalanceLists({
      bookid: 'bk1',
      searchText: '银行',
      code: '1001',
      name: '现金',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/glaccount/getInitBalanceLists/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { searchText: '银行', code: '1001', name: '现金' },
    });
  });

  it('trialBalance 映射 GET path 且缺省 isReorg', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ isBalanceSheetBalanced: true });
    const api = createKmjqcApi(client);

    await api.trialBalance({ bookid: 'bk1' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/BalanceSheet/trialBalance/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: {},
    });
  });

  it('addGlAccount 映射 POST body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ id: 1795881636593878 });
    const api = createKmjqcApi(client);

    const glAccount = [
      {
        code: '1045',
        name: '一级科目',
        drCrDirection: 1,
        glAccountClassId: '1',
        hasSubsidiaryAccounting: false,
        hasForeignCurrency: false,
        hasQtyAccunting: 'false',
      },
    ];
    await api.addGlAccount({ bookid: 'bk1', glAccount, assistantTypes: ['10006', '10001'] });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/glaccount/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { glAccount, assistantTypes: ['10006', '10001'] },
    });
  });

  it('addAssistaccounting 映射 POST body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ '0': 1527968808828929 });
    const api = createKmjqcApi(client);

    await api.addAssistaccounting({
      bookid: 'bk1',
      tag: 3,
      subAccountBalance: { code: '100201', baseEndingBalance: '1500.00' },
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/subaccountbalance/addAssistaccounting/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { tag: 3, subAccountBalance: { code: '100201', baseEndingBalance: '1500.00' } },
    });
  });

  it('getSubAccountInitBalanceLists 映射 GET query', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue([]);
    const api = createKmjqcApi(client);

    await api.getSubAccountInitBalanceLists({
      bookid: 'bk1',
      bookId: 1495768378114048,
      glAccountCode: '101204',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/subaccountbalance/getInitBalanceLists/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { bookId: 1495768378114048, glAccountCode: '101204' },
    });
  });

  it('updateBalanceDuiaWang 映射 POST body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue(21323214342432);
    const api = createKmjqcApi(client);

    await api.updateBalanceDuiaWang({ bookid: 'bk1', glAccount: { baseEndingBalance: 1 } });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/balance/updateBalanceDuiaWang/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { glAccount: { baseEndingBalance: 1 } },
    });
  });

  it('updateAccountDuia 映射 POST body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ result: true });
    const api = createKmjqcApi(client);

    await api.updateAccountDuia({
      bookid: 'bk1',
      glAccount: { code: '104501', name: '子级科目2', hasSubsidiaryAccounting: false },
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/glaccount/updateAccountDuia/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { glAccount: { code: '104501', name: '子级科目2', hasSubsidiaryAccounting: false } },
    });
  });

  it('addAssistaccountingToJSONObject 映射 POST body', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ '0': 1908129947844631 });
    const api = createKmjqcApi(client);

    await api.addAssistaccountingToJSONObject({
      bookid: 'bk1',
      tag: 3,
      subAccountBalance: { code: '100201' },
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/gl/subaccountbalance/addAssistaccountingToJSONObject/{bookid}',
      pathParams: { bookid: 'bk1' },
      body: { tag: 3, subAccountBalance: { code: '100201' } },
    });
  });

  it('getInitBalanceListsToJSONObject 映射 GET query', async () => {
    const { client, request } = makeClient();
    request.mockResolvedValue({ datas: [] });
    const api = createKmjqcApi(client);

    await api.getInitBalanceListsToJSONObject({ bookid: 'bk1', glAccountCode: '100201' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/gl/subaccountbalance/getInitBalanceListsToJSONObject/{bookid}',
      pathParams: { bookid: 'bk1' },
      query: { glAccountCode: '100201' },
    });
  });

  it('getInitBalanceLists 透传业务错误 gl.e0001', async () => {
    const { client, request } = makeClient();
    const err = { code: 'gl.e0001', msg: '', httpStatus: 400 };
    request.mockRejectedValue(err);
    const api = createKmjqcApi(client);

    await expect(api.getInitBalanceLists({ bookid: 'bk1' })).rejects.toBe(err);
  });
});
