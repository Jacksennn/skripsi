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

export type CreateTransactionInput = {
  carts?: string[];
  nama_awal: string;
  nama_akhir: string;
  alamat: string;
  region: string;
  city: string;
  zip_code: string;
  email: string;
  no_telp: string;
  note: string;
  jasa_kirim: string;
  shipping: number;
  id_produk?: string;
  jumlah_produk?: number;
};
export type CheckoutsRespondType = {
  id: string;
  no_pemesanan: string;
  total_amount: number;
  other_produk: number;
  status_pemesanan: string;
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
  harga_produk: string;
  jumlah_produk: number;
};

export type CheckoutRespondType = {
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

export type GetCheckoutsRespond = {
  data: CheckoutsRespondType[];
};

export type GetCheckoutRespond = { data: CheckoutRespondType };
export type getCalculationInput = {
  carts: string[];
  city: string;
  is_self_pick_up: boolean;
  id_produk: string;
  jumlah_produk: number;
};

export type CalculationRespond = {
  shipping: number;
  sub_total: number;
  total: number;
  jasa_kirim: string;
};

export const useGetCalculation = (
  input: getCalculationInput,
  enabled: boolean,
  onSettle?: (data: CalculationRespond) => void,
): UseQueryResult<{ data: CalculationRespond }, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: "transactions/calculate",
        method: "POST",
        type: "user",
        body: input,
      }),
    queryKey: ["calculation, transactions", input],

    enabled,
    onSuccess(data) {
      onSettle?.(data?.data);
    },
  });
};

export const useCreateTransaction = (): UseMutationResult<
  { message: string; invoice_url: string },
  unknown,
  CreateTransactionInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: CreateTransactionInput) =>
      await queryFetch({
        endpoint: "transactions",
        method: "POST",
        type: "user",
        body: input,
      }),
  });
};

export const useGetCheckouts = (filters?: {
  [key: string]: any;
}): UseQueryResult<GetCheckoutsRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: "transactions",
        method: "GET",
        type: "user",
        params: filters,
      }),
    queryKey: ["transactions", filters],
  });
};

export const useGetCheckout = (
  input: {
    id: string;
  },
  options?: UseQueryOptions<GetCheckoutRespond, unknown>,
): UseQueryResult<GetCheckoutRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: `transactions/${input.id}`,
        method: "GET",
        type: "user",
      }),
    queryKey: ["transaction", input],
    ...options,
  });
};
