import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import ReturForm from "./form";
import { useRouter } from "next/router";
import { useGetRetur } from "./api";

export default function ReturEdit() {
  const {
    query: { id },
  } = useRouter();

  const { data: respond, refetch } = useGetRetur(
    {
      id: id as string,
    },
    { enabled: !!id, cacheTime: 600000 },
  );

  return (
    <AdminLayout>
      <ReturForm data={respond?.data} />
    </AdminLayout>
  );
}
