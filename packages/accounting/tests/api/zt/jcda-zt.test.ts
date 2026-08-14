import { describe, expect, it, vi } from 'vitest';

import type { ChanjetClient } from '../../../src/client.js';
import { createJcdaZtApi } from '../../../src/api/zt/jcda-zt.js';

function makeClient() {
  const request = vi.fn();
  return { request, client: { request } as unknown as ChanjetClient };
}

describe('createJcdaZtApi', () => {
  it('bindTenant 映射 path/body', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({ result: true, errorInfo: '' });
    const api = createJcdaZtApi(client);

    await api.bindTenant({
      bookid: 232654,
      masterTenantId: 1234567890,
      slaveTenantId: 9876543210,
      bindingTypeEnum: 'BINDING_HKJ_TO_THIRD_PLATFORM',
      masterTenantName: '帐套A',
      slaveTenantName: '帐套B',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/document/integration/tenant/binding/{bookid}',
      pathParams: { bookid: 232654 },
      body: {
        masterTenantId: 1234567890,
        slaveTenantId: 9876543210,
        bindingTypeEnum: 'BINDING_HKJ_TO_THIRD_PLATFORM',
        masterTenantName: '帐套A',
        slaveTenantName: '帐套B',
        bindingBoNames: undefined,
      },
    });
  });

  it('unbindTenant 映射 path/query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createJcdaZtApi(client);

    await api.unbindTenant({ bookid: 232654, tenantId: 9876543210 });

    expect(request).toHaveBeenCalledWith({
      method: 'DELETE',
      path: '/accounting/document/integration/tenant/binding/{bookid}',
      pathParams: { bookid: 232654 },
      query: { tenantId: 9876543210 },
    });
  });

  it('getAccountBookList 无参数', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue([]);
    const api = createJcdaZtApi(client);

    await api.getAccountBookList();

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/accountBook/list',
    });
  });

  it('getAccountBook 映射 path，可选 tenantId 缺省不传 query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({});
    const api = createJcdaZtApi(client);

    await api.getAccountBook({ bookid: 90009552050 });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/accounting/accountBook/{bookid}',
      pathParams: { bookid: 90009552050 },
      query: undefined,
    });
  });

  it('getAppOpenStatus 无参数', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createJcdaZtApi(client);

    await api.getAppOpenStatus();

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/setup/openAccess/app/status',
    });
  });

  it('queryTaxIndustry 映射 path', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue([]);
    const api = createJcdaZtApi(client);

    await api.queryTaxIndustry({ bookid: 90001 });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/easyacctg/customer/queryTaxIndustry/{bookid}',
      pathParams: { bookid: 90001 },
    });
  });

  it('importCheckTenantData 映射 path/query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({ isSuccess: true });
    const api = createJcdaZtApi(client);

    await api.importCheckTenantData({ bookid: 90001, ossURL: 'oss://x', newName: '新账套' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/asr/tenantData/importCheck/{bookid}',
      pathParams: { bookid: 90001 },
      query: { ossURL: 'oss://x', newName: '新账套' },
    });
  });

  it('importTenantData 映射 path/query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({ id: 1 });
    const api = createJcdaZtApi(client);

    await api.importTenantData({ bookid: 90001, fileName: 'AC-DATA-1' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/asr/tenantData/import/{bookid}',
      pathParams: { bookid: 90001 },
      query: { fileName: 'AC-DATA-1' },
    });
  });

  it('downloadTenantData 映射 path', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({ ossURL: 'https://x' });
    const api = createJcdaZtApi(client);

    await api.downloadTenantData({ bookid: 90001 });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/asr/tenantData/download/{bookid}',
      pathParams: { bookid: 90001 },
    });
  });

  it('updateAccountBook 映射 path/body', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({ id: 1 });
    const api = createJcdaZtApi(client);

    await api.updateAccountBook({
      bookid: 90001,
      id: 90001,
      name: '账套',
      acctgSystemId: 10001,
      openingPeriod: '202009',
      taxpayerTypeEnum: 'SMALL_TAXPAYER',
      taxNo: '911100005531410225',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'PUT',
      path: '/accounting/accounting/accountBook/{bookid}',
      pathParams: { bookid: 90001 },
      body: {
        id: 90001,
        name: '账套',
        acctgSystemId: 10001,
        openingPeriod: '202009',
        taxpayerTypeEnum: 'SMALL_TAXPAYER',
        tenantOwnerName: undefined,
        taxIndustryId: undefined,
        taxNo: '911100005531410225',
      },
    });
  });

  it('deleteAccountBook 映射 path', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({ id: 1 });
    const api = createJcdaZtApi(client);

    await api.deleteAccountBook({ bookid: 90001 });

    expect(request).toHaveBeenCalledWith({
      method: 'DELETE',
      path: '/accounting/accounting/accountBook/{bookid}',
      pathParams: { bookid: 90001 },
    });
  });

  it('updateAccountBookHiddenStatus 映射 path/body', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createJcdaZtApi(client);

    await api.updateAccountBookHiddenStatus({ bookid: 90001, id: 90001, hidden: true });

    expect(request).toHaveBeenCalledWith({
      method: 'PUT',
      path: '/accounting/accounting/accountBook/hiddenStatus/{bookid}',
      pathParams: { bookid: 90001 },
      body: { id: 90001, hidden: true },
    });
  });

  it('checkAndImportTenantData 映射 path/query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({ isSuccess: true });
    const api = createJcdaZtApi(client);

    await api.checkAndImportTenantData({ bookid: 90001, ossURL: 'oss://x' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/asr/tenantData/checkAndImport/{bookid}',
      pathParams: { bookid: 90001 },
      query: { ossURL: 'oss://x', newName: undefined },
    });
  });

  it('updateAccountBookDisabledStatus 映射 path/body', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue(undefined);
    const api = createJcdaZtApi(client);

    await api.updateAccountBookDisabledStatus({ bookid: 90001, id: 90001, disabled: true });

    expect(request).toHaveBeenCalledWith({
      method: 'PUT',
      path: '/accounting/accounting/accountBook/disabledStatus/{bookid}',
      pathParams: { bookid: 90001 },
      body: { id: 90001, disabled: true },
    });
  });

  it('updateOrgInfo 映射 path/body', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({ id: 1 });
    const api = createJcdaZtApi(client);

    await api.updateOrgInfo({ bookid: 90001, id: 90001, tenantOwnerName: '企业', taxNo: 'X' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/accounting/accountBook/updateOrgInfo/{bookid}',
      pathParams: { bookid: 90001 },
      body: { id: 90001, tenantOwnerName: '企业', taxNo: 'X' },
    });
  });

  it('createAccountBook 映射 body', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({ id: 1 });
    const api = createJcdaZtApi(client);

    await api.createAccountBook({
      name: '账套',
      acctgSystemId: 10001,
      openingPeriod: '201703',
      taxpayerTypeEnum: 'SMALL_TAXPAYER',
    });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/accounting/accountBook',
      body: {
        name: '账套',
        acctgSystemId: 10001,
        openingPeriod: '201703',
        taxpayerTypeEnum: 'SMALL_TAXPAYER',
        glAccountTaxpayerTypeEnum: undefined,
        acctgTransGroupEnum: undefined,
        acctgTransApprovalRequired: undefined,
        tenantOwnerName: undefined,
        taxIndustryId: undefined,
        taxNo: undefined,
        taxAreaId: undefined,
      },
    });
  });

  it('getTaxRptMenu 映射 path/query', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue([]);
    const api = createJcdaZtApi(client);

    await api.getTaxRptMenu({ bookid: '90001', period: '202101' });

    expect(request).toHaveBeenCalledWith({
      method: 'GET',
      path: '/accounting/accountBook/taxRptMenu/{bookid}',
      pathParams: { bookid: '90001' },
      query: { period: '202101' },
    });
  });

  it('initTenant 映射 body', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({ id: 1 });
    const api = createJcdaZtApi(client);

    await api.initTenant({ tenantName: '钉钉新建账套' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/accounting/accountBook/initTenant',
      body: { tenantName: '钉钉新建账套' },
    });
  });

  it('updateAccountBookStatus 映射 path/body', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({ result: true });
    const api = createJcdaZtApi(client);

    await api.updateAccountBookStatus({ bookid: 90001, id: 90001, disabled: true });

    expect(request).toHaveBeenCalledWith({
      method: 'PUT',
      path: '/accounting/accounting/accountBook/updateStatus/{bookid}',
      pathParams: { bookid: 90001 },
      body: { id: 90001, disabled: true },
    });
  });

  it('getAccountBookListPage 映射 body', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue([]);
    const api = createJcdaZtApi(client);

    await api.getAccountBookListPage({ pageNum: 1, pageSize: 50, name: '' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/accountBook/list/page',
      body: { pageNum: 1, pageSize: 50, name: '' },
    });
  });

  it('getTenantIdByExternal 映射 body', async () => {
    const { request, client } = makeClient();
    request.mockResolvedValue({ tenantId: 1 });
    const api = createJcdaZtApi(client);

    await api.getTenantIdByExternal({ externalUniqueId: 'abc-001', externalSystem: 'erp' });

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/accounting/openAccess/tenant/getTenantIdByExternal',
      body: { externalUniqueId: 'abc-001', externalSystem: 'erp' },
    });
  });

  it('传播 client.request 的异常（错误路径）', async () => {
    const { request, client } = makeClient();
    request.mockRejectedValue(new Error('saas.001'));
    const api = createJcdaZtApi(client);

    await expect(api.getAccountBookList()).rejects.toThrow('saas.001');
  });
});
