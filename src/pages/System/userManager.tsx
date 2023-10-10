import { Button, Form, Input, Select, Spin } from 'antd';
import React from 'react';
import './system.css';

import { roleGet } from '@/api/role';
import { userRegister } from '@/api/user';
import { useRequest } from '@umijs/max';
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const UserManger: React.FC = () => {
  const [form] = Form.useForm();
  const { loading, run } = useRequest(userRegister, {
    manual: true, // 手动触发
  });

  const { data: roleList, loading: roleLoading } = useRequest(roleGet);

  const onFinish = (values: any) => {
    console.log(values);
    run(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Spin spinning={loading}>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input type="password" />
        </Form.Item>
        <Spin spinning={roleLoading}>
          <Form.Item name="role" label="角色" rules={[{ required: true }]}>
            <Select placeholder="请选择账号角色">
              {roleList?.map((item) => {
                return (
                  <Select.Option value={item.rolecode} key={item.objectId}>
                    {item.rolename}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Spin>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default UserManger;
