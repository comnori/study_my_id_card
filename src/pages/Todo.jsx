import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Form, 
  message,
  Typography,
  Card,
  Collapse,
  Row,
  Col,
  Badge,
  Tag,
  Progress
} from 'antd';
import { 
  SmileOutlined,
  CheckCircleOutlined,
  StarFilled,
  HeartFilled,
  FireFilled,
  TrophyFilled
} from '@ant-design/icons';

import TodoInput from './Todo/TodoInput';
import IncompleteTodos from './Todo/IncompleteTodos';
import CompletedTodos from './Todo/CompletedTodos';
import { cuteStyles } from './Todo/styles';

const { Title, Text } = Typography;

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

  const incompleteItem = IncompleteTodos({
    todos: incompleteTodos,
    isLoading,
    onToggleComplete: handleToggleComplete,
    onDelete: handleDelete,
    updateLoading: updateMutation.isPending
  });

  const completedItem = CompletedTodos({
    todos: completedTodos,
    onToggleComplete: handleToggleComplete,
    onDelete: handleDelete,
    updateLoading: updateMutation.isPending
  });

  const collapseItems = [incompleteItem];
  if (completedItem) {
    collapseItems.push(completedItem);
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

      {/* 할일 추가 */}
      <TodoInput 
        form={addForm} 
        onAddTodo={handleAddTodo} 
        loading={createMutation.isPending} 
      />

      <Col span={24}>
        {/* 할일 목록 */}
        <Collapse
          defaultActiveKey={['incomplete']}
          style={{ 
            borderRadius: '20px',
            overflow: 'hidden',
            border: 'none',
            background: 'white'
          }}
          expandIconPosition="end"
          items={collapseItems}
        />
      </Col>
    </Row>
  );
};

export default Todo;