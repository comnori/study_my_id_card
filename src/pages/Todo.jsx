import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Switch, 
  Space, 
  message,
  Typography,
  Card
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState(null);

  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success('할일이 추가되었습니다.');
      setIsModalOpen(false);
      form.resetFields();
    },
    onError: () => {
      message.error('할일 추가에 실패했습니다.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success('할일이 수정되었습니다.');
      setIsModalOpen(false);
      setEditingTodo(null);
      form.resetFields();
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

  const handleCreate = () => {
    setEditingTodo(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    form.setFieldsValue({
      title: todo.title,
      completed: todo.completed,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: '할일 삭제',
      content: '정말로 이 할일을 삭제하시겠습니까?',
      onOk: () => deleteMutation.mutate(id),
    });
  };

  const handleSubmit = (values) => {
    if (editingTodo) {
      updateMutation.mutate({
        id: editingTodo.id,
        ...values,
        userId: editingTodo.userId,
      });
    } else {
      createMutation.mutate({
        ...values,
        userId: 1,
      });
    }
  };

  const handleToggleComplete = (todo) => {
    updateMutation.mutate({
      ...todo,
      completed: !todo.completed,
    });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '할일',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '완료상태',
      dataIndex: 'completed',
      key: 'completed',
      width: 120,
      render: (completed, record) => (
        <Switch
          checked={completed}
          onChange={() => handleToggleComplete(record)}
          loading={updateMutation.isPending}
        />
      ),
    },
    {
      title: '작업',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            수정
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            loading={deleteMutation.isPending}
            size="small"
          >
            삭제
          </Button>
        </Space>
      ),
    },
  ];

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
    <Card>
      <div>
        <Title level={2}>할일 관리</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          loading={createMutation.isPending}
        >
          할일 추가
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={todos}
        rowKey="id"
        loading={isLoading}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />

      <Modal
        title={editingTodo ? '할일 수정' : '할일 추가'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingTodo(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="할일"
            rules={[{ required: true, message: '할일을 입력해주세요' }]}
          >
            <Input placeholder="할일을 입력하세요" />
          </Form.Item>

          <Form.Item
            name="completed"
            label="완료상태"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={createMutation.isPending || updateMutation.isPending}
              >
                {editingTodo ? '수정' : '추가'}
              </Button>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingTodo(null);
                  form.resetFields();
                }}
              >
                취소
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Todo;