import { MetaType, SortType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";
import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

export type SupplierInput = {
  no_supplier: string;
  nama_supplier: string;
  notelp_supplier: string;
  email_supplier: string;
  alamat_supplier: string;
  region: string;
  zip_code: string;
  city: string;
};

export type SupplierDeleteInput = {
  id: string;
};

export type SuppliersRespondType = {
  id: string;
  no_supplier: string;
  nama_supplier: string;
  notelp_supplier: string;
  alamat_supplier: string;
};

export type GetSuppliersRespond = {
  data: SuppliersRespondType[];
  meta: MetaType;
  sorts: SortType;
};

export type SupplierRespondType = {
  id: string;
  no_supplier: string;
  nama_supplier: string;
  notelp_supplier: string;
  alamat_supplier: string;
  email_supplier: string;
  city: string;
  zip_code: string;
  region: string;
};

export type GetSupplierRespond = {
  data: SupplierRespondType;
};

export const useGetSuppliers = (
  params: { [key: string]: any },
  extra?: UseQueryOptions<GetSuppliersRespond>,
): UseQueryResult<GetSuppliersRespond, unknown> => {
  return useQuery({
    queryFn: async (input) =>
      await queryFetch({
        endpoint: "suppliers",
        method: "GET",
        type: "admin",
        params,
      }),
    queryKey: ["suppliers", params],
    ...(extra || {}),
  });
};

export const useGetSupplier = (
  input: {
    id: string;
  },
  options?: UseQueryOptions<GetSupplierRespond, unknown>,
): UseQueryResult<GetSupplierRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: `suppliers/${input.id}`,
        method: "GET",
        type: "admin",
      }),
    queryKey: ["supplier", input],
    ...options,
  });
};

export const useCreateSupplier = (): UseMutationResult<
  { message: string },
  unknown,
  SupplierInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: SupplierInput) =>
      await queryFetch({
        endpoint: "suppliers",
        method: "POST",
        type: "admin",
        body: input,
      }),
  });
};

export const useEditSupplier = (): UseMutationResult<
  { message: string },
  unknown,
  { data: SupplierInput; id: string },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: { data: SupplierInput; id: string }) =>
      await queryFetch({
        endpoint: `suppliers/${input.id}`,
        method: "PUT",
        type: "admin",
        body: input.data,
      }),
  });
};

export const useDeleteSupplier = (): UseMutationResult<
  { message: string },
  unknown,
  SupplierDeleteInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: SupplierDeleteInput) =>
      await queryFetch({
        endpoint: `suppliers/${input.id}`,
        method: "DELETE",
        type: "admin",
      }),
  });
};
