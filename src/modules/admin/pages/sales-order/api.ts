import { MetaType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";
import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

export type SalesOrderType = {
  id: string;
  no_pemesanan: string;
  "jasa_kirim ": string;
  tgl_pemesanan: string;
  details: {
    id: string;
    produk: {
      id: string;
      nama_produk: string;
      harga_produk: string;
      stok_produk: number;
      sku_produk: string;
      file: {
        id: string;
        foto_produk: string;
        urutan: string;
        foto_url: string;
      };
    };
    jumlah_produk: number;
    harga_produk: string;
    diskon_produk: string;
    total_harga: string;
  }[];
};

export type SaleOrderType = {
  id: string;
  no_pemesanan: string;
  "jasa_kirim ": string;
  tgl_pemesanan: string;
  metode_bayar: string;
  metode_bayar_xendit: string;
  details: {
    id: string;
    produk: {
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
    jumlah_produk: number;
    harga_produk: string;
    diskon_produk: string;
    total_harga: string;
  }[];
};

export type GetSalesOrderRespond = { data: SalesOrderType[]; meta: MetaType };

export const useGetSalesOrders = (filters?: {
  [key: string]: any;
}): UseQueryResult<GetSalesOrderRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: "sales-orders",
        method: "GET",
        type: "admin",
        params: filters,
      }),
    queryKey: ["sales-orders", filters],
  });
};

export const useGetSaleOrder = (
  input: {
    id: string;
  },
  options?: UseQueryOptions<{ data: SalesOrderType }, unknown>,
): UseQueryResult<{ data: SalesOrderType }, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: `sales-orders/${input.id}`,
        method: "GET",
        type: "admin",
      }),
    queryKey: ["sales-order", input],
    ...options,
  });
};

export const useAcceptSalesOrder = (): UseMutationResult<
  { message: string },
  unknown,
  { id: string },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: { id: string }) =>
      await queryFetch({
        endpoint: `sales-orders/${input.id}/accept`,
        method: "POST",
        type: "admin",
      }),
  });
};

export const useDeclineSalesOrder = (): UseMutationResult<
  { message: string },
  unknown,
  { id: string },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: { id: string }) =>
      await queryFetch({
        endpoint: `sales-orders/${input.id}/decline`,
        method: "POST",
        type: "admin",
      }),
  });
};
