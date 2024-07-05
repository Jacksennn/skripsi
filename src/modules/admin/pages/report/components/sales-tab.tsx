import React from "react";
import {
  useDeleteSale,
  useGetSales,
  usePrintSales,
} from "../../transaction/sales/api";
import { Flex, Table, notification } from "antd";
import { colors } from "@/theming/colors";
import Button from "@/components/elements/button";
import { TrashSimple } from "@phosphor-icons/react";
import { queryClient } from "@/common/query-client";
import { useRouter } from "next/router";
import DebounceComponent from "@/components/debounce-component";
import SearchIcon from "@/components/icon/search-icon";
import BaseInput from "@/components/elements/input/base-input";
import FilterBySortComponent from "@/modules/admin/components/filter-by-sort-component";
import { formatPricing } from "@/common/price";
function blobToBase64(blob: any) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
export default function SalesTab() {
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string>("");
  const [params, setParams] = React.useState<{ [key: string]: any }>({});
  const { mutateAsync: printSales } = usePrintSales();
  const { data, isLoading } = useGetSales(
    { page, ...params, q: search },

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

  const onPrint = async (id: string) => {
    try {
      const res = await printSales(id);

      const temp = await blobToBase64(await res.blob());

      const win = window.open();
      win?.document.write(
        `
        <title>PDF</title>
        <body style="padding:0;margin:0;">
        <iframe src="
          ${temp}
          " frameborder="0" style="margin:0; border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allow="fullscreen"></iframe>
        </body>
        `,
      );
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  const onPrintMass = async () => {};

  return (
    <>
      <DebounceComponent
        value={search}
        setValue={(value) => {
          setPage(1);
          setSearch(value);
        }}
      >
        {(value, onAfterChange) => (
          <BaseInput
            type="text"
            size="large"
            placeholder="Search for anything..."
            value={value}
            onChange={(e) => onAfterChange(e.target.value)}
            suffix={<SearchIcon size={20} />}
            style={{
              width: "100%",
              gridColumn: "2 / span 3",
            }}
            noMb
          />
        )}
      </DebounceComponent>
      <div style={{ gridColumn: "5/ span 1" }}>
        <FilterBySortComponent
          isLoading={isLoading}
          onChange={(par) => setParams(par)}
          sorts={
            data?.sorts || {
              options: [],
              value: undefined,
            }
          }
        />
      </div>
      <Table
        virtual
        style={{
          fontSize: 14,
          gridColumn: "1 / span 5",
        }}
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            width: 300,
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
          {
            title: "Total",
            dataIndex: "total_harga",
            width: 100,
            render: (value) =>
              value ? formatPricing.format(Number(value || 0)) : "",
          },
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
                case "On Process":
                  return (
                    <span style={{ color: colors.primary500 }}>{value}</span>
                  );
                case "Delivered":
                case "New Orders":
                  return (
                    <span style={{ color: colors.success500 }}>{value}</span>
                  );
                case "Cancelled":
                  return (
                    <span style={{ color: colors.danger500 }}>{value}</span>
                  );
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
                  return (
                    <span style={{ color: colors.danger500 }}>{value}</span>
                  );
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
                    info
                    onClick={() => onPrint(record?.id)}
                  >
                    Print
                  </Button>
                  {/* <Button
                    variant="white"
                    error
                    shape={"circle"}
                    onClick={() => onDelete(record?.id)}
                  >
                    <TrashSimple size={22} />
                  </Button> */}
                </Flex>
              ) : (
                <></>
              ),
          },
        ]}
        dataSource={tempData}
        rowKey={"name"}
        pagination={{
          position: ["bottomCenter"],
          current: page,
          total: data?.meta.total,
          pageSize: 15,
          showSizeChanger: false,
          onChange(page) {
            setPage(page);
          },
        }}
        loading={isLoading}
      />
    </>
  );
}
