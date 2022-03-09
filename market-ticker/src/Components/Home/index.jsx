import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Tabs, Table, Button } from 'antd';
import './styles.css';
import 'antd/dist/antd.css';

import {instrumentsService} from '../../services/apiServices';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

const namesForex = ['EUR','USD', 'GBP', 'JPY'];
const namesPopular = ['EUR','USD', 'BTC', 'ETH'];
const namesCommodities = ['EUR','TMT', 'BTC', 'ETH'];

export default function Home(){
  const [instruments, setInstruments] = useState([]);
  const [cfd, setCfd] = useState([]);
  const [tab, setTab] = useState('1');

  useEffect(async () => {
    setTimeout(() => {
      handleInstruments();
    }, 1000);
  }, [instruments,tab])

  async function handleInstruments () {
    await instrumentsService.getInstruments()
      .then(data => {
        if (tab === '1') {
          const lisValues = Object.values(data).filter(cod => (namesPopular.includes(cod.code)));
          CalcSpread(lisValues);
        }
        if (tab === '2') {
          const lisValues = Object.values(data).filter(cod => (namesForex.includes(cod.code)));
          CalcSpread(lisValues);
        }
        if (tab === '3') {
          const lisValues = Object.values(data).filter(cod => (namesCommodities.includes(cod.code)));
          CalcSpread(lisValues);
        }
        if (tab === '4') {
          handleCfd()
        }
        if (tab === '5') {
          CalcSpread(Object.values(data));
        }
      })
      .catch(() => 'Deu erro')
  };
  async function handleCfd () {
    await instrumentsService.getCfds()
      .then(data => {
          CalcSpread(Object.values(data));
          defName(Object.values(data));
      })
      .catch(() => 'Deu erro')
  };

  const CalcSpread = ((instruments) => {
    for(const i in instruments){
      Object.defineProperty(instruments[i], 'spread', {
        value: (instruments[i].ask - instruments[i].bid).toFixed(3),
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
    setInstruments(instruments);
  });

  const defName = ((cfd) => {
    for(const i in cfd){
      Object.defineProperty(cfd[0], 'name', {
        value: 'Alibaba',
      });
      Object.defineProperty(cfd[1], 'name', {
        value: 'Apple',
      });
      Object.defineProperty(cfd[2], 'name', {
        value: 'CBA',
      });
      Object.defineProperty(cfd[3], 'name', {
        value: 'Facebook',
      });
      Object.defineProperty(cfd[4], 'name', {
        value: 'Tesla',
      });
    }
    setCfd(cfd);
  });

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
      dataIndex: 'spread',
      key: 'spread',
      render: spread => <div>{(spread)}</div>
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
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <Tabs defaultActiveKey="1" onTabClick={(key)=>{setTab(key)}}>
            <TabPane tab="Popular" key="1">
              <Table columns={columns} dataSource={instruments} pagination={false}></Table>
            </TabPane>
            <TabPane tab="Forex" key="2">
              <Table columns={columns} dataSource={instruments} pagination={false}></Table>
            </TabPane>
            <TabPane tab="Commodities" key="3">
              <Table columns={columns} dataSource={instruments} pagination={false}></Table>
            </TabPane>
            <TabPane tab="Share CFDs" key="4">
              <Table columns={columns} dataSource={instruments} pagination={false}></Table>
            </TabPane>
            <TabPane tab="Equities" key="5">
              <Table columns={columns} dataSource={instruments} pagination={false}></Table>
            </TabPane>
        </Tabs>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Sistema de monitoramento monetário ©2022 Created by Duda Nobre</Footer>
  </Layout>
)
};
