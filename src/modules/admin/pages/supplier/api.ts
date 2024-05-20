import { MetaType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";
import {
  UseMutationResult,
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
};

export const useGetSuppliers = (): UseQueryResult<
  GetSuppliersRespond,
  unknown
> => {
  return useQuery({
    queryFn: async (input) =>
      await queryFetch({
        endpoint: "suppliers",
        method: "GET",
        type: "admin",
      }),
    queryKey: ["suppliers"],
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
