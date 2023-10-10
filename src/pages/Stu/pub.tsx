import type { DatePickerProps } from 'antd';
import { Button, DatePicker, Form, Input, Spin } from 'antd';
import React from 'react';
import './stu.css';

import { stuAdd } from '@/api/stu';
import { useRequest } from '@umijs/max';
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const StuPub: React.FC = () => {
  const [form] = Form.useForm();
  const { loading, run } = useRequest(stuAdd, {
    manual: true, // 手动触发
  });

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const onFinish = (values: any) => {
    const result = { ...values, time: values.time.format('YYYY-MM-DD') };
    console.log(result);
    console.log(values.time.format('YYYY-MM-DD'));
    run(result);
  };

  const onReset = () => {
    form.resetFields();
  };

  const initialValues = {
    name: 'huayoyu',
    score: 80,
    city: '上海',
    // time: '2011-02-12',
  };

  return (
    <Spin spinning={loading}>
      <Form
        {...layout}
        initialValues={initialValues}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="score" label="分数" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="city" label="城市" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="time" label="出生年月日" rules={[{ required: true }]}>
          <DatePicker onChange={onChange} />
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

export default StuPub;
