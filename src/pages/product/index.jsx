import "./style.scss";
import { ProductColumns } from "./productColumns";
import { Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NDButton from "@/components/NDButton";
import NDTitle from "@/components/NDTitle";
import ProductAPI from "@/api/product";

export default function Product() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const { data: resProduct } = await ProductAPI.getProduct();
      setProducts(resProduct.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await ProductAPI.deleteProduct(id);
      message.success("success delete product");
      fetchData();
    } catch (error) {
      console.log(error);
      message.success("failed delete product");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="product">
      <Space direction="vertical" size="small">
        <NDTitle type="Page" level={1}>
          Produk
        </NDTitle>
        <NDButton onClick={() => navigate("/product/create")} type="primary">
          Tambah Produk
        </NDButton>
      </Space>
      <Table
        loading={loading}
        rowKey={"id"}
        dataSource={products}
        columns={ProductColumns(handleDelete)}
      />
    </div>
  );
}
