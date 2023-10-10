import { useRequest } from '@umijs/max';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { cateDel, cateGet } from '@/api/cate';

interface DataType {
  objectId: number;
  catename: string;
}

export default function CateList() {

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'objectId',
      key: 'objectId',
      render: (objectId) => <a>{objectId}</a>,
    },
    {
      title: '品类名称',
      dataIndex: 'catename',
      key: 'catename',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Space size="middle">
          <Button type="primary" size="small">
            编辑
          </Button>
          <Button
            type="primary"
            size="small"
            danger
            onClick={() => {
              console.log(record.objectId)
              cateDel(record.objectId).then((res) => {
                data.splice(index, 1);
                mutate([...data]);
              });
            }}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  // 处理loading的优雅方式
  const { data, error, loading, mutate } = useRequest(() => {
    return cateGet();
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
