import { request } from '@umijs/max';

// 获取阿里云Oss POST /api/my/system/getOssSign
export async function getOssSign(options?: { [key: string]: any }) {
  return request<API.OssData>('/api/my/system/getOssSign', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

// 获取系统配置 POST /api/my/system/getSystemInfo
export async function getSystemInfo(
  body: {
    // 管理员id
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.SystemInfo>('/api/my/system/getSystemInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
    ...(options || {}),
  });
}
