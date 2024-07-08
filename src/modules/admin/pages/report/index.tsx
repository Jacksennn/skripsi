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
import Text from "@/components/elements/text";
import { Flex } from "antd";
import Button from "@/components/elements/button";
import ExportSalesMass from "./components/sales-export-mass-modal";

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
      <Flex justify="space-between">
        <Text
          variant="bodyLarge"
          style={{ textTransform: "capitalize" }}
        >{`${tab} Transaction History`}</Text>
        {tab === "sales" && (
          <ExportSalesMass
            target={(showModal) => (
              <Button variant="primary" onClick={showModal}>
                Print
              </Button>
            )}
          ></ExportSalesMass>
        )}
      </Flex>
      <div className={reportContainer}>
        <div
          className={reportTabContainerStyle}
          style={{ gridColumn: "1 / span 1" }}
        >
          <button
            type="button"
            onClick={() => setTab("sales")}
            className={reportTabStyle}
            style={tab === "sales" ? activeStyle : inactiveStyle}
          >
            Penjualan
          </button>
          <button
            type="button"
            onClick={() => setTab("purchase")}
            className={reportTabStyle}
            style={tab === "purchase" ? activeStyle : inactiveStyle}
          >
            Pembelian
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
