import {
  deleteTeam,
  getMemberList,
  getTeamList,
  removeMember,
  saveTeam,
} from '@/services/admin/team';
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { MenuProps } from 'antd';
import { Avatar, Button, Flex, Menu, message, Popover, Space, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import TeamForm from './components/TeamForm';

const TeamTable: React.FC = () => {
  const [currentTeam, setCurrentTeam] = useState<API.TeamItem>();
  const [teamList, setTeamList] = useState<
    { id: string; name: string; team_pic: string; intro: string }[]
  >([]);
  // const [currentRow, setCurrentRow] = useState<API.TeamMemberItem>();
  const [selectedRowsState, setSelectedRows] = useState<API.TeamMemberItem[]>([]);
  const [teamModalOpen, handleTeamModalOpen] = useState<boolean>(false);
  // const [selectMembersModalOpen,handleSelectMembersModalOpen] = useState<boolean>(false)
  const actionRef = useRef<ActionType>();
  const [messageApi, contextHolder] = message.useMessage();
  const [needReload, setNeedReload] = useState<boolean>(false);

  const success = (msg: string) => {
    messageApi.open({
      type: 'success',
      content: msg || '操作成功！',
    });
  };

  const listStyle: React.CSSProperties = {
    width: 240,
    padding: 8,
    paddingRight: 0,
    backgroundColor: 'white',
  };
  const TeamListTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  };
  const TableStyle: React.CSSProperties = {
    flex: 1,
    zIndex: 0,
  };
  const AvatarStyle: React.CSSProperties = {
    marginRight: 12,
  };
  const MenuItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  };
  const MenuItemBtnStyle: React.CSSProperties = {
    position: 'absolute',
    right: 6,
    top: '50%',
    transform: 'translateY(-50%)',
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
            removeMember({
              id: currentTeam?.id,
              members: record?.worker_id,
            }).then((res) => {
              if (res.status === 0) {
                success(res.message || '');
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            });
          }}
        >
          移除
        </a>,
      ],
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrentTeam(teamList.find((item) => item.id === e.key));
  };

  function TeamList() {
    useEffect(() => {
      getTeamList().then((result) => {
        console.log(
          '%c [ result ]-24',
          'font-size:16px; background:#414b82; color:#858fc6;',
          result,
        );
        let menuArr: { id: string; name: string; team_pic: string; intro: string }[] = [];
        result.data?.forEach((item) => {
          menuArr.push({
            id: item.id || '',
            name: item.name || '',
            team_pic: item.team_pic || '',
            intro: item.intro || '',
          });
        });
        setTeamList(menuArr);
        setCurrentTeam(menuArr[0]);
        setNeedReload(false);
      });
    }, [needReload]);

    const { Link, Title } = Typography;

    function handleTeamEdit() {
      handleTeamModalOpen(true);
    }

    function handleTeamRemove() {
      console.log(
        '%c [ currentTeam ]: ',
        'color: #bf2c9f; background: pink; font-size: 13px;',
        currentTeam,
      );
      let data = {
        id: currentTeam?.id,
      };
      deleteTeam(data).then((res) => {
        if (res.status === 0) {
          success(res.message || '');
          setNeedReload(true);
        }
      });
    }

    const teamActions = (
      <div>
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
          <div>
            <Link onClick={handleTeamEdit}>
              <EditOutlined /> 编辑
            </Link>
          </div>
          <div>
            <Link type="danger" onClick={handleTeamRemove}>
              <DeleteOutlined /> 解散
            </Link>
          </div>
        </Space>
      </div>
    );

    const menuItem = teamList.map((item) => (
      <Menu.Item key={item.id} style={MenuItemStyle}>
        {item.team_pic !== '' ? (
          <Avatar
            style={AvatarStyle}
            size={24}
            src={<img src={item.team_pic} alt="avatar" />}
          ></Avatar>
        ) : (
          <Avatar style={AvatarStyle} size={24}>
            {item.name}
          </Avatar>
        )}
        <span>{item.name}</span>
        <Popover content={teamActions} trigger="click">
          <Button
            size="small"
            type="link"
            style={MenuItemBtnStyle}
            icon={<MoreOutlined />}
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></Button>
        </Popover>
      </Menu.Item>
    ));

    return (
      <div style={listStyle}>
        <div style={TeamListTitleStyle}>
          <Title level={4}>团队</Title>
          <Button
            size="small"
            type="link"
            icon={<PlusOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentTeam({});
              handleTeamModalOpen(true);
            }}
          ></Button>
        </div>
        <Menu onClick={onClick} selectedKeys={[currentTeam?.id || '']} mode="vertical">
          {menuItem}
        </Menu>
      </div>
    );
  }

  return (
    <PageContainer>
      <Flex vertical={false}>
        {TeamList()}
        <ProTable<API.TeamMemberItem, API.TeamListParams>
          headerTitle="团队"
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
                // handleSelectMembersModalOpen(true);
              }}
            >
              <PlusOutlined /> 新增成员
            </Button>,
          ]}
          request={async (params = {}, sort, filter) => {
            console.log(params, sort, filter);
            const res = await getMemberList({
              id: currentTeam?.id,
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
            id: currentTeam?.id,
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
            >
              批量移除
            </Button>
          </FooterToolbar>
        )}
        {contextHolder}
      </Flex>
      <TeamForm
        onSubmit={async (value) => {
          const res = await saveTeam(value);
          if (res.status === 0) {
            success(res.message || '');
            handleTeamModalOpen(false);
            setCurrentTeam({});
            setNeedReload(true);
          }
        }}
        onCancel={() => {
          handleTeamModalOpen(false);
        }}
        teamModalOpen={teamModalOpen}
        values={currentTeam || {}}
      />
    </PageContainer>
  );
};

export default TeamTable;
