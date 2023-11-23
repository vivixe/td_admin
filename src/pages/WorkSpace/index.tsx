import { programStatus } from '@/data/programStatus';
import { tabsList } from '@/data/WorkSpace';
import { getProgramDetail } from '@/services/admin/program';
import { MoreOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { Button, Dropdown, Row, Tag } from 'antd';
import { useEffect, useState } from 'react';
import DemandList from './demand/demand';
import './index.css';

// const { Paragraph } = Typography;

const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    ),
  },
];

const DropdownMenu = () => (
  <Dropdown key="more" menu={{ items }} placement="bottomRight">
    <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
  </Dropdown>
);

const IconLink = ({ src, text }: { src: string; text: string }) => (
  <a className="example-link">
    <img className="example-link-icon" src={src} alt={text} />
    {text}
  </a>
);

const getStatusValue = (status: string, type: 'label' | 'color') => {
  if (type === 'label') {
    return programStatus.find((item) => item.value === Number(status))?.label;
  } else {
    return programStatus.find((item) => item.value === Number(status))?.color;
  }
};

const content = (
  <>
    {/* <Paragraph>
            Ant Design interprets the color system into two levels: a system-level color system and a
            product-level color system.
        </Paragraph>
        <Paragraph>
            Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
            easier for designers to have a clear psychological expectation of color when adjusting colors,
            as well as facilitate communication in teams.
        </Paragraph> */}
    <div>
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
        text="Quick Start"
      />
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
        text=" Product Info"
      />
      <IconLink
        src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
        text="Product Doc"
      />
    </div>
  </>
);

const Content: React.FC<{ children: React.ReactNode; extraContent: React.ReactNode }> = ({
  children,
  extraContent,
}) => (
  <Row>
    <div style={{ flex: 1 }}>{children}</div>
    <div className="image">{extraContent}</div>
  </Row>
);

const WorkSpaceHome = () => {
  const [detail, setDetail] = useState<API.ProgramDetail>();
  const [curTab, setCurTab] = useState('1');

  // const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  let location = useLocation();
  let search = location.search;
  let searchParams = new URLSearchParams(search);
  const program_id = searchParams.get('id') || undefined;
  console.log(
    '%c [ program_id ]-97',
    'font-size:16px; background:#35b5a0; color:#79f9e4;',
    program_id,
  );

  useEffect(() => {
    if (program_id === undefined) {
      let initalData = {
        status: '0',
      };
      console.log(
        '%c [ initalData ]-103',
        'font-size:16px; background:#dc0d87; color:#ff51cb;',
        initalData,
      );
    } else {
      getProgramDetail({ program_id: program_id }).then((res) => {
        console.log('%c [ res ]-109', 'font-size:16px; background:#c3a284; color:#ffe6c8;', res);
        if (res.status === 0) {
          setDetail(res || {});
          console.log(
            '%c [ detail ]: ',
            'color: #bf2c9f; background: pink; font-size: 13px;',
            detail,
          );
        }
      });
    }
  }, []);

  return (
    <div>
      <PageContainer
        header={{
          title: detail?.data?.baseInfo.name,
          className: 'site-page-header',
          subTitle: detail?.data?.baseInfo.demand,
          tags: (
            <Tag color={getStatusValue(detail?.data?.baseInfo.status || '', 'color')}>
              {getStatusValue(detail?.data?.baseInfo.status || '', 'label')}
            </Tag>
          ),
          extra: [
            <Button key={3}>操作二</Button>,
            <Button key={2}>操作一</Button>,
            <Button key={1} type="primary">
              主要操作
            </Button>,
            <DropdownMenu key={'more'}></DropdownMenu>,
          ],
          avatar: { src: detail?.data?.baseInfo.team_pic },
          children: (
            <Content
              extraContent={<img src={detail?.data?.baseInfo.propic} alt="content" width="150px" />}
            >
              {content}
            </Content>
          ),
        }}
        tabList={tabsList}
        onTabChange={(key) => {
          console.log('%c [ key ]-155', 'font-size:16px; background:#d6b5a7; color:#fff9eb;', key);
          setCurTab(key);
        }}
      >
        {curTab === '1' ? <DemandList id={program_id || ''} /> : null}
        {/* <ProCard direction="column" ghost gutter={[0, 16]}>
                <ProCard style={{ height: 200 }} />
                <ProCard gutter={16} ghost>
                    <ProCard colSpan={16} style={{ height: 200 }} />
                    <ProCard colSpan={8} style={{ height: 200 }} />
                </ProCard>
                <ProCard gutter={16} ghost>
                    <ProCard colSpan={8} style={{ height: 200 }} />
                    <ProCard colSpan={16} style={{ height: 200 }} />
                </ProCard>
            </ProCard> */}
      </PageContainer>
    </div>
  );
};

export default WorkSpaceHome;
