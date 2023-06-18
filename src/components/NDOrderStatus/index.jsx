import { Tag } from "antd";
import PropTypes from "prop-types";

/**
 *
 * @typedef {import('antd').TagProps} IAntdTag
 *
 * @typedef {Object} IOrderStatus
 * @property {"PAYMENT"|"SEND"|"FINISH"|"PROCESS"|"CANCEL"} status
 *
 * @param {IAntdTag & IOrderStatus} props
 */
export default function OrderStatus({ status, ...props }) {
  const statusMap = {
    FINISH: { color: "green", label: "Selesai" },
    PROCESS: { color: "magenta", label: "Diproses" },
    CANCEL: { color: "red", label: "Batal" },
    PAYMENT: { color: "yellow", label: "Belum Bayar" },
    SEND: { color: "blue", label: "Dikirim" },
  };

  const { color, label } = statusMap[status] || { color: "", label: "" };

  return (
    <Tag color={color} {...props}>
      {label}
    </Tag>
  );
}

OrderStatus.propTypes = {
  status: PropTypes.oneOf(["PAYMENT", "SEND", "FINISH", "CANCEL"]),
};
