import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

const WorkSearch = ({ onSearch }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSearch(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            name="companyName"
            label="회사명"
            rules={[{ required: true, message: '회사명은 필수입니다' }]}
          >
            <Input placeholder="회사명" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="businessNumber" label="사업자번호">
            <Input placeholder="사업자번호" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="managerName" label="담당자명">
            <Input placeholder="담당자명" />
          </Form.Item>
        </Col>
        <Col span={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              조회
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default WorkSearch;
