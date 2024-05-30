// theme/themeConfig.ts
import type { ThemeConfig } from "antd";
import { colors } from "./colors";

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: colors.secondary900,
    borderRadius: 2,
    fontFamily: "Public Sans, sans-serif",
  },
  hashed: false,
  components: {
    Table: {
      rowSelectedBg: "#D1D9FF",
      rowSelectedHoverBg: "#D1D9FF",
      cellPaddingBlock: 4,
      cellFontSize: 12,
    },
  },
};

export default theme;
