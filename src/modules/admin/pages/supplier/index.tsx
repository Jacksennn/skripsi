import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import AdminHeader from "../../components/admin-header";
import { useDeleteSupplier, useGetSuppliers } from "./api";
import { Flex, Table, notification } from "antd";
import Button from "@/components/elements/button";
import { TrashSimple } from "@phosphor-icons/react";
import NewSupplierForm from "./form";
import DebounceComponent from "@/components/debounce-component";
import BaseInput from "@/components/elements/input/base-input";
import SearchIcon from "@/components/icon/search-icon";
import FilterBySortComponent from "../../components/filter-by-sort-component";

export default function SupplierPage() {
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string>("");
  const [params, setParams] = React.useState<{ [key: string]: any }>({});

  const { data, refetch, isLoading } = useGetSuppliers(
    { page, ...params, q: search },
    {
      onSuccess(data) {
        setPage(data?.meta?.current_page);
      },
    },
  );
  const { mutateAsync } = useDeleteSupplier();

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
        title="Suppliers"
        onAdd={() => {}}
        noAdd
        right={
          <NewSupplierForm
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
            title: "ID Supplier",
            dataIndex: "no_supplier",
            width: 100,
          },
          {
            title: "Nama",
            dataIndex: "nama_supplier",
            width: 120,
          },
          {
            title: "Nomor Hp.",
            dataIndex: "notelp_supplier",
            width: 120,
          },
          {
            title: "Address",
            dataIndex: "alamat_supplier",
            width: 120,
          },
          {
            title: "",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (record) => (
              <Flex gap={16}>
                <NewSupplierForm
                  refetch={refetch}
                  id={record.id}
                  target={(show) => (
                    <Button variant="white" info onClick={show}>
                      Detil
                    </Button>
                  )}
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
