import { QueryClient } from "react-query";

const BASE_URL = "https://clicon-server.onrender.com";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey: [url] }) => {
        if (typeof url === "string") {
          const res = await fetch(`${BASE_URL}/${url.toLowerCase()}`);
          return res;
        }
        throw new Error("Invalid QueryKey");
      },
    },
  },
});
