import NDTitle from "@/components/NDTitle";
import {
  Button,
  Col,
  ColorPicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
  Upload,
} from "antd";
import React, { useState } from "react";
import "./style.scss";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import NDButton from "@/components/NDButton";
import NDText from "@/components/NDText";

export default function ProductAction() {
  const [form] = Form.useForm();
  const [stringHex, setStringHex] = useState([]);
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-xxx",
      percent: 50,
      name: "image.png",
      status: "uploading",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-5",
      name: "image.png",
      status: "error",
    },
  ]);

  const colorChange = (name, hex) => {
    const colors = form.getFieldValue("colors") || [];
    colors[name].color_code = hex;
    stringHex[name] = hex;
    setStringHex([...stringHex]);
    form.setFieldValue("colors", colors);
  };

  const addColor = () => {
    const colors = form.getFieldValue("colors") || [];
    colors.push({ color_name: "", color_code: "#1677FF" });
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

  return (
    <div className="product-action">
      <NDTitle type="Page" level={1}>
        Tambah Produk
      </NDTitle>
      <div className="form-container">
        <Form
          requiredMark={false}
          layout="vertical"
          form={form}
          onFinish={(values) => console.log(values.colors)}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="Foto Produk">
                <Upload fileList={fileList} listType="picture-card">
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
                <Select options={[{ value: "1", label: "Samsung" }]} />
              </Form.Item>
            </Col>
            <Col span={12} className="form-dynamic">
              <NDText>Varian</NDText>
              <Form.List
                name="variant"
                rules={[
                  {
                    validator: async (_, variant) => {
                      console.log(variant);
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
                                name={[name, "variant_name"]}
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
                                name={[name, "variant_price"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Input harga",
                                  },
                                ]}
                              >
                                <Input placeholder="Harga" />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, "variant_stock"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Input stok",
                                  },
                                ]}
                              >
                                <Input placeholder="Stok" />
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
            </Col>
            <Col span={12} className="form-dynamic">
              <NDText>Warna</NDText>
              <Form.List
                name="colors"
                rules={[
                  {
                    validator: async (_, colors) => {
                      console.log(_);
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
                            name={[name, "color_name"]}
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
                            name={[name, "color_code"]}
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

            <Col>
              <NDButton htmlType="submit" type="primary">
                Simpan
              </NDButton>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
