import { queryFetch } from "@/common/fetch-hook";
import { UseQueryResult, useQuery } from "react-query";

export type DashboardRespondType = {
  total_sales_this_month: number | null;
  total_income_this_month: number | null;
  total_sales_last_month: number | null;
  total_income_last_month: number | null;
  pending_sales_order: number | null;
  income_difference: number | null;
};

export type GetDashboard = {
  data: DashboardRespondType;
};

export const useGetDashboard = (): UseQueryResult<GetDashboard, unknown> => {
  return useQuery({
    queryFn: async (input) =>
      await queryFetch({
        endpoint: "dashboards",
        method: "GET",
        type: "admin",
      }),
    queryKey: ["dashboards"],
  });
};
