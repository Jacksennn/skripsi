import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import AdminHeader from "../../components/admin-header";
import { useDeleteProduct, useGetProducts } from "./api";
import { notification } from "antd";

import { Router, useRouter } from "next/router";
import ImageCard from "@/modules/components/image-card";
import { gridStyle } from "./styles.css";

export default function ProductPage() {
  const { data, refetch } = useGetProducts();
  const { mutateAsync } = useDeleteProduct();
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
      <AdminHeader title="Products" onAdd={() => push("product/add")} />
      <div className={gridStyle}>
        {data?.data?.map((item) => (
          <ImageCard
            price={Number(item.harga_produk)}
            title={item.nama_produk}
            key={item.id}
            src={item.file?.foto_url}
            onClick={() => push(`/admin/product/${item.id}`)}
          />
        ))}
      </div>
    </AdminLayout>
  );
}
