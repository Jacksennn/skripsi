import React, { useState } from "react";
import {
  ProductCombinationsRespondType,
  useGetProductCombination,
} from "./api";
import AdminLayout from "../../components/admin-layout";
import FormLayout from "../../components/form-layout";
import DebounceComponent from "@/components/debounce-component";
import { Flex, Input, Pagination, Spin } from "antd";
import { gridStyle } from "./styles.css";
import ImageCard from "@/modules/components/image-card";
import Button from "@/components/elements/button";
import { colors } from "@/theming/colors";
import Text from "@/components/elements/text";
import ProductCombinationDetail from "./detail";

function ItemCard(props: ProductCombinationsRespondType) {
  const { combinations } = props;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 16,
        padding: 16,
        border: `1px solid ${colors.gray100}`,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          alignContent: "center",
          alignItems: "center",
          gap: 20,
        }}
      >
        {combinations.map((item, index, arr) => (
          <React.Fragment key={item.id + index}>
            <ImageCard
              price={Number(item.harga_produk)}
              title={item.produk.nama_produk}
              key={item.id}
              src={item.produk.file.foto_url}
              onClick={() => {}}
            />
            {!index && index !== arr.length && (
              <Text variant="heading01" color={"danger400"}>
                +
              </Text>
            )}
          </React.Fragment>
        ))}
      </div>
      <ProductCombinationDetail
        target={(showModal) => (
          <Button onClick={() => showModal()}>Detil</Button>
        )}
        id={props.id}
      ></ProductCombinationDetail>
    </div>
  );
}
export default function ProductCombination() {
  const [search, setSearch] = useState<string>("");

  const [page, setPage] = React.useState<number>(1);

  const { data, isLoading } = useGetProductCombination(
    true,
    {
      q: search,
      page,
    },
    {
      onSuccess(data) {
        setPage(data.meta.current_page);
      },
    },
  );

  return (
    <AdminLayout>
      <FormLayout title="Product Combination">
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
        <div className={gridStyle} style={{ marginTop: 32 }}>
          {isLoading && (
            <Flex justify="center">
              <Spin />
            </Flex>
          )}
          {data?.data?.map((item) => (
            <ItemCard {...item} key={item.id} />
          ))}
        </div>
        <Flex justify="center" style={{ marginTop: 32 }}>
          <Pagination
            current={page}
            pageSize={15}
            showSizeChanger={false}
            total={data?.meta?.total}
            onChange={(page) => setPage(page)}
          />
        </Flex>
      </FormLayout>
    </AdminLayout>
  );
}
