import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import AdminHeader from "../../components/admin-header";
import { useDeleteCategory, useGetCategories } from "./api";
import { Flex, Table, notification } from "antd";
import Button from "@/components/elements/button";
import { TrashSimple } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import CategoryForm from "./form";

export default function CategoryPage() {
  const { data, refetch } = useGetCategories();
  const { mutateAsync } = useDeleteCategory();
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
        title="Categories"
        onAdd={() => {}}
        noAdd
        right={
          <CategoryForm
            refetch={refetch}
            target={(showModal) => (
              <Button variant="primary" onClick={showModal}>
                ADD NEW
              </Button>
            )}
          />
        }
      />
      <Table
        virtual
        columns={[
          {
            title: "Category ID",
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
                <CategoryForm
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
        }}
      />
    </AdminLayout>
  );
}
