export type InfoUpdateFormValueType = {
    id?: string;
} & Partial<API.InfoListItem>;

type InfoFormProps = {
    onSubmit: (values: InfoUpdateFormValueType) => Promise<void>;
    onCancel: (flag?: boolean, formVals?: InfoUpdateFormValueType) => void;
    updateModalOpen: boolean;
    values: Partial<API.InfoListItem>;
};

const InfoForm: React.FC<InfoFormProps> = (props) => {
    return (
        <div>
            {props.values.adminid}
        </div>
    )
}

export default InfoForm
