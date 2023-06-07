import { Typography } from "antd";
import React from "react";
import "./style.scss";

/**
 *
 * @typedef {import('antd').TypographyProps} IAntdTypo
 *
 * @typedef {Object} INDTitle
 * @property {1 |  2 |  3 |  4 |  5} level
 * @property { "Page" | "Text" } type
 *
 * @param {IAntdTypo & INDTitle} props
 */
export default function NDTitle({
  className = "",
  type,
  children,
  level,
  ...props
}) {
  const { Title } = Typography;

  return (
    <Title
      className={`nd-title ${type === "Page" && "title-page"} ` + className}
      level={level}
      {...props}
    >
      {children}
    </Title>
  );
}
