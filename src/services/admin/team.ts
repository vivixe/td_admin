import { request } from '@umijs/max';

// 获取团队列表 POST /api/my/team/getTeamList
export async function getTeamList(options?: { [key: string]: any }) {
  return request<API.TeamList>('/api/my/team/getTeamList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

// 获取团队成员列表 POST /api/my/team/getMemberList
export async function getMemberList(
  body: {
    id?: string;
    user_name?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.TeamMemberList>('/api/my/team/getMemberList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
