import React, { PropsWithChildren } from "react";
import MyLayout from "../layout";
import { Layout } from "antd";
import NavigationBar from "../navigation-bar";
import { siderStyleClass } from "./styles.css";

const { Header, Footer, Sider, Content } = Layout;
const contentStyle: React.CSSProperties = {
  minHeight: "calc(100vh - 123px)",
  backgroundColor: "#fff",
};

const layoutStyle: React.CSSProperties = {
  minHeight: "calc(100vh - 123px)",
  paddingTop: 40,
  gap: 72,
  backgroundColor: "#fff",
};

const siderStyle: React.CSSProperties = {
  backgroundColor: "#fff",
};

export default function AdminLayout(props: PropsWithChildren) {
  return (
    <MyLayout type="admin">
      <Layout style={layoutStyle}>
        <Sider width="25%" style={siderStyle} className={siderStyleClass}>
          <NavigationBar />
        </Sider>
        <Content style={contentStyle}>Content</Content>
      </Layout>
    </MyLayout>
  );
}
