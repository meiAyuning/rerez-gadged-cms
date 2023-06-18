import NDButton from "@/components/NDButton";
import NDTitle from "@/components/NDTitle";
import { Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import FeatureAPI from "@/api/feature";
import "./style.scss";
import { FeatureColumns } from "./featureColumns";
import { useNavigate } from "react-router-dom";

export default function Feature() {
  const [loading, setLoading] = useState(false);
  const [feature, setFeature] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: resFeature } = await FeatureAPI.getFeature();
      setFeature(resFeature.data);
      console.log(resFeature);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await FeatureAPI.deleteFeature(id);
      message.success("success delete feature");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="feature">
      <Space direction="vertical" size="small">
        <NDTitle type="Page" level={1}>
          Feature
        </NDTitle>
        <NDButton
          onClick={() => navigate("/content/feature/create")}
          type="primary"
        >
          Tambah Feature
        </NDButton>
      </Space>
      <Table
        loading={loading}
        rowKey={"id"}
        dataSource={feature}
        columns={FeatureColumns(handleDelete)}
      />
    </div>
  );
}
