import { FilterType, MetaType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";
import { ProductRespondType } from "@/modules/admin/pages/product/api";

import { UseQueryOptions, UseQueryResult, useQuery } from "react-query";

export type ProductsRespondType = {
  id: string;
  nama_produk: string;
  harga_produk: string;
  stok_produk: number;
  sku_produk: string;
  file: {
    id: string;
    foto_produk: string;
    urutan: number;
    foto_url: string;
  };
};

export type GetProductsRespond = {
  data: ProductsRespondType[];
  meta: MetaType;
  filters: FilterType[];
};

export const useGetProducts = (
  enabled: boolean = true,
  filters?: { [key: string]: any },
  extra?: {
    onSuccess?: (data: GetProductsRespond) => void;
  },
): UseQueryResult<GetProductsRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: "produk",
        method: "GET",
        type: "user",
        params: filters,
      }),
    queryKey: ["daftar-produk-user", filters],
    enabled: enabled,
    onSuccess(data) {
      extra?.onSuccess?.(data);
    },
  });
};

export type GetProductRespond = {
  data: ProductRespondType;
};

export const useGetProduct = (
  input: {
    id: string;
  },
  options?: UseQueryOptions<GetProductRespond, unknown>,
): UseQueryResult<GetProductRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: `produk/${input.id}`,
        method: "GET",
        type: "user",
      }),
    queryKey: ["produk-user", input],
    ...options,
  });
};

export type ProductSuggestRespondType = {
  id: string;
  visibility: true;
  combinations: {
    id: string;
    harga_produk: string;
    produk: {
      id: string;
      nama_produk: string;
      harga_produk: string;
      stok_produk: number;
      sku_produk: string;
      kategori: {
        id: string;
        nama_kategori: string;
      };
      file: {
        id: string;
        foto_produk: string;
        urutan: string;
        foto_url: string;
      };
    };
  }[];
};
export const useGetProductSuggest = (
  input: {
    id: string;
  },
  options?: UseQueryOptions<{ data: ProductSuggestRespondType[] }, unknown>,
): UseQueryResult<{ data: ProductSuggestRespondType[] }, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: `produk/${input.id}/suggest`,
        method: "GET",
        type: "user",
      }),
    queryKey: ["produk-user-suggest", input],
    ...options,
  });
};
