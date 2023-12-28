import { Bug, Demand, statusList } from '@/data/WorkSpace';
import { LinkOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Divider, Flex, Space, Tag, Typography } from 'antd';
import React from 'react';
const { Text, Title, Link } = Typography;
// import '../demand/demand.less';
import './index.less';

export type DescProps = {
  demandId: string;
  demandDetailDesc: Partial<API.DemandDetailData>;
  missionDetailDesc: Partial<API.MissionDetailData>;
  bugDetailDesc: Partial<API.BugDetailData>;
  type: 'demand' | 'mission' | 'bug';
};

const DetailModal: React.FC<DescProps> = (props) => {
  interface Props {
    type: 'demand' | 'mission' | 'bug';
    demandDetailDesc: { [key: string]: string | number };
    missionDetailDesc: { [key: string]: string | number };
    bugDetailDesc: { [key: string]: string | number };
  }

  const getValue = (code: string, props: Props) => {
    switch (props.type) {
      case 'demand':
        return props.demandDetailDesc[code] || '';
      case 'mission':
        return props.missionDetailDesc[code] || '';
      case 'bug':
        return props.bugDetailDesc[code] || '';
      default:
        return '';
    }
  };

  return (
    <Flex gap="middle" vertical={false}>
      <div className="body-v">
        <div className="basic-info-v">
          <Title level={4}>{getValue('title', props)}</Title>
        </div>
        <Divider dashed />
        <Card className="content-v">
          <div dangerouslySetInnerHTML={{ __html: getValue('content', props) || '' }}></div>
        </Card>
        <Divider dashed></Divider>
        <div>
          <LinkOutlined style={{ color: '#999', fontSize: '12px', marginRight: '4px' }} />
          <Text type="secondary">附件：</Text>
          <Link type="secondary">{'无'}</Link>
        </div>
      </div>
      <div className="right-info-v">
        <Space direction="vertical" size="middle">
          <Space>
            <div className="label-v">
              <Text type="secondary">关联项目：</Text>
            </div>
            <Text></Text>
          </Space>
          {props.type !== 'bug' && (
            <Space>
              <div className="label-v">
                <Text type="secondary">{props.type === 'demand' ? '需求' : '任务'}来源：</Text>
              </div>
              <Tag
                color={
                  Demand.sourceList.find((item) => item.id === Number(getValue('source', props)))
                    ?.color
                }
              >
                {
                  Demand.sourceList.find((item) => item.id === Number(getValue('source', props)))
                    ?.label
                }
              </Tag>
            </Space>
          )}
          {props.type === 'demand' && (
            <Space>
              <div className="label-v">
                <Text type="secondary">需求类型：</Text>
              </div>
              <Tag
                color={
                  Demand.typeList.find((item) => item.id === Number(getValue('type', props)))?.color
                }
              >
                {Demand.typeList.find((item) => item.id === Number(getValue('type', props)))?.label}
              </Tag>
            </Space>
          )}
          {props.type === 'bug' && (
            <Space>
              <div className="label-v">
                <Text type="secondary">严重程度：</Text>
              </div>
              <Tag
                color={
                  Bug.severityList.find((item) => item.id === Number(getValue('severity', props)))
                    ?.color
                }
              >
                {
                  Bug.severityList.find((item) => item.id === Number(getValue('severity', props)))
                    ?.label
                }
              </Tag>
            </Space>
          )}
          {props.type === 'bug' && (
            <Space>
              <div className="label-v">
                <Text type="secondary">缺陷类型：</Text>
              </div>
              <Tag
              // color={Bug.typeList.find((item) => item.id === Number(getValue('type', props)))?.color}
              >
                {Bug.typeList.find((item) => item.id === Number(getValue('type', props)))?.label}
              </Tag>
            </Space>
          )}
          {props.type === 'bug' && (
            <Space>
              <div className="label-v">
                <Text type="secondary">复现程度：</Text>
              </div>
              <Tag
              // color={Bug.scopeList.find((item) => item.id === Number(getValue('scope', props)))?.color}
              >
                {
                  Bug.reappearList.find((item) => item.id === Number(getValue('reappear', props)))
                    ?.label
                }
              </Tag>
            </Space>
          )}
          <Space>
            <div className="label-v">
              <Text type="secondary">优先级：</Text>
            </div>
            <Tag
              color={
                Demand.priorityList.find((item) => item.id === Number(getValue('priority', props)))
                  ?.color
              }
            >
              {
                Demand.priorityList.find((item) => item.id === Number(getValue('priority', props)))
                  ?.label
              }
            </Tag>
          </Space>
          <Space>
            <div className="label-v">
              <Text type="secondary">状态：</Text>
            </div>
            <Tag
              color={
                statusList.find((item) => item.id === Number(getValue('status', props)))?.color
              }
            >
              {statusList.find((item) => item.id === Number(getValue('status', props)))?.label}
            </Tag>
          </Space>
          <Space>
            <div className="label-v">
              <Text type="secondary">创建者：</Text>
            </div>
            <div className="info-v">
              <div className="info-left-v">
                <Avatar
                  size={24}
                  shape="circle"
                  src={getValue('user_pic', props)}
                  alt={
                    getValue('nickname', props)
                      ? getValue('nickname', props) + ''
                      : getValue('username', props) + ''
                  }
                ></Avatar>
              </div>
              <div className="info-right-v">
                <div className="name-v">
                  {getValue('nickname', props)
                    ? getValue('nickname', props) + ''
                    : getValue('username', props) + ''}
                </div>
              </div>
            </div>
          </Space>
          <Space>
            <div className="label-v">
              <Text type="secondary">创建时间：</Text>
            </div>
            <Text>{getValue('create_time', props)}</Text>
          </Space>
          <Space>
            <div className="label-v">
              <Text type="secondary">指派：</Text>
            </div>
            <div className="info-v">
              <div className="info-left-v">
                <Avatar
                  size={24}
                  shape="circle"
                  src={getValue('avatar', props)}
                  alt={getValue('name', props) + ''}
                  icon={<UserOutlined />}
                ></Avatar>
              </div>
              <div className="info-right-v">
                <div className="name-v">{getValue('name', props)}</div>
                <div className="id-v">{getValue('position_name', props)}</div>
              </div>
            </div>
          </Space>
        </Space>
      </div>
    </Flex>
  );
};

export default DetailModal;
