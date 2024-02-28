import { data } from '@/pages/AttendanceManage/data.js';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import React from 'react';
import './index.less';

interface EmployeeSignList {
  name: string;
  gender: 'male' | 'female'; // 假设只考虑这两种性别
  dept: string;
  email: string;
  onDuty: boolean;
  offDuty: boolean;
}

// 如果有多条记录，我们可以定义一个数组类型：
type SignLists = EmployeeSignList[];

const getListData = (value: Dayjs) => {
  console.log('%c [ data ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', data);
  let listData;
  data.forEach((item: { date: string; signLists: SignLists }) => {
    if (value.format('YYYY-MM-DD') === item.date) {
      listData = item.signLists;
    }
  });
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const AttendanceManage: React.FC = () => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item: EmployeeSignList, index) => (
          <li key={index}>
            <div>
              <span className="name">{item.name}</span>
              {item?.gender === 'male' ? (
                <ManOutlined style={{ color: '#08c' }} />
              ) : (
                <WomanOutlined style={{ color: 'rgb(255, 173, 210)' }} />
              )}
            </div>
            <span>上</span>
            <Badge status={item.onDuty === true ? 'success' : ('error' as BadgeProps['status'])} />
            <span>下</span>
            <Badge status={item.offDuty === true ? 'success' : ('error' as BadgeProps['status'])} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    console.log('%c [  ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', current);
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <PageContainer>
      <Calendar cellRender={cellRender} />
    </PageContainer>
  );
};

export default AttendanceManage;
