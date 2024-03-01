/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Home',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    name: 'worker',
    icon: 'user',
    path: '/worker',
    routes: [
      {
        path: '/worker',
        redirect: '/worker/list',
      },
      {
        name: 'worker-list',
        icon: 'table',
        path: '/worker/list',
        component: './WorkerList',
      },
      {
        name: 'position-list',
        icon: 'table',
        path: '/worker/position',
        component: './PositionList',
      },
      {
        name: 'team-list',
        icon: 'table',
        path: '/worker/team',
        component: './TeamList',
      },
      {
        name: 'attendance-manage',
        icon: 'table',
        path: '/worker/attendance',
        component: './AttendanceManage',
      },
    ],
  },
  {
    name: 'program',
    icon: 'profile',
    path: '/program',
    routes: [
      {
        path: '/program',
        redirect: '/program/list',
      },
      {
        name: 'program-list',
        icon: 'table',
        path: '/program/list',
        component: './ProgramList',
      },
      {
        name: 'program-add',
        icon: 'table',
        path: '/program/add',
        component: './ProgramAdd',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'workspace',
    icon: 'desktop',
    path: '/workspace',
    routes: [
      {
        path: '/workspace',
        redirect: '/workspace/home',
      },
      {
        name: 'workspace-home',
        icon: 'desktop',
        path: '/workspace/home',
        component: './WorkSpace',
      },
    ],
  },
  {
    name: 'info',
    icon: 'mail',
    path: '/info',
    routes: [
      {
        path: '/info',
        redirect: '/info/list',
      },
      {
        name: 'info-list',
        icon: 'table',
        path: '/info/list',
        component: './NoticeList',
      },
    ],
  },
  {
    name: 'setting',
    path: '/setting',
    icon: 'tool',
    routes: [
      {
        path: '/setting',
        redirect: '/setting/user',
      },
      {
        name: 'setting-user',
        icon: 'user',
        path: '/setting/user',
        component: './Setting/User',
      },
      {
        name: 'setting-general',
        icon: 'user',
        path: '/setting/setting',
        component: './Setting/Setting',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
