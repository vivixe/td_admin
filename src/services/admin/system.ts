import { request } from '@umijs/max';

// 获取阿里云Oss POST /api/my/system/getOssSign
export async function getOssSign(
    options?: { [key: string]: any },
) {
    return request<API.OssData>('/api/my/system/getOssSign', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        ...(options || {}),
    })
}