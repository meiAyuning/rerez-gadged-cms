import NDButton from "@/components/NDButton";
import NDTitle from "@/components/NDTitle";
import { Space, Table } from "antd";
import { productColumns } from "./productColumns";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: "64787fc70b15a441f085a58f",
    brand: {
      id: "647809d1353385e4aeb9aff9",
      name: "Samsung",
    },
    color: ["#FFC26F", "#C38154", "#884A39"],
    description: "ggggg",
    image: [
      {
        id: "64787fc90b15a441f085a592",
        name: "rerez-gadget/nu0widpc5dt0uzyn2xgs",
        url: "http://res.cloudinary.com/dhbi7k7bq/image/upload/v1685618625/rerez-gadget/nu0widpc5dt0uzyn2xgs.webp",
        productId: "64787fc70b15a441f085a58f",
      },
      {
        id: "64787fc90b15a441f085a593",
        name: "rerez-gadget/jxx7rycewumtrwdojwx8",
        url: "http://res.cloudinary.com/dhbi7k7bq/image/upload/v1685618628/rerez-gadget/jxx7rycewumtrwdojwx8.webp",
        productId: "64787fc70b15a441f085a58f",
      },
    ],
    name: "Samsung S23",
    variant: [
      {
        id: "64787fc70b15a441f085a590",
        name: "500 Gb",
        price: 23000000,
        stock: 300,
        productId: "64787fc70b15a441f085a58f",
      },
      {
        id: "64787fc70b15a441f085a591",
        name: "1Tb",
        price: 40000000,
        stock: 30,
        productId: "64787fc70b15a441f085a58f",
      },
    ],
  },
];

export default function Product() {
  const navigate = useNavigate();

  return (
    <main className="product">
      <Space direction="vertical" size="small">
        <NDTitle type="Page" level={1}>
          Produk
        </NDTitle>
        <NDButton onClick={() => navigate("/product/create")} type="primary">
          Tambah Produk
        </NDButton>
      </Space>
      <Table rowKey={"id"} dataSource={data} columns={productColumns} />
    </main>
  );
}
