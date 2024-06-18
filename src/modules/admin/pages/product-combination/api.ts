import { MetaType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";
import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

export type CombinationType = {
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
      urutan: number;
      foto_url: string;
    };
  };
};

export type ProductCombinationsRespondType = {
  id: string;
  visibility: boolean;
  combinations: CombinationType[];
};

export type ProductCombinationRespondType = {
  id: string;
  visibility: boolean;
  combinations: CombinationType[];
};

export type GetProductCombinationsRespond = {
  data: ProductCombinationsRespondType[];
  meta: MetaType;
};

export const useGetProductCombination = (
  enabled: boolean = true,
  filters?: { [key: string]: any },
  extra?: {
    onSuccess?: (data: GetProductCombinationsRespond) => void;
  },
): UseQueryResult<GetProductCombinationsRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: "product-combinations",
        method: "GET",
        type: "admin",
        params: filters,
      }),
    queryKey: ["daftar-produk-kombinasi", filters],
    enabled: enabled,
    onSuccess(data) {
      extra?.onSuccess?.(data);
    },
  });
};

export const useGetProductCombinationDetail = (
  input: {
    id: string;
  },
  options?: UseQueryOptions<{ data: ProductCombinationRespondType }, unknown>,
): UseQueryResult<{ data: ProductCombinationRespondType }, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: `product-combinations/${input.id}`,
        method: "GET",
        type: "admin",
      }),
    queryKey: ["produk-kombinasi", input],
    ...options,
  });
};

type SaveInput = {
  visibility: boolean;
  combinations: {
    id: string;
    harga_produk: number;
  }[];
};

export const useEditProductCombination = (): UseMutationResult<
  { message: string },
  unknown,
  { data: SaveInput; id: string },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: { data: SaveInput; id: string }) =>
      await queryFetch({
        endpoint: `product-combinations/${input.id}`,
        method: "PUT",
        type: "admin",
        body: input.data,
      }),
  });
};
