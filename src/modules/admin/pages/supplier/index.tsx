import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import AdminHeader from "../../components/admin-header";
import { useDeleteSupplier, useGetSuppliers } from "./api";
import { Flex, Table, notification } from "antd";
import Button from "@/components/elements/button";
import { TrashSimple } from "@phosphor-icons/react";
import NewSupplierForm from "./form";

export default function SupplierPage() {
  const { data, refetch } = useGetSuppliers();
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
            title: "Supplier ID",
            dataIndex: "no_supplier",
            width: 100,
          },
          {
            title: "Name",
            dataIndex: "nama_supplier",
            width: 120,
          },
          {
            title: "Phone Number",
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
                  id={record.id}
                  target={(show) => (
                    <Button variant="white" info onClick={show}>
                      Details
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
        }}
      />
    </AdminLayout>
  );
}
