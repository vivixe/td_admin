import { Tag } from 'antd';

type ProgramStatusProps = {
    status: string;
}

const programStatus = [
	{
		label: '未开始',
		value: 0,
        color: '#76b6e4',
	},
	{
		label: '规划中',
		value: 1,
        color: '#6b90de',
	},
	{
		label: '开发中',
		value: 5,
        color: '#abd46e',
	},
	{
		label: '测试中',
		value: 10,
        color: '#6543a4',
	},
    {
        label: '暂停中',
        value: 20,
        color: '#de8438',
    },
	{
		label: '已上线',
		value: 50,
        color: '#639a72',
	},
	{
		label: '已结束',
		value: 100,
        color: '#61565a',
	},
]

const ProgramStatus: React.FC<ProgramStatusProps> = (props) => {
    return (
        <div>
            <Tag color={programStatus[Number(props.status)].color}>{programStatus[Number(props.status)].label}</Tag>
        </div>
    )
}

export default ProgramStatus