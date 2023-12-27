import { getDemandDetail } from '@/services/admin/demand';
import { LoadingOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import { Modal, Spin, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import DetailDesc from './detailDesc';

export type detailProps = {
  detailOpen: boolean;
  id: string;
  onCancel: () => void;
};

const Loading = () => {
  return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
};

const DetailModal: React.FC<detailProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentKey, setCurrentKey] = useState<string>('1');
  const [detailDesc, setDetailDesc] = useState<API.DemandDetailData>({});

  const onChange = (key: string) => {
    setCurrentKey(key);
  };

  const getDemandDesc = () => {
    getDemandDetail({ id: props.id }).then((res) => {
      setDetailDesc(res.data);
      // setTimeout(() => {
      setLoading(false);
      // }, 1000);
    });
  };

  useEffect(() => {
    if (props.detailOpen) {
      if (currentKey === '1') {
        setLoading(true);
        setTimeout(() => {
          console.log('触发了', props);
          if (props.id) {
            getDemandDesc();
          }
        }, 400);
      }
    }
  }, [currentKey, props.detailOpen]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '描述',
      children: (
        <div>
          {loading ? (
            Loading()
          ) : (
            <DetailDesc demandId={props.id} detailDesc={detailDesc}></DetailDesc>
          )}
        </div>
      ),
    },
    {
      key: '2',
      label: '进度',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
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
    >
      <div className="content-v">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </Modal>
  );
};

export default DetailModal;
