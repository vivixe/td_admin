import { Demand, tabsList } from '@/data/WorkSpace';
import { getMissionList } from '@/services/admin/mission';
import { DownOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { MenuProps } from 'antd';
import { Avatar, Button, Divider, Dropdown, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import DetailDocument from '../components/detailDocument';
import DetailModal from '../components/detailModal';
import '../demand/demand.less';
import Form from '../editForm';

const getCurTabLabel = (value: string) => {
  return tabsList.find((item) => item.key === value)?.tab;
};

export type MissionListProps = {
  id: string;
  team_id: string;
};

const curTab = '2';

const MissionList: React.FC<MissionListProps> = (props) => {
  const [currentRow, setCurrentRow] = useState<API.MissionItem>();

  const [missionList, setMissionList] = useState<API.MissionItem[]>([]);

  const [detailOpen, handleDetailOpen] = useState<boolean>(false);

  const [formOpen, setFormOpen] = useState<boolean>(false);

  const [docModalOpen, setDocModalOpen] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const handleSplit = () => {
    console.log(
      '%c [ currentRow ]-103',
      'font-size:16px; background:#93b3bf; color:#f1d8ff;',
      currentRow,
    );
  };

  const handleEditDocument = () => {
    setDocModalOpen(true);
  };

  useEffect(() => {
    getMissionList({ current: 1, pageSize: 1000, program_id: props.id }, {}).then((res) => {
      setMissionList(res.data || []);
    });
  }, [props.id]);

  const items: MenuProps['items'] = [
    {
      label: (
        <a
          onClick={() => {
            setFormOpen(true);
          }}
        >
          编辑
        </a>
      ),
      key: '0',
    },
    {
      label: <a onClick={handleEditDocument}>文档</a>,
      key: '1',
    },
    {
      label: (
        <a
          onClick={() => {
            console.log('click delete');
          }}
        >
          删除
        </a>
      ),
      key: '2',
    },
    {
      type: 'divider',
    },
  ];

  const columns: ProColumns<API.MissionItem>[] = [
    {
      title: '发布者',
      dataIndex: 'creator',
      render: (dom, entity) => {
        return (
          <div className="info-v">
            <div className="info-left-v">
              <Avatar
                size={40}
                shape="square"
                src={entity.user_pic}
                alt={entity.nickname ? entity.nickname : entity.username}
              ></Avatar>
            </div>
            <div className="info-right-v">
              <div className="name-v">{entity.nickname ? entity.nickname : entity.username}</div>
              <div className="id-v">{entity.create_time}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      render: (dom, entity) => {
        return (
          <div>
            <Tag
              color={Demand.priorityList.find((item) => item.id === Number(entity.priority))?.color}
            >
              {Demand.priorityList.find((item) => item.id === Number(entity.priority))?.label}
            </Tag>
          </div>
        );
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      render: (dom, entity) => {
        return (
          <div className="info-v">
            <div className="info-right-v">
              <div className="name-v">
                <a
                  onClick={() => {
                    handleDetailOpen(true);
                    setCurrentRow(entity);
                  }}
                >
                  {entity.title}
                </a>
              </div>
              <div className="id-v">{entity.id}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: '指派',
      dataIndex: 'assignee',
      render: (dom, entity) => {
        return (
          <div className="info-v">
            <div className="info-left-v">
              <Avatar
                size={40}
                shape="square"
                src={entity.avatar}
                alt={entity.name}
                icon={<UserOutlined />}
              ></Avatar>
            </div>
            <div className="info-right-v">
              <div className="name-v">{entity.name}</div>
              <div className="id-v">{entity.position_name}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: '来源',
      dataIndex: 'source',
      render: (dom, entity) => {
        return (
          <div>
            <Tag color={Demand.sourceList.find((item) => item.id === Number(entity.source))?.color}>
              {Demand.sourceList.find((item) => item.id === Number(entity.source))?.label}
            </Tag>
          </div>
        );
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (dom, entity) => {
        return (
          <div>
            <Tag color={Demand.typeList.find((item) => item.id === Number(entity.type))?.color}>
              {Demand.typeList.find((item) => item.id === Number(entity.type))?.label}
            </Tag>
          </div>
        );
      },
    },
    {
      title: '关联版本',
      dataIndex: 'version',
      render: (dom, entity) => {
        return (
          <div>
            <Tag color={Demand.typeList.find((item) => item.id === Number(entity.type))?.color}>
              {Demand.typeList.find((item) => item.id === Number(entity.type))?.label}
            </Tag>
          </div>
        );
      },
    },
    {
      title: '操作',
      render: (dom, entity) => {
        return (
          <div>
            <a
              onClick={() => {
                setCurrentRow(entity);
                handleSplit();
              }}
            >
              拆分
            </a>
            <Divider type="vertical" />
            <Dropdown menu={{ items }} trigger={['click']}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => {
                  setCurrentRow(entity);
                  e.preventDefault();
                }}
              >
                更多 <DownOutlined />
              </a>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <ProTable<API.MissionItem, API.PageParams>
        headerTitle={getCurTabLabel(curTab) + '列表'}
        actionRef={actionRef}
        rowKey={(record) => record.id + ''}
        search={{
          labelWidth: 120,
        }}
        dataSource={missionList}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              // handleUpdateModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建{getCurTabLabel(curTab)}
          </Button>,
        ]}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            console.log(
              '%c [ selectedRows ]-197',
              'font-size:16px; background:#7816ec; color:#bc5aff;',
              selectedRows,
            );
            // setCurrentRow(selectedRows && selectedRows[0]);
          },
        }}
      />
      <DetailDocument
        docModalOpen={docModalOpen}
        id={currentRow?.id || ''}
        type="demand"
        onCancel={() => {
          setDocModalOpen(false);
        }}
      ></DetailDocument>
      <DetailModal
        detailOpen={detailOpen}
        id={currentRow?.id || ''}
        type="mission"
        onCancel={() => {
          handleDetailOpen(false);
        }}
      ></DetailModal>
      <Form
        formOpen={formOpen}
        id={currentRow?.id || ''}
        type="mission"
        team_id={props.team_id}
        onCancel={() => {
          setFormOpen(false);
        }}
        onSubmit={async (value, content) => {
          console.log(
            '%c [ value ]-259',
            'font-size:16px; background:#e4aab5; color:#ffeef9;',
            value,
            content,
          );
          setFormOpen(false);
        }}
      ></Form>
    </>
  );
};

export default MissionList;
