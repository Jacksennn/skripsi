import React from "react";
import { useGetProductsBestSeller } from "../product/api";
import AdminLayout from "../../components/admin-layout";
import FormLayout from "../../components/form-layout";
import { Flex, Pagination, Spin } from "antd";
import ProductSearch from "../../components/product-search";
import { gridStyle } from "../product/styles.css";
import ImageCard from "@/modules/components/image-card";
import { useRouter } from "next/router";

export default function DashboardDetail() {
  const [page, setPage] = React.useState<number>(1);
  const { data, isLoading } = useGetProductsBestSeller(
    true,
    {
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
      <FormLayout title="Best Seller">
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
            total={data?.meta?.total}
            onChange={(page) => setPage(page)}
          />
        </Flex>
      </FormLayout>
    </AdminLayout>
  );
}
