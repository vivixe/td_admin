import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = "轻智云台服务出品"

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Vivixe',
          title: 'Vivixe',
          href: 'https://vivixe.github.io/index.html#about',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/vivixe/td_admin',
          blankTarget: true,
        },
        {
          key: 'QingZhiYunTai',
          title: 'QingZhiYunTai',
          href: 'https://www.qingzhiyun.com/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
