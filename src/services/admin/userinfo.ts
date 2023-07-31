import { request } from '@umijs/max';

// 获取用户信息 POST /api/my/userinfo
export async function getUserInfo(body: API.UserInfoParams,options?: { [key: string]: any }) {
    return request<{data: API.UserInfo}>('/api/my/userinfo', {
        method: 'POST',
        ...(options || {}),
        data: body,
        skipErrorHandler: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}