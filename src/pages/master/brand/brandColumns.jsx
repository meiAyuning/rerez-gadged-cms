import NDButton from "@/components/NDButton";
import { Popconfirm, Space } from "antd";
import { useNavigate } from "react-router-dom";

export const BrandColumns = (handleDelete) => {
  const navigate = useNavigate();

  return [
    {
      title: "Nama",
      dataIndex: "name",
      width: "100%",
    },
    {
      title: "Aksi",
      render: (_, { id, name }) => (
        <Space>
          <NDButton
            onClick={() => navigate(`/brand/update/${id}`, { state: { name } })}
          >
            Edit
          </NDButton>
          <Popconfirm
            title="Hapus Brand ?"
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
