import { globalStyle, style } from "@vanilla-extract/css";

export const siderStyleClass = style({});
globalStyle(`${siderStyleClass} > .ant-layout-sider-children`, {
  height: "fit-content !important",
});
