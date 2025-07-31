import { Col, Row, Typography } from "antd";

function Home() {
  return (
    <>
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
    </>
  );
}

export default Home;
