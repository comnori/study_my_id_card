import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Button, 
  Form, 
  Input, 
  Checkbox, 
  List, 
  message,
  Typography,
  Card,
  Empty,
  Spin,
  Dropdown,
  Collapse,
  Row,
  Col,
  Badge,
  Tag,
  Progress
} from 'antd';
import { 
  PlusOutlined, 
  MoreOutlined, 
  DeleteOutlined,
  SmileOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarFilled,
  HeartFilled,
  FireFilled,
  TrophyFilled,
  RocketFilled
} from '@ant-design/icons';

const { Title, Text } = Typography;

// 귀여운 스타일 정의
const cuteStyles = {
  container: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    padding: '20px',
    borderRadius: '20px'
  },
  card: {
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)'
  },
  headerCard: {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    border: 'none',
    color: 'white'
  },
  addCard: {
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    border: 'none'
  },
  listItem: {
    borderRadius: '15px',
    marginBottom: '10px',
    padding: '15px',
    background: 'linear-gradient(135deg, #fff 0%, #f8f9fa 100%)',
    transition: 'all 0.3s ease',
    border: '2px solid transparent'
  },
  listItemHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
    border: '2px solid #f093fb'
  },
  checkbox: {
    transform: 'scale(1.3)',
    marginRight: '10px'
  },
  completedText: {
    textDecoration: 'line-through',
    color: '#b8b8b8',
    opacity: 0.7
  },
  emoji: {
    fontSize: '1.5em',
    marginRight: '8px'
  },
  tag: {
    borderRadius: '10px',
    padding: '2px 10px',
    fontSize: '12px'
  }
};

// 랜덤 이모지 생성 함수
const getRandomEmoji = () => {
  const emojis = ['🎯', '🚀', '💡', '🌟', '🎨', '📚', '🎪', '🌈', '🦄', '🍀'];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

// 우선순위별 색상
const getPriorityColor = (id) => {
  const colors = ['magenta', 'purple', 'blue', 'cyan', 'green', 'lime', 'gold', 'orange'];
  return colors[id % colors.length];
};

const fetchTodos = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  return response.json();
};

const createTodo = async (todo) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.json();
};

const updateTodo = async ({ id, ...todo }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return response.json();
};

const deleteTodo = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

const Todo = () => {
  const queryClient = useQueryClient();
  const [addForm] = Form.useForm();
  const [newTodoValue, setNewTodoValue] = React.useState('');

  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success(
        <span>
          <FireFilled style={{ color: '#ff4757', marginRight: '5px' }} />
          할일이 추가되었어요! 화이팅! 💪
        </span>
      );
      setNewTodoValue('');
      addForm.resetFields();
    },
    onError: () => {
      message.error('앗! 할일 추가에 실패했어요 😢');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: () => {
      message.error('앗! 할일 수정에 실패했어요 😢');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success('할일이 삭제되었어요! 👋');
    },
    onError: () => {
      message.error('앗! 할일 삭제에 실패했어요 😢');
    },
  });

  const handleAddTodo = (values) => {
    if (!values.title || !values.title.trim()) return;
    
    createMutation.mutate({
      title: values.title.trim(),
      completed: false,
      userId: 1,
    });
  };

  const handleToggleComplete = (todo) => {
    updateMutation.mutate({
      ...todo,
      completed: !todo.completed,
    });
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  // 완료된 할일과 미완료 할일 분리
  const completedTodos = todos.filter(todo => todo.completed);
  const incompleteTodos = todos.filter(todo => !todo.completed);
  
  // 진행률 계산
  const completionRate = todos.length > 0 ? Math.round((completedTodos.length / todos.length) * 100) : 0;

  if (error) {
    return (
      <Card style={{ borderRadius: '20px', textAlign: 'center', padding: '40px' }}>
        <SmileOutlined style={{ fontSize: '48px', color: '#ff6b6b', marginBottom: '20px' }} />
        <Typography.Text type="danger" style={{ fontSize: '16px' }}>
          앗! 데이터를 불러오는데 실패했어요 😢
          <br />
          {error.message}
        </Typography.Text>
      </Card>
    );
  }

  return (
    <Row gutter={[16, 16]} style={{ padding: '20px' }}>
      <Col span={24}>
        {/* 헤더 */}
        <Card style={cuteStyles.headerCard}>
          <Row align="middle" justify="space-between">
            <Col>
              <Title level={2} style={{ color: 'white', margin: 0 }}>
                <StarFilled style={{ marginRight: '10px', color: '#feca57' }} />
                오늘의 할일 목록
                <HeartFilled style={{ marginLeft: '10px', color: '#ff6b6b' }} />
              </Title>
            </Col>
            <Col>
              <Badge 
                count={incompleteTodos.length} 
                style={{ backgroundColor: '#52c41a' }}
                showZero
              >
                <Tag color="blue" style={{ fontSize: '16px', padding: '5px 15px', borderRadius: '20px' }}>
                  <CheckCircleOutlined /> {completedTodos.length}/{todos.length} 완료
                </Tag>
              </Badge>
            </Col>
          </Row>
          <Row style={{ marginTop: '20px' }}>
            <Col span={24}>
              <Progress 
                percent={completionRate} 
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                style={{ marginBottom: '10px' }}
              />
              <div style={{ 
                background: 'rgba(255,255,255,0.2)', 
                borderRadius: '10px', 
                padding: '10px',
                textAlign: 'center'
              }}>
                <Text style={{ color: 'white', fontSize: '14px' }}>
                  {completedTodos.length === todos.length && todos.length > 0 
                    ? '🎉 와! 모든 할일을 완료했어요! 대단해요! 🎊' 
                    : incompleteTodos.length > 0
                    ? `💪 ${incompleteTodos.length}개의 할일이 남아있어요! 화이팅!`
                    : '📝 새로운 할일을 추가해보세요!'}
                </Text>
                {completionRate === 100 && todos.length > 0 && (
                  <div style={{ marginTop: '10px' }}>
                    <TrophyFilled style={{ fontSize: '32px', color: '#ffd700' }} />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        {/* 할일 추가 */}
        <Card style={cuteStyles.addCard}>
          <Form form={addForm} onFinish={handleAddTodo}>
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
                onSearch={(value) => handleAddTodo({ title: value })}
                loading={createMutation.isPending}
              />
            </Form.Item>
          </Form>
        </Card>
      </Col>

      <Col span={24}>
        {/* 할일 목록 - Collapsible */}
        <Collapse
        defaultActiveKey={['incomplete']}
        style={{ 
          borderRadius: '20px',
          overflow: 'hidden',
          border: 'none',
          background: 'white'
        }}
        expandIconPosition="end"
        items={[
          {
            key: 'incomplete',
            label: (
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                <ClockCircleOutlined style={{ marginRight: '8px', color: '#ff6b6b' }} />
                진행중인 할일
                <Badge count={incompleteTodos.length} style={{ marginLeft: '10px', backgroundColor: '#ff6b6b' }} />
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
                ) : incompleteTodos.length === 0 ? (
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
                      dataSource={incompleteTodos}
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
                                    onClick: () => handleDelete(todo.id),
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
                                onChange={() => handleToggleComplete(todo)}
                                disabled={updateMutation.isPending}
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
          },
          ...(completedTodos.length > 0 ? [{
            key: 'completed',
            label: (
              <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                <CheckCircleOutlined style={{ marginRight: '8px', color: '#52c41a' }} />
                완료된 할일
                <Badge count={completedTodos.length} style={{ marginLeft: '10px', backgroundColor: '#52c41a' }} />
              </span>
            ),
            children: (
              <Row>
                <Col span={24} style={{ maxHeight: '400px', overflowY: 'auto', padding: '10px' }}>
                <List
                  dataSource={completedTodos}
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
                                onClick: () => handleDelete(todo.id),
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
                            onChange={() => handleToggleComplete(todo)}
                            disabled={updateMutation.isPending}
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
          }] : []),
        ]}
        />
      </Col>
    </Row>
  );
};

export default Todo;