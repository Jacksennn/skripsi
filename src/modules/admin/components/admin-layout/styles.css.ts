import { globalStyle, style } from "@vanilla-extract/css";

export const siderStyleClass = style({
  width: "fit-content !important",
});
globalStyle(`${siderStyleClass} > .ant-layout-sider-children`, {
  height: "fit-content !important",
  width: "fit-content !important",
});

globalStyle(`aside`, {
  display: "flex",
  justifyContent: "center",
});

export const layoutStylesClass = style({
  minHeight: "calc(100vh - 123px)",
  gap: 16,
  paddingTop: 40,
  backgroundColor: "#fff !important",

  "@media": {
    "screen and (min-width: 991px)": {
      gap: 72,
    },
  },
});
