import { MetaType, SortType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";
import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";
import { ProductRespondType } from "../../product/api";

export type SaleInput = {
  id_user: string;
  tgl_pemesanan: any;
  metode_bayar: string;
  status_pemesanan: string;
  status_pembayaran: string;
  details: {
    id_produk: string;
    jumlah_produk: number;
    harga_produk: number;
    diskon_produk: number;
  }[];
};

export type SaleDeleteInput = {
  id: string;
};

export type SalesRespondType = {
  [key: string]: {
    id: string;
    no_pemesanan: string;
    no_user: string;
    produk: string;
    produk_tersembunyi: number;
    total_qty: number;
    total_harga: number;
    status_pembayaran: string;
    status_pemesanan: string;
  }[];
};

export type GetSalesRespond = {
  data: SalesRespondType;
  meta: MetaType;
  sorts: SortType;
};

export type SaleRespondType = {
  id: string;
  metode_bayar: string;
  tgl_pemesanan: string;
  status_pemesanan: string;
  status_pembayaran: string;
  user: {
    id: string;
    no_user: string;
    nama_user: string;
    notelp_user: string;
    alamat_user: string;
    email_user: string;
    region: string | null;
    city: string | null;
    zip_code: string | null;
  };
  details: {
    diskon_produk: string;
    harga_produk: string;
    id: string;
    jumlah_produk: number;
    product: ProductRespondType;
  }[];
};

export type GetSaleRespond = {
  data: SaleRespondType;
};

export const useGetSales = (
  params: { [key: string]: any },
  extra: UseQueryOptions<GetSalesRespond>,
): UseQueryResult<GetSalesRespond, unknown> => {
  return useQuery({
    queryFn: async (input) =>
      await queryFetch({
        endpoint: "penjualan",
        method: "GET",
        type: "admin",
        params,
      }),
    queryKey: ["daftar-penjualan", params],
    ...extra,
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

export const useMassPrintSales = (): UseMutationResult<
  any,
  unknown,
  { date: Date },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: { date: Date }) =>
      await queryFetch({
        endpoint: `penjualan/mass-print`,
        method: "GET",
        type: "admin",
        params: {
          date: input.date,
        },
        nojsonFormat: true,
      }),
  });
};

export const usePrintSales = (): UseMutationResult<
  any,
  unknown,
  string,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: string) =>
      await queryFetch({
        endpoint: `penjualan/${input}/print`,
        method: "GET",
        type: "admin",
        nojsonFormat: true,
      }),
  });
};
