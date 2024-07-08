import { colors } from "@/theming/colors";
import React, { useState } from "react";
import {
  useAcceptSalesOrder,
  useDeclineSalesOrder,
  useGetSalesOrders,
} from "./api";
import Layout from "@/components/widget/layout";
import { container, tabContainerStyle, tabStyle } from "./styles.css";
import DebounceComponent from "@/components/debounce-component";
import BaseInput from "@/components/elements/input/base-input";
import SearchIcon from "@/components/icon/search-icon";
import { Flex, Pagination, Table, message, notification } from "antd";
import AdminLayout from "../../components/admin-layout";
import dayjs from "dayjs";
import SalesOrderDetail from "./detail";
import Button from "@/components/elements/button";

const activeStyle = {
  backgroundColor: colors.secondary800,
  color: "white",
};
const inactiveStyle = {
  backgroundColor: "#BBBBBB",
  color: "#6B6B6B",
};

export default function SalesOrderPage() {
  const [tab, setTab] = useState<string>("New Orders");
  const [page, setPage] = React.useState<number>(1);

  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isRefetching, refetch } = useGetSalesOrders(
    {
      status_pemesanan: tab,
      q: search,
    },
    {
      onSuccess(data) {
        setPage(data.meta.current_page);
      },
    },
  );

  const { mutateAsync: declineMutate } = useDeclineSalesOrder();
  const { mutateAsync: acceptMutate } = useAcceptSalesOrder();

  const onAction = async (id: string, action: "decline" | "accept") => {
    try {
      message.info("action in progress");
      const res =
        action === "decline"
          ? await declineMutate({ id })
          : await acceptMutate({ id });
      notification.success({ message: res.message });
      refetch();
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };
  return (
    <AdminLayout>
      <div className={container}>
        <div className={tabContainerStyle} style={{ gridColumn: "1 / span 4" }}>
          <button
            type="button"
            onClick={() => setTab("New Orders")}
            className={tabStyle}
            style={tab === "New Orders" ? activeStyle : inactiveStyle}
          >
            New Orders
          </button>
          <button
            type="button"
            onClick={() => setTab("On Process")}
            className={tabStyle}
            style={tab === "On Process" ? activeStyle : inactiveStyle}
          >
            On Process
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
            Completed
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
        <DebounceComponent
          value={search}
          setValue={(value) => {
            setSearch(value);
          }}
        >
          {(value, onAfterChange) => (
            <BaseInput
              type="text"
              size="large"
              placeholder="Cari...."
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
            title: "ID Pemesanan",
            dataIndex: "no_pemesanan",
          },

          {
            title: "User ID",
            dataIndex: "no_user",
          },
          {
            title: "Total",
            dataIndex: "total_amount",
          },
          {
            title: "Order Date",
            dataIndex: "tgl_pemesanan",
            render: (_, record) =>
              dayjs(new Date(record.tgl_pemesanan), { utc: false }).format(
                "DD/MM/YYYY",
              ),
          },
          {
            title: "",
            key: "operation",
            width: 100,
            render: (record) => (
              <SalesOrderDetail
                status={tab}
                id={record.id}
                target={(show) => (
                  <Button variant="white" info onClick={show}>
                    Detil
                  </Button>
                )}
              />
            ),
          },
          ...(tab === "New Orders"
            ? ([
                {
                  title: "",
                  key: "action",
                  fixed: "right",
                  width: 300,
                  render: (_: any, record: any) => (
                    <Flex gap={16}>
                      <Button
                        variant="secondary"
                        error
                        onClick={() => onAction(record.id, "decline")}
                      >
                        Decline
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => onAction(record.id, "accept")}
                      >
                        ACCEPT
                      </Button>
                    </Flex>
                  ),
                },
              ] as any)
            : []),
        ]}
        dataSource={data?.data || []}
        rowKey={"id"}
        pagination={false}
        loading={isLoading || isRefetching}
      />
      <Flex justify="center" style={{ marginTop: 20, paddingBottom: 20 }}>
        <Pagination
          current={page}
          pageSize={15}
          showSizeChanger={false}
          total={data?.meta?.total}
          onChange={(page) => setPage(page)}
        />
      </Flex>
    </AdminLayout>
  );
}
