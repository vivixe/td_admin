import { getDemandDetail } from '@/services/admin/demand';
import type { TabsProps } from 'antd';
import { Modal, Space, Tabs, Typography } from 'antd';
import React, { useEffect } from 'react';

const { Text } = Typography;

export type detailProps = {
  detailOpen: boolean;
  id: string;
};

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '描述',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: '进度',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

const DetailModal: React.FC<detailProps> = (props) => {
  useEffect(() => {
    console.log(
      '%c [ props.detailOpen ]: ',
      'color: #bf2c9f; background: pink; font-size: 13px;',
      props.detailOpen,
    );
    getDemandDetail({ id: props.id }).then((res) => {
      console.log('%c [ res ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', res);
    });
  }, [props.detailOpen]);

  return (
    <Modal
      width={640}
      // title={props.value.name}
      open={props.detailOpen}
    >
      <div className="content-v">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
      </div>
      <div className="info-v">
        <Space direction="vertical">
          <Space>
            <Text type="secondary">关联项目：</Text>
            <Text></Text>
          </Space>
          <Space>
            <Text type="secondary">需求来源：</Text>
            <Text></Text>
          </Space>
          <Space>
            <Text type="secondary">需求类型：</Text>
            <Text></Text>
          </Space>
          <Space>
            <Text type="secondary">优先级：</Text>
            <Text></Text>
          </Space>
          <Space>
            <Text type="secondary">状态：</Text>
            <Text></Text>
          </Space>
          <Space>
            <Text type="secondary">创建者：</Text>
            <Text></Text>
          </Space>
          <Space>
            <Text type="secondary">创建时间：</Text>
            <Text></Text>
          </Space>
          <Space>
            <Text type="secondary">指派：</Text>
            <Text></Text>
          </Space>
        </Space>
      </div>
    </Modal>
  );
};

export default DetailModal;
