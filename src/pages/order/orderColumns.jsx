import NDButton from "@/components/NDButton";
import { Space } from "antd";
import OrderStatus from "@/components/NDOrderStatus";
import { formatNumber } from "@/utils";
import { useNavigate } from "react-router-dom";

export const OrderColumns = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Kode Pesanan",
      dataIndex: "orderCode",
    },
    {
      title: "Jumlah Produk",
      dataIndex: "orderItem",
      render: (_, value) => value?.orderItem.length,
    },
    {
      title: "Pembayaran",
      dataIndex: "payment",
      render: (_, value) => value?.payment.name,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, value) => <OrderStatus status={value?.status} />,
    },
    {
      title: "Total transaksi",
      dataIndex: "totalPayment",
      render: (_, value) => formatNumber(value?.totalPayment),
    },
    {
      title: "Aksi",
      render: (_, value) => (
        <Space>
          <NDButton
            onClick={() =>
              navigate(`/order/detail/${value.id}`, { state: value })
            }
          >
            Detail
          </NDButton>
        </Space>
      ),
    },
  ];

  return columns;
};
