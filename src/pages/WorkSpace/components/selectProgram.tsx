import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import React from 'react';
// 定义
export type programSelectValueType = {
  id?: string;
} & Partial<API.ProgramSelectItem>;

export type ProgramSelectProps = {
  children?: React.ReactNode;
  onCancel: (flag?: boolean, formVals?: programSelectValueType) => void;
  onSubmit: (values: programSelectValueType) => Promise<void>;
  selectProgramModalOpen: boolean;
  values: Partial<API.ProgramSelect>['data'];
  cur_id: string;
};

const WorkerForm: React.FC<ProgramSelectProps> = (props) => {
  const programList = props.values?.map((item) => {
    return { label: item.name, value: item.program_id };
  });

  return (
    <ModalForm
      // 宽度
      width={640}
      // 标题
      title="选择项目"
      //是否打开
      open={props.selectProgramModalOpen}
      // 接收一个函数，可以在 Modal 显示时进行一些操作
      modalProps={{
        onCancel: () => {
          console.log('%c [ 222 ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '222');
          props.onCancel();
        },
        destroyOnClose: true,
      }}
      onFinish={props.onSubmit}
      initialValues={{
        program_id: props.cur_id,
      }}
    >
      <ProFormSelect
        name="program_id"
        label="当前项目"
        width="md"
        request={async () => programList || []}
        fieldProps={{
          onChange: async (value) => {
            console.log(
              '%c [ value ]-93',
              'font-size:16px; background:#93b3bf; color:#f1d8ff;',
              value,
            );
          },
        }}
        rules={[
          {
            required: true,
            message: '请选择项目',
          },
        ]}
      ></ProFormSelect>
    </ModalForm>
  );
};

export default WorkerForm;
