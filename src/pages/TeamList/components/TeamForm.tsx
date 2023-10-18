import AliyunOSSUpload from '@/components/AliyunOSSUpload';
import { Oss_host } from '@/data/Osshost';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { Form } from 'antd';
import React from 'react';

export type TeamUpdateFormValueType = {
  id?: string;
} & Partial<API.TeamItem>;

type TeamFormProps = {
  onSubmit: (values: TeamUpdateFormValueType) => Promise<void>;
  onCancel: (flag?: boolean, formVals?: TeamUpdateFormValueType) => void;
  teamModalOpen: boolean;
  values: Partial<API.TeamItem>;
};

const handleInput = (event: any) => {
  if (event.length > 0 && event[event.length - 1].status === 'done') {
    return document.location.protocol + Oss_host + '/' + event[event.length - 1].url;
  }
};

const TeamForm: React.FC<TeamFormProps> = (props) => {
  return (
    <ModalForm
      width={640}
      title="团队信息"
      open={props.teamModalOpen}
      modalProps={{
        onCancel: () => {
          props.onCancel();
        },
        destroyOnClose: true,
      }}
      onFinish={props.onSubmit}
      initialValues={props.values}
    >
      <ProFormText name="id" label="id" hidden={true} />
      <ProFormText
        name="name"
        label="团队名称"
        width="md"
        rules={[
          {
            required: true,
            message: '团队名称为必填项',
          },
        ]}
      />
      <ProFormText
        name="intro"
        label="简介"
        width="md"
        rules={[
          {
            required: false,
            message: '填写团队介绍',
          },
        ]}
      />

      <Form.Item
        label="团队头像"
        name="team_pic"
        getValueFromEvent={handleInput}
        extra="请上传一张不大于2M的图片。"
      >
        <AliyunOSSUpload />
      </Form.Item>
    </ModalForm>
  );
};

export default TeamForm;
