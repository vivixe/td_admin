import { Bug, tabsList } from '@/data/WorkSpace';
import { getBugList } from '@/services/admin/bug';
import { DownOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { MenuProps } from 'antd';
import { Avatar, Button, Divider, Dropdown, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import DetailModal from '../components/detailModal';
import './bug.less';

const getCurTabLabel = (value: string) => {
  return tabsList.find((item) => item.key === value)?.tab;
};

export type BugListProps = {
  id: string;
};

const items: MenuProps['items'] = [
  {
    label: (
      <a
        onClick={() => {
          console.log('click edit');
        }}
      >
        编辑
      </a>
    ),
    key: '0',
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
    key: '1',
  },
  {
    type: 'divider',
  },
];

const curTab = '3';

const BugList: React.FC<BugListProps> = (props) => {
  const [currentRow, setCurrentRow] = useState<API.BugItem>();

  const [bugList, setBugList] = useState<API.BugItem[]>([]);

  const [detailOpen, handleDetailOpen] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const handleSplit = () => {
    console.log(
      '%c [ currentRow ]-103',
      'font-size:16px; background:#93b3bf; color:#f1d8ff;',
      currentRow,
    );
  };

  useEffect(() => {
    console.log(
      '%c [ props.id ]-105',
      'font-size:16px; background:#93b3bf; color:#f1d8ff;',
      props.id,
    );
    if (props.id) {
      getBugList({ current: 1, pageSize: 1000, program_id: props.id }, {}).then((res) => {
        console.log('%c [ res ]-69', 'font-size:16px; background:#f3d258; color:#ffff9c;', res);
        setBugList(res.data || []);
      });
    }
  }, [props.id]);

  const columns: ProColumns<API.BugItem>[] = [
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
              color={Bug.priorityList.find((item) => item.id === Number(entity.priority))?.color}
            >
              {Bug.priorityList.find((item) => item.id === Number(entity.priority))?.label}
            </Tag>
          </div>
        );
      },
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      render: (dom, entity) => {
        return (
          <div>
            <Tag
              color={Bug.severityList.find((item) => item.id === Number(entity.severity))?.color}
            >
              {Bug.severityList.find((item) => item.id === Number(entity.severity))?.label}
            </Tag>
          </div>
        );
      },
    },
    {
      title: '复现程度',
      dataIndex: 'reappear',
      render: (dom, entity) => {
        return (
          <div>
            <Tag
            // color={Bug.reappearList.find((item) => item.id === Number(entity.reappear))?.color}
            >
              {Bug.reappearList.find((item) => item.id === Number(entity.reappear))?.label}
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
      title: '类型',
      dataIndex: 'type',
      render: (dom, entity) => {
        return (
          <div>
            <Tag
            // color={Bug.typeList.find((item) => item.id === Number(entity.type))?.color}
            >
              {Bug.typeList.find((item) => item.id === Number(entity.type))?.label}
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
            <Dropdown menu={{ items }}>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
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
      <ProTable<API.BugItem, API.PageParams>
        headerTitle={getCurTabLabel(curTab) + '列表'}
        actionRef={actionRef}
        rowKey={(record) => record.id + ''}
        search={{
          labelWidth: 120,
        }}
        dataSource={bugList}
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
      <DetailModal
        detailOpen={detailOpen}
        id={currentRow?.id || ''}
        type="bug"
        onCancel={() => {
          handleDetailOpen(false);
        }}
      ></DetailModal>
    </>
  );
};

export default BugList;
