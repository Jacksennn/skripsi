import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import PurchaseForm from "./form";
import AddProductModal from "../../product/add-product-modal";
import Button from "@/components/elements/button";

export default function PurchaseEdit() {
  return (
    <AdminLayout>
      <PurchaseForm />
    </AdminLayout>
  );
}
