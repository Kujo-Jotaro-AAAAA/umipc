import React from 'react';
import {Layout, Menu} from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
interface PropTypes {

}
export default ( props: PropTypes ) => {
  return (
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    </Layout>
  )
}