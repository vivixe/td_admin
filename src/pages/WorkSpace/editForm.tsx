import AliyunOSSUpload from '@/components/AliyunOSSUpload';
import { Oss_host } from '@/data/Osshost';
import { LinkOutlined } from '@ant-design/icons';
import {
  ModalForm,
  // ProFormDatePicker,
  // ProFormRadio,
  // ProFormSelect,
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
};

const EditForm: React.FC<formProps> = (props) => {
  const [content, setContent] = useState<string>('');

  const handleInput = (event: any) => {
    if (event.length > 0 && event[event.length - 1].status === 'done') {
      return document.location.protocol + Oss_host + '/' + event[event.length - 1].url;
    }
  };

  // const getMissionDesc = () => {
  //     getMissionDetail({ id: props.id }).then((res) => {
  //       setMissionDetailDesc(res.data);
  //       setLoading(false);
  //     });
  //   };

  useEffect(() => {
    if (props.formOpen === true) {
    }
  }, [props.formOpen]);

  return (
    <ModalForm>
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
            <LinkOutlined style={{ color: '#999', fontSize: '12px', marginRight: '4px' }} />
            {/* <Text type="secondary">附件：</Text> */}
            <Form.Item
              label="附件"
              name="propic"
              getValueFromEvent={handleInput}
              extra="请上传附件。"
            >
              <AliyunOSSUpload type="file" />
            </Form.Item>
          </div>
        </Flex>
      </Flex>
    </ModalForm>
  );
};

export default EditForm;
