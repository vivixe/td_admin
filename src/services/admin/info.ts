import { request } from '@umijs/max';

// 获取公告列表 POST /api/my/info/getNoticeList
export async function getNoticeList(
    body: {
        // query
        /** 当前的页码 */
        current?: number;
        /** 页面的容量 */
        pageSize?: number;
    },
    options?: { [key: string]: any },
) {
    return request<API.NoticeList>('/api/my/info/getNoticeList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

// 更新公告 POST /api/my/info/updateNotice
export async function updateNotice(body: API.NoticeListItem, options?: { [key: string]: any }) {
    return request<API.FormUpdate>('/api/my/info/updateNotice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: body,
        ...(options || {}),
    });
}

