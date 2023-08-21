import { request } from '@umijs/max';

// 获取项目列表 POST /api/my/program/prolist
export async function getProgramList(
    body: {
        // query
        /** 当前的页码 */
        current?: number;
        /** 页面的容量 */
        pageSize?: number;
    },
    options?: { [key: string]: any },
) {
    return request<API.ProgramList>('/api/my/program/prolist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}