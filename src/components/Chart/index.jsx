import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/plots";

export const QuantityChart = ({ data = [], loading }) => {
  const config = {
    data,
    loading,
    xField: "brand",
    yField: "penjualan",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return <Column columnStyle={{ fill: "#6A58BA" }} {...config} />;
};
