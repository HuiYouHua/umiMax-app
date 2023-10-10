import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Dropdown, Space, message } from 'antd';
import React from 'react';
import { history, useModel } from 'umi';

const items: MenuProps['items'] = [
  {
    label: '个人设置',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: '退出登录',
    key: '2',
    icon: <LogoutOutlined />,
  },
];

const HeaderDropMenu: React.FC = (props) => {
  const { initialState, error, refresh, setInitialState } =
    useModel('@@initialState');
  const { notice } = props;

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '2') {
      // 退出登录
      setInitialState({
        isLogin: false,
        userInfo: null,
      });

      localStorage.removeItem('userInfo');
      sessionStorage.removeItem('userInfo');

      history.push('/login');
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Dropdown menu={menuProps} onClick={handleButtonClick} arrow>
      <Space size={16}>
        {' '}
        <Space wrap size={16}>
          <Avatar
            size={40}
            src="https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg"
          />
        </Space>
        <Badge
          count={notice.list.filter((item) => !item.read).length}
          size="small"
          offset={[6, 0]}
        >
          <span style={{ fontSize: '20px', color: '#000' }}>
            {initialState?.userInfo.username}
          </span>
        </Badge>
      </Space>
    </Dropdown>
  );
};

export default connect(({ notice }) => {
  return { notice };
})(HeaderDropMenu);
