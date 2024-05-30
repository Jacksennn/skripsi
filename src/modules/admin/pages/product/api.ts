import { MetaType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";
import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";
import { CategoryRespondType } from "../category/api";

export type ProductInput = {
  id_kategori: string;
  sku_produk: string;
  nama_produk: string;
  harga_produk: number;
  ket_produk: string;
  min_produk: number;
  visibility: boolean;
  files: {
    foto_produk: string;
    urutan: number;
  }[];
};

export type ProductDeleteInput = {
  id: string;
};

export type ProductsRespondType = {
  id: string;
  nama_produk: string;
  harga_produk: string;
  kategori: CategoryRespondType;
  stok_produk: number;
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
};

export type ProductRespondType = {
  id: string;
  nama_produk: string;
  sku_produk: string;
  kategori: CategoryRespondType;
  harga_produk: string;
  stok_produk: number;
  ket_produk: string;
  min_produk: number;
  visibility: boolean;
  files: {
    id: string;
    foto_produk: string;
    urutan: number;
    foto_url: string;
  }[];
};

export type GetProductRespond = {
  data: ProductRespondType;
};

export const useGetProducts = (
  enabled: boolean = true,
): UseQueryResult<GetProductsRespond, unknown> => {
  return useQuery({
    queryFn: async (input) =>
      await queryFetch({
        endpoint: "produk",
        method: "GET",
        type: "admin",
      }),
    queryKey: ["daftar-produk"],
    enabled: enabled,
  });
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
        type: "admin",
      }),
    queryKey: ["produk", input],
    ...options,
  });
};

export const useCreateProduct = (): UseMutationResult<
  { message: string },
  unknown,
  ProductInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: ProductInput) =>
      await queryFetch({
        endpoint: "produk",
        method: "POST",
        type: "admin",
        body: input,
      }),
  });
};

export const useEditProduct = (): UseMutationResult<
  { message: string },
  unknown,
  { data: ProductInput; id: string },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: { data: ProductInput; id: string }) =>
      await queryFetch({
        endpoint: `produk/${input.id}`,
        method: "PUT",
        type: "admin",
        body: input.data,
      }),
  });
};

export const useDeleteProduct = (): UseMutationResult<
  { message: string },
  unknown,
  ProductDeleteInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: ProductDeleteInput) =>
      await queryFetch({
        endpoint: `produk/${input.id}`,
        method: "DELETE",
        type: "admin",
      }),
  });
};
