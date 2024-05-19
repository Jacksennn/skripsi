import { colors } from "@/theming/colors";
import { style } from "@vanilla-extract/css";

export const navigationBarStyles = {
  container: style({
    height: "fit-content",
    border: `1px solid ${colors.gray100}`,
    borderRadius: 4,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    padding: "16px 0px",
  }),
  item: style({
    color: colors.gray600,
    padding: "10px 0px 10px 24px",
    cursor: "pointer",
  }),
};
