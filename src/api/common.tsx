import { queryFetch } from "@/common/fetch-hook";
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

export const useLogin = (): UseMutationResult<
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
        type: "admin",
        body: input,
      }),
  });
};
