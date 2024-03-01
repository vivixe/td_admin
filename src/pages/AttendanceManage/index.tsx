import { data } from '@/pages/AttendanceManage/data.js';
import { PageContainer } from '@ant-design/pro-components';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import React from 'react';
import './index.less';

interface EmployeeSignListItem {
  name: string;
  gender: 'male' | 'female'; // 假设只考虑这两种性别
  dept: string;
  email: string;
  onDuty: boolean;
  offDuty: boolean;
}

// 如果有多条记录，我们可以定义一个数组类型：
type SignLists = EmployeeSignListItem[];

type listData = {
  date: string;
  todoEvents: number;
  finishedEvents: number;
  signLists: SignLists;
};

const getListData = (value: Dayjs) => {
  console.log('%c [ data ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', data);
  let listData;
  data.forEach((item: listData) => {
    if (value.format('YYYY-MM-DD') === item.date) {
      listData = item;
    }
  });
  return (
    listData || {
      date: value.format('YYYY-MM-DD'),
      todoEvents: 0,
      finishedEvents: 0,
      signLists: [],
    }
  );
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
    const listData: listData = getListData(value);
    let perOnDuty = 0;
    let perOffDuty = 0;
    if (listData.signLists) {
      listData.signLists.forEach((item: EmployeeSignListItem) => {
        if (item.onDuty === true) {
          perOnDuty += 1;
        }
      });
      listData.signLists.forEach((item: EmployeeSignListItem) => {
        if (item.offDuty === true) {
          perOffDuty += 1;
        }
      });
    }
    return listData.signLists.length > 0 ? (
      <div className="events">
        <div className="event">
          <Badge
            status={
              perOnDuty < listData.signLists.length
                ? 'warning'
                : ('success' as BadgeProps['status'])
            }
          />
          <span className="sub">
            签到：{perOnDuty} / {listData.signLists.length}
          </span>
        </div>
        <div className="event">
          <Badge
            status={
              perOffDuty < listData.signLists.length
                ? 'warning'
                : ('success' as BadgeProps['status'])
            }
          />
          <span className="sub">
            签退：{perOffDuty} / {listData.signLists.length}
          </span>
        </div>
        <div className="event">
          <Badge
            status={
              listData.finishedEvents < listData.todoEvents
                ? 'processing'
                : ('success' as BadgeProps['status'])
            }
          />
          <span className="sub">
            待办：{listData.finishedEvents} / {listData.todoEvents}
          </span>
        </div>
      </div>
    ) : null;
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
