import { MetaType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";
import {
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "react-query";

export type CategoryInput = {
  nama_kategori: string;
};

export type CategoryDeleteInput = {
  id: string;
};

export type CategoriesRespondType = {
  id: string;
  nama_kategori: string;
};

export type GetCategoriesRespond = {
  data: CategoriesRespondType[];
  meta: MetaType;
};

export type CategoryRespondType = {
  id: string;
  nama_kategori: string;
};

export type GetCategoryRespond = {
  data: CategoryRespondType;
};

export const useGetCategories = (): UseQueryResult<
  GetCategoriesRespond,
  unknown
> => {
  return useQuery({
    queryFn: async (input) =>
      await queryFetch({
        endpoint: "kategori",
        method: "GET",
        type: "admin",
      }),
    queryKey: ["daftar-kategori"],
  });
};

export const useGetCategory = (
  input: {
    id: string;
  },
  options?: UseQueryOptions<GetCategoryRespond, unknown>,
): UseQueryResult<GetCategoryRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: `kategori/${input.id}`,
        method: "GET",
        type: "admin",
      }),
    queryKey: ["kategori", input],
    ...options,
  });
};

export const useCreateCategory = (): UseMutationResult<
  { message: string },
  unknown,
  CategoryInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: CategoryInput) =>
      await queryFetch({
        endpoint: "kategori",
        method: "POST",
        type: "admin",
        body: input,
      }),
  });
};

export const useEditCategory = (): UseMutationResult<
  { message: string },
  unknown,
  { data: CategoryInput; id: string },
  unknown
> => {
  return useMutation({
    mutationFn: async (input: { data: CategoryInput; id: string }) =>
      await queryFetch({
        endpoint: `kategori/${input.id}`,
        method: "PUT",
        type: "admin",
        body: input.data,
      }),
  });
};

export const useDeleteCategory = (): UseMutationResult<
  { message: string },
  unknown,
  CategoryDeleteInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: CategoryDeleteInput) =>
      await queryFetch({
        endpoint: `kategori/${input.id}`,
        method: "DELETE",
        type: "admin",
      }),
  });
};
