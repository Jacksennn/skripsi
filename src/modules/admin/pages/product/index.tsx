import AdminLayout from "@/modules/admin/components/admin-layout";
import React, { useState } from "react";
import { useGetProducts } from "./api";
import { Flex, Input, Pagination, Spin } from "antd";

import { useRouter } from "next/router";
import ImageCard from "@/modules/components/image-card";
import { gridStyle } from "./styles.css";
import FilterComponent from "../../components/filter-component";
import FormLayout from "../../components/form-layout";
import Button from "@/components/elements/button";
import DebounceComponent from "@/components/debounce-component";
import ProductSearch from "../../components/product-search";

export default function ProductPage() {
  const [filters, setFilters] = React.useState<{ [key: string]: any }>();
  const [page, setPage] = React.useState<number>(1);
  const { data, refetch, isLoading } = useGetProducts(
    true,
    {
      ...(filters || {}),
      page,
    },
    {
      onSuccess(data) {
        setPage(data.meta.current_page);
      },
    },
  );

  const { push } = useRouter();

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
          <ProductSearch />
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
        <Flex justify="center" style={{ marginTop: 32 }}>
          <Pagination
            current={page}
            total={data?.meta?.last_page}
            onChange={(page) => setPage(page)}
          />
        </Flex>
      </FormLayout>
    </AdminLayout>
  );
}
