import { useRequest } from '@umijs/max';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Spin,
  message,
} from 'antd';
import React from 'react';
import { history, useModel } from 'umi';

import { userLogin } from '@/api/user';

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { initialState, error, refresh, setInitialState } =
    useModel('@@initialState');

  const { loading, run } = useRequest(userLogin, {
    manual: true, // 手动触发
    onSuccess: (data, params) => {
      console.log('登录成功', data, params);

      // 勾选了记住密码则只要本地有数据则一直保持登录, 如果没勾选则只在会话生效期间保持登录, 否则下次重新打开需要重新登录
      if (params[0]?.remember) {
        localStorage.setItem('userInfo', JSON.stringify(data));
      } else {
        sessionStorage.setItem('userInfo', JSON.stringify(data));
      }

      setInitialState({
        isLogin: true,
        userInfo: data,
      });

      messageApi.success('登录成功!', 1, () => {
        history.push('/');
      });
    },
    onError: (err) => {
      console.log('登录失败', err);
      messageApi.error('登录失败!');
    },
  });

  const onFinish = (values: any) => {
    console.log('Success:', values);
    run(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean;
  };

  const initData: FieldType = {
    username: 'huayoyu',
    password: '123456',
    remember: true,
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
          <Card
            title="请登录"
            extra={<a href="/register">去注册</a>}
            hoverable={true}
          >
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

              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
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

export default Login;
