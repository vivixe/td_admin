export type NoticeUpdateFormValueType = {
    id?: string;
} & Partial<API.NoticeListItem>;

type NoticeFormProps = {
    onSubmit: (values: NoticeUpdateFormValueType) => Promise<void>;
    onCancel: (flag?: boolean, formVals?: NoticeUpdateFormValueType) => void;
    updateModalOpen: boolean;
    values: Partial<API.NoticeListItem>;
};

const NoticeForm: React.FC<NoticeFormProps> = (props) => {
    return (
        <div>
            {props.values.adminid}
        </div>
    )
}

export default NoticeForm
