// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: number;
    // type?: string;
    message?: string;
    token?: string;
    // currentAuthority?: string;
    id?: number;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type UserInfoParams = {
    id?: number;
    token?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type UserInfo = {
    id?: number;
    username?: string;
    nickname?: string;
    email?: string;
    user_pic?: string;
    phone?: string;
    introduction?: string;
    sex?: string;
    address?: string;
  };

  type WorkerListParams = {
    name?: string;
    position_name?: string;
    position_type?: string;
    members?: string;
  };

  type WorkerListItem = {
    // select a.id,a.name as name,a.date,a.status,a.age,a.address,a.email,a.phone,a.avatar,a.sex,b.name as position_name,b.type as position_type from worker_info a left join position_info b on a.position_id = b.id 
    id?: number;
    name?: string;
    date?: string;
    status?: string;
    age?: number;
    address?: string;
    email?: string;
    phone?: string;
    avatar?: string;
    sex?: string;
    position_name?: string;
    position_type?: string;
  }

  type WorkerList = {
    data?: WorkerListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  }

  type PositionListParams = {
    name?: string;
    type?: string;
  };

  type PositionListItem = {
    id?: number;
    name?: string;
    type?: string;
  }

  type PositionList = {
    data?: PositionListItem[];
    /** 列表的内容总数 */
    total?: number;
  }
}


