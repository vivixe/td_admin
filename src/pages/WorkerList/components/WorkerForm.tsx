
type WorkerFormProps = {
    // children: React.ReactNode;
    onSubmit: (values: Partial<API.RuleListItem>) => Promise<void>;
    onCancel: () => void;
    updateModalOpen: boolean;
    values: Partial<API.RuleListItem>;
    name: string;
};

const WorkerForm : React.FC<WorkerFormProps> = (props) => {
    return (
        <div>
            <h1>WorkerForm</h1>
            {props.name}
        </div>
    )
};

export default WorkerForm;