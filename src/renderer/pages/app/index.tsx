import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import HomeSider from './sider';
import Main from './router';

const { Sider, Content } = Layout;

const Home = () => {
  return (
    <Router>
      <Layout style={{ height: '100%' }}>
        <Sider width={300}>
          <HomeSider />
        </Sider>
        <Content style={{ background: '#fff' }}>
          <Main />
        </Content>
      </Layout>
    </Router>
  );
};

export default Home;
