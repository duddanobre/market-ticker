import React from 'react';
import { Layout, Menu, Breadcrumb, Tabs } from 'antd';
import './styles.css';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

export default function Home(){

return(
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" >
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
      </div>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <Tabs defaultActiveKey="1" onChange={()=>callback()}>
            <TabPane tab="Tab 1" key="1">
            aaaaaaa
            </TabPane>
            <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
            </TabPane>
        </Tabs>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
)
};
