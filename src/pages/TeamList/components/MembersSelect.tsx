import { ModalForm, ProFormText } from '@ant-design/pro-form';
import React from 'react';

export type MembersSelectUpdateValueType = {
  id?: string;
} & Partial<API.TeamItem>;

type MembersSelectProps = {
  onSubmit: (values: MembersSelectUpdateValueType) => Promise<void>;
  onCancel: (flag?: boolean, formVals?: MembersSelectUpdateValueType) => void;
  MembersSelectModalOpen: boolean;
  values: Partial<API.TeamItem>;
};

const MembersSelect: React.FC<MembersSelectProps> = (props) => {
  return (
    <ModalForm
      width={640}
      title="团队信息"
      open={props.MembersSelectModalOpen}
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
    </ModalForm>
  );
};

export default MembersSelect;
