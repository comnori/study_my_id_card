import React from 'react';
import {
  Button,
  Checkbox,
  List,
  Dropdown,
  Row,
  Col,
  Badge,
  Tag,
  Typography
} from 'antd';
import {
  MoreOutlined,
  DeleteOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { cuteStyles } from './styles';
import { getPriorityColor } from './utils';

const CompletedTodos = ({ 
  todos, 
  onToggleComplete, 
  onDelete, 
  updateLoading 
}) => {
  if (todos.length === 0) return null;

  return {
    key: 'completed',
    label: (
      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
        <CheckCircleOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
        완료된 할일
        <Badge count={todos.length} style={{ marginLeft: '10px', backgroundColor: '#52c41a' }} />
      </span>
    ),
    children: (
      <Row>
        <Col span={24} style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
          <List
            dataSource={todos}
            renderItem={(todo) => (
              <List.Item
                style={{
                  ...cuteStyles.listItem,
                  opacity: 0.8,
                  ':hover': cuteStyles.listItemHover
                }}
                actions={[
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'delete',
                          label: '삭제',
                          danger: true,
                          icon: <DeleteOutlined />,
                          onClick: () => onDelete(todo.id),
                        },
                      ],
                    }}
                    trigger={['click']}
                  >
                    <Button 
                      type="text" 
                      icon={<MoreOutlined />}
                      style={{ borderRadius: '10px' }}
                    />
                  </Dropdown>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => onToggleComplete(todo)}
                      disabled={updateLoading}
                      style={cuteStyles.checkbox}
                    />
                  }
                  title={
                    <Typography.Text
                      style={cuteStyles.completedText}
                    >
                      {todo.title}
                    </Typography.Text>
                  }
                  description={
                    <span>
                      <Tag color="green" style={cuteStyles.tag}>
                        <CheckCircleOutlined /> 완료
                      </Tag>
                      <Tag color={getPriorityColor(todo.id)} style={cuteStyles.tag}>
                        #{todo.id}
                      </Tag>
                    </span>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    ),
  };
};

export default CompletedTodos;