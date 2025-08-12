import React from 'react';
import {
  Button,
  Checkbox,
  List,
  Empty,
  Spin,
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
  SmileOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { cuteStyles } from './styles';
import { getRandomEmoji, getPriorityColor } from './utils';

const IncompleteTodos = ({ 
  todos, 
  isLoading, 
  onToggleComplete, 
  onDelete, 
  updateLoading 
}) => {
  return {
    key: 'incomplete',
    label: (
      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
        <ClockCircleOutlined style={{ marginRight: '8px', color: '#ff6b6b' }} />
        진행중인 할일
        <Badge count={todos.length} style={{ marginLeft: '10px', backgroundColor: '#ff6b6b' }} />
      </span>
    ),
    children: (
      <>
        {isLoading ? (
          <Row justify="center" style={{ padding: '50px 0' }}>
            <Col>
              <Spin size="large" tip="로딩중... 🎯" />
            </Col>
          </Row>
        ) : todos.length === 0 ? (
          <Empty 
            description={
              <span style={{ fontSize: '16px', color: '#a0a0a0' }}>
                <SmileOutlined style={{ fontSize: '24px', marginBottom: '10px' }} />
                <br />
                모든 할일을 완료했어요! 🎉
              </span>
            }
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
          />
        ) : (
          <Row>
            <Col span={24} style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
              <List
                dataSource={todos}
                renderItem={(todo) => (
                  <List.Item
                    style={{
                      ...cuteStyles.listItem,
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
                        <span style={{ fontSize: '16px' }}>
                          <span style={cuteStyles.emoji}>{getRandomEmoji()}</span>
                          {todo.title}
                        </span>
                      }
                      description={
                        <Tag color={getPriorityColor(todo.id)} style={cuteStyles.tag}>
                          #{todo.id}
                        </Tag>
                      }
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        )}
      </>
    ),
  };
};

export default IncompleteTodos;