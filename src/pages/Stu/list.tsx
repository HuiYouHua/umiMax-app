import { useRequest } from '@umijs/max';
import { Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { stuDel, stuGet } from '@/api/stu';

interface DataType {
  objectId: number;
  name: string;
  score: number;
  city: string;
  time: string;
}

export default function StuList() {
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);

  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: 'objectId',
      key: 'objectId',
      render: (objectId) => <a>{objectId}</a>,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: '生日',
      key: 'time',
      dataIndex: 'time',
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
              stuDel(record.objectId).then((res) => {
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

  // useEffect(() => {
  // stuGet().then((res) => {
  //   setData(res.results);
  //   setLoading(false)
  // });
  // }, []);

  // 处理loading的优雅方式
  const { data, error, loading, mutate } = useRequest(() => {
    return stuGet();
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
