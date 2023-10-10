import { Button, Form, Select, Spin } from 'antd';
import axios from 'axios';
import React from 'react';
import './goods.css';

import { cateGet } from '@/api/cate';
import { goodsAdd, goodsExchange } from '@/api/goods';
import RichEditor from '@/components/RichEditor';
import { useRequest } from '@umijs/max';
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const GoodsPub: React.FC = () => {
  const [form] = Form.useForm();
  const { data } = useRequest(cateGet);
  const { run, loading } = useRequest(goodsAdd, {
    manual: true, // 手动触发
  });
  const onFinish = (values: any) => {
    console.log(values);
    // run(values);
    const url =
      'https://h5.mcake.com/api/0434b49d1ac28f9d?cityId=110&page=1&bid=5';
      // bid 1, 11, 6, 5
    axios
      .create({
        headers: {
          'Access-Token': 'ff21f9c6b724035cc487a25161573bbf',
          Version: 'v1.0',
        },
      })
      .get(url)
      .then((res) => {
        console.log(res.data.data.list)
        console.log(values)
        goodsExchange(res.data.data.list, values);
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onRewardSave = () => {
    const url =
      'https://h5.mcake.com/api/0434b49d1ac28f9d?cityId=110&page=1&bid=1';
    axios
      .create({
        headers: {
          'Access-Token': 'ff21f9c6b724035cc487a25161573bbf',
          Version: 'v1.0',
        },
      })
      .get(url)
      .then((res) => {
        // goodsExchange(res.data.data.list)
      });
  };
  // 当前菜单排序和分组

  return (
    <Spin spinning={loading}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="cateId" label="分类选择" rules={[{ required: true }]}>
          <Select placeholder="请选择商品分类">
            {data?.map((item) => {
              return (
                <Select.Option value={item.objectId} key={item.objectId}>
                  {item.catename}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="cateDetail"
          label="商品详情"
          rules={[{ required: true }]}
        >
          <RichEditor />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
          <Button htmlType="button" type="dashed" onClick={onRewardSave}>
            批量转存
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default GoodsPub;
