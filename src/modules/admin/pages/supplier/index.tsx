import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import AdminHeader from "../../components/admin-header";
import AdminModal from "../../components/admin-modal";
import Button from "@/components/elements/button";
import Form from "./form";
import { useGetSuppliers } from "./api";

export default function SupplierPage() {
  const { data } = useGetSuppliers();
  console.log(data?.data);
  return (
    <AdminLayout>
      <AdminHeader title="Suppliers" onAdd={() => {}} noAdd right={<Form />} />
    </AdminLayout>
  );
}
