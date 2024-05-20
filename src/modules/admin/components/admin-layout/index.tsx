import React, { PropsWithChildren } from "react";
import MyLayout from "@/components/widget/layout";
import { Layout } from "antd";
import { siderStyleClass } from "./styles.css";
import NavigationBar from "@/components/widget/navigation-bar";

const { Sider, Content } = Layout;
const contentStyle: React.CSSProperties = {
  minHeight: "calc(100vh - 123px)",
  backgroundColor: "#fff",
  paddingTop: 20,
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
        <Sider width="20%" style={siderStyle} className={siderStyleClass}>
          <NavigationBar />
        </Sider>
        <Content style={contentStyle}>{props.children}</Content>
      </Layout>
    </MyLayout>
  );
}
