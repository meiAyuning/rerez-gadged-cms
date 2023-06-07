import { Typography } from "antd";
import "./style.scss";

/**
 *
 * @typedef {import('antd').TypographyProps}  IAntProps
 * @param { String } children
 * @param {IAntProps} props
 */
export default function NDText({ className, children, ...props }) {
  const { Text } = Typography;

  return (
    <Text className={`nd-text ${className} `} {...props}>
      {children}
    </Text>
  );
}
