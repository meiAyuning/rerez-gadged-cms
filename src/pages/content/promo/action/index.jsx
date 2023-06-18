import PromoAPI from "@/api/promo";
import NDButton from "@/components/NDButton";
import NDInputError from "@/components/NDInputError";
import NDTitle from "@/components/NDTitle";
import { Form, Input, Upload, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import { getDataUriFromFile } from "@/utils";

export default function BrandAction() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const handleFinish = async (values) => {
    setLoading(true);

    const payload = {
      image: fileList[0].url,
      link: values.link,
    };

    try {
      if (params.action === "create") {
        await PromoAPI.createPromo(payload);
        message.success("promo created");
        navigate("/content/promo");
        return;
      }

      await PromoAPI.updatePromo(values, params.id);
      message.success("promo updated");
      navigate("/content/promo");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleUploadImage = (options) => {
    getDataUriFromFile(options.file)
      .then(({ dataUri, fileName }) => {
        setFileList([...fileList, { fileName, url: dataUri }]);
      })
      .catch((error) => message.error(error.message));
  };

  const handleRemoveUpdloadImage = (file) => {
    const filterArr = fileList.filter(
      (item) => item.fileName !== file.fileName
    );
    setFileList(filterArr);
  };

  useEffect(() => {
    if (params.action === "update") {
      form.setFieldsValue(state);
    }
  }, []);

  return (
    <div className="brand-action">
      <NDTitle type="Page" level={1}>
        {params.action === "create" ? "Tambah" : "Ubah"} Promo
      </NDTitle>
      <div className="form-container">
        <Form
          form={form}
          requiredMark={false}
          layout="vertical"
          onFinish={handleFinish}
        >
          <Form.Item name="images" label="Foto">
            <Upload
              customRequest={handleUploadImage}
              onRemove={handleRemoveUpdloadImage}
              fileList={fileList}
              listType="picture-card"
              accept=".jpg,.jpeg,.png,.webp"
            >
              {fileList.length === 0 && "upload"}
            </Upload>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: <NDInputError>Masukan Link</NDInputError>,
              },
            ]}
            name="link"
            label="Link"
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
