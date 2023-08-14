import { FormattedMessage, useIntl } from '@umijs/max';
import {
    ModalForm,
    ProFormText,
    // ProFormSelect,
    ProFormRadio,
    // ProFormDatePicker,
    // ProFormDateTimePicker,
} from '@ant-design/pro-components';
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
    const intl = useIntl();

    return (
        <ModalForm
            // 宽度
            width={640}
            // 标题
            title={intl.formatMessage({
                id: 'pages.searchTable.updateForm.ruleConfig111',
                defaultMessage: '规则配置111',
            })}
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
            initialValues={{
                id: props.values.id,
                name: props.values.name,
                phone: props.values.phone,
                email: props.values.email,
                age: props.values.age,
                sex: props.values.sex,
                address: props.values.address,
            }}
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
                            <FormattedMessage
                                id="pages.searchTable.ruleName"
                                defaultMessage="姓名为必填项"
                            />
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
                            <FormattedMessage
                                id="pages.searchTable.ruleName"
                                defaultMessage="电话为必填项"
                            />
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
                            <FormattedMessage
                                id="pages.searchTable.ruleName"
                                defaultMessage="邮箱为必填项"
                            />
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
                            <FormattedMessage
                                id="pages.searchTable.ruleName"
                                defaultMessage="性别为必填项"
                            />
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
                            <FormattedMessage
                                id="pages.searchTable.ruleName"
                                defaultMessage="年龄为必填项"
                            />
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
                            <FormattedMessage
                                id="pages.searchTable.ruleName"
                                defaultMessage="地址为必填项"
                            />
                        ),
                    },
                ]}
            />
        </ModalForm>
    )
};

export default WorkerForm;