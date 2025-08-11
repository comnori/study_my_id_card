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
  Collapse
} from 'antd';
import { PlusOutlined, MoreOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

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
      message.success('할일이 추가되었습니다.');
      setNewTodoValue('');
      addForm.resetFields();
    },
    onError: () => {
      message.error('할일 추가에 실패했습니다.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: () => {
      message.error('할일 수정에 실패했습니다.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success('할일이 삭제되었습니다.');
    },
    onError: () => {
      message.error('할일 삭제에 실패했습니다.');
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

  if (error) {
    return (
      <Card>
        <Typography.Text type="danger">
          데이터를 불러오는데 실패했습니다: {error.message}
        </Typography.Text>
      </Card>
    );
  }

  return (
    <div>
      {/* 헤더 */}
      <Card>
        <Title level={2}>할일</Title>
        <Typography.Text type="secondary">
          총 {todos.length}개 중 {completedTodos.length}개 완료
        </Typography.Text>
      </Card>

      {/* 할일 추가 */}
      <Card>
        <Form form={addForm} onFinish={handleAddTodo}>
          <Form.Item name="title" rules={[{ required: true, message: '할일을 입력해주세요' }]}>
            <Input.Search
              placeholder="할일 추가"
              enterButton={<PlusOutlined />}
              size="large"
              onSearch={(value) => handleAddTodo({ title: value })}
              loading={createMutation.isPending}
            />
          </Form.Item>
        </Form>
      </Card>

      {/* 할일 목록 - Collapsible */}
      <Collapse
        defaultActiveKey={['incomplete']}
        items={[
          {
            key: 'incomplete',
            label: `미완료 (${incompleteTodos.length}개)`,
            children: (
              <>
                {isLoading ? (
                  <div style={{ textAlign: 'center', padding: '50px 0' }}>
                    <Spin size="large" />
                  </div>
                ) : incompleteTodos.length === 0 ? (
                  <Empty 
                    description="미완료 할일이 없습니다" 
                    image={Empty.PRESENTED_IMAGE_SIMPLE} 
                  />
                ) : (
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <List
                      dataSource={incompleteTodos}
                      renderItem={(todo) => (
                        <List.Item
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
                              <Button type="text" icon={<MoreOutlined />} />
                            </Dropdown>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={
                              <Checkbox
                                checked={todo.completed}
                                onChange={() => handleToggleComplete(todo)}
                                disabled={updateMutation.isPending}
                              />
                            }
                            title={
                              <Typography.Text>
                                {todo.title}
                              </Typography.Text>
                            }
                            description={`ID: ${todo.id}`}
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                )}
              </>
            ),
          },
          ...(completedTodos.length > 0 ? [{
            key: 'completed',
            label: `완료됨 (${completedTodos.length}개)`,
            children: (
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <List
                  dataSource={completedTodos}
                  renderItem={(todo) => (
                    <List.Item
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
                          <Button type="text" icon={<MoreOutlined />} />
                        </Dropdown>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Checkbox
                            checked={todo.completed}
                            onChange={() => handleToggleComplete(todo)}
                            disabled={updateMutation.isPending}
                          />
                        }
                        title={
                          <Typography.Text
                            style={{
                              textDecoration: 'line-through',
                              color: '#999',
                            }}
                          >
                            {todo.title}
                          </Typography.Text>
                        }
                        description={`ID: ${todo.id}`}
                      />
                    </List.Item>
                  )}
                />
              </div>
            ),
          }] : []),
        ]}
      />
    </div>
  );
};

export default Todo;