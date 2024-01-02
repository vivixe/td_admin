import AliyunOSSUpload from '@/components/AliyunOSSUpload';
import { Oss_host } from '@/data/Osshost';
import { Bug, Demand } from '@/data/WorkSpace';
import { getDemandInfo } from '@/services/admin/demand';
import { getUserSelect } from '@/services/admin/program';
import { getMemberSelect } from '@/services/admin/team';
import {
  ModalForm,
  ProFormDatePicker,
  // ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Avatar, Divider, Flex, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// 定义
export type DemandFormValueType = {
  id?: string;
} & Partial<API.DemandItem>;

export type formProps = {
  formOpen: boolean;
  id: string;
  team_id: string;
  type: 'demand' | 'mission' | 'bug';
  onCancel: () => void;
  onSubmit: (values: DemandFormValueType, content: string) => Promise<void>;
};

const EditForm: React.FC<formProps> = (props) => {
  const [content, setContent] = useState<string>('');

  const [demandFormInfo, setDemandFormInfo] = useState<API.DemandInfoData>({});

  const handleInput = (event: any) => {
    if (event.length > 0 && event[event.length - 1].status === 'done') {
      return document.location.protocol + Oss_host + '/' + event[event.length - 1].url;
    }
  };

  const getDemandFormInfo = () => {
    getDemandInfo({ id: props.id }).then((res) => {
      if (res.status === 0) {
        setDemandFormInfo(res.data);
        setContent(res.data.content || '');
      }
    });
  };

  useEffect(() => {
    if (props.formOpen === true) {
      getDemandFormInfo();
    }
  }, [props.formOpen]);

  return (
    <ModalForm
      title="规则配置"
      layout="horizontal"
      open={props.formOpen}
      width={'90vw'}
      // 接收一个函数，可以在 Modal 显示时进行一些操作
      modalProps={{
        onCancel: () => {
          console.log('%c [ 222 ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '222');
          props.onCancel();
        },
        destroyOnClose: true,
      }}
      initialValues={demandFormInfo}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={(values) => props.onSubmit(values, content)}
    >
      <Flex className="form-v" vertical={false} style={{ height: '70vh', padding: '24px' }}>
        <Flex vertical style={{ width: '65vw' }} align="flex-start">
          <ProFormText
            name="title"
            label="标题"
            width="lg"
            rules={[
              {
                required: true,
                message: '标题为必填项',
              },
            ]}
          />
          <Divider dashed />
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            style={{ width: '100%', maxHeight: '40vh' }}
          />
          <Divider dashed />
          <div>
            <Flex vertical={false} align="flex-start">
              <Form.Item label="附件" name="propic" getValueFromEvent={handleInput}>
                <AliyunOSSUpload type="file" />
              </Form.Item>
            </Flex>
          </div>
        </Flex>
        <Flex vertical style={{ width: '25vw' }}>
          <ProFormSelect
            name="source"
            label="来源"
            width="md"
            options={Demand.sourceList.map((item) => {
              return { label: item.label, value: item.id + '' };
            })}
            rules={[
              {
                required: true,
                message: '来源为必填项',
              },
            ]}
          ></ProFormSelect>
          {props.type === 'bug' && (
            <ProFormSelect
              name="severity"
              label="严重程度"
              width="md"
              options={Bug.severityList.map((item) => {
                return { label: item.label, value: item.id + '' };
              })}
              rules={[
                {
                  required: true,
                  message: '严重程度为必填项',
                },
              ]}
            ></ProFormSelect>
          )}
          {props.type === 'demand' && (
            <ProFormSelect
              name="type"
              label="类型"
              width="md"
              options={Demand.typeList.map((item) => {
                return { label: item.label, value: item.id + '' };
              })}
              rules={[
                {
                  required: true,
                  message: '类型为必填项',
                },
              ]}
            ></ProFormSelect>
          )}
          {props.type === 'bug' && (
            <ProFormSelect
              name="type"
              label="类型"
              width="md"
              options={Bug.typeList.map((item) => {
                return { label: item.label, value: item.id + '' };
              })}
              rules={[
                {
                  required: true,
                  message: '类型为必填项',
                },
              ]}
            ></ProFormSelect>
          )}
          {props.type === 'bug' && (
            <ProFormSelect
              name="reappear"
              label="复现程度"
              width="md"
              options={Bug.reappearList.map((item) => {
                return { label: item.label, value: item.id + '' };
              })}
              rules={[
                {
                  required: true,
                  message: '复现程度为必填项',
                },
              ]}
            ></ProFormSelect>
          )}
          <ProFormSelect
            name="priority"
            label="优先级"
            width="md"
            options={Demand.priorityList.map((item) => {
              return { label: item.label, value: item.id + '' };
            })}
          ></ProFormSelect>
          <ProFormSelect
            name="creator"
            label="创建者"
            width="md"
            request={async () => {
              const data = await getUserSelect({ current: 1, pageSize: 1000 });
              // 取出data.data中的id和name
              const UserList = data.data
                ? data.data.map((item: any) => {
                    // return { label: item.nickname, value: item.id }
                    return {
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar src={item.user_pic} size={24} style={{ marginRight: '8px' }}>
                            {item.nickname}
                          </Avatar>
                          {item.nickname}
                        </div>
                      ),
                      value: item.id + '',
                    };
                  })
                : [];
              return UserList;
            }}
          ></ProFormSelect>
          <ProFormDatePicker
            name="create_time"
            label="创建时间"
            placeholder="请选择时间"
            width="md"
            rules={[{ required: true, message: '时间不能为空' }]}
          />
          <ProFormSelect
            name="assignee"
            label="负责人"
            width="md"
            request={async () => {
              const data = await getMemberSelect({ id: props.team_id, type: 'team' });
              // 取出data.data中的id和name
              const UserList = data.data
                ? data.data.map((item) => {
                    // return { label: item.nickname, value: item.id }
                    return {
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar src={item.avatar} size={24} style={{ marginRight: '8px' }}>
                            {item.user_name}
                          </Avatar>
                          {item.user_name}
                        </div>
                      ),
                      value: item.worker_id + '',
                    };
                  })
                : [];
              return UserList;
            }}
          ></ProFormSelect>
        </Flex>
      </Flex>
    </ModalForm>
  );
};

export default EditForm;
