import React, { useState, useEffect } from 'react';
import ProForm, {
    ProFormText,
    ProFormDatePicker,
    ProFormSelect
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-components'
import {
    Skeleton,
    Avatar,
    Button,
} from 'antd';
import {UsergroupAddOutlined} from '@ant-design/icons'
import { isEmpty } from 'lodash';
import { getProgramInfo,getUserSelect } from '@/services/admin/program'
import { getTeamList } from '@/services/admin/team';
import { useLocation } from '@umijs/max'

const ProgramAdd = () => {
    // 只有通过校验之后才会触发这个方法
    const onSubmit = async (values: object) => {
        console.log(values);
    };
    // 详情数据
    const [detail, setDetail] = useState({});
    let location = useLocation();
    let search = location.search
    let searchParams = new URLSearchParams(search)
    const program_id = searchParams.get("id") || undefined

    // 获取详情
    useEffect(() => {
        if(program_id === undefined) return
        getProgramInfo({id:program_id}).then(res => {
            if(res.status === 0){    
                setDetail(res.data || {});
            }
        })
    }, []);

    const loadingPage = isEmpty(detail) && program_id !== undefined;

    // 数据获取到之前展示加载动画，让 form 渲染时肯定可以得到初始值
    return <PageContainer
    >
    {loadingPage ? (
        <Skeleton active />
    ) : (
        <ProForm style={{backgroundColor:"#fff",padding: "20px"}} initialValues={detail} onFinish={onSubmit}>
            {/* ... */}
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
                                <div style={{display: 'flex',alignItems:'center'}}>
                                    <Avatar src={item.user_pic} size={24} style={{marginRight:'8px'}}>{item.nickname}</Avatar>
                                    {item.nickname}
                                </div>
                            ), 
                            value: item.id+"" }
                    }
                    ): [];
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
                                <div style={{display: 'flex',alignItems:'center'}}>
                                    <Avatar src={item.team_pic} size={24} style={{marginRight:'8px'}}>{item.name}</Avatar>
                                    {item.name}
                                </div>
                            ), 
                            value: item.id }
                    }
                    ): [];
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
            >

            </ProFormSelect>
            <Button type="dashed" icon={<UsergroupAddOutlined />}>
                新建团队
            </Button>

            <ProFormSelect
                name="status"
                label="状态"
                width="md"
            >

            </ProFormSelect>
            {/* <ProFormRadio.Group
                name="status"
                label="状态"
                options={[
                    { label: '已生效', value: '已生效' },
                    { label: '已作废', value: '已作废' }
                ]}
                rules={[{ required: true, message: '状态不能为空' }]}
            /> */}
            <ProFormDatePicker
                name="publishTime"
                label="时间"
                placeholder="请选择时间"
                rules={[{ required: true, message: '时间不能为空' }]}
            />
        </ProForm>
    )}
    </PageContainer>
};

export default ProgramAdd