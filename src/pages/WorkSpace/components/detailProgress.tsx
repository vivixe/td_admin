import type { TableProps } from 'antd';
import { Flex, Table, Tag, Typography } from 'antd';
import React from 'react';
const { Title } = Typography;

interface TimeRecordDataType {
  no: number;
  time: string;
  time_period: string;
  status: number;
}

export type DescProps = {
  id: string;
  type: 'demand' | 'mission' | 'bug';
  demandDetailDesc: Partial<API.DemandDetailData>;
  missionDetailDesc: Partial<API.MissionDetailData>;
  bugDetailDesc: Partial<API.BugDetailData>;
};

const DetailStatusValue = [
  {
    label: '未开始',
    value: 1,
    color: '#76b6e4',
  },
  {
    label: '进行中',
    value: 2,
    color: '#6b90de',
  },
  {
    label: '已完成',
    value: 3,
    color: '#abd46e',
  },
];

const columns: TableProps<TimeRecordDataType>['columns'] = [
  {
    title: '序号',
    dataIndex: 'no',
    key: 'no',
    render: (text) => <span>{text}</span>,
  },
  {
    title: '时长',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '时间段',
    dataIndex: 'time_period',
    key: 'time_period',
  },
];

const getStatusValue = (status: string, type: 'label' | 'color') => {
  if (type === 'label') {
    return DetailStatusValue.find((item) => item.value === Number(status))?.label;
  } else {
    return DetailStatusValue.find((item) => item.value === Number(status))?.color;
  }
};

const DetailStatus: React.FC<DescProps> = (props) => {
  let currentStatus = '';
  switch (props.type) {
    case 'demand':
      currentStatus = props.demandDetailDesc.status || '';
      break;
    case 'mission':
      currentStatus = props.missionDetailDesc.status || '';
      break;
    case 'bug':
      currentStatus = props.bugDetailDesc.status || '';
      break;
  }
  return (
    <div>
      <Tag color={getStatusValue(currentStatus || '', 'color')}>
        {getStatusValue(currentStatus || '', 'label')}
      </Tag>
    </div>
  );
};

const DetailProgress: React.FC<DescProps> = (props) => {
  return (
    <div>
      <Flex gap="middle" vertical={true}>
        <Title level={3}>
          {props.type === 'demand'
            ? props.demandDetailDesc.title || '无需求标题'
            : props.type === 'mission'
            ? props.missionDetailDesc.title || '无任务标题'
            : props.bugDetailDesc.title || '无缺陷标题'}
        </Title>
        <div>
          <span>
            花费时间：
            {props.type === 'demand'
              ? props.demandDetailDesc.cost_time
              : props.type === 'mission'
              ? props.missionDetailDesc.cost_time
              : props.bugDetailDesc.cost_time}
            h
          </span>
        </div>
        {props.type !== 'demand' ? (
          <div>
            <span>
              预估时间：
              {props.type === 'mission'
                ? props.missionDetailDesc.estimate_time
                : props.bugDetailDesc.estimate_time}
              h
            </span>
          </div>
        ) : null}
        <Flex gap="small" vertical={false}>
          <span>状态：</span>
          <DetailStatus
            id={props.id}
            type={props.type}
            demandDetailDesc={props.demandDetailDesc}
            missionDetailDesc={props.missionDetailDesc}
            bugDetailDesc={props.bugDetailDesc}
          ></DetailStatus>
        </Flex>
        {props.type === 'demand' && props.demandDetailDesc.status === '3' ? (
          <div>
            <span>完成备注：{props.demandDetailDesc.complete_desc}</span>
          </div>
        ) : props.type === 'mission' && props.missionDetailDesc.status === '3' ? (
          <div>
            <span>完成备注：{props.missionDetailDesc.complete_desc}</span>
          </div>
        ) : props.type === 'bug' && props.bugDetailDesc.status === '3' ? (
          <div>
            <span>完成备注：{props.bugDetailDesc.complete_desc}</span>
          </div>
        ) : null}
        <Flex gap="middle" vertical={true}>
          <span>时间记录：</span>
          <Table
            columns={columns}
            dataSource={
              JSON.parse(
                props.type === 'demand'
                  ? props.demandDetailDesc.time_record || '[]'
                  : props.type === 'mission'
                  ? props.missionDetailDesc.time_record || '[]'
                  : props.bugDetailDesc.time_record || '[]',
              ) || []
            }
          />
        </Flex>
      </Flex>
    </div>
  );
};
export default DetailProgress;
