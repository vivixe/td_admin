// import { FormattedMessage, useIntl } from '@umijs/max';
import {
    ModalForm,
    ProFormText,
    ProFormSelect,
    ProFormRadio,
    ProFormDatePicker,
    // RequestOptionsType,
    // ProFormDateTimePicker,
} from '@ant-design/pro-components';
import { getPositionList } from '@/services/admin/position';
// import { getWorkerDetail } from '@/services/admin/worker';
import React from 'react';
// 定义
export type WorkerUpdateFormValueType = {
    id?: string;
} & Partial<API.WorkerListItem>;

export type WorkerFormProps = {
    onCancel: (flag?: boolean, formVals?: WorkerUpdateFormValueType) => void;
    onSubmit: (values: WorkerUpdateFormValueType) => Promise<void>;
    updateModalOpen: boolean;
    values: Partial<API.WorkerListItem>;
};


const WorkerForm: React.FC<WorkerFormProps> = (props) => {

    return (
        <ModalForm
            // 宽度
            width={640}
            // 标题
            title='规则配置111'
            //是否打开
            open={props.updateModalOpen}
            // 接收一个函数，可以在 Modal 显示时进行一些操作
            modalProps={{
                onCancel: () => {
                    console.log('%c [ 222 ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '222')
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
                label="姓名"
                width="md"
                rules={[
                    {
                        required: true,
                        message: (
                            "姓名为必填项"
                        ),
                    },
                ]}
            />
            <ProFormText
                name="phone"
                label="电话"
                width="md"
                rules={[
                    {
                        required: true,
                        message: (
                            "电话为必填项"
                        ),
                    },
                ]}
            />
            {/* 邮箱 */}
            <ProFormText
                name="email"
                label="邮箱"
                width="md"
                rules={[
                    {
                        required: true,
                        message: (
                            "邮箱为必填项"
                        ),
                    },
                ]}
            />
            <ProFormRadio.Group
                name="sex"
                label="性别"
                width="md"
                options={[
                    {
                        label: '男',
                        value: 'male',
                    },
                    {
                        label: '女',
                        value: 'female',
                    },
                ]}
                rules={[
                    {
                        required: true,
                        message: (
                            "性别为必填项"
                        ),
                    },
                ]}
            />
            <ProFormText
                name="age"
                label="年龄"
                width="md"
                rules={[
                    {
                        required: true,
                        message: (
                            "年龄为必填项"
                        ),
                    },
                ]}
            />
            <ProFormDatePicker
                name="date"
                label="入职日期"
                width="md"
                rules={[
                    {
                        required: true,
                        message: (
                            "入职日期为必填项"
                        ),
                    },
                ]}
            />
            <ProFormSelect
                name="position_id"
                label="职位"
                width="md"
                fieldProps={{
                    onChange: async (value) => {
                        console.log('%c [ value ]-93', 'font-size:16px; background:#93b3bf; color:#f1d8ff;', value)
                    },
                }}
                request={async () => {
                    const data = await getPositionList({ current: 1, pageSize: 1000 }, {});
                    console.log('%c [ data ]-98', 'font-size:16px; background:#93b3bf; color:#f1d8ff;', data)
                    // 取出data.data中的id和name
                    const positionList = data.data ? data.data.map((item) => {
                        return { label: item.name, value: item.id }
                    }
                    ): [];
                    return positionList;
                }}
                rules={[
                    {
                        required: true,
                        message: (
                            "职位为必填项"
                        ),
                    },
                ]}
            />
            <ProFormText
                name="address"
                label="地址"
                width="md"
                rules={[
                    {
                        required: true,
                        message: (
                            "地址为必填项"
                        ),
                    },
                ]}
            />
        </ModalForm>
    )
};

export default WorkerForm;