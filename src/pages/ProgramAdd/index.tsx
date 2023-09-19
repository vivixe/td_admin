import React, { useState, useEffect } from 'react';
import ProForm, {
    ProFormRadio,
    ProFormText,
    ProFormDatePicker,
    ProFormSelect
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-components'
import {
    Skeleton,
    Avatar
} from 'antd';
import { isEmpty } from 'lodash';
import { getProgramInfo,getUserSelect } from '@/services/admin/program'
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
    console.log('%c [ program_id ]-25', 'font-size:16px; background:#c9f369; color:#ffffad;', program_id)

    // 获取详情
    useEffect(() => {
        if(program_id === undefined) return
        getProgramInfo({id:program_id}).then(res => {
            console.log('%c [ data ]-36', 'font-size:16px; background:#bd3f3c; color:#ff8380;', res)
            if(res.status === 0){    
                setDetail(res.data || {});
                console.log('%c [ {data: res} ]-34', 'font-size:16px; background:#d4853d; color:#ffc981;', {data: res})
            }
        })
    }, []);

    const loadingPage = isEmpty(detail) && program_id !== undefined;

    // 数据获取到之前展示加载动画，让 form 渲染时肯定可以得到初始值
    return <PageContainer
    // tabList={[
    //   {
    //     tab: '基本信息',
    //     key: 'base',
    //   },
    // ]}
    >
    {loadingPage ? (
        <Skeleton active />
    ) : (
        <ProForm style={{backgroundColor:"#fff",padding: "20px"}} initialValues={detail} onFinish={onSubmit}>
            {/* ... */}
            <ProFormText
                name="name"
                label="名称"
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
                            value: item.id }
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
            <ProFormRadio.Group
                name="status"
                label="状态"
                options={[
                    { label: '已生效', value: '已生效' },
                    { label: '已作废', value: '已作废' }
                ]}
                rules={[{ required: true, message: '状态不能为空' }]}
            />
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