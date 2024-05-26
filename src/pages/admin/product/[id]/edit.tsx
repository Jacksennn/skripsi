import AdminLayout from "@/modules/admin/components/admin-layout";
import { useGetProduct } from "@/modules/admin/pages/product/api";
import ProductSubForm from "@/modules/admin/pages/product/sub-form";
import { useRouter } from "next/router";
import React from "react";

export default function ProductViewWithID() {
  const {
    query: { id },
  } = useRouter();

  const { data: respond, refetch } = useGetProduct(
    {
      id: id as string,
    },
    { enabled: !!id, cacheTime: 600000 },
  );

  return (
    <AdminLayout>
      <ProductSubForm product={respond?.data} />
    </AdminLayout>
  );
}
