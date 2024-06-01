import { MetaType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";
import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

export type SaleInput = {
  id_user: string;
  tgl_pemesanan: Date;
  metode_bayar: string;
  status_pemesanan: string;
  status_pembayaran: string;
  details: {
    id_produk: string;
    jumlah_produk: string;
    harga_produk: string;
    diskon_produk: string;
  }[];
};

export type SaleDeleteInput = {
  id: string;
};

export type SalesRespondType = {
  id: string;
};

export type GetSalesRespond = {
  data: SalesRespondType[];
  meta: MetaType;
};

export type SaleRespondType = {
  id: string;
};

export type GetSaleRespond = {
  data: SalesRespondType;
};

export const useGetSales = (): UseQueryResult<GetSalesRespond, unknown> => {
  return useQuery({
    queryFn: async (input) =>
      await queryFetch({
        endpoint: "penjualan",
        method: "GET",
        type: "admin",
      }),
    queryKey: ["daftar-penjualan"],
  });
};

export const useGetSale = (
  input: {
    id: string;
  },
  options?: UseQueryOptions<GetSaleRespond, unknown>,
): UseQueryResult<GetSaleRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: `penjualan/${input.id}`,
        method: "GET",
        type: "admin",
      }),
    queryKey: ["penjualan", input],
    ...options,
  });
};

export const useCreateSale = (): UseMutationResult<
  { message: string },
  unknown,
  SaleInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: SaleInput) =>
      await queryFetch({
        endpoint: "penjualan",
        method: "POST",
        type: "admin",
        body: input,
      }),
  });
};

export const useEditSale = (): UseMutationResult<
  { message: string },
  unknown,
  { data: SaleInput; id: string },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: { data: SaleInput; id: string }) =>
      await queryFetch({
        endpoint: `penjualan/${input.id}`,
        method: "PUT",
        type: "admin",
        body: input.data,
      }),
  });
};

export const useDeleteSale = (): UseMutationResult<
  { message: string },
  unknown,
  SaleDeleteInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: SaleDeleteInput) =>
      await queryFetch({
        endpoint: `penjualan/${input.id}`,
        method: "DELETE",
        type: "admin",
      }),
  });
};
