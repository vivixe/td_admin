import { getProgramList } from '@/services/admin/program';
import { PlusOutlined } from '@ant-design/icons';
import {
  // FooterToolbar,
  PageContainer,
  // ProTable,
  ProList,
} from '@ant-design/pro-components';
// 引入antd图标
// import { MailOutlined, MobileOutlined,  } from '@ant-design/icons';
// import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Avatar, Breakpoint, Button, Divider, Grid, Image } from 'antd';
// import React, { useState } from 'react';
import ProgramStatus from '@/components/ProgramStatus';
import { history } from '@umijs/max';
import './index.less';
const { useBreakpoint } = Grid;

const ProgramList: React.FC = () => {
  const screens = useBreakpoint();

  interface Breakpoints {
    [key: string]: { gutter: number; column: number };
  }
  const breakpoints: Breakpoints = {
    xxl: { gutter: 12, column: 3 },
    xl: { gutter: 12, column: 2 },
    lg: { gutter: 12, column: 2 },
    md: { gutter: 12, column: 2 },
    sm: { gutter: 0, column: 1 },
    xs: { gutter: 0, column: 1 },
  };

  const getBreakpoint = (key: string) => {
    return breakpoints[key];
  };

  const getActiveKeys = (screens: Partial<Record<Breakpoint, boolean>>) => {
    return Object.keys(screens).filter(
      (key: string) => key in screens && key in breakpoints && screens[key] === true,
    );
  };

  const getActiveBreakpoint = (screens: Partial<Record<Breakpoint, boolean>>) => {
    const activeKeys = getActiveKeys(screens);
    console.log(
      '%c [ activeKeys ]-44',
      'font-size:16px; background:#30f4c1; color:#74ffff;',
      activeKeys,
    );
    if (activeKeys.length === 0) {
      return {};
    }
    return activeKeys.reduce((result, key) => ({ ...result, ...getBreakpoint(key) }), {});
  };

  const comGrid = (screens: Partial<Record<Breakpoint, boolean>>) => {
    const activeLayout = getActiveBreakpoint(screens);
    return activeLayout;
  };

  return (
    <PageContainer
      tabList={[
        {
          tab: '基本信息',
          key: 'base',
        },
      ]}
    >
      <ProList<any>
        toolBarRender={() => [
          <Button key="2">更新</Button>,
          <Button
            key="1"
            type="primary"
            onClick={() => {
              history.push({
                pathname: '/program/add',
                search: 'id= ',
              });
            }}
          >
            <PlusOutlined />
            新增
          </Button>,
        ]}
        pagination={{
          defaultPageSize: 6,
          showSizeChanger: true,
        }}
        request={async (params = {}) => {
          const res = await getProgramList({
            current: params.current,
            pageSize: params.pageSize,
          });
          return Promise.resolve({
            data: res.data?.map((item) => {
              return {
                title: <span style={{ fontSize: 16, fontWeight: 600 }}>{item.name}</span>,
                subTitle: (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 300,
                      color: '#666',
                      width: 80,
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    {item.demand}
                  </span>
                ),
                // avatar: item.team_pic ? item.team_pic : 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
                actions: [
                  <a
                    key="work"
                    onClick={() => {
                      console.log('item.program_id', item.program_id);
                      history.push({
                        pathname: '/workspace/home',
                        search: 'id=' + item.program_id,
                      });
                    }}
                  >
                    工作
                  </a>,
                  <a key="data">分析</a>,
                  <a
                    key="edit"
                    onClick={() => {
                      history.push({
                        pathname: '/program/add',
                        search: 'id=' + item.program_id,
                      });
                    }}
                  >
                    编辑
                  </a>,
                ],
                content: (
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{ flex: 3 }}>
                        {/* 如果item.propic存在，显示图片组件 */}
                        {item.propic ? (
                          <Image src={item.propic} width={200} height={112} />
                        ) : (
                          <div
                            style={{
                              width: 200,
                              height: 112,
                              backgroundColor: '#e9f7fe',
                              display: 'grid',
                              placeItems: 'center',
                            }}
                          >
                            <span style={{ color: '#1890ff', fontSize: 16, fontWeight: 300 }}>
                              暂无图片
                            </span>
                          </div>
                        )}
                      </div>
                      <div style={{ flex: 3 }}>
                        <div className="card-right-item-v">
                          <ProgramStatus status={item.status ?? ''} />
                        </div>
                        <div className="card-right-item-v">
                          <span style={{ color: '#1890ff', fontSize: 14, fontWeight: 300 }}>
                            项目负责人：
                          </span>
                          {/* <br /> */}
                          <Avatar src={item.user_pic} size={16} />
                          <span>{item.username}</span>
                        </div>
                        <div className="card-right-item-v">
                          <span style={{ color: '#1890ff', fontSize: 14, fontWeight: 300 }}>
                            项目团队：
                          </span>
                          {/* <br /> */}
                          <Avatar src={item.team_pic} size={16} />
                          <span>{item.team_name}</span>
                          {/* <br />
                          <span style={{color:'#1890ff',fontSize:12,fontWeight:300}}>团队简介：</span>
                          <span style={{fontWeight:300,fontSize:12,}}>{item.team_intro}</span> */}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%', paddingTop: '12px' }}>
                      {/* <Space style={{width:"100%"}}> */}
                      <div className="program-detail-text">
                        <span className="main">剩余需求</span>
                        <span className="sub">{item.demand_count ? item.demand_count : 0}</span>
                      </div>
                      <Divider style={{ marginTop: '12px' }} type="vertical" />
                      <div className="program-detail-text">
                        <span className="main">剩余任务</span>
                        <span className="sub">{item.mission_count ? item.mission_count : 0}</span>
                      </div>
                      <Divider style={{ marginTop: '12px' }} type="vertical" />
                      <div className="program-detail-text">
                        <span className="main">剩余bug</span>
                        <span className="sub">{item.bug_count ? item.bug_count : 0}</span>
                      </div>
                      {/* </Space> */}
                    </div>
                  </div>
                ),
              };
            }),
            success: true,
            total: res.total,
          });
        }}
        rowKey="id"
        headerTitle="基础列表"
        // grid={{ gutter: 12, column: 3 }}
        grid={comGrid(screens)}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          // avatar: {},
          content: {},
          actions: {
            // 设置为actions时，会自动加上操作列
            cardActionProps: 'actions',
          },
        }}
        // search={{
        //   labelWidth: 'auto',
        // }}
        // dataSource={data}
        // columns={columns}
      />
    </PageContainer>
  );
};

export default ProgramList;
