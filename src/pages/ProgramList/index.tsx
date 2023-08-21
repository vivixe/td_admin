import { getProgramList } from '@/services/admin/program';
// import { PlusOutlined } from '@ant-design/icons';
import {
  // FooterToolbar,
  PageContainer,
  // ProTable,
  ProList,
} from '@ant-design/pro-components';
// 引入antd图标
// import { MailOutlined, MobileOutlined,  } from '@ant-design/icons';
// import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
// import React, { useRef, useState } from 'react';


const ProgramList: React.FC = () => {
  // const actionRef = useRef<ActionType>();

  // const getProgramListData = async () => {
  //   const res = await getProgramList(
  //     {
  //       page: 1,
  //       limit: 10,
  //     },
  //   );
  //   console.log(res);
  // }

  return (
    <PageContainer
      content="欢迎使用 ProLayout 组件"
      tabList={[
        {
          tab: '基本信息',
          key: 'base',
        },
        // {
        //   tab: '详细信息',
        //   key: 'info',
        // },
      ]}
      extra={[
        <Button key="3">操作</Button>,
        <Button key="2">操作</Button>,
        <Button key="1" type="primary">
          主操作
        </Button>,
      ]}
      footer={[
        <Button key="rest">重置</Button>,
        <Button key="submit" type="primary">
          提交
        </Button>,
      ]}
    >
      <ProList<any>
        toolBarRender={() => [
          <Button key="3">操作</Button>,
          <Button key="2">操作</Button>,
          <Button key="1" type="primary">
            主操作
          </Button>,
        ]}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
        }}
        request={
          async (params = {}, sort, filter) => {
            console.log(params, sort, filter);
            const res = await getProgramList(
              {
                current: params.current,
                pageSize: params.pageSize,
              },
            );
            console.log(res);
            return Promise.resolve({
              data: res.data,
              success: true,
              total: res.total,
            });
          }
        }
        rowKey="id"
        headerTitle="基础列表"
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
