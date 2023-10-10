import { useRequest } from '@umijs/max';
import { Button, Form, Input, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useLocation, history } from 'umi';

import { bannerUpdate } from '@/api/cake';
import ImageUpload from '@/components/ImgUpload';
import './pub.css';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const BannerPub: React.FC = (props) => {
  const [form] = Form.useForm();
  const { pathname, state } = useLocation();

  const { loading, run } = useRequest(bannerUpdate, {
    manual: true, // 手动触发
  });

  const onFinish = (values: any) => {
    run(state.objectId, values).then(() => {
      history.back()
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(state);
  }, []);

  return (
    <Spin spinning={loading}>
      <Form
        {...layout}
        initialValues={state}
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
          <ImageUpload imgurl={state.imgurl} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            更新
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
