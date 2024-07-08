import DebounceComponent from "@/components/debounce-component";
import BaseInput from "@/components/elements/input/base-input";
import { Flex, Image, Popover } from "antd";
import React, { useState } from "react";
import Text from "@/components/elements/text";
import { useDebouncedCallback } from "use-debounce";
import { productSearch } from "./styles.css";
import { useRouter } from "next/router";
import Button from "@/components/elements/button";
import { ProductsRespondType, useGetProducts } from "../pages/main/api";

export default function ProductSearch() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = React.useState<number>(1);
  const [value, setValue] = React.useState<string>("");
  const [datas, setDatas] = useState<ProductsRespondType[]>([]);

  const { push } = useRouter();
  const onAfterChange = useDebouncedCallback((value: string) => {
    setSearch(value);
    setDatas([]);
  }, 800);

  const [open, setIsOpen] = useState<boolean>(false);
  const { data, refetch, isLoading } = useGetProducts(
    !!open,
    {
      q: search,
      page,
      limit: 4,
    },
    {
      onSuccess(data) {
        setPage(data.meta.current_page);
        setDatas((prev) => [...prev, ...(data.data || [])]);
      },
    },
  );

  return (
    <Popover
      trigger={["focus"]}
      arrow={false}
      open={open}
      placement="bottomLeft"
      content={
        <div
          className={productSearch.popupContainer}
          onBlur={() => setIsOpen(false)}
        >
          {!datas.length && (
            <Text variant="bodyTiny" weight="regular" color="gray700">
              No data
            </Text>
          )}
          {!!search &&
            datas?.map((product) => (
              <div
                key={product.id}
                className={productSearch.popupItem}
                role="button"
                tabIndex={-1}
                onClick={() => {
                  push(`/${product.id}`);
                }}
              >
                <Image
                  preview={false}
                  src={product.file?.foto_url}
                  width={50}
                  height={50}
                  alt={product.nama_produk}
                ></Image>
                <div>
                  <Text
                    variant="bodyTiny"
                    weight="semiBold"
                    color="secondary500"
                  >
                    {product.sku_produk}
                  </Text>
                  <Text variant="bodySmall" weight="regular" color="gray900">
                    {product.nama_produk}
                  </Text>
                </div>
              </div>
            ))}
          {search && page > (data?.meta?.last_page || 0) && (
            <Flex flex={1} align="center" justify="center">
              <Button variant="white" info>
                Show more
              </Button>
            </Flex>
          )}
        </div>
      }
    >
      <BaseInput
        noMb
        type="text"
        placeholder="Cari produk"
        value={value}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          const val = e.target.value;
          setValue(val);
          onAfterChange(val);
        }}
      />
    </Popover>
  );
}
