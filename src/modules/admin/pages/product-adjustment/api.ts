import { FilterType, MetaType, SortType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";
import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";
import { ProductRespondType } from "../product/api";

export type ProductAdjustmentInput = {
  nama_adjust: string;
  alasan_adjust: string;
  details: {
    id_produk: string;
    adjustment: string;
    jumlah_produk: number;
    harga_produk: number;
  }[];
};

export type ProductAdjustmentDeleteInput = { id: string };

export type ProductAdjustmentRespondType = {
  id: string;
  nama_adjust: string;
  alasan_adjust: string;
  details: {
    id: string;
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
    harga_produk: number;
    adjustment: string;
    jumlah_produk: number;
  }[];
};

export type ProductAdjustmentsRespondType = {
  id: string;
  nama_adjust: string;
  created_at: string;
  alasan_adjust: string;
};

export type GetProductAdjustmentsRespond = {
  data: ProductAdjustmentsRespondType[];
  meta: MetaType;
  filters: FilterType[];
  sorts: SortType;
};

export type GetProductAdjustmentRespond = {
  data: ProductAdjustmentRespondType;
};

export const useGetProductAdjustments = (
  enabled: boolean = true,
  filters?: { [key: string]: any },
  extra?: {
    onSuccess?: (data: GetProductAdjustmentsRespond) => void;
  },
): UseQueryResult<GetProductAdjustmentsRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: "adjustment-produk",
        method: "GET",
        type: "admin",
        params: filters,
      }),
    queryKey: ["daftar-adjustment-produk", filters],
    enabled: enabled,
    onSuccess(data) {
      extra?.onSuccess?.(data);
    },
  });
};

export const useGetProductAdjustment = (
  input: {
    id: string;
  },
  options?: UseQueryOptions<GetProductAdjustmentRespond, unknown>,
): UseQueryResult<GetProductAdjustmentRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: `adjustment-produk/${input.id}`,
        method: "GET",
        type: "admin",
      }),
    queryKey: ["adjustment-produk", input],
    ...options,
  });
};

export const useCreateProductAdjustment = (): UseMutationResult<
  { message: string },
  unknown,
  ProductAdjustmentInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: ProductAdjustmentInput) =>
      await queryFetch({
        endpoint: "adjustment-produk",
        method: "POST",
        type: "admin",
        body: input,
      }),
  });
};

export const useEditProductAdjustment = (): UseMutationResult<
  { message: string },
  unknown,
  { data: ProductAdjustmentInput; id: string },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: { data: ProductAdjustmentInput; id: string }) =>
      await queryFetch({
        endpoint: `adjustment-produk/${input.id}`,
        method: "PUT",
        type: "admin",
        body: input.data,
      }),
  });
};

export const useDeleteProductAdjustment = (): UseMutationResult<
  { message: string },
  unknown,
  ProductAdjustmentDeleteInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: ProductAdjustmentDeleteInput) =>
      await queryFetch({
        endpoint: `adjustment-produk/${input.id}`,
        method: "Hapus",
        type: "admin",
      }),
  });
};
