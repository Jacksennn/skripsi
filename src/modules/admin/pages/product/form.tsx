import React from "react";
import { ProductRespondType } from "./api";
import ProductSubForm from "./sub-form";
import AdminLayout from "../../components/admin-layout";
import ImageUpload from "./upload-image";

interface Props {
  id?: string;
}

export default function ProductForm(props: Props) {
  return (
    <AdminLayout>
      <ImageUpload />
      <ProductSubForm />
    </AdminLayout>
  );
}
