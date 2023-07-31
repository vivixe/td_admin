import { request } from '@umijs/max';

// 用户登录 POST /api/api/login
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
    return request<API.LoginResult>('/api/api/login', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
    }