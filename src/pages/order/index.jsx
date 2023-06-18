import NDTitle from "@/components/NDTitle";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { OrderColumns } from "./orderColumns";
import "./style.scss";
import OrderAPI from "@/api/order";

export default function Order() {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: resOrder } = await OrderAPI.getOrder();
      setOrder(resOrder.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="order">
      <NDTitle type="Page" level={1}>
        Pesanan
      </NDTitle>
      <Table
        loading={loading}
        rowKey={"id"}
        dataSource={order}
        columns={OrderColumns()}
      />
    </div>
  );
}
