import { queryFetch } from "@/common/fetch-hook";
import { UseMutationResult, useMutation } from "react-query";

type ReturInput = {
  id_jual: string;
  alasan_retur: string;
  details: {
    id_detailjual: string;
    jumlah_produk: number;
  }[];
};

export const useCreateRetur = (): UseMutationResult<
  { message: string },
  unknown,
  ReturInput,
  unknown
> => {
  return useMutation({
    mutationFn: async (input: ReturInput) =>
      await queryFetch({
        endpoint: "retur",
        method: "POST",
        type: "user",
        body: input,
      }),
  });
};
