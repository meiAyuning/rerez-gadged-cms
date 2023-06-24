import { formatNumber } from "@/utils";
import { Image, Tag, Tooltip } from "antd";

export function DetailOrderColumns() {
  return [
    {
      title: "Nama",
      dataIndex: "name",
      render: (_, { product }) => product?.name,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      render: (_, { product }) => product?.brand?.name,
    },
    {
      title: "Warna",
      dataIndex: "color",
      render: (_, { color }) => (
        <Tooltip title={color?.name}>
          <div style={{ width: 20, height: 20, background: color.code }} />
        </Tooltip>
      ),
    },
    {
      title: "Gambar",
      dataIndex: "image",
      render: (_, { product }) => (
        <Image style={{ width: 50, height: 50 }} src={product.image[0].url} />
      ),
    },
    {
      title: "Varian",
      dataIndex: "variant",
      render: (_, { variant }) => (
        <Tooltip
          title={
            <p>
              Harga : {formatNumber(variant?.price)} <br />
              Stok : {variant.stock}
            </p>
          }
        >
          <Tag color="blue">{variant.name}</Tag>
        </Tooltip>
      ),
    },
    {
      title: "Harga",
      dataIndex: "price",
      render: (_, { variant }) => formatNumber(variant.price),
    },
    {
      title: "Jumlah",
      dataIndex: "quantity",
      render: (_, { quantity }) => quantity,
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (_, { quantity, variant }) =>
        formatNumber(quantity * variant.price),
    },
  ];
}
