import "@/styles/globals.css";
import theme from "@/theming/theme-config";

import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

import { Public_Sans } from "next/font/google";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={publicSans.className}>
      <ConfigProvider theme={theme}>
        <Component {...pageProps} />
      </ConfigProvider>
    </div>
  );
}
