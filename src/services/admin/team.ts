import { request } from '@umijs/max';
const base_url = '/api/my/team';

// 获取团队列表 POST /api/my/team/getTeamList
export async function getTeamList(options?: { [key: string]: any }) {
  return request<API.TeamList>(base_url + '/getTeamList', {
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
  return request<API.TeamMemberList>(base_url + '/getMemberList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 保存团队信息 POST /api/my/team/saveTeam
export async function saveTeam(body: API.TeamItem, options?: { [key: string]: any }) {
  return request<API.FormUpdate>(base_url + '/saveTeam', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 移除团队信息 POST /api/my/team/deleteTeam
export async function deleteTeam(
  body: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FormUpdate>(base_url + '/deleteTeam', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 移除成员信息 POST /api/my/team//removeMember
export async function removeMember(
  body: {
    id?: string;
    members?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.FormUpdate>(base_url + '/removeMember', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
