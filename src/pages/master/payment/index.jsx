import NDButton from "@/components/NDButton";
import NDTitle from "@/components/NDTitle";
import { Space, Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import { PaymentColumns } from "./paymentColumns";
import "./style.scss";
import PaymentAPI from "@/api/payment";
import { useEffect, useState } from "react";

export default function Payment() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: resPayment } = await PaymentAPI.getPayment();
      setPayments(resPayment.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await PaymentAPI.deletePayment(id);
      message.success("success delete payment");
      fetchData();
    } catch (error) {
      console.log(error);
      message.error("failed delete payment");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="payment">
      <Space direction="vertical" size="small">
        <NDTitle type="Page" level={1}>
          Pembayaran
        </NDTitle>
        <NDButton onClick={() => navigate("/payment/create")} type="primary">
          Tambah Pembayaran
        </NDButton>
      </Space>
      <Table
        loading={loading}
        rowKey={"id"}
        dataSource={payments}
        columns={PaymentColumns(handleDelete)}
      />
    </div>
  );
}
