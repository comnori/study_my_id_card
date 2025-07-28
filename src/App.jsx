import { Col, Layout, Row, Typography } from "antd";

import { Content, Footer, Header } from "antd/es/layout/layout";

function App() {
  
  return (
    <Layout style={{ minHeight: "100vh", minWidth: "100vw", maxWidth: "100vw"}}>
      <Header style={{color:"#fff"}}>
        헤더
      </Header>
      <Content>
        <Row>
          <Col span={24}>
            <Typography.Title type="secondary" level={2}>
              1줄 1칸
            </Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Typography.Title type="secondary" level={2}>
              2줄 1칸
            </Typography.Title>
          </Col>
          <Col span={12}>
            <Typography.Title type="secondary" level={2}>
              2줄 2칸
            </Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Typography.Title type="secondary" level={2}>
              3줄 1칸
            </Typography.Title>
          </Col>
          <Col span={6}>
            <Typography.Title type="secondary" level={2}>
              3줄 2칸
            </Typography.Title>
          </Col>
          <Col span={6}>
            <Typography.Title type="secondary" level={2}>
              3줄 3칸
            </Typography.Title>
          </Col>
          <Col span={6}>
            <Typography.Title type="secondary" level={2}>
              3줄 4칸
            </Typography.Title>
          </Col>
        </Row>
      </Content>
      <Footer>푸터</Footer>
    </Layout>
  );
}

export default App;
