
type WorkerFormProps = {
    // children: React.ReactNode;
    onSubmit: (values: Partial<API.WorkerListItem>) => Promise<void>;
    onCancel: () => void;
    updateModalOpen: boolean;
    values: Partial<API.WorkerListItem>;
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