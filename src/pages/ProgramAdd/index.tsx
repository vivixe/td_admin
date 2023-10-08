import React, { useState, useEffect } from 'react';
import ProForm, {
    ProFormText,
    ProFormDatePicker,
    ProFormSelect,
    ProFormDigit
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-components'
import {
    Skeleton,
    Avatar,
    Button,
    Tag,
    Upload,
    Form,
    message
} from 'antd';
import { UsergroupAddOutlined,UploadOutlined } from '@ant-design/icons'
import { isEmpty } from 'lodash';
import { getProgramInfo, getUserSelect } from '@/services/admin/program'
import type { UploadProps } from 'antd';
import { getTeamList } from '@/services/admin/team';
import { getOssSign } from '@/services/admin/system';
import { useLocation } from '@umijs/max'
import { programStatus } from '@/data/programStatus';
import type { UploadFile } from 'antd/es/upload/interface';

const ProgramAdd = () => {
    // 只有通过校验之后才会触发这个方法
    const onSubmit = async (values: object) => {
        console.log('%c [ values ]-25', 'font-size:16px; background:#133f21; color:#578365;', values)
    };
    // 详情数据
    const [detail, setDetail] = useState({});
    let location = useLocation();
    let search = location.search
    let searchParams = new URLSearchParams(search)
    const program_id = searchParams.get("id") || undefined

    // 获取详情
    useEffect(() => {
        if (program_id === undefined) {
            let initalData = {
                status: "0"
            }
            setDetail(initalData)
        } else {
            getProgramInfo({ id: program_id }).then(res => {
                if (res.status === 0) {
                    setDetail(res.data || {});
                }
            })
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
      
        const getOssSignInfo = () => {
            return getOssSign({})
        }
      
        const init = async () => {
          try {
            const {data:result} = await getOssSignInfo();
            console.log('%c [ result ]-99', 'font-size:16px; background:#e51858; color:#ff5c9c;', result)
            let config = {
                dir: result.dirPath+'',
                expire: result.key+'',
                host: result.host+'',
                accessId: result.OSSAccessKeyId+'',
                policy: result.policy+'',
                signature: result.signature+''
            }
            console.log('%c [ config ]-90', 'font-size:16px; background:#01a4c2; color:#45e8ff;', config)
            setOSSData(config);
          } catch (error) {
            if(error) {
                message.error(error+'');
            }
          }
        };
      
        useEffect(() => {
          init();
        }, []);
      
        const handleChange: UploadProps['onChange'] = ({ fileList }) => {
          console.log('Aliyun OSS:', fileList);
          onChange?.([...fileList]);
        };
      
        const onRemove = (file: UploadFile) => {
          const files = (value || []).filter((v) => v.url !== file.url);
      
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
      
        const uploadProps: UploadProps = {
          name: 'file',
          fileList: value,
          action: OSSData?.host,
          onChange: handleChange,
          onRemove,
          data: getExtraData,
          beforeUpload,
        };
      
        return (
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        );
      };

    const loadingPage = isEmpty(detail);

    // 数据获取到之前展示加载动画，让 form 渲染时肯定可以得到初始值
    return <PageContainer
    >
        {loadingPage ? (
            <Skeleton active />
        ) : (
            <ProForm style={{ backgroundColor: "#fff", padding: "20px" }} initialValues={detail} onFinish={onSubmit}>
                <ProFormText
                    name="name"
                    label="名称"
                    width="md"
                    placeholder="请输入名称"
                    rules={[{ required: true, message: '名称不能为空' }]}
                />
                <ProFormSelect
                    name="owner"
                    label="负责人"
                    width="md"
                    fieldProps={{
                        onChange: async (value) => {
                            console.log('%c [ value ]-93', 'font-size:16px; background:#93b3bf; color:#f1d8ff;', value)
                        },
                    }}
                    request={async () => {
                        const data = await getUserSelect({ current: 1, pageSize: 1000 },);
                        console.log('%c [ data ]-98', 'font-size:16px; background:#93b3bf; color:#f1d8ff;', data)
                        // 取出data.data中的id和name
                        const UserList = data.data ? data.data.map((item) => {
                            // return { label: item.nickname, value: item.id }
                            return {
                                label: (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar src={item.user_pic} size={24} style={{ marginRight: '8px' }}>{item.nickname}</Avatar>
                                        {item.nickname}
                                    </div>
                                ),
                                value: item.id + ""
                            }
                        }
                        ) : [];
                        return UserList;
                    }}
                    rules={[
                        {
                            required: true,
                            message: (
                                "负责人为必选项"
                            ),
                        },
                    ]}
                />
                <ProFormSelect
                    name="team_id"
                    label="所属团队"
                    width="md"
                    fieldProps={{
                        onChange: async (value) => {
                            console.log('%c [ value ]-93', 'font-size:16px; background:#93b3bf; color:#f1d8ff;', value)
                        },
                    }}
                    request={async () => {
                        const data = await getTeamList()
                        console.log('%c [ data ]-113', 'font-size:16px; background:#582a0b; color:#9c6e4f;', data)
                        const TeamList = data.data ? data.data.map((item) => {
                            // return { label: item.nickname, value: item.id }
                            return {
                                label: (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar src={item.team_pic} size={24} style={{ marginRight: '8px' }}>{item.name}</Avatar>
                                        {item.name}
                                    </div>
                                ),
                                value: item.id
                            }
                        }
                        ) : [];
                        return TeamList;
                    }}
                    rules={[
                        {
                            required: true,
                            message: (
                                "所属团队为必选项"
                            ),
                        },
                    ]}
                />

                <Button type="dashed" icon={<UsergroupAddOutlined />}>
                    新建团队
                </Button>

                <ProFormSelect
                    name="status"
                    label="状态"
                    width="md"
                    options={programStatus.map(item => {
                        return {
                            label: (
                                <div>
                                    <Tag color={item.color}>{item.label}</Tag>
                                    <span>{item.label}</span>
                                </div>
                            ),
                            value: item.value + ""
                        }
                    })}
                />
                {/* <ProFormRadio.Group
                name="status"
                label="状态"
                options={[
                    { label: '已生效', value: '已生效' },
                    { label: '已作废', value: '已作废' }
                ]}
                rules={[{ required: true, message: '状态不能为空' }]}
            /> */}

                <ProFormDigit label="预估" name="earn" min={0} />

                <ProFormDatePicker
                    name="time"
                    label="时间"
                    placeholder="请选择时间"
                    rules={[{ required: true, message: '时间不能为空' }]}
                />

                
                <Form.Item label="Photos" name="photos">
                    <AliyunOSSUpload />
                </Form.Item>
            </ProForm>
        )}
    </PageContainer>
};

export default ProgramAdd