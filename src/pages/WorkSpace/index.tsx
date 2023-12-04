import { programStatus } from '@/data/programStatus';
import { tabsList } from '@/data/WorkSpace';
import { getProgramDetail, getProgramSelect } from '@/services/admin/program';
import { MoreOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history, useLocation } from '@umijs/max';
import { Button, Dropdown, Tag } from 'antd';
import { useEffect, useState } from 'react';
import BugList from './bug/bug';
import SelectProgram from './components/selectProgram';
import DemandList from './demand/demand';
import './index.css';
import MissionList from './mission/mission';

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

// const IconLink = ({ src, text }: { src: string; text: string }) => (
//   <a className="example-link">
//     <img className="example-link-icon" src={src} alt={text} />
//     {text}
//   </a>
// );

const getStatusValue = (status: string, type: 'label' | 'color') => {
  if (type === 'label') {
    return programStatus.find((item) => item.value === Number(status))?.label;
  } else {
    return programStatus.find((item) => item.value === Number(status))?.color;
  }
};

// const content = (
//   <>
//     {/* <Paragraph>
//             Ant Design interprets the color system into two levels: a system-level color system and a
//             product-level color system.
//         </Paragraph>
//         <Paragraph>
//             Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
//             easier for designers to have a clear psychological expectation of color when adjusting colors,
//             as well as facilitate communication in teams.
//         </Paragraph> */}
//     <div>
//       <IconLink
//         src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
//         text="Quick Start"
//       />
//       <IconLink
//         src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
//         text=" Product Info"
//       />
//       <IconLink
//         src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
//         text="Product Doc"
//       />
//     </div>
//   </>
// );

// const Content: React.FC<{ children: React.ReactNode; extraContent: React.ReactNode }> = ({
//   children,
//   extraContent,
// }) => (
//   <Row>
//     <div style={{ flex: 1 }}>{children}</div>
//     <div className="image">{extraContent}</div>
//   </Row>
// );

const WorkSpaceHome = () => {
  const [detail, setDetail] = useState<API.ProgramDetail>();
  const [curTab, setCurTab] = useState('1');
  const [selectProgramModalOpen, handleSelectProgramModalOpen] = useState<boolean>(false);
  const [programList, setProgramList] = useState<API.ProgramSelect['data']>();
  // const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  let location = useLocation();
  let search = location.search;
  let searchParams = new URLSearchParams(search);
  let program_id = searchParams.get('id') || undefined;

  useEffect(() => {
    getProgramSelect().then((res) => {
      if (res.status === 0) {
        setProgramList(res.data);
        console.log(
          '%c [ 111 ]: ',
          'color: #bf2c9f; background: pink; font-size: 13px;',
          program_id,
          programList,
        );
        if (program_id === undefined && res.data?.length) {
          console.log(
            '%c [ programList ]-107',
            'font-size:16px; background:#93b3bf; color:#f1d8ff;',
            programList,
          );
          program_id = res.data[0].program_id;
          history.push({
            pathname: '/workspace/home',
            search: 'id=' + program_id,
          });
        }
      }
    });
    if (program_id) {
      getProgramDetail({ program_id: program_id }).then((res) => {
        console.log('%c [ 222 ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', '222');
        if (res.status === 0) {
          setDetail(res || {});
        }
      });
    }
  }, [program_id]);

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
            <Button
              key={1}
              type="primary"
              onClick={() => {
                handleSelectProgramModalOpen(true);
              }}
            >
              切换项目
            </Button>,
            <DropdownMenu key={'more'}></DropdownMenu>,
          ],
          avatar: { src: detail?.data?.baseInfo.team_pic },
          // children: (
          //   <Content
          //     extraContent={<img src={detail?.data?.baseInfo.propic} alt="content" width="150px" />}
          //   >
          //     {content}
          //   </Content>
          // ),
        }}
        tabList={tabsList}
        onTabChange={(key) => {
          setCurTab(key);
        }}
      >
        {curTab === '1' ? (
          <DemandList id={program_id || ''} />
        ) : curTab === '2' ? (
          <MissionList id={program_id || ''} />
        ) : curTab === '3' ? (
          <BugList id={program_id || ''} />
        ) : null}
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
        <SelectProgram
          cur_id={program_id || ''}
          values={programList || []}
          selectProgramModalOpen={selectProgramModalOpen}
          onCancel={() => {
            handleSelectProgramModalOpen(false);
          }}
          onSubmit={async (value) => {
            handleSelectProgramModalOpen(false);
            history.push({
              pathname: '/workspace/home',
              search: 'id=' + value.program_id,
            });
            // 刷新页面
            // window.location.reload();
          }}
          // onSubmit={() => {
          //     handleSelectProgramModalOpen(false);
          // }}
        ></SelectProgram>
      </PageContainer>
    </div>
  );
};

export default WorkSpaceHome;
