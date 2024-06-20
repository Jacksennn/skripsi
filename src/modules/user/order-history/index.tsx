import Layout from "@/components/widget/layout";
import { colors } from "@/theming/colors";
import React, { useState } from "react";
import {
  container,
  itemstyle,
  searchInput,
  tabContainerStyle,
  tabStyle,
  title,
} from "./styles.css";
import { useGetCheckouts } from "../checkout/api";
import DebounceComponent from "@/components/debounce-component";
import BaseInput from "@/components/elements/input/base-input";
import SearchIcon from "@/components/icon/search-icon";
import { Flex, Image, Spin, Table } from "antd";
import ImageLiteCard from "../components/image-lite";
import OrderHistoryDetail from "./detail";
import Button from "@/components/elements/button";
import { useRouter } from "next/router";
import Text from "@/components/elements/text";
import classNames from "classnames";

const activeStyle = {
  backgroundColor: colors.secondary800,
  color: "white",
};
const inactiveStyle = {
  backgroundColor: "#BBBBBB",
  color: "#6B6B6B",
};

export default function OrderHistory() {
  const [tab, setTab] = useState<string>("Order Placed");
  const [search, setSearch] = React.useState<string>("");
  const { data, isLoading, isRefetching } = useGetCheckouts({
    status_pemesanan: tab,
    q: search,
  });
  const { push } = useRouter();

  return (
    <Layout>
      <div style={{ paddingLeft: 16, paddingRight: 16 }}>
        <div className={container}>
          <div className={title}>
            <Text variant="bodyXl" weight="bold">
              Order History
            </Text>
          </div>
          <div className={tabContainerStyle}>
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
                className={searchInput}
              />
            )}
          </DebounceComponent>
        </div>
        <div className={itemstyle.smallScreen}>
          {isLoading || isRefetching ? (
            <Flex
              flex={1}
              align="center"
              justify="center"
              style={{ width: "100%", marginTop: 20 }}
            >
              <Spin size={"large"} />{" "}
            </Flex>
          ) : (
            <>
              {data?.data.map((cart) => (
                <div
                  className={classNames(itemstyle.container, "mb")}
                  key={cart.id}
                >
                  <Flex gap={16}>
                    <Image
                      alt="example"
                      src={cart.produk.file.foto_url}
                      width={100}
                      height={100}
                      style={{ objectFit: "contain" }}
                    />
                    <Flex vertical justify="center" gap={4} flex={1}>
                      <Flex justify="space-between" flex={1}>
                        <div>
                          <Text
                            variant="bodySmall"
                            weight="medium"
                            color="secondary500"
                          >
                            {cart.produk.sku_produk}
                          </Text>
                          <Text variant="bodySmall" weight="medium">
                            {cart.produk.nama_produk}
                          </Text>
                        </div>
                        <Flex vertical gap={8}>
                          <OrderHistoryDetail
                            status={tab}
                            id={cart.id}
                            target={(show) => (
                              <Button
                                variant="secondary"
                                onClick={show}
                                size="small"
                                style={{ borderRadius: 4 }}
                              >
                                Details
                              </Button>
                            )}
                          />
                          {tab === "Delivered" && (
                            <Button
                              variant="secondary"
                              size="small"
                              style={{ borderRadius: 4 }}
                              onClick={() => push(`/request-retur/${cart.id}`)}
                            >
                              Retur
                            </Button>
                          )}
                        </Flex>
                      </Flex>

                      <Text
                        variant="bodySmall"
                        weight="regular"
                        color="gray600"
                      >
                        {Number(cart.other_produk)
                          ? `...+${cart.other_produk} more`
                          : ""}
                      </Text>
                      <Flex gap={20} flex={1} align="center">
                        <Text
                          variant="bodySmall"
                          weight="regular"
                          color="gray600"
                        >
                          {`Qty: ${cart.jumlah_produk}`}
                        </Text>
                        <Flex vertical align="flex-end" flex={1}>
                          <Text variant="bodyTiny" weight="regular">
                            Total Amount
                          </Text>
                          <Text
                            variant="bodySmall"
                            weight="regular"
                            color="gray600"
                          >
                            {`Rp. ${cart.total_amount}`}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </div>
              ))}
            </>
          )}
        </div>
        <div className={itemstyle.tableContainer}>
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

                render: (_, record) => (
                  <Flex gap={16}>
                    <OrderHistoryDetail
                      status={tab}
                      id={record.id}
                      target={(show) => (
                        <Button variant="secondary" onClick={show}>
                          Details
                        </Button>
                      )}
                    />

                    {tab === "Delivered" && (
                      <Button
                        variant="secondary"
                        onClick={() => push(`/request-retur/${record.id}`)}
                      >
                        Retur
                      </Button>
                    )}
                  </Flex>
                ),
              },
            ]}
            dataSource={data?.data || []}
            rowKey={"id"}
            pagination={false}
            loading={isLoading || isRefetching}
          />
        </div>
      </div>
    </Layout>
  );
}
