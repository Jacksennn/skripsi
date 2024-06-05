import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import AdminHeader from "../../components/admin-header";
import { useDeleteCustomer, useGetCustomers } from "./api";
import { Flex, Table, notification } from "antd";
import Button from "@/components/elements/button";
import { TrashSimple } from "@phosphor-icons/react";
import NewCustomerForm from "./form";

export default function CustomerPage() {
  const { data, refetch } = useGetCustomers();
  const { mutateAsync } = useDeleteCustomer();

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
        title="Customers"
        onAdd={() => {}}
        noAdd
        right={
          <NewCustomerForm
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
            title: "Customer ID",
            dataIndex: "no_user",
            width: 100,
          },
          {
            title: "Name",
            dataIndex: "nama_user",
            width: 120,
          },
          {
            title: "Phone Number",
            dataIndex: "notelp_user",
            width: 120,
          },
          {
            title: "Address",
            dataIndex: "alamat_user",
            width: 120,
          },
          {
            title: "",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (record) => (
              <Flex gap={16}>
                <NewCustomerForm
                  refetch={refetch}
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
