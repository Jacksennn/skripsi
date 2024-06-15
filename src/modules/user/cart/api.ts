import { FilterType, MetaType, SortType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";
import { ProductRespondType } from "@/modules/admin/pages/product/api";

import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

export type AddCartInput = {
  id_produk: string;
  jumlah_produk: number;
};

export type CartsRespondType = {
  id: string;
  jumlah_produk: number;
  sub_total: number;
  produk: {
    id: string;
    nama_produk: string;
    harga_produk: number;
    stok_produk: number;
    sku_produk: string;
    file: {
      id: string;
      foto_produk: string;
      urutan: number;
      foto_url: string;
    };
  };
};

export type GetCartsRespond = {
  data: CartsRespondType[];
};

export type getCalculationInput = {
  carts: string[];
};

export type CalculationRespond = {
  discount: number;
  sub_total: number;
  total: number;
};

export const useGetCalculation = (
  input: getCalculationInput,
  enabled: boolean,
): UseQueryResult<{ data: CalculationRespond }, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: "keranjang/calculate",
        method: "POST",
        type: "user",
        body: input,
      }),
    queryKey: ["calculation", input.carts],

    enabled,
  });
};

export const useAddCart = (): UseMutationResult<
  { message: string },
  unknown,
  AddCartInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: AddCartInput) =>
      await queryFetch({
        endpoint: "keranjang",
        method: "POST",
        type: "user",
        body: input,
      }),
  });
};

export const useGetCarts = (): UseQueryResult<GetCartsRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: "keranjang",
        method: "GET",
        type: "user",
      }),
    queryKey: ["daftar-kategori"],
  });
};

export const useUpdateCart = (): UseMutationResult<
  { message: string },
  unknown,
  AddCartInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: AddCartInput) =>
      await queryFetch({
        endpoint: `keranjang/${input.id_produk}`,
        method: "PUT",
        type: "user",
        body: {
          jumlah_produk: input.jumlah_produk,
        },
      }),
  });
};
