import { getInfoList,updatePositionInfo } from '@/services/admin/info';
import { PlusOutlined } from '@ant-design/icons';
import {
  FooterToolbar,
  PageContainer,
  // ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
// import { FormattedMessage, useIntl } from '@umijs/max';
import { Button,Tag,message  } from 'antd';
import React, { useRef, useState } from 'react';
import InfoForm from './components/InfoForm';

const handleRemove = async (selectedRows: API.PositionListItem[]) => {
  // const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  // try {
  //   await removeRule({
  //     key: selectedRows.map((row) => row.key),
  //   });
  //   hide();
  //   message.success('Deleted successfully and will refresh soon');
  //   return true;
  // } catch (error) {
  //   hide();
  //   message.error('Delete failed, please try again');
  //   return false;
  // }
};

const PositionList: React.FC = () => {

  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.PositionListItem>();

  const [selectedRowsState, setSelectedRows] = useState<API.PositionListItem[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '更新成功！',
    });
  };

  const columns: ProColumns<API.PositionListItem>[] = [
    {
      title: "职位ID",
      dataIndex: 'id',
      render: (dom, entity) => {
        return (
          <div
            onClick={() => {
              setCurrentRow(entity);
            }}
          >
            {dom}
          </div>
        );
      },
    },
    {
      title: "职位名称",
      dataIndex: 'name',
      tip: '职位名称是唯一的 key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: "职位类型",
      dataIndex: 'type',
      render: (dom, entity) => {
        let color = entity.type === 'technology' ? 'green' : entity.type === 'product' ? 'blue' : 'purple';
        let text = entity.type === 'technology' ? '技术' : entity.type === 'product' ? '产品' : '管理';
        return (
          <div
            onClick={() => {
              setCurrentRow(entity);
            }}
          >
            <Tag color={color} key={entity.type}>
              {text}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "状态",
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: "禁用",
          status: 'Error',
        },
        1: {
          text: "启用",
          status: 'Success',
        },
      },
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </a>,
        // <a key="subscribeAlert" href="https://procomponents.ant.design/">
        //   111
        // </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.PositionListItem, API.PageParams>
        headerTitle="职位列表"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleUpdateModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建职位
          </Button>,
        ]}
        request={getInfoList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              项
              &nbsp;&nbsp;
              <span>
                {/* 总共滴{' '} */}
                {/* {selectedRowsState.reduce((pre, item) => pre + item.id!, 0)}{' '} */}
                {/* 万 */}
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
            // disabled={selectedRowsState.length === 0}
            disabled={true}
          >
            批量禁用
          </Button>
          <Button 
            type="primary"
            disabled={true}
          >
            批量启用
          </Button>
        </FooterToolbar>
      )}
      {contextHolder}
      <InfoForm
        onSubmit={async (value) => {
          const res = await updatePositionInfo(value);
          if (res.status === 0) {
            success();
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
          console.log(value);
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
              setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default PositionList;
