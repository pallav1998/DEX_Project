import React from "react";
import { Typography } from "antd";
const { Title } = Typography;

export default function Market({ selectedToken }) {
  return (
    <div>
      <Title level={4}>{`Selected Token : ${selectedToken}`}</Title>
    </div>
  );
}
