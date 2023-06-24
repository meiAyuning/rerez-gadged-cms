import NDButton from "@/components/NDButton";
import OrderStatus from "@/components/NDOrderStatus";
import NDText from "@/components/NDText";
import NDTitle from "@/components/NDTitle";
import { formatNumber } from "@/utils";
import { Col, Image, Modal, Row, Select, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DetailOrderColumns } from "./detailOrderColumns";
import "./style.scss";
import OrderAPI from "@/api/order";

export default function DetailOrder() {
  const [data, setData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setSatus] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setData(state);
  }, []);

  const handleChangeStatus = async () => {
    try {
      await OrderAPI.updateOrderStatus({ status }, data.id);
      message.success("status changed");
      navigate("/order");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="order-detail">
      <NDTitle type="Page" level={1}>
        Detail Pesanan
      </NDTitle>
      <Row className="detail" gutter={[10, 10]}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <NDText>Status Pesanan : </NDText>
              <Space>
                <OrderStatus status={data?.status} />
                <NDButton onClick={() => setModalOpen(true)} size="small">
                  Ubah Status
                </NDButton>
              </Space>
            </Col>
            <Col span={24}>
              <NDText>Kode Pesanan : </NDText> <div>{data?.orderCode}</div>
            </Col>
            <Col span={24}>
              <NDText>Penerima : </NDText> <div>{data?.user?.username}</div>
            </Col>
            <Col span={24}>
              <NDText>Alamat : </NDText>
              <div>{data?.user?.address}</div>
            </Col>
            <Col span={24}>
              <NDText>Pembayaran : </NDText>
              <div>
                {data?.payment?.name} ({data?.payment?.accountNumber})
              </div>
            </Col>
            <Col span={24}>
              <NDText>Total Pembelian : </NDText>
              <div>Rp. {formatNumber(data?.totalPayment || 0)}</div>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <NDText>Bukti Pembayaran : </NDText>
            </Col>
            <Col>
              <Image
                width={120}
                src={
                  data?.paymentProof?.url ||
                  "https://dummyimage.com/400x400/6a58ba/ffffff&text=No+Payment+Proof+Yet"
                }
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Table
            pagination={false}
            rowKey={"id"}
            columns={DetailOrderColumns()}
            dataSource={data?.orderItem}
          />
        </Col>
      </Row>
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        title="Ubah Status"
        width={300}
        onOk={handleChangeStatus}
      >
        <div>
          <Select
            placeholder="Pilih Status"
            style={{ width: "100%" }}
            onSelect={(value) => setSatus(value)}
            options={[
              { label: "Diproses", value: "PROCESS" },
              { label: "Dikirim", value: "SEND" },
              { label: "Batal", value: "CANCEL" },
              { label: "Selesai", value: "FINISH" },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
