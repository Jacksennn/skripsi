import { MetaType } from "@/api/type";
import { ProductsRespondType } from "../product/api";
import { UseQueryResult, useQuery } from "react-query";
import { queryFetch } from "@/common/fetch-hook";

export type ProductAlertType = {
  id: string;
  sku_produk: string;
  nama_produk: string;
  harga_produk: string;
  stok_produk: number;
  min_produk: 4;
  file: {
    id: string;
    foto_produk: string;
    urutan: number;
    foto_url: string;
  };
};

export type GetProductAlertRespond = {
  data: ProductAlertType[];
  meta: MetaType;
};

export const useGetProductAlert = (
  enabled: boolean = true,
  params: { [key: string]: any },
): UseQueryResult<GetProductAlertRespond, unknown> => {
  return useQuery({
    queryFn: async () =>
      await queryFetch({
        endpoint: "peringatan-produk",
        method: "GET",
        type: "admin",
        params,
      }),
    queryKey: ["produk-alert", params],
    enabled: enabled,
  });
};
