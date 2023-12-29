// @ts-ignore
/* eslint-disable */

declare namespace API {
  type UserInfoParams = {
    id?: number;
  };

  type UserInfo = {
    id?: number;
    username?: string;
    nickname?: string;
    address?: string;
    email?: string;
    introduction?: string;
    phone?: string;
    sex?: string;
    user_pic?: string;
  };

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

  type TeamListParams = {
    id?: string;
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
  };

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
    data?: Object;
    status?: number;
  };

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
  };

  type ProgramDetail = {
    data?: {
      baseInfo: BaseInfo;
      memberInfo: MemberInfo[];
    };
    status?: number;
  };

  // type ProgramDetail = {
  //   data?: object,
  //   status?: number
  // }

  type BaseInfo = {
    demand: string;
    earn: string;
    id: string;
    keyid: number;
    member: null;
    members: string;
    name: string;
    nickname: string;
    owner: string;
    programid: string;
    propic: string;
    status: string;
    teamid: string;
    team_intro: string;
    team_name: string;
    team_pic: string;
    time: string;
    user_pic: string;
    username: string;
  };

  type MemberInfo = {
    address: string;
    age: number;
    avatar: null;
    date: string;
    email: string;
    id: string;
    isDel: string;
    key: number;
    name: string;
    password: string;
    phone: string;
    positionid: string;
    sex: string;
    status: string;
    team_role: null;
    wx_code: null;
    wx_nickname: null;
  };

  type UserList = {
    data?: UserItem[];
    total?: number;
  };

  type UserItem = {
    id?: number;
    nickname?: string;
    user_pic?: string;
    username?: string;
  };

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
  };

  type TeamItem = {
    id?: string;
    intro?: string;
    name?: string;
    team_pic?: string;
  };

  type TeamMemberList = {
    data?: TeamMemberItem[];
    total?: number;
  };

  type TeamMemberItem = {
    avatar: string;
    id: string;
    name: string;
    position_id: string;
    position_name: string;
    user_name: string;
    worker_id: string;
  };

  type OssData = {
    data: {
      signature?: string;
      policy?: string;
      host?: string;
      OSSAccessKeyId?: string;
      key?: number;
      success_action_status?: number;
      dirPath?: string;
    };
    message?: string;
    status: number;
  };

  type DemandList = {
    data?: DemandItem[];
    message?: string;
    status?: number;
    total?: number;
  };

  type DemandItem = {
    assignee?: string;
    avatar?: string;
    complete_desc?: string;
    complete_time?: string;
    cost_time?: string;
    create_time?: string;
    creator?: string;
    email?: string;
    id?: string;
    is_submit?: number;
    name?: string;
    nickname?: string;
    phone?: string;
    position_name?: string;
    priority?: string;
    sex?: string;
    source?: string;
    status?: string;
    time_record?: string;
    title?: string;
    type?: string;
    user_pic?: string;
    username?: string;
  };

  type DemandDetail = {
    data: DemandDetailData;
    message?: string;
    status?: number;
  };

  type DemandDetailData = {
    assignee?: string;
    avatar?: string;
    complete_desc?: string;
    complete_time?: string;
    content?: string;
    cost_time?: string;
    create_time?: string;
    creator?: string;
    email?: string;
    id?: string;
    is_del?: string;
    is_submit?: number;
    key?: number;
    name?: string;
    nickname?: string;
    phone?: string;
    position_name?: string;
    priority?: string;
    program_id?: string;
    sex?: string;
    source?: string;
    status?: string;
    time_record?: string;
    title?: string;
    type?: string;
    user_pic?: string;
    username?: string;
  };

  type DemandInfo = {
    data: DemandInfoData;
    message: string;
    status: number;
  };

  type DemandInfoData = {
    assignee: string;
    complete_desc: string;
    complete_time: string;
    content: string;
    cost_time: string;
    create_time: string;
    creator: string;
    id: string;
    is_del: string;
    is_submit: number;
    key: number;
    priority: string;
    program_id: string;
    source: string;
    status: string;
    time_record: string;
    title: string;
    type: string;
  };

  type MissionList = {
    data?: MissionItem[];
    message?: string;
    status?: number;
    total?: number;
  };

  type MissionItem = {
    assignee: string;
    avatar: null | string;
    complete_desc: null | string;
    complete_time: null | string;
    content: string;
    cost_time: null | string;
    create_time: string;
    creator: string;
    demand_id: string;
    email: string;
    estimate_time: string;
    id: string;
    is_del: string;
    is_submit: number;
    key: number;
    name: string;
    nickname: string;
    phone: string;
    position_name: string;
    priority: string;
    program_id: string;
    sex: string;
    source: string;
    status: string;
    time_record: null | string;
    title: string;
    type: string;
    user_pic: string;
    username: string;
    version_id: string;
    version_name: string;
    version_relate_type: number;
  };

  type MissionDetail = {
    data: MissionDetailData;
    message?: string;
    status?: number;
  };

  type MissionDetailData = {
    assignee?: string;
    avatar?: string;
    complete_desc?: string;
    complete_time?: string;
    content?: string;
    cost_time?: string;
    create_time?: string;
    creator?: string;
    demand_id?: string;
    email?: string;
    estimate_time?: string;
    id?: string;
    is_del?: string;
    is_submit?: number;
    key?: number;
    name?: string;
    nickname?: string;
    phone?: string;
    position_name?: string;
    priority?: string;
    program_id?: string;
    sex?: string;
    source?: string;
    status?: string;
    time_record?: string;
    title?: string;
    type?: string;
    user_pic?: string;
    username?: string;
    version_id?: string;
    version_relate_type?: number;
  };

  type BugList = {
    data?: BugItem[];
    message?: string;
    status?: number;
    total?: number;
  };

  type BugItem = {
    assignee?: string;
    avatar?: string;
    complete_desc?: string;
    complete_time?: string;
    content?: string;
    cost_time?: string;
    create_time?: string;
    creator?: string;
    email?: string;
    estimate_time?: string;
    id?: string;
    is_del?: string;
    is_submit?: number;
    key?: number;
    name?: string;
    nickname?: string;
    phone?: string;
    position_name?: string;
    priority?: string;
    program_id?: string;
    reappear?: string;
    severity?: string;
    sex?: string;
    status?: string;
    time_record?: string;
    title?: string;
    type?: string;
    user_pic?: string;
    username?: string;
    version_id?: string;
    version_relate_type?: number;
  };

  type BugDetail = {
    data: BugDetailData;
    message?: string;
    status?: number;
  };

  type BugDetailData = {
    assignee?: string;
    avatar?: string;
    complete_desc?: string;
    complete_time?: string;
    content?: string;
    cost_time?: string;
    create_time?: string;
    creator?: string;
    email?: string;
    estimate_time?: string;
    id?: string;
    is_del?: string;
    is_submit?: number;
    key?: number;
    name?: string;
    nickname?: string;
    phone?: string;
    position_name?: string;
    priority?: string;
    program_id?: string;
    reappear?: string;
    severity?: string;
    sex?: string;
    status?: string;
    time_record?: string;
    title?: string;
    type?: string;
    user_pic?: string;
    username?: string;
    version_id?: string;
    version_relate_type?: number;
  };

  type ProgramSelect = {
    data?: ProgramSelectItem[];
    status?: number;
    message?: string;
  };

  type ProgramSelectItem = {
    program_id?: string;
    name?: string;
  };
}
