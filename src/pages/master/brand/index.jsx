import NDButton from "@/components/NDButton";
import NDTitle from "@/components/NDTitle";
import { Space, Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import { BrandColumns } from "./brandColumns";
import "./style.scss";
import { useEffect, useState } from "react";
import BrandAPI from "@/api/brand";

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: resBrand } = await BrandAPI.getBrand();
      setBrands(resBrand.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await BrandAPI.deleteBrand(id);
      message.success("success delete brand");
      fetchData();
    } catch (error) {
      console.log(error);
      message.error("failed delete brand");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="brand">
      <Space direction="vertical" size="small">
        <NDTitle type="Page" level={1}>
          Brand
        </NDTitle>
        <NDButton onClick={() => navigate("/brand/create")} type="primary">
          Tambah Brand
        </NDButton>
      </Space>
      <Table
        loading={loading}
        rowKey={"id"}
        dataSource={brands}
        columns={BrandColumns(handleDelete)}
      />
    </div>
  );
}
