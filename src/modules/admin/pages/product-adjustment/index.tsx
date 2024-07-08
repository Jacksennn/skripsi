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
        title="Penyesuaian Produk"
        onAdd={() => {}}
        noAdd
        right={
          <ProductAdjustmentForm
            refetch={refetch}
            target={(showModal) => (
              <Button variant="primary" onClick={showModal}>
                Tambah
              </Button>
            )}
          />
        }
      />
      <Flex style={{ marginBottom: 20 }} gap={32}>
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
              placeholder="Cari...."
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
            title: "Nama",
            dataIndex: "nama_adjust",
            width: 120,
          },
          {
            title: "Alasan",
            dataIndex: "alasan_adjust",
            width: 200,
          },
          {
            title: "Tanggal Dibuat",
            dataIndex: "created_at",
            width: 200,
            render: (record) =>
              dayjs(new Date(record), { utc: false }).format("DD/MM/YYYY"),
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
                      Detil
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
          total: data?.meta?.total,
          pageSize: 15,
          showSizeChanger: false,
          onChange(page) {
            setPage(page);
          },
        }}
      />
    </AdminLayout>
  );
}
