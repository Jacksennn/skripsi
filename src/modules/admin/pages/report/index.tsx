import React, { useState } from "react";
import AdminLayout from "../../components/admin-layout";
import {
  reportContainer,
  reportTabContainerStyle,
  reportTabStyle,
} from "./styles.css";
import { colors } from "@/theming/colors";
import PurchaseTab from "./components/purchase-tab";
import SalesTab from "./components/sales-tab";
import ReturTab from "./components/retur-tab";

const activeStyle = {
  backgroundColor: colors.secondary800,
  color: "white",
};
const inactiveStyle = {
  backgroundColor: "#BBBBBB",
  color: "#6B6B6B",
};

function CondtionalRender({
  fullfiled,
  children,
}: {
  fullfiled: boolean;
  children: React.ReactNode;
}) {
  if (fullfiled) return children;
  return <></>;
}

export default function ReportPage() {
  const [tab, setTab] = useState<string>("sales");
  return (
    <AdminLayout>
      <div className={reportContainer}>
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
        <CondtionalRender fullfiled={tab === "sales"}>
          <SalesTab />
        </CondtionalRender>
        <CondtionalRender fullfiled={tab === "purchase"}>
          <PurchaseTab />
        </CondtionalRender>
        <CondtionalRender fullfiled={tab === "retur"}>
          <ReturTab />
        </CondtionalRender>
      </div>
    </AdminLayout>
  );
}
