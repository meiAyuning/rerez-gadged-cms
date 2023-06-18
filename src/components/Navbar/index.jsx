import { Avatar, Dropdown, Space } from "antd";
import React, { useContext } from "react";
import NDTitle from "../NDTitle";
import Logo from "@/assets/images/logo-white.png";
import "./style.scss";
import { AuthenticationContext } from "@/context/authentication";

export default function Navbar() {
  const { user, logout } = useContext(AuthenticationContext);

  return (
    <nav className="navbar">
      <img className="logo" src={Logo} />

      <Dropdown
        menu={{
          items: [
            { key: 1, label: "logout", danger: true, onClick: () => logout() },
          ],
        }}
        trigger="click"
      >
        <Space align="center" style={{ cursor: "pointer" }}>
          <Avatar
            size={30}
            src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
            shape="square"
            draggable="false"
          />
          <NDTitle level={5}>{user?.username}</NDTitle>
        </Space>
      </Dropdown>
    </nav>
  );
}
