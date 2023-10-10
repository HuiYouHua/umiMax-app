import { bannerAdd } from '@/api/cake';
import { useRequest } from '@umijs/max';
import { Button, Form, Input, Spin } from 'antd';
import React from 'react';

import ImageUpload from '@/components/ImgUpload';
import './pub.css';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const BannerPub: React.FC = () => {
  const [form] = Form.useForm();
  const { loading, run } = useRequest(bannerAdd, {
    manual: true, // 手动触发
  });

  const onFinish = (values: any) => {
    console.log(values);
    run(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const initData = {
    title: '五一节活动',
    link: 'https://umijs.org/docs/guides/getting-started',
  };

  return (
    <Spin spinning={loading}>
      <Form
        {...layout}
        initialValues={initData}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="title" label="活动名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="link" label="活动链接" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="imgurl" label="封面图片" rules={[{ required: true }]}>
          <ImageUpload />
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

export default BannerPub;
