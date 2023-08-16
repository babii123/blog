import React from "react";
// import styles from "../styles/Advert.module.css";
import { Empty, Space, Card } from "antd";
const Advert:React.FC = () =>{
  return (
    <Space direction="vertical" style={{ display: 'flex'}}>
      <Card>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Card>
      <Card>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Card>
    </Space>
  );
}

export default Advert;
