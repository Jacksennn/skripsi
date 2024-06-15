import Layout from "@/components/widget/layout";
import { colors } from "@/theming/colors";
import React, { useState } from "react";
import { container, tabContainerStyle, tabStyle } from "./styles.css";
import { useGetCheckouts } from "../checkout/api";
import DebounceComponent from "@/components/debounce-component";
import BaseInput from "@/components/elements/input/base-input";
import SearchIcon from "@/components/icon/search-icon";
import { Flex, Table } from "antd";
import ImageLiteCard from "../components/image-lite";
import OrderHistoryDetail from "./detail";
import Button from "@/components/elements/button";

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

export default function OrderHistory() {
  const [tab, setTab] = useState<string>("Order Placed");
  const [search, setSearch] = React.useState<string>("");
  const { data, isLoading, isRefetching } = useGetCheckouts({
    status_pemesanan: tab,
    q: search,
  });

  return (
    <Layout>
      <div className={container}>
        <div className={tabContainerStyle} style={{ gridColumn: "1 / span 4" }}>
          <button
            type="button"
            onClick={() => setTab("Order Placed")}
            className={tabStyle}
            style={tab === "Order Placed" ? activeStyle : inactiveStyle}
          >
            Order Placed
          </button>
          <button
            type="button"
            onClick={() => setTab("Packing")}
            className={tabStyle}
            style={tab === "Packing" ? activeStyle : inactiveStyle}
          >
            Packing
          </button>
          <button
            type="button"
            onClick={() => setTab("On Delivery")}
            className={tabStyle}
            style={tab === "On Delivery" ? activeStyle : inactiveStyle}
          >
            On Delivery
          </button>

          <button
            type="button"
            onClick={() => setTab("Delivered")}
            className={tabStyle}
            style={tab === "Delivered" ? activeStyle : inactiveStyle}
          >
            Delivered
          </button>

          <button
            type="button"
            onClick={() => setTab("Cancelled")}
            className={tabStyle}
            style={tab === "Cancelled" ? activeStyle : inactiveStyle}
          >
            Cancelled
          </button>
          <button
            type="button"
            onClick={() => setTab("Retur")}
            className={tabStyle}
            style={tab === "Retur" ? activeStyle : inactiveStyle}
          >
            Retur
          </button>
        </div>
        <DebounceComponent value={search} setValue={setSearch}>
          {(value, onAfterChange) => (
            <BaseInput
              type="text"
              size="large"
              placeholder="Search for anything..."
              value={value}
              onChange={(e) => onAfterChange(e.target.value)}
              suffix={<SearchIcon size={20} />}
              noMb
              style={{
                width: "100%",
                gridColumn: "5 / span 2",
              }}
            />
          )}
        </DebounceComponent>
      </div>
      <Table
        virtual
        style={{
          fontSize: 14,
        }}
        columns={[
          {
            title: "Product",
            dataIndex: "produk",

            render: (_, record) => (
              <Flex
                justify="space-between"
                align="center"
                flex={1}
                style={{ width: "100%" }}
              >
                <ImageLiteCard
                  name={record.produk.nama_produk}
                  url={record.produk.file.foto_url}
                />

                {Number(record.other_produk)
                  ? `...+${record.other_produk} more`
                  : ""}
              </Flex>
            ),
          },

          {
            title: "Price",
            dataIndex: "harga_produk",
          },
          {
            title: "Quantity",
            dataIndex: "jumlah_produk",
          },
          {
            title: "Total Amount",
            dataIndex: "total_amount",
          },
          {
            title: "",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (record) => (
              <OrderHistoryDetail
                status={tab}
                id={record.id}
                target={(show) => (
                  <Button variant="white" info onClick={show}>
                    Details
                  </Button>
                )}
              />
            ),
          },
        ]}
        dataSource={data?.data || []}
        rowKey={"id"}
        pagination={false}
        loading={isLoading || isRefetching}
      />
    </Layout>
  );
}
