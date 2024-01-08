import Loader from '@/components/Loaders/loader';
import Vditor from '@/components/Vditor/vditor';
import { getProgramDocument, saveProgramDocument } from '@/services/admin/program';
import { message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

export type detailProps = {
  docModalOpen: boolean;
  id: string;
  type: 'demand' | 'mission' | 'bug';
  onCancel: () => void;
};

const DetailDocument: React.FC<detailProps> = (props) => {
  const [docValue, setDocValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: '更新成功！',
    });
  };

  const getDocument = () => {
    getProgramDocument({ id: props.id }).then((res) => {
      setDocValue(res.data || '');
      setLoading(false);
    });
  };

  const saveDocument = () => {
    if (!docValue) {
      return message.error('文档内容不能为空');
    }
    saveProgramDocument({ id: props.id, value: docValue }).then((res) => {
      console.log(res);
      if (res.status === 0) {
        success();
      }
    });
  };

  useEffect(() => {
    if (props.docModalOpen) {
      setLoading(true);
      getDocument();
    }
  }, [props.docModalOpen]);

  return (
    <Modal
      title={'相关文档'}
      width={'90%'}
      // title={props.value.name}
      open={props.docModalOpen}
      onCancel={() => {
        props.onCancel();
      }}
      onOk={saveDocument}
    >
      {contextHolder}
      {loading ? (
        <div className="loader-v">
          <Loader></Loader>
        </div>
      ) : (
        <Vditor
          value={docValue}
          height="72vh"
          onChange={(value) => {
            console.log(
              '%c [ value ]-65',
              'font-size:16px; background:#8e42f8; color:#d286ff;',
              value,
            );
            if (value) {
              setDocValue(value);
              console.log(
                '%c [ 设置成功了 ]: ',
                'color: #bf2c9f; background: pink; font-size: 13px;',
                docValue,
              );
            }
          }}
        ></Vditor>
      )}
    </Modal>
  );
};

export default DetailDocument;
