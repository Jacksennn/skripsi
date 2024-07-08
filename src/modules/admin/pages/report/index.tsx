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
  const [tab, setTab] = useState<string>("penjualan");
  return (
    <AdminLayout>
      <Flex justify="space-between">
        <Text
          variant="bodyLarge"
          style={{ textTransform: "capitalize" }}
        >{`History Transaksi ${tab}`}</Text>
        {tab === "penjualan" && (
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
            onClick={() => setTab("penjualan")}
            className={reportTabStyle}
            style={tab === "penjualan" ? activeStyle : inactiveStyle}
          >
            Penjualan
          </button>
          <button
            type="button"
            onClick={() => setTab("pembelian")}
            className={reportTabStyle}
            style={tab === "pembelian" ? activeStyle : inactiveStyle}
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
        <CondtionalRender fullfiled={tab === "penjualan"}>
          <SalesTab />
        </CondtionalRender>
        <CondtionalRender fullfiled={tab === "pembelian"}>
          <PurchaseTab />
        </CondtionalRender>
        <CondtionalRender fullfiled={tab === "retur"}>
          <ReturTab />
        </CondtionalRender>
      </div>
    </AdminLayout>
  );
}
