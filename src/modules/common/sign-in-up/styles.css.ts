import { colors } from "@/theming/colors";
import { globalStyle, style } from "@vanilla-extract/css";

export const signInUpStyles = {
  tab: style({
    background: "white",
    borderRadius: 4,
  }),
  container: style({
    width: "400px",
  }),
  tabItemContainer: style({
    padding: "16px 20px",
  }),
  outerContainer: style({
    background: colors.gray100,
  }),
  outerContentContainer: style({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
};

globalStyle(`${signInUpStyles.tabItemContainer} .ant-tabs-nav-wrap`, {
  paddingTop: 10,
  flex: 1,
  background: "red !important",
});

// globalStyle(`${signInUpStyles.tabItemContainer} .ant-tabs-nav-list`, {
//   width: "100%",
// });
