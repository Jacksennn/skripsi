import { MetaType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";
import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

export type PurchaseInput = {
  id_supplier: string;
  tgl_pembelian: string;
  payment_method: string;
  status_pembelian: string;
  details: {
    id_produk: string;
    jumlah_produk: string;
    harga_produk: string;
    diskon_produk: string;
  }[];
};

export type PurchaseDeleteInput = {
  id: string;
};

export type PurchasesRespondType = {
  id: string;
};

export type GetPurchasesRespond = {
  data: PurchaseRespondType[];
  meta: MetaType;
};

export type PurchaseRespondType = {
  id: string;
};

export type GetPurchaseRespond = {
  data: PurchaseRespondType;
};

export const useGetPurchases = (): UseQueryResult<
  GetPurchasesRespond,
  unknown
> => {
  return useQuery({
    queryFn: async (input) =>
      await queryFetch({
        endpoint: "pembelian",
        method: "GET",
        type: "admin",
      }),
    queryKey: ["daftar-pembelian"],
  });
};

export const useGetPurchase = (
  input: {
    id: string;
  },
  options?: UseQueryOptions<GetPurchaseRespond, unknown>,
): UseQueryResult<GetPurchaseRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: `pembelian/${input.id}`,
        method: "GET",
        type: "admin",
      }),
    queryKey: ["pembelian", input],
    ...options,
  });
};

export const useCreatePurchase = (): UseMutationResult<
  { message: string },
  unknown,
  PurchaseInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: PurchaseInput) =>
      await queryFetch({
        endpoint: "pembelian",
        method: "POST",
        type: "admin",
        body: input,
      }),
  });
};

export const useEditPurchase = (): UseMutationResult<
  { message: string },
  unknown,
  { data: PurchaseInput; id: string },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: { data: PurchaseInput; id: string }) =>
      await queryFetch({
        endpoint: `pembelian/${input.id}`,
        method: "PUT",
        type: "admin",
        body: input.data,
      }),
  });
};

export const useDeletePurchase = (): UseMutationResult<
  { message: string },
  unknown,
  PurchaseDeleteInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: PurchaseDeleteInput) =>
      await queryFetch({
        endpoint: `pembelian/${input.id}`,
        method: "DELETE",
        type: "admin",
      }),
  });
};
