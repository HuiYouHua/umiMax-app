import { connect } from '@umijs/max';
import { Avatar, Button, List } from 'antd';
import React from 'react';

const Notice: React.FC = (props) => {
  const { notice, dispatch } = props;

  const handleRead = (index) => {
    console.log(index)
    dispatch({
      type: 'notice/readed',
      payload: index,
    });
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={notice.list}
      renderItem={(item, index) => (
        <List.Item
          actions={[
            <Button
              key="unread"
              type="primary"
              disabled={item.read}
              onClick={() => handleRead(index)}
            >
              {item.read ? '已读' : '未读'}
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
              />
            }
            title={<a href="https://ant.design">{item.title}</a>}
            description={item.desc}
          />
        </List.Item>
      )}
    />
  );
};

export default connect(({ notice }) => {
  return { notice };
})(Notice);
