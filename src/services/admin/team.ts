import { request } from '@umijs/max';

// 获取团队列表 POST /api/my/team/getTeamList
export async function getTeamList(
    options?: { [key: string]: any },
) {
    return request<API.TeamList>('/api/my/team/getTeamList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        ...(options || {}),
    })
}