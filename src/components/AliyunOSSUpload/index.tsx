import { getOssSign } from '@/services/admin/system';
import { PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Modal, Upload } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

interface AliyunOSSUploadProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AliyunOSSUpload = ({ value, onChange }: AliyunOSSUploadProps) => {
  const [OSSData, setOSSData] = useState<OSSDataType>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(
    typeof value === 'string' && value !== ''
      ? [
          {
            uid: '-1',
            name: (value + '').split('/')[(value + '').split('/').length - 1],
            status: 'done',
            url: value,
          },
        ]
      : [],
  );

  const getOssSignInfo = () => {
    return getOssSign({});
  };

  const init = async () => {
    try {
      const { data: result } = await getOssSignInfo();
      let config = {
        dir: result.dirPath + '',
        expire: result.key + '',
        host: result.host + '',
        accessId: result.OSSAccessKeyId + '',
        policy: result.policy + '',
        signature: result.signature + '',
      };
      setOSSData(config);
    } catch (error) {
      if (error) {
        message.error(error + '');
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    onChange?.([...newFileList]);
  };

  const onRemove = (file: UploadFile) => {
    const files = (fileList || []).filter((v) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  const getExtraData: UploadProps['data'] = (file) => ({
    key: file.url,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!OSSData) return false;

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await init();
    }

    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now() + suffix;
    // @ts-ignore
    file.url = OSSData.dir + filename;

    return file;
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleCancel = () => setPreviewOpen(false);

  const uploadProps: UploadProps = {
    name: 'file',
    action: OSSData?.host,
    fileList: fileList,
    listType: 'picture-card',
    maxCount: 1,
    onChange: handleChange,
    onRemove,
    data: getExtraData,
    beforeUpload,
    onPreview: handlePreview,
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const length = value?.length ?? 0;

  return (
    <>
      <Upload {...uploadProps}>{length >= 1 ? null : uploadButton}</Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default AliyunOSSUpload;
