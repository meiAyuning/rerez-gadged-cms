import NDButton from "@/components/NDButton";
import NDTitle from "@/components/NDTitle";
import { Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import FooterAPI from "@/api/footer";
import "./style.scss";
import { FooterColumns } from "./footerColumns";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [loading, setLoading] = useState(false);
  const [footer, setFooter] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: resFooter } = await FooterAPI.getFooter();
      setFooter(resFooter.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await FooterAPI.deleteFooter(id);
      message.success("success delete footer");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="footer">
      <Space direction="vertical" size="small">
        <NDTitle type="Page" level={1}>
          Footer
        </NDTitle>
        <NDButton
          onClick={() => navigate("/content/footer/create")}
          type="primary"
        >
          Tambah Footer
        </NDButton>
      </Space>
      <Table
        loading={loading}
        rowKey={"id"}
        dataSource={footer}
        columns={FooterColumns(handleDelete)}
      />
    </div>
  );
}
