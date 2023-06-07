import { Button } from "antd";
import React from "react";
import "./style.scss";

/**
 *
 * @typedef {import("antd").ButtonProps} IAntButton
 *
 * @param {IAntButton} props
 */
export default function NDButton({ className, children, ...props }) {
  return (
    <Button className={` ${className}`} {...props}>
      {children}
    </Button>
  );
}
