import { QueryClient } from "react-query";
"abc"
const BASE_URL = "https://clicon-server.onrender.com";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
