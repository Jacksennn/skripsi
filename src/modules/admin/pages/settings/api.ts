import { queryFetch } from "@/common/fetch-hook";
import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

export type MeRespondType = {
  id: string;
  nama_admin: string;
  email_admin: string;
  username: string | null;
  alamat_admin: string;
  notelp_admin: string;
  region: string;
  city: string;
  zipcode: string;
};

export type GetMeRespond = { data: MeRespondType };

export type MeUpdateInput = {
  nama_admin: string;
  email_admin: string;
  alamat_admin: string;
  username: string;
  notelp_admin: string;
  region: string;
  city: string;
  zipcode: string;
};

export type ChangePasswordInput = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

export const useGetMe = (
  options?: UseQueryOptions<GetMeRespond, unknown>,
): UseQueryResult<GetMeRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: `me`,
        method: "GET",
        type: "admin",
      }),
    queryKey: ["me-admin"],
    ...options,
  });
};

export const useEditMe = (): UseMutationResult<
  { message: string },
  unknown,
  { data: MeUpdateInput; id: string },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: { data: MeUpdateInput; id: string }) =>
      await queryFetch({
        endpoint: `me/update`,
        method: "PUT",
        type: "admin",
        body: input.data,
      }),
  });
};

export const useChangePassword = (): UseMutationResult<
  { message: string },
  unknown,
  ChangePasswordInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: ChangePasswordInput) =>
      await queryFetch({
        endpoint: `me/change-password`,
        method: "PATCH",
        type: "admin",
        body: input,
      }),
  });
};
