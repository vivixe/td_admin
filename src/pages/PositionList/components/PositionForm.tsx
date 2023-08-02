type PositionFormProps = {
  // children: React.ReactNode;
  onSubmit: (values: Partial<API.PositionListItem>) => Promise<void>;
  onCancel: () => void;
  updateModalOpen: boolean;
  values: Partial<API.PositionListItem>;
  name: string;
};

const PositionForm: React.FC<PositionFormProps> = (props) => {
  return (
    <div>
      <h1>PositionForm</h1>
      {props.name}
    </div>
  );
};

export default PositionForm;
