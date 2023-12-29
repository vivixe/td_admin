import AliyunOSSUpload from '@/components/AliyunOSSUpload';
import { Oss_host } from '@/data/Osshost';
import { Bug, Demand } from '@/data/WorkSpace';
import { getDemandInfo } from '@/services/admin/demand';
import {
  ModalForm,
  // ProFormDatePicker,
  // ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Divider, Flex, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export type formProps = {
  formOpen: boolean;
  id: string;
  type: 'demand' | 'mission' | 'bug';
  onCancel: () => void;
  // onSubmit: (values: any) => void;
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
      // onFinish={props.onSubmit}
    >
      <Flex className="form-v" vertical={false}>
        <Flex vertical>
          <ProFormText
            name="title"
            label="标题"
            width="md"
            rules={[
              {
                required: true,
                message: '标题为必填项',
              },
            ]}
          />
          <Divider dashed />
          <ReactQuill theme="snow" value={content} onChange={setContent} />
          <Divider dashed />
          <div>
            <Flex vertical={false} align="flex-start">
              <Form.Item label="附件" name="propic" getValueFromEvent={handleInput}>
                <AliyunOSSUpload type="file" />
              </Form.Item>
            </Flex>
          </div>
        </Flex>
        <Flex vertical>
          <ProFormSelect
            name="source"
            label="来源"
            width="md"
            options={Demand.sourceList.map((item) => {
              return { label: item.label, value: item.id };
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
                return { label: item.label, value: item.id };
              })}
              rules={[
                {
                  required: true,
                  message: '严重程度为必填项',
                },
              ]}
            ></ProFormSelect>
          )}
        </Flex>
      </Flex>
    </ModalForm>
  );
};

export default EditForm;
