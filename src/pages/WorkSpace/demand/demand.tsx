import { Demand, tabsList } from '@/data/WorkSpace';
import { getDemandList } from '@/services/admin/demand';
import { DownOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import type { MenuProps } from 'antd';
import { Avatar, Button, Divider, Dropdown, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import DetailModal from '../components/detailModal';
import './demand.less';

const getCurTabLabel = (value: string) => {
  return tabsList.find((item) => item.key === value)?.tab;
};

export type DemandListProps = {
  id: string;
};

const items: MenuProps['items'] = [
  {
    label: <a onClick={() => {}}>编辑</a>,
    key: '0',
  },
  {
    label: <a onClick={() => {}}>删除</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
];

const curTab = '1';

const DemandList: React.FC<DemandListProps> = (props) => {
  const [currentRow, setCurrentRow] = useState<API.DemandItem>();

  const [demandList, setDemandList] = useState<API.DemandItem[]>([]);

  const [detailOpen, handleDetailOpen] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const handleSplit = () => {};

  useEffect(() => {
    if (props.id) {
      getDemandList({ current: 1, pageSize: 1000, program_id: props.id }, {}).then((res) => {
        setDemandList(res.data || []);
      });
    }
  }, [props.id]);

  const columns: ProColumns<API.DemandItem>[] = [
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
                  // onClick={showModal}
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
      <ProTable<API.DemandItem, API.PageParams>
        headerTitle={getCurTabLabel(curTab) + '列表'}
        actionRef={actionRef}
        rowKey={(record) => record.id + ''}
        search={{
          labelWidth: 120,
        }}
        dataSource={demandList}
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
              '%c [ selectedRows ]-229',
              'font-size:16px; background:#905abc; color:#d49eff;',
              selectedRows,
            );
            // setCurrentRow(selectedRows && selectedRows[0]);
          },
        }}
      ></ProTable>
      <DetailModal
        detailOpen={detailOpen}
        id={currentRow?.id || ''}
        onCancel={() => {
          handleDetailOpen(false);
        }}
      ></DetailModal>
    </>
  );
};

export default DemandList;
