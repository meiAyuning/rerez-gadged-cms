import {
  AppleOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  DollarOutlined,
  InboxOutlined,
  PictureOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Dashboard", "/dashboard", <DashboardOutlined />),
  getItem("Konten", "/content", <PictureOutlined />, [
    getItem("Banner", "/content/banner"),
    getItem("Promo", "/content/promo"),
    getItem("Feature", "/content/feature"),
    getItem("Footer", "/content/footer"),
  ]),
  getItem("Produk", "/product", <InboxOutlined />),
  getItem("Pesanan", "/order", <ShoppingOutlined />),
  getItem("Master", "Sub1", <DatabaseOutlined />, [
    getItem("Brand", "/brand", <AppleOutlined />),
    getItem("Pembayaran", "/payment", <DollarOutlined />),
  ]),
];

export default function Sidebar() {
  const [selected, setSelected] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = location;

  const handleClick = ({ key }) => {
    if (pathname === key) return;
    setSelected(pathname);
    navigate(key);
  };

  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  return (
    <Menu
      selectedKeys={selected}
      onClick={handleClick}
      className="sidebar"
      items={items}
      mode="inline"
    />
  );
}
