import Button from "@/components/elements/button";
import Text from "@/components/elements/text";
import AdminLayout from "@/modules/admin/components/admin-layout";
import {
  ArrowUDownLeft,
  ArrowULeftDown,
  HandCoins,
  Receipt,
} from "@phosphor-icons/react";
import { Flex } from "antd";
import { useRouter } from "next/router";
import React from "react";

export default function DirectTransaction() {
  const router = useRouter();
  return (
    <AdminLayout>
      <Text variant="bodyXxl">Create a New Transaction</Text>
      <Text variant="bodyMedium" color="gray600" style={{ marginTop: 12 }}>
        Create a New Sales Invoice, Purchase Invoice, and Retur
      </Text>
      <Flex gap={20} style={{ marginTop: 30 }}>
        <Flex
          align="center"
          vertical
          gap={12}
          role="button"
          style={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/admin/transaction/sales")}
        >
          <div style={{ ...styles, backgroundColor: "#377399" }}>
            <HandCoins size={70} />
          </div>
          <Text variant="bodyMedium">Sales</Text>
        </Flex>
        <Flex
          align="center"
          vertical
          gap={12}
          role="button"
          style={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/admin/transaction/purchase")}
        >
          <div style={{ ...styles, backgroundColor: "#155782" }}>
            <Receipt size={70} />
          </div>
          <Text variant="bodyMedium">Purchase</Text>
        </Flex>
        <Flex
          align="center"
          vertical
          gap={12}
          role="button"
          style={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/admin/transaction/retur")}
        >
          <div style={{ ...styles, backgroundColor: "#124261" }}>
            <ArrowUDownLeft size={70} />
          </div>
          <Text variant="bodyMedium">Retur</Text>
        </Flex>
      </Flex>
    </AdminLayout>
  );
}

const styles: React.CSSProperties = {
  padding: 20,
  borderRadius: 10,
  color: "white",
};
