import { getNoticeList } from '@/services/admin/info';
import { 
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
 } from '@ant-design/icons';
import {
  // FooterToolbar,
  PageContainer,
  ProList,
  // ProDescriptions,
  // ProTable,
} from '@ant-design/pro-components';
// import type { ActionType, ProColumns } from '@ant-design/pro-table';
// import { FormattedMessage, useIntl } from '@umijs/max';
import { Button,  } from 'antd';
import React from 'react';
// import NoticeForm from './components/NoticeForm';

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </span>
);

const NoticeList: React.FC = () => {


  return (
    <PageContainer>
      <ProList<{ title: string }>
      toolBarRender={() => {
        return [
          <Button key="3" type="primary">
            新建
          </Button>,
        ];
      }}
      itemLayout="vertical"
      rowKey="id"
      headerTitle="公告列表"
      metas={
        {
          title: {
            dataIndex: 'title',
          },
          description: {
            dataIndex: 'description',
          },
          content: {
            dataIndex: 'content',
          },
          actions: {
            dataIndex: 'actions',
          },
        }
      }
      request={
        async (params = {}, sort, filter) => {
          console.log(params, sort, filter);
          const res = await getNoticeList(
            {
              current: params.current,
              pageSize: params.pageSize,
            },
          );
          return Promise.resolve({
            data: res.data?.map((item) => {
              return {
                title: item.title,
                description: item.intro,
                content: item.description,
                actions: [
                  <IconText
                    icon={StarOutlined}
                    text={item.star+""}
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={LikeOutlined}
                    text={item.like+""}
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text={item.comment+""}
                    key="list-vertical-message"
                  />,
                ],
              };
            }),
            success: true,
            total: res.total
          });
        }
      }
      pagination={{
        pageSize: 5,
      }}
      />
    </PageContainer>
  );
};

export default NoticeList;
