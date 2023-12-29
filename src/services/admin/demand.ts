import { request } from '@umijs/max';

// 获取公告列表 POST /api/my/demand/getDemandList
export async function getDemandList(
  body: {
    program_id?: string;
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.DemandList>('/api/my/demand/getDemandList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 获取详情 POST /api/my/demand/getDemandDetail
export async function getDemandDetail(
  body: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.DemandDetail>('/api/my/demand/getDemandDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 获取编辑信息 POST /api/my/demand/getDemandInfo
export async function getDemandInfo(
  body: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.DemandInfo>('/api/my/demand/getDemandInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
