import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Layout, { Content, Sider } from '@/components/layout';
import HomeSider from './sider';
import Main from './router';

const Home = () => {
  return (
    <Router>
      <Layout>
        <Sider>
          <HomeSider />
        </Sider>
        <Content>
          <Main />
        </Content>
      </Layout>
    </Router>
  );
};

export default Home;
