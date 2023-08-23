import { request } from "@umijs/max";

// 获取职员列表 POST /api/my/worker/list
export async function getWorkerList(body: {
    // query
    /** 当前的页码 */
    page_no?: number;
    /** 页面的容量 */
    page_size?: number;
}, options?: { [key: string]: any }) {
    return request<API.WorkerList>("/api/my/worker/list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: body,
        ...(options || {}),
    });
}

// 更新职员信息 POST /api/my/worker/saveinfo
export async function updateWorkerInfo(body: API.WorkerListItem, options?: { [key: string]: any }) {
    return request<API.FormUpdate>("/api/my/worker/saveinfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        data: body,
        ...(options || {}),
    });
}