import { Oss_host } from '@/data/Osshost';
import { programStatus } from '@/data/programStatus';
import { getProgramInfo, getUserSelect, saveProgramInfo } from '@/services/admin/program';
import { getOssSign } from '@/services/admin/system';
import { getTeamList } from '@/services/admin/team';
import { PlusOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useLocation } from '@umijs/max';
import type { UploadProps } from 'antd';
import { Avatar, Button, Form, message, Modal, Skeleton, Tag, Upload } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

const ProgramAdd = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: '更新成功！',
    });
  };

  // 只有通过校验之后才会触发这个方法
  const onSubmit = async (values: object) => {
    const res = await saveProgramInfo(values);
    if (res.status === 0) {
      success();
    }
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  // 详情数据
  const [detail, setDetail] = useState({});
  let location = useLocation();
  let search = location.search;
  let searchParams = new URLSearchParams(search);
  const program_id = searchParams.get('id') || undefined;

  // 获取详情
  useEffect(() => {
    if (program_id === undefined) {
      let initalData = {
        status: '0',
      };
      setDetail(initalData);
    } else {
      getProgramInfo({ id: program_id }).then((res) => {
        if (res.status === 0) {
          setDetail(res.data || {});
        }
      });
    }
  }, []);

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

  const handleInput = (event: any) => {
    if (event.length > 0 && event[event.length - 1].status === 'done') {
      return document.location.protocol + Oss_host + '/' + event[event.length - 1].url;
    }
  };

  const loadingPage = isEmpty(detail);

  // 数据获取到之前展示加载动画，让 form 渲染时肯定可以得到初始值
  return (
    <PageContainer>
      {loadingPage ? (
        <Skeleton active />
      ) : (
        <ProForm
          style={{ backgroundColor: '#fff', padding: '20px' }}
          initialValues={detail}
          onFinish={onSubmit}
        >
          <ProForm.Group>
            <ProFormText
              name="name"
              label="名称"
              width="md"
              placeholder="请输入名称"
              rules={[{ required: true, message: '名称不能为空' }]}
            />
            <ProFormText name="program_id" hidden={true} />
            <ProFormSelect
              name="owner"
              label="负责人"
              width="md"
              fieldProps={{
                onChange: async (value) => {
                  console.log(
                    '%c [ value ]-251',
                    'font-size:16px; background:#4bc9b9; color:#8ffffd;',
                    value,
                  );
                },
              }}
              request={async () => {
                const data = await getUserSelect({ current: 1, pageSize: 1000 });
                // 取出data.data中的id和name
                const UserList = data.data
                  ? data.data.map((item: any) => {
                      // return { label: item.nickname, value: item.id }
                      return {
                        label: (
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={item.user_pic} size={24} style={{ marginRight: '8px' }}>
                              {item.nickname}
                            </Avatar>
                            {item.nickname}
                          </div>
                        ),
                        value: item.id + '',
                      };
                    })
                  : [];
                return UserList;
              }}
              rules={[
                {
                  required: true,
                  message: '负责人为必选项',
                },
              ]}
            />
            <ProFormSelect
              name="status"
              label="状态"
              width="md"
              options={programStatus.map((item) => {
                return {
                  label: (
                    <div>
                      <Tag color={item.color}>{item.label}</Tag>
                      <span>{item.label}</span>
                    </div>
                  ),
                  value: item.value + '',
                };
              })}
            />
          </ProForm.Group>

          <ProForm.Group>
            <ProFormDigit label="预估" name="earn" min={0} width="sm" />

            <ProFormDatePicker
              name="time"
              label="时间"
              placeholder="请选择时间"
              width="md"
              rules={[{ required: true, message: '时间不能为空' }]}
            />
          </ProForm.Group>

          <ProFormSelect
            name="team_id"
            label="所属团队"
            width="md"
            fieldProps={{
              onChange: async (value) => {
                console.log(
                  '%c [ value ]-317',
                  'font-size:16px; background:#064454; color:#4a8898;',
                  value,
                );
              },
            }}
            request={async () => {
              const data = await getTeamList();
              const TeamList = data.data
                ? data.data.map((item: any) => {
                    // return { label: item.nickname, value: item.id }
                    return {
                      label: (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar src={item.team_pic} size={24} style={{ marginRight: '8px' }}>
                            {item.name}
                          </Avatar>
                          {item.name}
                        </div>
                      ),
                      value: item.id,
                    };
                  })
                : [];
              return TeamList;
            }}
            rules={[
              {
                required: true,
                message: '所属团队为必选项',
              },
            ]}
          />

          <Button type="dashed" icon={<UsergroupAddOutlined />}>
            新建团队
          </Button>

          <Form.Item
            label="规划图"
            name="propic"
            getValueFromEvent={handleInput}
            extra="请上传一张不大于2M的图片。"
          >
            <AliyunOSSUpload />
          </Form.Item>

          <ProFormTextArea name="demand" label="备注" placeholder="请输入备注" />
          {contextHolder}
        </ProForm>
      )}
    </PageContainer>
  );
};

export default ProgramAdd;
