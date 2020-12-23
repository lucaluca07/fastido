import React from 'react';
import Layout, { Header, Content, Sider } from '@/components/layout';
import HomeSider from './sider';

const Home = () => {
  return (
    <Layout>
      <Sider>
        <HomeSider />
      </Sider>
      <Layout>
        <Header>
          <div>Header</div>
        </Header>
        <Content>
          <div>content</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
