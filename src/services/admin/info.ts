import { request } from '@umijs/max';

// 获取公告列表 POST /api/my/info/getInfoList
export async function getInfoList(
    body: {
        // query
        /** 当前的页码 */
        current?: number;
        /** 页面的容量 */
        pageSize?: number;
    },
    options?: { [key: string]: any },
    ) {
    return request<API.InfoList>('/api/my/info/getInfoList', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
    }

