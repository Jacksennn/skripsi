import AdminLayout from "@/modules/admin/components/admin-layout";
import React, { useState } from "react";
import AdminHeader from "../../components/admin-header";
import { useDeleteProduct, useGetProducts } from "./api";
import { Flex, Input, Spin, notification } from "antd";

import { Router, useRouter } from "next/router";
import ImageCard from "@/modules/components/image-card";
import { gridStyle } from "./styles.css";
import FilterComponent from "../../components/filter-component";
import FormLayout from "../../components/form-layout";
import Button from "@/components/elements/button";
import DebounceComponent from "@/components/debounce-component";

export default function ProductPage() {
  const [filters, setFilters] = React.useState<{ [key: string]: any }>();
  const [search, setSearch] = useState<string>("");
  const { data, refetch, isLoading } = useGetProducts(true, {
    ...(filters || {}),
    q: search,
  });

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
      <FormLayout
        title="Products"
        right={
          <Button variant="primary" onClick={() => push("product/add")}>
            ADD NEW
          </Button>
        }
      >
        <Flex gap={32} style={{ marginBottom: 32 }}>
          <DebounceComponent setValue={setSearch} value={search}>
            {(value, change) => (
              <Input
                type="text"
                placeholder="Search for product"
                value={value}
                onChange={(e) => change(e.target.value)}
              />
            )}
          </DebounceComponent>
          <FilterComponent
            isLoading={isLoading}
            filters={data?.filters || []}
            onChange={(value) => setFilters(value)}
          />
        </Flex>
        <div className={gridStyle}>
          {isLoading && (
            <Flex justify="center">
              <Spin />
            </Flex>
          )}
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
      </FormLayout>
    </AdminLayout>
  );
}
