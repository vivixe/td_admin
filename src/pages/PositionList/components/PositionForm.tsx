import React from 'react';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormRadio,
} from '@ant-design/pro-form';

export type PositionUpdateFormValueType = {
  id?: string;
} & Partial<API.PositionListItem>;

type PositionFormProps = {
  onSubmit: (values: PositionUpdateFormValueType) => Promise<void>;
  onCancel: (flag?: boolean, formVals?: PositionUpdateFormValueType) => void;
  updateModalOpen: boolean;
  values: Partial<API.PositionListItem>;
};

const PositionForm: React.FC<PositionFormProps> = (props) => {
  return (
    <ModalForm
      width={640}
      title="职位信息"
      open={props.updateModalOpen}
      modalProps={{
        onCancel: () => {
          props.onCancel();
        },
        destroyOnClose: true,
      }}
      onFinish={props.onSubmit}
      initialValues={props.values}
    >
      <ProFormText
        name="id"
        label="id"
        hidden={true}
      />
      <ProFormText
        name="name"
        label="职位名称"
        width="md"
        rules={[
          {
            required: true,
            message: (
              "职位名称为必填项"
            ),
          },
        ]}
      />
      <ProFormSelect
        name="type"
        label="职位类型"
        width="md"
        rules={[
          {
            required: true,
            message: (
              "职位类型为必填项"
            ),
          },
        ]}
        options={[
          {
            value: 'technology',
            label: '技术',
          },
          {
            value: 'product',
            label: '产品',
          },
          {
            value: 'management',
            label: '管理',
          },
        ]}
      />
      <ProFormRadio.Group
        name="status"
        label="状态"
        width="md"
        options={[
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ]}
      />
    </ModalForm>
  );
};

export default PositionForm;
