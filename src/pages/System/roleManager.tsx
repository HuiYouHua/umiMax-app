import { Button, Form, Input, Spin } from 'antd';
import React from 'react';
import './system.css';

import { roleAdd } from '@/api/role';
import { useRequest } from '@umijs/max';
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const RoleManager: React.FC = () => {
  const [form] = Form.useForm();
  const { loading, run } = useRequest(roleAdd, {
    manual: true, // 手动触发
  });

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
        <Form.Item
          name="rolename"
          label="角色名称"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="rolecode"
          label="角色代号"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
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

export default RoleManager;
