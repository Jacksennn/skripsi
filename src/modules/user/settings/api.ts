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
  nama_user: string;
  email_user: string;
  username: string | null;
  alamat_user: string;
  notelp_user: string;
  region: string;
  city: string;
  zip_code: string;
};

export type GetMeRespond = { data: MeRespondType };

export type MeUpdateInput = {
  nama_user: string;
  email_user: string;
  alamat_user: string;
  username: string;
  notelp_user: string;
  region: string;
  city: string;
  zip_code: string;
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
        type: "user",
      }),
    queryKey: ["me-user"],
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
        type: "user",
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
        type: "user",
        body: input,
      }),
  });
};
