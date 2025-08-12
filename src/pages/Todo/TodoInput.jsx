import React from 'react';
import { Button, Form, Input, Card, Col } from 'antd';
import { RocketFilled } from '@ant-design/icons';
import { cuteStyles } from './styles';

const TodoInput = ({ form, onAddTodo, loading }) => {
  return (
    <Col span={24}>
      <Card style={cuteStyles.addCard}>
        <Form form={form} onFinish={onAddTodo}>
          <Form.Item name="title" rules={[{ required: true, message: '할일을 입력해주세요 🌟' }]}>
            <Input.Search
              placeholder="✨ 새로운 할일을 입력하세요..."
              enterButton={
                <Button type="primary" icon={<RocketFilled />} style={{ 
                  background: 'linear-gradient(90deg, #a8e063 0%, #56ab2f 100%)',
                  border: 'none',
                  borderRadius: '10px'
                }}>
                  추가하기
                </Button>
              }
              size="large"
              style={{ borderRadius: '15px' }}
              loading={loading}
            />
          </Form.Item>
        </Form>
      </Card>
    </Col>
  );
};

export default TodoInput;