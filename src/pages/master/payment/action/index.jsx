import "./style.scss";
import { Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NDButton from "@/components/NDButton";
import NDInputError from "@/components/NDInputError";
import NDTitle from "@/components/NDTitle";
import PaymentAPI from "@/api/payment";

export default function PaymentAction() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleFinish = async (values) => {
    setLoading(true);

    try {
      if (params.action === "create") {
        await PaymentAPI.createPayment(values);
        message.success("payment created");
        navigate("/payment");
        return;
      }

      await PaymentAPI.updatePayment(values, params.id);
      message.success("payment updated");
      navigate("/payment");
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
    <div className="payment-action">
      <NDTitle type="Page" level={1}>
        {params.action === "create" ? "Tambah" : "Ubah"} Pembayaran
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
                message: <NDInputError>Masukan nama bank</NDInputError>,
              },
            ]}
            name="name"
            label="Nama"
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: <NDInputError>Masukan nomor rekening</NDInputError>,
              },
            ]}
            name="accountNumber"
            label="No Rekening"
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item>
            <NDButton loading={loading} htmlType="submit">
              Simpan
            </NDButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
