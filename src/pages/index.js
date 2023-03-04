import { Layout, Menu, theme,  Modal, Tabs } from 'antd';
import {useEffect, useState} from 'react';
import {Users} from "./Users";
import {Posts} from "./Posts";

const { Header, Content, Footer } = Layout;

export default function Home() {
  return (
    <Layout>
    <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
      <div
        style={{
          float: 'left',
          width: 120,
          height: 31,
          margin: '16px 24px 16px 0',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={[
          
        ]}
      />
    </Header>
    <Content className="site-layout" style={{ padding: '16px 50px' }}>
      <Tabs defaultActiveKey="1" items={[
          {
            key: '1',
            label: `Posts`,
            children: <Posts />,
          },
          {
            key: '2',
            label: `Users`,
            children: <Users />,
          }
        ]}
      />
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
  </Layout>
  )
}