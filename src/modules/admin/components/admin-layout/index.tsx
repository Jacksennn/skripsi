import React, { PropsWithChildren } from "react";
import MyLayout from "@/components/widget/layout";
import { Layout } from "antd";
import { layoutStylesClass, siderStyleClass } from "./styles.css";
import NavigationBar from "@/components/widget/navigation-bar";

const { Sider, Content } = Layout;
const contentStyle: React.CSSProperties = {
  minHeight: "calc(100vh - 123px)",
  backgroundColor: "#fff",
  paddingTop: 20,
  paddingRight: 16,
};

const siderStyle: React.CSSProperties = {
  backgroundColor: "#fff",
};

export default function AdminLayout(props: PropsWithChildren) {
  return (
    <MyLayout type="admin">
      <Layout className={layoutStylesClass}>
        <Sider style={siderStyle} className={siderStyleClass} breakpoint="lg">
          <NavigationBar />
        </Sider>
        <Content style={contentStyle}>{props.children}</Content>
      </Layout>
    </MyLayout>
  );
}
