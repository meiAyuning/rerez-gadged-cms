import BrandAPI from "@/api/brand";
import NDButton from "@/components/NDButton";
import NDText from "@/components/NDText";
import NDTextEditor from "@/components/NDTextEditor";
import NDTitle from "@/components/NDTitle";
import { getDataUriFromFile } from "@/utils";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Col,
  ColorPicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import ProductAPI from "@/api/product";
import ImgCrop from "antd-img-crop";

export default function ProductAction() {
  const [form] = Form.useForm();
  const [stringHex, setStringHex] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [brands, setBrands] = useState([]);

  const colorChange = (name, hex) => {
    const colors = form.getFieldValue("colors") || [];
    colors[name].code = hex;
    stringHex[name] = hex;
    setStringHex([...stringHex]);
    form.setFieldValue("colors", colors);
  };

  const addColor = () => {
    const colors = form.getFieldValue("colors") || [];
    colors.push({ name: "", code: "#1677FF" });
    setStringHex([...stringHex, "#1677FF"]);
    form.setFieldValue("colors", colors);
  };

  const removeColor = (name) => {
    const colors = form.getFieldValue("colors") || [];
    colors.splice(name, 1);

    setStringHex((prevArray) => {
      const newArray = [...prevArray];
      newArray.splice(name, 1);
      return newArray;
    });

    form.setFieldValue("colors", colors);
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

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const { colors } = values;
      if (fileList.length === 0) {
        message.error("upload foto produk");
        return;
      }

      const imageList = fileList.map((file) => file.url);
      const payload = { ...values, image: imageList, color: colors };
      // console.log(payload);

      params.action === "create"
        ? await ProductAPI.createProduct(payload)
        : await ProductAPI.updateProduct(payload, params.id);

      setLoading(false);
      message.success(`${params.action} product success`);
      navigate("/product");
    } catch (error) {
      message.error(error.message);
      setLoading(false);
    }
  };

  const fetchBrand = async () => {
    try {
      const { data: resBrand } = await BrandAPI.getBrand();
      setBrands(resBrand.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setInitForm = () => {
    const initColors = state.color.map((item) => ({
      name: item.name,
      code: item.code,
    }));

    const initVariants = state.variant.map((item) => ({
      name: item.name,
      price: item.price,
      stock: item.stock,
    }));
    setStringHex(state.color.map((item) => item.code));

    form.setFieldsValue({
      ...state,
      colors: initColors,
      brand: state.brand.id,
      variant: initVariants,
    });

    setFileList(state.image);
  };

  useEffect(() => {
    if (params.action === "update") {
      setInitForm();
    }
  }, []);

  useEffect(() => {
    fetchBrand();
  }, []);

  return (
    <div className="product-action">
      <NDTitle type="Page" level={1}>
        {params.action === "create" ? "Tambah" : "Ubah"} Produk
      </NDTitle>
      <div className="form-container">
        <Form
          requiredMark={false}
          layout="vertical"
          form={form}
          onFinish={handleFinish}
        >
          <Row className="wrapper-form-input" gutter={20}>
            <Col span={24}>
              <Form.Item name="images" label="Foto Produk">
                <ImgCrop rotationSlider={true} showReset={true}>
                  <Upload
                    customRequest={handleUploadImage}
                    onRemove={handleRemoveUpdloadImage}
                    fileList={fileList}
                    listType="picture-card"
                    accept=".jpg,.jpeg,.png,.webp"
                  >
                    {fileList.length >= 5 ? null : (
                      <div>
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </div>
                    )}
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Nama"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Input nama produk",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Brand"
                name="brand"
                rules={[
                  {
                    required: true,
                    message: "Pilih brand",
                  },
                ]}
              >
                <Select
                  fieldNames={{ label: "name", value: "id" }}
                  options={brands}
                />
              </Form.Item>

              <NDText>Varian</NDText>
              <Form.List
                name="variant"
                rules={[
                  {
                    validator: async (_, variant) => {
                      if (!variant || variant.length === 0) {
                        return Promise.reject(
                          new Error("Masukan minimal 1 varian")
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={20}>
                        <Col span={22}>
                          <Row gutter={20}>
                            <Col span={24}>
                              <Form.Item
                                {...restField}
                                name={[name, "name"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Input nama varian",
                                  },
                                ]}
                              >
                                <Input placeholder="Nama varian" />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, "price"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Input harga",
                                  },
                                ]}
                              >
                                <InputNumber
                                  placeholder="Harga"
                                  addonBefore="Rp."
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, "stock"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Input stok",
                                  },
                                ]}
                              >
                                <InputNumber
                                  placeholder="Stok"
                                  addonAfter="pcs"
                                />
                              </Form.Item>
                            </Col>
                            <Divider style={{ margin: 10 }} />
                          </Row>
                        </Col>
                        <Col span={2}>
                          <DeleteOutlined
                            className="delete-icon"
                            onClick={() => remove(name)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <NDButton
                        type="primary"
                        onClick={() => {
                          add();
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Tambah Varian
                      </NDButton>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <NDText>Warna</NDText>
              <Form.List
                name="colors"
                rules={[
                  {
                    validator: async (_, colors) => {
                      if (!colors || colors.length === 0) {
                        return Promise.reject(
                          new Error("Masukan minimal 1 warna")
                        );
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={20}>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, "name"]}
                            rules={[
                              {
                                required: true,
                                message: "Input nama warna",
                              },
                            ]}
                          >
                            <Input placeholder="Nama warna" />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, "code"]}
                            rules={[
                              {
                                required: true,
                                message: "Input kode warna",
                              },
                            ]}
                          >
                            <Row align={"middle"} gutter={10}>
                              <Col>
                                <ColorPicker
                                  value={stringHex[name]}
                                  onChange={(_, hex) => {
                                    colorChange(name, hex);
                                  }}
                                  format="hex"
                                />
                              </Col>
                              <Col>{stringHex[name]}</Col>
                              <Col>
                                <DeleteOutlined
                                  className="delete-icon"
                                  onClick={() => removeColor(name)}
                                />
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <NDButton
                        type="primary"
                        onClick={() => {
                          addColor();
                        }}
                        block
                        icon={<PlusOutlined />}
                      >
                        Tambah Warna
                      </NDButton>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Col>

            <Col span={12}>
              <Form.Item
                name="description"
                label="Deskripsi"
                rules={[
                  {
                    required: true,
                    message: "Masukan deskripsi produk",
                  },
                ]}
              >
                <NDTextEditor />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={"end"}>
            <Col>
              <Form.Item>
                <NDButton htmlType="submit" loading={loading} type="primary">
                  {params.action === "create" ? "Tambah" : "Ubah"} Produk
                </NDButton>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
