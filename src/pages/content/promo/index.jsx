import NDButton from "@/components/NDButton";
import NDTitle from "@/components/NDTitle";
import { Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import PromoAPI from "@/api/promo";
import "./style.scss";
import { PromoColumns } from "./promoColumns";
import { useNavigate } from "react-router-dom";

export default function promo() {
  const [loading, setLoading] = useState(false);
  const [promo, setPromo] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: resPromo } = await PromoAPI.getPromo();
      setPromo(resPromo.data);
      console.log(resPromo);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await PromoAPI.deletePromo(id);
      message.success("success delete promo");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="promo">
      <Space direction="vertical" size="small">
        <NDTitle type="Page" level={1}>
          Promo
        </NDTitle>
        <NDButton
          onClick={() => navigate("/content/promo/create")}
          type="primary"
        >
          Tambah Promo
        </NDButton>
      </Space>
      <Table
        loading={loading}
        rowKey={"id"}
        dataSource={promo}
        columns={PromoColumns(handleDelete)}
      />
    </div>
  );
}
