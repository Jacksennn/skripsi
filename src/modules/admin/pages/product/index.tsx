import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import AdminHeader from "../../components/admin-header";
import { useDeleteProduct, useGetProducts } from "./api";
import { Flex, Table, notification } from "antd";
import Button from "@/components/elements/button";
import { TrashSimple } from "@phosphor-icons/react";
import { Router, useRouter } from "next/router";

export default function ProductPage() {
  const { data, refetch } = useGetProducts();
  const { mutateAsync } = useDeleteProduct();
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
      <AdminHeader title="Products" onAdd={() => push("product/add")} />
      <Table
        virtual
        columns={[
          {
            title: "Product ID",
            dataIndex: "id",
            width: 80,
            render: (a, _, index) => {
              return <>{index + 1}</>;
            },
          },
          {
            title: "Name",
            dataIndex: "nama_kategori",
            width: 120,
          },

          {
            title: "",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (record) => (
              <Flex gap={16}>
                <Button
                  variant="white"
                  info
                  onClick={() => push(`product/${record.id}`)}
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
            ),
          },
        ]}
        dataSource={data?.data}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
    </AdminLayout>
  );
}
