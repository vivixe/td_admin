import { request } from '@umijs/max';

// 获取缺陷列表 POST /api/my/bug/getBugList
export async function getBugList(
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
  return request<API.BugList>('/api/my/bug/getBugList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 获取缺陷详情 POST /api/my/bug/getBugDetail
export async function getBugDetail(
  body: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.BugDetail>('/api/my/bug/getBugDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
