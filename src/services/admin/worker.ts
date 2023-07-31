import { request } from "@umijs/max";

// 获取职员列表 POST /api/my/worker/list
export async function getWorkerList(params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },body: API.WorkerListParams, options?: { [key: string]: any }) {
    return request<{data :API.WorkerList}>("/api/my/worker/list", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        params: {
            ...params,
        },
        data: body,
        ...(options || {}),
    });
}