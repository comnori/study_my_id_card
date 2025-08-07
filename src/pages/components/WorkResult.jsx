import React from 'react';
import { Table } from 'antd';

const columns = [
  { title: '회사명', dataIndex: 'companyName', key: 'companyName' },
  { title: '사업자번호', dataIndex: 'businessNumber', key: 'businessNumber' },
  { title: '담당자명', dataIndex: 'managerName', key: 'managerName' },
  { title: '상태', dataIndex: 'status', key: 'status' },
];

const WorkResult = ({ data }) => {
  return <Table rowKey="key" columns={columns} dataSource={data} pagination={false} />;
};

export default WorkResult;
