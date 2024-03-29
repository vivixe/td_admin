import { getWorkerList, updateWorkerInfo } from '@/services/admin/worker';
import { PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
// 引入antd图标
import PositionInfo from '@/components/PositionInfo';
import { MailOutlined, ManOutlined, MobileOutlined, WomanOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { Avatar, Button, message, Popover } from 'antd';
import React, { useRef, useState } from 'react';
import WorkerForm from './components/WorkerForm';

const handleRemove = async (selectedRows: API.WorkerListItem[]) => {
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

const WorkerList: React.FC = () => {
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.WorkerListItem>();

  const [selectedRowsState, setSelectedRows] = useState<API.WorkerListItem[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '更新成功！',
    });
  };

  const setContent = (entity: API.WorkerListItem) => {
    return (
      <div style={{ display: 'flex' }}>
        <Avatar size={64} src={entity?.avatar} shape="square">
          {entity?.name}
        </Avatar>
        <div style={{ marginLeft: 8 }}>
          <p>年龄：{entity?.age}</p>
          {entity?.sex === 'male' ? (
            <p>
              性别：
              <ManOutlined style={{ color: '#08c' }} />
            </p>
          ) : (
            <p>
              性别：
              <WomanOutlined style={{ color: 'rgb(255, 173, 210)' }} />
            </p>
          )}
        </div>
      </div>
    );
  };

  const columns: ProColumns<API.WorkerListItem>[] = [
    {
      title: '职员姓名',
      dataIndex: 'name',
      tip: '规则名称是唯一的 key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
            }}
          >
            <Popover content={setContent(entity)} title={entity.name} trigger="hover">
              {dom}
            </Popover>
          </a>
        );
      },
    },
    {
      title: '职员ID',
      dataIndex: 'id',
      hideInForm: true,
      hideInSearch: true,
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
      title: '职位',
      dataIndex: 'position_name',
      render: (dom, entity) => {
        return (
          <div
            onClick={() => {
              setCurrentRow(entity);
            }}
          >
            <PositionInfo name={entity.position_name ?? ''} type={entity.position_type ?? ''} />
          </div>
        );
      },
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      render: (dom, entity) => {
        return (
          <div
            onClick={() => {
              setCurrentRow(entity);
            }}
          >
            <MobileOutlined style={{ marginRight: 8, fontSize: 16, color: '#08c' }} />
            <span>{entity.phone}</span>
            <MailOutlined style={{ marginLeft: 8, marginRight: 8, fontSize: 16, color: '#08c' }} />
            {entity.email}
          </div>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        default: {
          text: '未激活',
          status: 'Default',
        },
        linked: {
          text: '已激活',
          status: 'Success',
        },
      },
    },
    {
      title: '操作',
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
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.WorkerListItem, API.PageParams>
        headerTitle="职员列表"
        actionRef={actionRef}
        rowKey={(record) => record.id + ''}
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
            <PlusOutlined /> 新建职员
          </Button>,
        ]}
        request={getWorkerList}
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
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项 &nbsp;&nbsp;
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
          >
            撤硕1
          </Button>
          <Button type="primary">撤硕2</Button>
        </FooterToolbar>
      )}
      {contextHolder}
      <WorkerForm
        onSubmit={async (value) => {
          console.log(
            '%c [ value ]-322',
            'font-size:16px; background:#94b3a0; color:#d8f7e4;',
            value,
          );
          const res = await updateWorkerInfo(value);
          console.log(
            '%c [ success ]-285',
            'font-size:16px; background:#eec713; color:#ffff57;',
            res,
          );
          if (res.status === 0) {
            // 提示更新成功

            success();
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
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

export default WorkerList;
