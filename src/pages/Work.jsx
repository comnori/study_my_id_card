import React, { useState } from 'react';
import { Row, Col } from 'antd';
import WorkSearch from './components/WorkSearch';
import WorkResult from './components/WorkResult';
import fakeData from './data/workData.json';

const Work = () => {
  const [data, setData] = useState([]);

  const handleSearch = (values) => {
    const filteredData = fakeData.filter((item) => {
      const matchCompany = values.companyName
        ? item.companyName.includes(values.companyName)
        : true;
      const matchBusiness = values.businessNumber
        ? item.businessNumber.includes(values.businessNumber)
        : true;
      const matchManager = values.managerName
        ? item.managerName.includes(values.managerName)
        : true;
      return matchCompany && matchBusiness && matchManager;
    });
    setData(filteredData);
  };

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <WorkSearch onSearch={handleSearch} />
      </Col>
      <Col span={24}>
        <WorkResult data={data} />
      </Col>
    </Row>
  );
};

export default Work;
