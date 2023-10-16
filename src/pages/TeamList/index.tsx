import { getMemberList, getTeamList } from '@/services/admin/team';
import { PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { MenuProps } from 'antd';
import { Avatar, Button, Flex, Menu, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const TeamList: React.FC = () => {
  const [current, setCurrent] = useState('');
  const [teamList, setTeamList] = useState<
    { key: string; label: string; team_pic: string; intro: string }[]
  >([]);
  const [currentRow, setCurrentRow] = useState<API.TeamMemberItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.TeamMemberItem[]>([]);
  const actionRef = useRef<ActionType>();
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '移除成功！',
    });
  };

  const listStyle: React.CSSProperties = {
    width: 220,
    padding: 8,
  };
  const TableStyle: React.CSSProperties = {
    flex: 1,
    zIndex: 0,
  };
  const AvatarStyle: React.CSSProperties = {
    marginRight: 12,
  };

  const columns: ProColumns<API.TeamMemberItem>[] = [
    {
      title: '姓名',
      dataIndex: 'user_name',
      render: (dom) => {
        return <div>{dom}</div>;
      },
    },
    {
      title: '职位',
      dataIndex: 'position_name',
      hideInSearch: true,
      render: (dom) => {
        return <div>{dom}</div>;
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
            console.log(
              '%c [ record ]: ',
              'color: #bf2c9f; background: pink; font-size: 13px;',
              record,
            );
            // handleUpdateModalOpen(true);
            setCurrentRow(record);
            console.log(
              '%c [ currentRow ]: ',
              'color: #bf2c9f; background: pink; font-size: 13px;',
              currentRow,
            );
            success();
          }}
        >
          移除
        </a>,
      ],
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  function TeamList() {
    useEffect(() => {
      getTeamList().then((result) => {
        console.log(
          '%c [ result ]-24',
          'font-size:16px; background:#414b82; color:#858fc6;',
          result,
        );
        let menuArr: { key: string; label: string; team_pic: string; intro: string }[] = [];
        result.data?.forEach((item) => {
          menuArr.push({
            key: item.id || '',
            label: item.name || '',
            team_pic: item.team_pic || '',
            intro: item.intro || '',
          });
        });
        setTeamList(menuArr);
        setCurrent(menuArr[0].key);
      });
    }, []);

    const menuItem = teamList.map((item) => (
      <Menu.Item key={item.key} style={{ display: 'flex', alignItems: 'center' }}>
        {item.team_pic !== '' ? (
          <Avatar
            style={AvatarStyle}
            size={24}
            src={<img src={item.team_pic} alt="avatar" />}
          ></Avatar>
        ) : (
          <Avatar style={AvatarStyle} size={24}>
            {item.label}
          </Avatar>
        )}
        <span>{item.label}</span>
      </Menu.Item>
    ));
    return (
      // <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={teamList} style={listStyle}>

      // </Menu>
      <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" style={listStyle}>
        {menuItem}
      </Menu>
    );
  }

  return (
    <PageContainer>
      <Flex vertical={false}>
        {TeamList()}
        <ProTable<API.TeamMemberItem, API.TeamListParams>
          headerTitle="职位列表"
          actionRef={actionRef}
          rowKey="worker_id"
          search={{
            labelWidth: 120,
          }}
          style={TableStyle}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                // handleUpdateModalOpen(true);
              }}
            >
              <PlusOutlined /> 新增成员
            </Button>,
          ]}
          request={async (params = {}, sort, filter) => {
            console.log(params, sort, filter);
            const res = await getMemberList({
              id: current,
            });
            console.log(res);
            return Promise.resolve({
              data: res.data,
              success: true,
              total: res.total,
            });
          }}
          columns={columns}
          params={{
            id: current,
          }}
          rowSelection={{
            onChange: (_, selectedRows) => {
              console.log(
                '%c [ selectedRows ]-112',
                'font-size:16px; background:#cdad52; color:#fff196;',
                selectedRows,
              );
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
              danger
              onClick={async () => {
                // await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
              disabled={selectedRowsState.length === 0}
              // disabled={true}
            >
              批量移除
            </Button>
            {/* <Button
                            type="primary"
                            disabled={true}
                        >
                            批量启用
                        </Button> */}
          </FooterToolbar>
        )}
        {contextHolder}
      </Flex>
    </PageContainer>
  );
};

export default TeamList;
