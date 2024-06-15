import { colors } from "@/theming/colors";
import { style } from "@vanilla-extract/css";

export const cartStyles = {
  shoppingCardTitle: style({
    padding: "20px 24px",
  }),
  container: style({
    display: "flex",
    flexDirection: "row",
    gap: 16,
  }),
  leftContainer: style({
    width: "70%",
    paddingBottom: 32,
    border: `1px solid ${colors.gray100}`,
    borderRadius: 4,
  }),

  rightContainer: style({
    width: "30%",
  }),
  totalCard: style({
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 12,
    border: `1px solid ${colors.gray100}`,
    borderRadius: 4,
  }),
};
