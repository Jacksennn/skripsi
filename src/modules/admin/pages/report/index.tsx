import React, { useState } from "react";
import AdminLayout from "../../components/admin-layout";
import { Flex, Tabs } from "antd";
import { reportTabContainerStyle, reportTabStyle } from "./styles.css";
import { colors } from "@/theming/colors";
import { useGetSales } from "../transaction/sales/api";
import { useGetPurchase, useGetPurchases } from "../transaction/purchase/api";

const activeStyle = {
  backgroundColor: colors.secondary800,
  color: "white",
};
const inactiveStyle = {
  backgroundColor: "#BBBBBB",
  color: "#6B6B6B",
};
export default function ReportPage() {
  const [tab, setTab] = useState<string>("sales");
  const { data } = useGetPurchases();
  console.log(Object.values(data?.data || {}));
  return (
    <AdminLayout>
      <div>
        <div className={reportTabContainerStyle}>
          <button
            type="button"
            onClick={() => setTab("sales")}
            className={reportTabStyle}
            style={tab === "sales" ? activeStyle : inactiveStyle}
          >
            Sales
          </button>
          <button
            type="button"
            onClick={() => setTab("purchase")}
            className={reportTabStyle}
            style={tab === "purchase" ? activeStyle : inactiveStyle}
          >
            Purchase
          </button>
          <button
            type="button"
            onClick={() => setTab("retur")}
            className={reportTabStyle}
            style={tab === "retur" ? activeStyle : inactiveStyle}
          >
            Retur
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
