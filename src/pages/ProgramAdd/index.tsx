import React, { useState, useEffect } from 'react';
import ProForm, {
  ProFormRadio,
  ProFormText,
  ProFormDatePicker,
} from '@ant-design/pro-form';
import {
  Skeleton
} from 'antd';
import { isEmpty } from 'lodash';

const ProgramAdd = () => {
  // 只有通过校验之后才会触发这个方法
  const onSubmit = async (values:object) => {
    console.log(values);
};
  // 详情数据
  const [detail, setDetail] = useState({});

  // 获取详情
  useEffect(async () => {
      const { data } = await getDetail();
      setDetail(data);
  }, []);

  const loadingPage = isEmpty(detail);
  
  // 数据获取到之前展示加载动画，让 form 渲染时肯定可以得到初始值
  return loadingPage ? (
      <Skeleton active />
  ) : (
      <ProForm initialValues={detail} onFinish={onSubmit}>
          {/* ... */}
          <ProFormText
              name="name"
              label="名称"
              placeholder="请输入名称"
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
  )
};

export default ProgramAdd