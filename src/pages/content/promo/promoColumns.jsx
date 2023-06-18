import NDButton from "@/components/NDButton";
import { Image, Popconfirm, Space } from "antd";
import { useNavigate } from "react-router-dom";

export const PromoColumns = (handleDelete) => {
  const navigate = useNavigate();

  return [
    {
      title: "Gambar",
      dataIndex: "image",
      render: (_, { image }) => <Image src={image.url} />,
    },
    {
      title: "Link",
      dataIndex: "link",
      width: "100%",
    },
    {
      title: "Aksi",
      render: (_, value) => (
        <Space>
          {/* <NDButton
            onClick={() =>
              navigate(`/banner/update/${value.id}`, { state: value })
            }
          >
            Edit
          </NDButton> */}
          <Popconfirm
            title="Hapus?"
            onConfirm={() => handleDelete(value.id)}
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
