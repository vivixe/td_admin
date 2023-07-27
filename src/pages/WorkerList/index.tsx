import { PlusOutlined } from '@ant-design/icons';
import {
    // FooterToolbar,
    ModalForm,
    PageContainer,
    // ProDescriptions,
    ProFormText,
    ProFormTextArea,
    ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { FormattedMessage, useIntl } from '@umijs/max';
import React, { useRef, useState } from 'react';
import WorkerForm from './components/WorkerForm';

const handleAdd = (fields: API.RuleListItem) => {
    console.log(fields);
    return true;
}

const handleUpdate = (fields: API.RuleListItem) => {
    console.log(fields);
    return true;
}

const WorkerList: React.FC = () => {

    const [createModalOpen, handleModalOpen] = useState<boolean>(false);

    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();

    const intl = useIntl();

    const columns: ProColumns<API.RuleListItem>[] = [
        {
            title: (
                <FormattedMessage
                    id="pages.workerTable.workerName"
                    defaultMessage="职员姓名"
                />
            ),
            dataIndex: 'name',
            tip: '规则名称是唯一的 key',
            render: (dom, entity) => {
                return (
                    <a
                        onClick={() => {
                            setCurrentRow(entity);
                        }}
                    >
                        {dom}
                    </a>
                );
            }
        },
        {
            title: (
                <FormattedMessage
                    id="pages.workerTable.workerPosition"
                    defaultMessage="职位"
                />
            ),
            dataIndex: 'position',
            render: (dom, entity) => {
                return (
                    <div
                        onClick={() => {
                            setCurrentRow(entity);
                        }}
                    >
                        {dom}
                    </div>
                );
            }
        },
        {
            title: (
                <FormattedMessage
                    id="pages.workerTable.workerContact"
                    defaultMessage="联系方式"
                />
            ),
            dataIndex: 'contact',
            render: (dom, entity) => {
                return (
                    <div
                        onClick={() => {
                            setCurrentRow(entity);
                        }}
                    >
                        {dom}
                    </div>
                );
            }
        },
        {
            title: (
                <FormattedMessage
                    id="pages.searchTable.titleStatus"
                    defaultMessage="状态"
                />
            ),
            dataIndex: 'status',
            hideInForm: true,
            valueEnum: {
                0: {
                    text: (
                        <FormattedMessage
                            id="pages.searchTable.nameStatus.default"
                            defaultMessage="Shut down"
                        />
                    ),
                    status: 'Default',
                },
                1: {
                    text: (
                        <FormattedMessage id="pages.searchTable.nameStatus.running" defaultMessage="Running" />
                    ),
                    status: 'Processing',
                },
                2: {
                    text: (
                        <FormattedMessage id="pages.searchTable.nameStatus.online" defaultMessage="Online" />
                    ),
                    status: 'Success',
                },
                3: {
                    text: (
                        <FormattedMessage
                            id="pages.searchTable.nameStatus.abnormal"
                            defaultMessage="Abnormal"
                        />
                    ),
                    status: 'Error',
                },
            },
        }

    ]

    return (
        <PageContainer>
            <ProTable<API.RuleListItem, API.PageParams>
                headerTitle={intl.formatMessage({
                    id: 'pages.searchTable.title',
                    defaultMessage: '查询表格',
                })}
                actionRef={actionRef}
                rowKey="key"
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            handleModalOpen(true);
                        }}
                    >
                        <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
                    </Button>,
                ]}
                // request = {
                //     async (params, sorter, filter) => {
                //         const {data : res} = await rule({ ...params, sorter, filter });
                //         return {
                //             data: res.list,
                //             success: true,
                //             total: res.totalCount,
                //         }
                //     }
                // }
                columns={columns}
                rowSelection={{}}
            />
            <ModalForm
                title={intl.formatMessage({
                    id: 'pages.searchTable.createForm.newRule',
                    defaultMessage: 'New rule',
                })}
                width="400px"
                open={createModalOpen}
                onOpenChange={handleModalOpen}
                onFinish={async (value) => {
                    const success = await handleAdd(value as API.RuleListItem);
                    if (success) {
                        handleModalOpen(false);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                <ProFormText
                    rules={[
                        {
                            required: true,
                            message: (
                                <FormattedMessage
                                    id="pages.searchTable.ruleName"
                                    defaultMessage="Rule name is required"
                                />
                            ),
                        },
                    ]}
                    width="md"
                    name="name"
                />
                <ProFormTextArea width="md" name="desc" />
            </ModalForm>
            <WorkerForm
                onSubmit={async (value) => {
                    const success = await handleUpdate(value);
                    if (success) {
                        handleUpdateModalOpen(false);
                        setCurrentRow(undefined);
                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => {
                    handleUpdateModalOpen(false);
                    // if (!showDetail) {
                    //     setCurrentRow(undefined);
                    // }
                }}
                updateModalOpen={updateModalOpen}
                values={currentRow || {}}
                name={currentRow?.name || ''}
            />
        </PageContainer>
    )
}

export default WorkerList