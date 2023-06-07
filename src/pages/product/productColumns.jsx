import NDButton from "@/components/NDButton";
import { Image, Space, Tag, Tooltip } from "antd";

export const productColumns = [
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
          <div
            key={index}
            style={{ width: 20, height: 20, background: value }}
          />
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
                Harga : {value.price} <br />
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
    render: () => (
      <Space>
        <NDButton>Edit</NDButton>
        <NDButton type="primary" danger>
          Hapus
        </NDButton>
      </Space>
    ),
  },
];
