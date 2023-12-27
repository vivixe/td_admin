import { Demand } from '@/data/WorkSpace';
import { Space, Tag, Typography } from 'antd';
import React from 'react';
const { Text } = Typography;

// export type DetailDescValueType = {
//     id?: string;
// } & Partial<API.DemandDetailData>;

export type DescProps = {
  demandId: string;
  detailDesc: Partial<API.DemandDetailData>;
};

const DetailModal: React.FC<DescProps> = (props) => {
  return (
    <div className="info-v">
      <Space direction="vertical">
        <Space>
          <Text type="secondary">关联项目：</Text>
          <Text></Text>
        </Space>
        <Space>
          <Text type="secondary">需求来源：</Text>
          <Tag
            color={
              Demand.sourceList.find((item) => item.id === Number(props.detailDesc.source))?.color
            }
          >
            {Demand.sourceList.find((item) => item.id === Number(props.detailDesc.source))?.label}
          </Tag>
        </Space>
        <Space>
          <Text type="secondary">需求类型：</Text>
          <Tag
            color={Demand.typeList.find((item) => item.id === Number(props.detailDesc.type))?.color}
          >
            {Demand.typeList.find((item) => item.id === Number(props.detailDesc.type))?.label}
          </Tag>
        </Space>
        <Space>
          <Text type="secondary">优先级：</Text>
          <Tag
            color={
              Demand.priorityList.find((item) => item.id === Number(props.detailDesc.priority))
                ?.color
            }
          >
            {
              Demand.priorityList.find((item) => item.id === Number(props.detailDesc.priority))
                ?.label
            }
          </Tag>
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
  );
};

export default DetailModal;
