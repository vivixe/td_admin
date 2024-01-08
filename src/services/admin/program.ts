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

export async function getProgramInfo(
  body: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ProgramInfo>('/api/my/program/proinfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getUserSelect(options?: { [key: string]: any }) {
  return request<API.UserList>('/api/my/program/getUserSelect', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

export async function saveProgramInfo(body: API.ProgramListItem, options?: { [key: string]: any }) {
  return request<API.FormUpdate>('/api/my/program/saveproinfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getProgramDetail(
  body: {
    program_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ProgramDetail>('/api/my/program/prodetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getProgramSelect(options?: { [key: string]: any }) {
  return request<API.ProgramSelect>('/api/my/program/proselect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

export async function getProgramDocument(
  body: {
    id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ProgramDocument>('/api/my/program/getDocInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function saveProgramDocument(
  body: {
    id: string;
    value: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.ProgramDocument>('/api/my/program/saveDocInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
