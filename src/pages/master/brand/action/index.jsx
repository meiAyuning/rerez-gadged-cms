import BrandAPI from "@/api/brand";
import NDButton from "@/components/NDButton";
import NDInputError from "@/components/NDInputError";
import NDTitle from "@/components/NDTitle";
import { Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.scss";

export default function BrandAction() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleFinish = async (values) => {
    setLoading(true);

    try {
      if (params.action === "create") {
        await BrandAPI.createBrand(values);
        message.success("brand created");
        navigate("/brand");
        return;
      }

      await BrandAPI.updateBrand(values, params.id);
      message.success("brand updated");
      navigate("/brand");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (params.action === "update") {
      form.setFieldsValue(state);
    }
  }, []);

  return (
    <div className="brand-action">
      <NDTitle type="Page" level={1}>
        {params.action === "create" ? "Tambah" : "Ubah"} Brand
      </NDTitle>
      <div className="form-container">
        <Form
          form={form}
          requiredMark={false}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: <NDInputError>Masukan nama brand</NDInputError>,
              },
            ]}
            name="name"
            label="Nama Brand"
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <NDButton htmlType="submit" loading={loading}>
              Simpan
            </NDButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
