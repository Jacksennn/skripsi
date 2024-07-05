import React, { useState } from "react";
import { useGetProducts } from "./api";
import Layout from "@/components/widget/layout";
import FilterComponent from "../../components/filter-component";
import ImageCard from "@/modules/components/image-card";
import { useRouter } from "next/router";
import { detailStyle, gridStyle, layout, mainStyle } from "./styles.css";
import { Drawer, Empty, Flex, Pagination, Spin } from "antd";
import Button from "@/components/elements/button";
import { List } from "@phosphor-icons/react";
import ProductSearch from "../../product-search";

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

  const [isFilterExpand, setIsFilterExpand] = useState<boolean>(false);
  return (
    <Layout
      headerLeft={
        <Button
          shape="circle"
          icon={<List size={20} color="white" />}
          variant="white"
          onClick={() => setIsFilterExpand(true)}
        />
      }
      searchComponent={<ProductSearch />}
    >
      <Drawer
        title="Filter"
        placement={"left"}
        closable={false}
        onClose={() => setIsFilterExpand(false)}
        open={isFilterExpand}
      >
        {!!data && (
          <FilterComponent
            isLoading={isLoading}
            filters={data?.filters || []}
            onChange={(value) => {
              setFilters(value);
              setIsFilterExpand(false);
            }}
          />
        )}
      </Drawer>
      <div className={layout}>
        <div className={detailStyle.bigScreenFilter}>
          {!!data && (
            <FilterComponent
              isLoading={isLoading}
              filters={data?.filters || []}
              onChange={(value) => setFilters(value)}
            />
          )}
        </div>
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
          <div className={gridStyle}>
            {data?.data.map((item) => (
              <ImageCard
                classname={mainStyle.card}
                price={Number(item.harga_produk)}
                title={item.nama_produk}
                key={item.id}
                src={item.file?.foto_url}
                onClick={() => push(`/${item.id}`)}
              />
            ))}
          </div>
        )}
      </div>
      <Flex justify="center" style={{ marginTop: 20, paddingBottom: 20 }}>
        <Pagination
          current={page}
          total={data?.meta?.total}
          pageSize={15}
          showSizeChanger={false}
          onChange={(page) => setPage(page)}
        />
      </Flex>
    </Layout>
  );
}
