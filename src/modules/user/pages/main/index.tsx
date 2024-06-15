import React from "react";
import { useGetProducts } from "./api";
import Layout from "@/components/widget/layout";
import FilterComponent from "../../components/filter-component";
import ImageLiteCard from "../../components/image-lite";
import ImageCard from "@/modules/components/image-card";
import { useRouter } from "next/router";
import { gridStyle, layout } from "./styles.css";
import { Empty, Flex, Pagination, Spin } from "antd";
import { Database } from "@phosphor-icons/react";

export default function Main() {
  const [filters, setFilters] = React.useState<{ [key: string]: any }>();
  const [page, setPage] = React.useState<number>(1);

  const { data, isLoading } = useGetProducts(
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
    <Layout>
      <div className={layout}>
        {!!data && (
          <FilterComponent
            isLoading={isLoading}
            filters={data?.filters || []}
            onChange={(value) => setFilters(value)}
          />
        )}

        {!data?.data.length ? (
          isLoading ? (
            <Flex flex={1} align="center" justify="center">
              <Spin fullscreen />
            </Flex>
          ) : (
            <Flex flex={1} align="center" justify="center">
              <Empty />
            </Flex>
          )
        ) : (
          <div>
            <div className={gridStyle}>
              {data?.data.map((item) => (
                <ImageCard
                  price={Number(item.harga_produk)}
                  title={item.nama_produk}
                  key={item.id}
                  src={item.file?.foto_url}
                  onClick={() => push(`/${item.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Flex justify="center" style={{ marginTop: 20, paddingBottom: 20 }}>
        <Pagination
          current={page}
          total={data?.meta?.last_page}
          onChange={(page) => setPage(page)}
        />
      </Flex>
    </Layout>
  );
}
