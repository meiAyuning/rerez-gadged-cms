import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Layout } from "antd";
import "./style.scss";

export default function NDLayout({ children }) {
  const { Content, Header, Sider } = Layout;

  return (
    <Layout className="layout">
      <Header className="layout-header">
        <Navbar />
      </Header>
      <Layout>
        <Sider className="layout-sider">
          <Sidebar />
        </Sider>
        <Layout>
          <Content className="layout-content">{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
