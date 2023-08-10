import { FormattedMessage, useIntl } from '@umijs/max';
import {
    ProForm,
    ProFormText,
    // ProFormSelect,
    // ProFormRadio,
    // ProFormDatePicker,
    // ProFormDateTimePicker,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
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

    const waitTime = (time = 100) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };

    return (
        <Modal
            width={640}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title={intl.formatMessage({
                id: 'pages.searchTable.updateForm.ruleConfig111',
                defaultMessage: '规则配置111',
            })}
            open={props.updateModalOpen}
            onCancel={() => {
                props.onCancel();
            }}
        >
            <ProForm
                initialValues={{
                    // 这边应该是编辑时候获取的数据
                    id: props.values.id,
                    name: props.values.name,
                    phone: props.values.phone,

                }}
                onFinish={async (values) => {
                    await waitTime(2000);
                    console.log(values);
                    props.onSubmit(values as WorkerUpdateFormValueType);
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
            </ProForm>
        </Modal>



    )
};

export default WorkerForm;