// import { FormattedMessage, useIntl } from '@umijs/max';
// import { Modal } from 'antd';
import React from 'react';
// 定义
export type WorkerUpdateFormValueType = {
    id?: string;
} & Partial<API.WorkerListItem>;

type WorkerFormProps = {
    onCancel: (flag?: boolean, formVals?: WorkerUpdateFormValueType) => void;
    onSubmit: (values: WorkerUpdateFormValueType) => Promise<void>;
    updateModalOpen: boolean;
    values: Partial<API.WorkerListItem>;
};

const WorkerForm : React.FC<WorkerFormProps> = (props) => {
    // const intl = useIntl();
    return (
        <div>
            <h1>WorkerForm</h1>
            {props.values.name}
        </div>
    )
};

export default WorkerForm;