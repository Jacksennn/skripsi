import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import AdminHeader from "../../components/admin-header";
import { useDeleteProductAdjustment, useGetProductAdjustments } from "./api";
import { Flex, Table, notification } from "antd";
import Button from "@/components/elements/button";
import { TrashSimple } from "@phosphor-icons/react";
import { useRouter } from "next/router";
// import CategoryForm from "./form";
import FilterBySortComponent from "../../components/filter-by-sort-component";
import DebounceComponent from "@/components/debounce-component";
import BaseInput from "@/components/elements/input/base-input";
import SearchIcon from "@/components/icon/search-icon";
import ProductAdjustmentForm from "./form";
import dayjs from "dayjs";

export default function ProductAdjustmentPage() {
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string>("");
  const [params, setParams] = React.useState<{ [key: string]: any }>({});
  const { data, refetch, isLoading } = useGetProductAdjustments(
    true,
    { page, ...params, q: search },
    {
      onSuccess(data) {
        setPage(data?.meta?.current_page);
      },
    },
  );
  const { mutateAsync } = useDeleteProductAdjustment();
  const { push } = useRouter();

  const onDelete = async (id: string) => {
    try {
      const res = await mutateAsync({ id });
      refetch();
      notification.success({ message: res?.message });
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  return (
    <AdminLayout>
      <AdminHeader
        title="Product Adjustment"
        onAdd={() => {}}
        noAdd
        right={
          <ProductAdjustmentForm
            refetch={refetch}
            target={(showModal) => (
              <Button variant="primary" onClick={showModal}>
                ADD NEW
              </Button>
            )}
          />
        }
      />
      <Flex style={{ marginBottom: 20 }} gap={32}>
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
            />
          )}
        </DebounceComponent>
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
      </Flex>
      <Table
        virtual
        columns={[
          {
            title: "Name",
            dataIndex: "nama_adjust",
            width: 120,
          },
          {
            title: "Reason",
            dataIndex: "alasan_adjust",
            width: 200,
          },
          {
            title: "Date Created",
            dataIndex: "created_at",
            width: 200,
            render: (record) => dayjs(record).format("DD/MM/YYYY"),
          },
          {
            title: "",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (record) => (
              <Flex gap={16}>
                <ProductAdjustmentForm
                  id={record.id}
                  target={(show) => (
                    <Button variant="white" info onClick={show}>
                      Details
                    </Button>
                  )}
                  refetch={refetch}
                />
                <Button
                  variant="white"
                  error
                  shape={"circle"}
                  onClick={() => onDelete(record.id)}
                >
                  <TrashSimple size={22} />
                </Button>
              </Flex>
            ),
          },
        ]}
        dataSource={data?.data}
        pagination={{
          position: ["bottomCenter"],
          current: page,
          total: data?.meta?.last_page,
          onChange(page) {
            setPage(page);
          },
        }}
      />
    </AdminLayout>
  );
}
