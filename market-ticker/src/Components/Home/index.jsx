import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Tabs, Table, Button } from 'antd';
import './styles.css';
import 'antd/dist/antd.css';

import {instrumentsService} from '../../services/apiServices';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

export default function Home(){
  const [instruments, setInstruments] = useState([]);

  const columns = [
    {
      title: 'Instrument',
      dataIndex: 'name',
      key: 'name',
      render: name => <div style={{fontWeight: 'bold'}}>{name}</div>
    },
    {
      title: 'Bid',
      dataIndex: 'bid',
      key: 'bid',
      render: bid => <div>{bid}</div>,
    },
    {
      title: 'Ask',
      dataIndex: 'ask',
      key: 'ask',
      render: ask => <div>{ask}</div>,
    },
    {
      title: 'Spread',
      dataIndex: 'varBid',
      key: 'varBid',
      render: varBid => <div>{varBid}</div>,
    },
    {
      title: '',
      key: 'action',
      render: () => (
        <Button style={{backgroundColor: '#3282f8', borderRadius: 50, color: '#fff', height: 40}}>
          Trade
        </Button>
      ),
    },
  ];

  useEffect(async () => {
    await instrumentsService.getInstruments()
          .then(data => {
              setInstruments(Object.values(data));
              console.log('instrumentos',Object.values(data));
          })
          .catch(() => 'Deu erro')
  }, [instruments])

return(
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" >
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">Pricing</Menu.Item>
        <Menu.Item key="2">Markets</Menu.Item>
        <Menu.Item key="3">Analysis</Menu.Item>
      </Menu>
      </div>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, flex:1 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <Tabs defaultActiveKey="1">
            <TabPane tab="Popular" key="1">
                  <Table columns={columns} dataSource={instruments}></Table>
            </TabPane>
            <TabPane tab="Forex" key="2">
              <Table columns={columns} dataSource={instruments}></Table>
            </TabPane>
            <TabPane tab="Commodities" key="3">
              <Table columns={columns} dataSource={instruments}></Table>
            </TabPane>
            <TabPane tab="Index CFDs" key="4">
              <Table columns={columns} dataSource={instruments}></Table>
            </TabPane>
            <TabPane tab="Equities" key="5">
              <Table columns={columns} dataSource={instruments}></Table>
            </TabPane>
        </Tabs>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
)
};
