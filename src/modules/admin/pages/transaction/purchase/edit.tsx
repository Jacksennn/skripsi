import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import PurchaseForm from "./form";
import { useRouter } from "next/router";
import { useGetPurchase } from "./api";

export default function PurchaseEdit() {
  const {
    query: { id },
  } = useRouter();

  const { data: respond, refetch } = useGetPurchase(
    {
      id: id as string,
    },
    { enabled: !!id, cacheTime: 600000 },
  );
  return (
    <AdminLayout>
      <PurchaseForm data={respond?.data} />
    </AdminLayout>
  );
}
