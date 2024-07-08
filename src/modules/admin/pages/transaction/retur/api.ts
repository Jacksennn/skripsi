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
import { CustomerRespondType } from "../../customer/api";

export type ReturInput = {
  id_jual: string;
  id_user: string;
  tgl_retur: any;
  alasan_retur: string;
  status_retur: string;
  details: {
    id_detailjual: string;
    jumlah_produk: number;
  }[];
};

export type ReturDeleteInput = {
  id: string;
};

export type RetursRespondType = {
  [key: string]: {
    id: string;
    no_retur: string;
    no_pemesanan: string;
    produk: string;
    status: string;
    total_qty: number;
    total: number;
  }[];
};

export type GetRetursRespond = {
  data: RetursRespondType;
  meta: MetaType;
  sorts: SortType;
};

export type ReturRespondType = {
  id: string;
  id_jual: string;
  no_retur: string;
  user: CustomerRespondType;
  no_pemesanan: string;
  tgl_retur: Date;
  alasan_retur: string;
  status_retur: string;
  details: {
    id: string;
    id_detailjual: string;
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
      file: null;
    };
    jumlah_produk: 1;
    harga_produk: string;
    diskon_produk: string;
    total_harga: string;
  }[];
};

export type GetReturRespond = {
  data: ReturRespondType;
};

export const useGetReturs = (
  params: { [key: string]: any },
  extra: UseQueryOptions<GetRetursRespond>,
): UseQueryResult<GetRetursRespond, unknown> => {
  return useQuery({
    queryFn: async (input) =>
      await queryFetch({
        endpoint: "retur",
        method: "GET",
        type: "admin",
        params,
      }),
    queryKey: ["daftar-retur", params],
    ...extra,
  });
};

export const useGetRetur = (
  input: {
    id: string;
  },
  options?: UseQueryOptions<GetReturRespond, unknown>,
): UseQueryResult<GetReturRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: `retur/${input.id}`,
        method: "GET",
        type: "admin",
      }),
    queryKey: ["retur", input],
    ...options,
  });
};

export const useCreateRetur = (): UseMutationResult<
  { message: string },
  unknown,
  ReturInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: ReturInput) =>
      await queryFetch({
        endpoint: "retur",
        method: "POST",
        type: "admin",
        body: input,
      }),
  });
};

export const useEditRetur = (): UseMutationResult<
  { message: string },
  unknown,
  { data: ReturInput; id: string },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: { data: ReturInput; id: string }) =>
      await queryFetch({
        endpoint: `retur/${input.id}`,
        method: "PUT",
        type: "admin",
        body: input.data,
      }),
  });
};

export const useDeleteRetur = (): UseMutationResult<
  { message: string },
  unknown,
  ReturDeleteInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: ReturDeleteInput) =>
      await queryFetch({
        endpoint: `retur/${input.id}`,
        method: "Hapus",
        type: "admin",
      }),
  });
};
