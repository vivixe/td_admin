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
    page_no?: number;
    page_size?: number;
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

  type UserNoticeParams = {
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

  type UserNotice = {
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
    position_id?: string;
  };

  type WorkerList = {
    data?: WorkerListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FormUpdate = {
    status?: number;
    message?: string;
  }

  type PositionListParams = {
    name?: string;
    type?: string;
  };

  type PositionListItem = {
    id?: number;
    name?: string;
    type?: string;
  };

  type PositionList = {
    data?: PositionListItem[];
    /** 列表的内容总数 */
    total?: number;
  };

  type ProgramList = {
    data?: ProgramListItem[];
    /** 列表的内容总数 */
    total?: number;
  };

  type ProgramListItem = {
    key_id?: number;
    name?: string;
    owner?: string;
    time?: string;
    member?: string;
    earn?: string;
    propic?: string;
    status?: string;
    demand?: string;
    program_id?: string;
    team_id?: string;
    nickname?: string;
    username?: string;
    user_pic?: string;
    team_name?: string;
    team_pic?: string;
    team_intro?: string;
    demand_count?: number;
    mission_count?: number;
    bug_count?: number;
  };

  type ProgramInfo = {
    data?: Object,
    status?: number
  }

  type ProgramInfoItem = {
    key_id?: number;
    name?: string;
    owner?: string;
    time?: string;
    member?: string;
    earn?: string;
    propic?: string;
    status?: string;
    demand?: string;
    program_id?: string;
    team_id?: string;
    nickname?: string;
    username?: string;
    user_pic?: string;
    team_name?: string;
    team_pic?: string;
    team_intro?: string;
    demand_count?: number;
    mission_count?: number;
    bug_count?: number;
  }

  type UserList = {
    data?: UserItem[],
    total?: number
  }

  type UserItem = {
    id?: number,
    nickname?: string,
    user_pic?: string,
    username?: string
  }

  type NoticeList = {
    data?: NoticeListItem[];
    /** 列表的内容总数 */
    total?: number;
  };

  type NoticeListItem = {
    id?: string;
    title?: string;
    intro?: string;
    content?: string;
    description?: string;
    adminid?: string;
    targetid?: string;
    targetname?: string;
    datetime?: string;
    star?: number;
    like?: number;
    comment?: number;
    nickname?: string;
    username?: string;
    user_pic?: string;
  };

  type TeamList = {
    data?: TeamItem[];
    total?: number;
  }

  type TeamItem = {
    id?: string;
    intro?: string;
    name?: string;
    team_pic?: string;
  }
}
