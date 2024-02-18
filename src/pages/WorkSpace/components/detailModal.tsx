import { getBugDetail } from '@/services/admin/bug';
import { getDemandDetail } from '@/services/admin/demand';
import { getMissionDetail } from '@/services/admin/mission';
// import { LoadingOutlined } from '@ant-design/icons';
import Loader from '@/components/Loaders/loader';
import type { TabsProps } from 'antd';
import { Modal, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import DetailDesc from './detailDesc';
import DetailProgress from './detailProgress';
import './index.less';

export type detailProps = {
  detailOpen: boolean;
  id: string;
  type: 'demand' | 'mission' | 'bug';
  onCancel: () => void;
};

// const Loading = () => {
//   return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
// };

const DetailModal: React.FC<detailProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentKey, setCurrentKey] = useState<string>('1');
  const [demandDetailDesc, setDemandDetailDesc] = useState<API.DemandDetailData>({});
  const [missionDetailDesc, setMissionDetailDesc] = useState<API.MissionDetailData>({});
  const [bugDetailDesc, setBugDetailDesc] = useState<API.BugDetailData>({});

  const onChange = (key: string) => {
    setCurrentKey(key);
  };

  const getDemandDesc = () => {
    getDemandDetail({ id: props.id }).then((res) => {
      setDemandDetailDesc(res.data);
      setLoading(false);
    });
  };

  const getMissionDesc = () => {
    getMissionDetail({ id: props.id }).then((res) => {
      setMissionDetailDesc(res.data);
      setLoading(false);
    });
  };

  const getBugDesc = () => {
    getBugDetail({ id: props.id }).then((res) => {
      setBugDetailDesc(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (props.detailOpen) {
      if (currentKey === '1') {
        setLoading(true);
        setTimeout(() => {
          if (props.id && props.type === 'demand') {
            getDemandDesc();
          } else if (props.id && props.type === 'mission') {
            getMissionDesc();
          } else if (props.id && props.type === 'bug') {
            getBugDesc();
          }
        }, 900);
      }
    }
  }, [currentKey, props.detailOpen]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '描述',
      children: (
        <div className="modal-content-v">
          {loading ? (
            <div className="loader-v">
              <Loader></Loader>
            </div>
          ) : (
            <div>
              <DetailDesc
                demandId={props.id}
                demandDetailDesc={demandDetailDesc}
                missionDetailDesc={missionDetailDesc}
                bugDetailDesc={bugDetailDesc}
                type={props.type}
              ></DetailDesc>
            </div>
          )}
        </div>
      ),
    },
    {
      key: '2',
      label: '进度',
      children: (
        <div>
          {loading ? (
            <div style={{ width: '80%', height: '80%' }}>
              <Loader></Loader>
            </div>
          ) : (
            <DetailProgress
              id={props.id}
              type={props.type}
              demandDetailDesc={demandDetailDesc}
              missionDetailDesc={missionDetailDesc}
              bugDetailDesc={bugDetailDesc}
            ></DetailProgress>
          )}
        </div>
      ),
    },
  ];

  return (
    <Modal
      width={'90%'}
      // title={props.value.name}
      open={props.detailOpen}
      onCancel={() => {
        props.onCancel();
      }}
      onOk={() => {
        props.onCancel();
      }}
    >
      <div className="content-v">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </Modal>
  );
};

export default DetailModal;
