import { colors } from "@/theming/colors";
import { style } from "@vanilla-extract/css";

export const checkoutstyles = {
  container: style({
    display: "flex",
    flexDirection: "column",
    gap: 16,
    "@media": {
      "screen and (min-width:768px)": {
        flexDirection: "row",
        justifyContent: "space-between",
      },
    },
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
    paddingBottom: 32,
    padding: 16,
    width: "calc(100% - 32px)",
    "@media": {
      "screen and (min-width:768px)": {
        width: "70%",
      },
    },
  }),

  rightContainer: style({
    width: "calc(100% - 32px)",
    paddingLeft: 16,
    "@media": {
      "screen and (min-width:768px)": {
        width: "30%",
      },
    },
  }),
};
