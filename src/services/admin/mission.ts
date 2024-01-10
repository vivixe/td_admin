import { request } from '@umijs/max';

// 获取任务列表 POST /api/my/mission/getMissionList
export async function getMissionList(
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
  return request<API.MissionList>('/api/my/mission/getMissionList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getMissionDetail(
  body: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.MissionDetail>('/api/my/mission/getMissionDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 获取编辑信息 POST /api/my/mission/getMissionInfo
export async function getMissionInfo(
  body: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.MissionInfo>('/api/my/mission/getMissionInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
