import React from "react";
import { useDeleteRetur, useGetReturs } from "../../transaction/retur/api";
import { Flex, Table, notification } from "antd";
import { colors } from "@/theming/colors";
import Button from "@/components/elements/button";
import { TrashSimple } from "@phosphor-icons/react";
import { queryClient } from "@/common/query-client";
import { useRouter } from "next/router";
import DebounceComponent from "@/components/debounce-component";
import BaseInput from "@/components/elements/input/base-input";
import SearchIcon from "@/components/icon/search-icon";
import FilterBySortComponent from "@/modules/admin/components/filter-by-sort-component";

export default function ReturTab() {
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string>("");
  const [params, setParams] = React.useState<{ [key: string]: any }>({});
  const { data, isLoading } = useGetReturs(
    { page, ...params, q: search },
    {
      onSuccess(data) {
        setPage(data?.meta?.current_page);
      },
    },
  );

  const { mutateAsync } = useDeleteRetur();

  const onDelete = async (id: string) => {
    try {
      const res = await mutateAsync({ id });
      queryClient.refetchQueries(["daftar-retur"]);
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
          name: item.no_retur,
        })),
      }));
    }
    return [];
  }, [data?.data]);

  const { push } = useRouter();
  return (
    <>
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
              gridColumn: "2 / span 3",
            }}
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
            title: "Retur ID",
            dataIndex: "name",
            width: 300,
          },
          {
            title: "Order ID",
            dataIndex: "no_pemesanan",
            width: 100,
          },
          {
            title: "Produk",
            dataIndex: "produk",
            width: 120,
          },
          { title: "Quantity", dataIndex: "total_qty", width: 100 },
          { title: "Total", dataIndex: "total", width: 120 },
          {
            title: "Status",
            dataIndex: "status",
            width: 100,
            render: (value) => {
              switch (value) {
                case "Pending":
                  return (
                    <span style={{ color: colors.warning500 }}>{value}</span>
                  );
                case "Completed":
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
            width: 100,
            render: (record) =>
              record?.id ? (
                <Flex gap={16}>
                  <Button
                    variant="white"
                    info
                    onClick={() =>
                      push(`/admin/transaction/retur/edit/${record.id}`)
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
    </>
  );
}