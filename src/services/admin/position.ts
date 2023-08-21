import { request } from '@umijs/max';

// 获取职位列表 POST /api/my/position/getPositionList
export async function getPositionList(
  body: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.PositionList>('/api/my/position/getPositionList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 更新职位信息 POST /api/my/position/savePosition
export async function updatePositionInfo(
  body: API.PositionListItem,
  options?: { [key: string]: any },
) {
  return request<API.FormUpdate>('/api/my/position/savePosition', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}