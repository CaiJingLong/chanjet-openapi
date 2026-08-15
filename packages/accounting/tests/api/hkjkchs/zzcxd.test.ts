import { describe, expect, it, vi } from 'vitest';
import type { ChanjetClient } from '@chanjet-openapi/core';
import {
  createZzcxdApi,
  type AssemblyAddParams,
  type AssemblyListParams,
  type AssemblyRemoveParams,
  type AssemblyUpdateParams,
} from '../../../src/api/hkjkchs/zzcxd.js';

function createMockClient() {
  const request = vi.fn();
  return { client: { request } as unknown as ChanjetClient, request };
}

describe('createZzcxdApi', () => {
  it('listAssembly 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ currentPage: 1, rows: [] });
    const api = createZzcxdApi(client);

    const params: AssemblyListParams = { page: 1, pageSize: '20' };
    await api.listAssembly('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/inv/assembly/list/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('updateAssembly 映射 path/body（含 parentProductList/childProductList）', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 1 });
    const api = createZzcxdApi(client);

    const params: AssemblyUpdateParams = {
      bizDate: '2023-03-01',
      code: 'AD-1',
      bizTypeId: '100251',
      warehouseCode: '01',
      fahterWarehouseCode: '01',
      parentProductList: [],
      childProductList: [],
    };
    await api.updateAssembly('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/assembly/update/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('addAssembly 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue({ id: 100 });
    const api = createZzcxdApi(client);

    const params: AssemblyAddParams = {
      bizDate: '2023-03-01',
      code: 'AD-1',
      bizTypeId: '100251',
      warehouseCode: '01',
      fahterWarehouseCode: '01',
      parentProductList: [],
      childProductList: [],
    };
    await api.addAssembly('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/assembly/add/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('removeAssembly 映射 path/body', async () => {
    const { client, request } = createMockClient();
    request.mockResolvedValue([]);
    const api = createZzcxdApi(client);

    const params: AssemblyRemoveParams = { ids: ['a'] };
    await api.removeAssembly('book-1', params);

    expect(request).toHaveBeenCalledWith({
      method: 'POST',
      path: '/accounting/openapi/cc/assembly/remove/{bookid}',
      pathParams: { bookid: 'book-1' },
      body: params,
    });
  });

  it('addAssembly 网络错误向上抛', async () => {
    const { client, request } = createMockClient();
    request.mockRejectedValue(new Error('timeout'));
    const api = createZzcxdApi(client);

    await expect(
      api.addAssembly('book-1', {
        bizDate: '2023-03-01',
        code: 'AD-1',
        bizTypeId: '100251',
        warehouseCode: '01',
        fahterWarehouseCode: '01',
        parentProductList: [],
        childProductList: [],
      }),
    ).rejects.toThrow('timeout');
  });
});
