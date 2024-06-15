import { queryFetch, queryFetchFormData } from "@/common/fetch-hook";
import { UseMutationResult, useMutation } from "react-query";

type LoginInput = {
  username: string;
  password: string;
};
type LoginRespond = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
};

type CommonApiRespond<T> = { data: T };

export const useLogin = (
  type: "admin" | "user",
): UseMutationResult<
  CommonApiRespond<LoginRespond>,
  unknown,
  LoginInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: LoginInput) =>
      await queryFetch({
        endpoint: "auth/login",
        method: "POST",
        type,
        body: input,
      }),
  });
};

type UploadImageInput = {
  file: File;
};

export const useUploadImage = (): UseMutationResult<
  { file_name: string },
  unknown,
  UploadImageInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: UploadImageInput) =>
      await queryFetchFormData({
        endpoint: "upload-file-data",
        method: "POST",
        type: "admin",
        body: input,
      }),
  });
};

type Province = {
  id: string;
  name: string;
};

export const useGetProvinces = (
  type: "user" | "admin",
): UseMutationResult<
  CommonApiRespond<Province[]>,
  unknown,
  unknown,
  unknown
> => {
  return useMutation({
    mutationFn: async () =>
      await queryFetch({
        endpoint: "provinces",
        method: "POST",
        type: type,
      }),
  });
};

type City = {
  id: string;
  nama: string;
};

type CityInput = {
  province_id: string;
};

export const useGetCity = (
  type: "admin" | "user",
): UseMutationResult<CommonApiRespond<City[]>, unknown, CityInput, unknown> => {
  return useMutation({
    mutationFn: async (body: CityInput) =>
      await queryFetch({
        endpoint: "cities",
        method: "POST",
        type: type,
        body,
      }),
  });
};
