import AliyunOSSUpload from '@/components/AliyunOSSUpload';
import { Oss_host } from '@/data/Osshost';
import { programStatus } from '@/data/programStatus';
import { getProgramInfo, getUserSelect, saveProgramInfo } from '@/services/admin/program';
import { getTeamList } from '@/services/admin/team';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import ProForm, {
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useLocation } from '@umijs/max';
import { Avatar, Button, Form, message, Skeleton, Tag } from 'antd';
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
