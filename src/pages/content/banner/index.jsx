import NDButton from "@/components/NDButton";
import NDTitle from "@/components/NDTitle";
import { Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import BannerAPI from "@/api/banner";
import "./style.scss";
import { BannerColumns } from "./bannerColumns";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const [loading, setLoading] = useState(false);
  const [banner, setBanner] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: resBanner } = await BannerAPI.getBanner();
      setBanner(resBanner.data);
      console.log(resBanner.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await BannerAPI.deleteBanner(id);
      message.success("success delete banner");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="banner">
      <Space direction="vertical" size="small">
        <NDTitle type="Page" level={1}>
          Banner
        </NDTitle>
        <NDButton
          onClick={() => navigate("/content/banner/create")}
          type="primary"
        >
          Tambah Banner
        </NDButton>
      </Space>
      <Table
        loading={loading}
        rowKey={"id"}
        dataSource={banner}
        columns={BannerColumns(handleDelete)}
      />
    </div>
  );
}
