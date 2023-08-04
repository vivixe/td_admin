import { ContactsOutlined } from '@ant-design/icons';
// 接收参数 props，词条type分3种：technology、product、management
type PositionInfoProps = {
    // children: React.ReactNode;
    name: string;
    type: string;
}

// 定义3种词条对应的图标样式 technology、product、management
// 颜色：8cc265/4cd1d5/d3adf7

const technologyStyle = {
    color: '#8cc265',
    marginRight: '10px',
}

const productStyle = {
    color: '#4cd1d5',
    marginRight: '10px',
}

const managementStyle = {
    color: '#d3adf7',
    marginRight: '10px',
}



const PositionInfo: React.FC<PositionInfoProps> = (props) => {
    return (
        <div>
            <ContactsOutlined style={props.type === 'technology' ? technologyStyle : props.type === 'product' ? productStyle : managementStyle} />
            {props.name}

        </div>
    )
}

export default PositionInfo
