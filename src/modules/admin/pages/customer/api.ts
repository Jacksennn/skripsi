import { MetaType, SortType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";
import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

export type CustomerInput = {
  no_user: string;
  nama_user: string;
  notelp_user: string;
  email_user: string;
  alamat_user: string;
  region: string;
  zip_code: string;
  city: string;
  password: string | null;
};

export type CustomerDeleteInput = {
  id: string;
};

export type CustomersRespondType = {
  id: string;
  no_user: string;
  nama_user: string;
  notelp_user: string;
  alamat_user: string;
};

export type GetCustomersRespond = {
  data: CustomersRespondType[];
  meta: MetaType;
  sorts: SortType;
};

export type CustomerRespondType = {
  id: string;
  no_user: string;
  nama_user: string;
  notelp_user: string;
  alamat_user: string;
  email_user: string;
  city: string;
  zip_code: string;
  region: string;
};

export type GetCustomerRespond = {
  data: CustomerRespondType;
};

export const useGetCustomers = (
  params: { [key: string]: any },
  extra: UseQueryOptions<GetCustomersRespond>,
): UseQueryResult<GetCustomersRespond, unknown> => {
  return useQuery({
    queryFn: async (input) =>
      await queryFetch({
        endpoint: "users",
        method: "GET",
        type: "admin",
        params,
      }),
    queryKey: ["users", params],
    ...extra,
  });
};

export const useGetCustomer = (
  input: {
    id: string;
  },
  options?: UseQueryOptions<GetCustomerRespond, unknown>,
): UseQueryResult<GetCustomerRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: `users/${input.id}`,
        method: "GET",
        type: "admin",
      }),
    queryKey: ["user", input],
    ...options,
  });
};

export const useCreateCustomer = (): UseMutationResult<
  { message: string },
  unknown,
  CustomerInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: CustomerInput) =>
      await queryFetch({
        endpoint: "users",
        method: "POST",
        type: "admin",
        body: input,
      }),
  });
};

export const useEditCustomer = (): UseMutationResult<
  { message: string },
  unknown,
  { data: CustomerInput; id: string },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: { data: CustomerInput; id: string }) =>
      await queryFetch({
        endpoint: `users/${input.id}`,
        method: "PUT",
        type: "admin",
        body: input.data,
      }),
  });
};

export const useDeleteCustomer = (): UseMutationResult<
  { message: string },
  unknown,
  CustomerDeleteInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: CustomerDeleteInput) =>
      await queryFetch({
        endpoint: `users/${input.id}`,
        method: "Hapus",
        type: "admin",
      }),
  });
};
