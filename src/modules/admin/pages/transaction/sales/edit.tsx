import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import SalesForm from "./form";
import { useRouter } from "next/router";
import { useGetPurchase } from "../purchase/api";
import { useGetSale } from "./api";

export default function SalesEdit() {
  const {
    query: { id },
  } = useRouter();

  const { data: respond } = useGetSale(
    {
      id: id as string,
    },
    { enabled: !!id, cacheTime: 600000 },
  );
  return (
    <AdminLayout>
      <SalesForm data={respond?.data} />
    </AdminLayout>
  );
}
