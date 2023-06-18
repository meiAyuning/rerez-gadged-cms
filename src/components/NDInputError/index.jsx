import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Space } from "antd";
import "./style.scss";

export default function NDInputError({ children }) {
  return (
    <Space className="error" align="center">
      <ExclamationCircleOutlined />
      <span>{children}</span>
    </Space>
  );
}
