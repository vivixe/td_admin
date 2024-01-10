import { programStatus } from '@/data/programStatus';
import { tabsList } from '@/data/WorkSpace';
import { getProgramDetail, getProgramSelect } from '@/services/admin/program';
import { MoreOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history, useLocation } from '@umijs/max';
import { Button, Dropdown, Tag } from 'antd';
import { useEffect, useState } from 'react';
import BugList from './bug/bug';
import DetailDocument from './components/detailDocument';
import SelectProgram from './components/selectProgram';
import DemandList from './demand/demand';
import './index.css';
import MissionList from './mission/mission';

// const { Paragraph } = Typography;

const getStatusValue = (status: string, type: 'label' | 'color') => {
  if (type === 'label') {
    return programStatus.find((item) => item.value === Number(status))?.label;
  } else {
    return programStatus.find((item) => item.value === Number(status))?.color;
  }
};

const WorkSpaceHome = () => {
  const [detail, setDetail] = useState<API.ProgramDetail>();
  const [curTab, setCurTab] = useState('1');
  const [selectProgramModalOpen, handleSelectProgramModalOpen] = useState<boolean>(false);
  const [programList, setProgramList] = useState<API.ProgramSelect['data']>();
  const [docModalOpen, setDocModalOpen] = useState<boolean>(false);
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

  const items = [
    {
      key: '1',
      label: (
        <a
          onClick={() => {
            history.push({
              pathname: '/program/add',
              search: 'id=' + program_id,
            });
          }}
        >
          编辑
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
  ];

  const DropdownMenu = () => (
    <Dropdown key="more" menu={{ items }} placement="bottomRight">
      <Button type="text" icon={<MoreOutlined style={{ fontSize: 20 }} />} />
    </Dropdown>
  );

  const handleEditDocument = () => {
    setDocModalOpen(true);
  };

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
            <Button key={2} onClick={handleEditDocument}>
              项目文档
            </Button>,
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
        }}
        tabList={tabsList}
        onTabChange={(key) => {
          setCurTab(key);
        }}
      >
        {curTab === '1' ? (
          <DemandList id={program_id || ''} team_id={detail?.data?.baseInfo.team_id || ''} />
        ) : curTab === '2' ? (
          <MissionList id={program_id || ''} team_id={detail?.data?.baseInfo.team_id || ''} />
        ) : curTab === '3' ? (
          <BugList id={program_id || ''} />
        ) : null}
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
          }}
        ></SelectProgram>
        <DetailDocument
          docModalOpen={docModalOpen}
          id={program_id || ''}
          type="demand"
          onCancel={() => {
            setDocModalOpen(false);
          }}
        ></DetailDocument>
      </PageContainer>
    </div>
  );
};

export default WorkSpaceHome;
