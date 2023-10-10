import { useRequest } from '@umijs/max';
import { Button, Card, Checkbox, Col, Form, Input, Row, Spin, message } from 'antd';
import React from 'react';
import { history, useModel } from 'umi';

import { userRegister } from '@/api/user';

const Register: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();


  const { loading, run } = useRequest(userRegister, {
    manual: true, // 手动触发
  });

  const onFinish = async (values: any) => {
    console.log('Success:', values);

    run(values)
      .then(() => {
        console.log('注册成功, 即将跳转登录页');
        history.push('/login');
      })
      .catch((err) => {
        console.log('注册失败', err);
        messageApi.error('注册失败!')
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
  };


  const initData: FieldType = {
    username: 'huayoyu',
    password: '123456'
  };

  return (
    <Spin spinning={loading}>
      {contextHolder}
      <Row
        style={{ height: '100vh', background: '#f6f6f6' }}
        justify={'center'}
        align={'middle'}
        gutter={[0, 400]}
      >
        <Col span={8}>
          <Card title="请注册" hoverable={true}>
            <Form
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              // style={{ maxWidth: '100%' }}
              initialValues={initData}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="账号"
                name="username"
                rules={[
                  { required: true, message: 'Please input your username!' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="密码"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

export default Register;
