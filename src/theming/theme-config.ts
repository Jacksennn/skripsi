// theme/themeConfig.ts
import type { ThemeConfig } from "antd";
import { colors } from "./colors";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: colors.secondary900,
    borderRadius: 2,
  },
  hashed: false,
};

export default theme;
