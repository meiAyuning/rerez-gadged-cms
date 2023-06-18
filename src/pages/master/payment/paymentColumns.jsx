import NDButton from "@/components/NDButton";
import { Popconfirm, Space } from "antd";
import { useNavigate } from "react-router-dom";

export const PaymentColumns = (handleDelete) => {
  const navigate = useNavigate();

  return [
    {
      title: "Nama",
      dataIndex: "name",
    },
    {
      title: "No Rekening",
      dataIndex: "accountNumber",
      width: "100%",
    },
    {
      title: "Aksi",
      render: (_, { id, name, accountNumber }) => (
        <Space>
          <NDButton
            onClick={() =>
              navigate(`/payment/update/${id}`, {
                state: { name, accountNumber },
              })
            }
          >
            Edit
          </NDButton>
          <Popconfirm
            title="Hapus Pembayaran ?"
            onConfirm={() => handleDelete(id)}
            placement="topRight"
            okText="Hapus"
            cancelText="Batal"
          >
            <NDButton type="primary" danger>
              Hapus
            </NDButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];
};
