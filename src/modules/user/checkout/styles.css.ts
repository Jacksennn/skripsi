import { colors } from "@/theming/colors";
import { style } from "@vanilla-extract/css";

export const checkoutstyles = {
  container: style({
    display: "flex",
    flexDirection: "row",
    gap: 16,
  }),
  summaryCard: style({
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 12,
    border: `1px solid ${colors.gray100}`,
    borderRadius: 4,
  }),
  leftContainer: style({
    width: "70%",
    paddingBottom: 32,
  }),

  rightContainer: style({
    width: "30%",
  }),
};
