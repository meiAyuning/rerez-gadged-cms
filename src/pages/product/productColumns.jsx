import NDButton from "@/components/NDButton";
import { formatNumber } from "@/utils";
import { Image, Popconfirm, Space, Tag, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

export const ProductColumns = (handleDelete) => {
  const navigate = useNavigate();

  return [
    {
      title: "Nama",
      dataIndex: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      render: (_, value) => value.brand.name,
    },
    {
      title: "Warna",
      dataIndex: "color",
      render: (_, { color }) => (
        <Space>
          {color.map((value, index) => (
            <Tooltip key={value.id} title={value.name}>
              <div
                key={index}
                style={{ width: 20, height: 20, background: value.code }}
              />
            </Tooltip>
          ))}
        </Space>
      ),
    },
    {
      title: "Gambar",
      dataIndex: "image",
      render: (_, { image }) => (
        <Image style={{ width: 50, height: 50 }} src={image[0].url} />
      ),
    },
    {
      title: "Varian",
      dataIndex: "variant",
      render: (_, { variant }) => (
        <Space>
          {variant.map((value) => (
            <Tooltip
              key={value.id}
              title={
                <p>
                  Harga : {formatNumber(value.price)} <br />
                  Stok : {value.stock}
                </p>
              }
            >
              <Tag color="blue">{value.name}</Tag>
            </Tooltip>
          ))}
        </Space>
      ),
    },
    {
      title: "Aksi",
      render: (_, value) => (
        <Space>
          <NDButton
            onClick={() =>
              navigate(`/product/update/${value.id}`, { state: value })
            }
          >
            Edit
          </NDButton>
          <Popconfirm
            title="Hapus Produk ?"
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
