import { useAccess, useRequest } from '@umijs/max';
import { Button, Image, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'umi';

import { bannerDel, bannerGet } from '@/api/cake';

interface DataType {
  title: string;
  link: string;
  imgurl: string;
}

export default function BannerList() {
  const navigator = useNavigate();
  const access = useAccess();

  console.log('权限信息', access);

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'objectId',
      key: 'objectId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '活动名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '活动链接',
      dataIndex: 'link',
      key: 'link',
      render: (url) => (
        <a href={url} target="_blank">
          点击预览
        </a>
      ),
    },
    {
      title: '活动封面',
      dataIndex: 'imgurl',
      key: 'imgurl',
      render: (url) => <Image width={50} src={url} />,
    },
  ];

  if (access.isAdmin) {
    columns.push({
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            type="primary"
            size="small"
            onClick={() => {
              navigator('/banner/edit', {
                state: record,
              });
            }}
          >
            编辑
          </Button>
          <Button
            type="primary"
            size="small"
            danger
            onClick={() => {
              console.log(record);
              bannerDel(record.objectId).then((res) => {
                data.splice(index, 1);
                mutate([...data]);
              });
            }}
          >
            删除
          </Button>
        </Space>
      ),
    });
  }

  // 处理loading的优雅方式
  const { data, error, loading, mutate } = useRequest(() => {
    return bannerGet();
  });

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data ?? []}
      rowKey="objectId"
    />
  );
}
