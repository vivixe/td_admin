export type DescProps = {
  demandId: string;
  demandDetailDesc: Partial<API.DemandDetailData>;
};

const DetailProgress: React.FC<DescProps> = (props) => {
  return <div>{props.demandDetailDesc.title}</div>;
};
export default DetailProgress;
