import React from "react";
import { useDeleteSale, useGetSales } from "../../transaction/sales/api";
import { Flex, Table, notification } from "antd";
import { colors } from "@/theming/colors";
import Button from "@/components/elements/button";
import { TrashSimple } from "@phosphor-icons/react";
import { queryClient } from "@/common/query-client";
import { useRouter } from "next/router";

export default function SalesTab() {
  const [page, setPage] = React.useState<number>(1);

  const { data, isLoading } = useGetSales(
    { page },
    {
      onSuccess(data) {
        setPage(data?.meta?.current_page);
      },
    },
  );
  const { mutateAsync } = useDeleteSale();
  const { push } = useRouter();

  const onDelete = async (id: string) => {
    try {
      const res = await mutateAsync({ id });
      queryClient.refetchQueries(["daftar-penjualan"]);
      notification.success({ message: res?.message });
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };
  const tempData = React.useMemo(() => {
    if (data?.data) {
      return Object.keys(data?.data).map((key) => ({
        key: key,
        name: key,
        children: data.data[key].map((item) => ({
          ...item,
          name: item.no_pemesanan,
          produk: `${item.produk} ${
            Number(item.produk_tersembunyi)
              ? `+${item.produk_tersembunyi} more`
              : ""
          }`,
        })),
      }));
    }
    return [];
  }, [data?.data]);
  return (
    <Table
      virtual
      style={{
        fontSize: 14,
      }}
      columns={[
        {
          title: "Name",
          dataIndex: "name",
          width: 100,
        },
        {
          title: "User ID",
          dataIndex: "no_user",
          width: 100,
        },
        {
          title: "Produk",
          dataIndex: "produk",
          width: 120,
        },
        { title: "Quantity", dataIndex: "total_qty", width: 100 },
        { title: "Total", dataIndex: "total_harga", width: 100 },
        {
          title: "Delivery Status",
          dataIndex: "status_pemesanan",
          width: 100,
          render: (value) => {
            switch (value) {
              case "On Delivery":
                return (
                  <span style={{ color: colors.warning500 }}>{value}</span>
                );
              case "Packing":
                return (
                  <span style={{ color: colors.primary500 }}>{value}</span>
                );
              case "Delivered":
                return (
                  <span style={{ color: colors.success500 }}>{value}</span>
                );
              case "Cancelled":
                return <span style={{ color: colors.danger500 }}>{value}</span>;
              default:
                return (
                  <span style={{ color: colors.primary600 }}>{value}</span>
                );
            }
          },
        },
        {
          title: "Payment Status",
          dataIndex: "status_pembayaran",
          width: 100,
          render: (value) => {
            switch (value) {
              case "Unpaid":
                return (
                  <span style={{ color: colors.warning500 }}>{value}</span>
                );
              case "Refund":
                return (
                  <span style={{ color: colors.primary500 }}>{value}</span>
                );
              case "Paid":
                return (
                  <span style={{ color: colors.success500 }}>{value}</span>
                );
              case "Cancelled":
                return <span style={{ color: colors.danger500 }}>{value}</span>;
              default:
                return (
                  <span style={{ color: colors.primary600 }}>{value}</span>
                );
            }
          },
        },
        {
          title: "",
          key: "operation",
          fixed: "right",
          width: 100,
          render: (record) =>
            record?.id ? (
              <Flex gap={16}>
                <Button
                  variant="white"
                  info
                  onClick={() =>
                    push(`/admin/transaction/sales/edit/${record.id}`)
                  }
                >
                  Details
                </Button>
                <Button
                  variant="white"
                  error
                  shape={"circle"}
                  onClick={() => onDelete(record.id)}
                >
                  <TrashSimple size={22} />
                </Button>
              </Flex>
            ) : (
              <></>
            ),
        },
      ]}
      dataSource={tempData}
      rowKey={"id"}
      pagination={{
        position: ["bottomCenter"],
        current: page,
        total: data?.meta?.last_page,
        onChange(page) {
          setPage(page);
        },
      }}
      loading={isLoading}
      expandable={{
        defaultExpandAllRows: true,
      }}
    />
  );
}
