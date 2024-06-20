import { colors } from "@/theming/colors";
import { style } from "@vanilla-extract/css";

export const headerStyles = {
  container: style({
    backgroundColor: colors.secondary900,
    width: "100%",
    paddingTop: 24,
    paddingBottom: 24,
    display: "flex",
    justifyContent: "center",
  }),
  innerContainer: style({
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 32,
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
    "@media": {
      "screen and (min-width: 768px)": {
        paddingLeft: 32,
        paddingRight: 32,
      },
      "screen and (min-width: 1200px)": {
        maxWidth: 1500,
      },
    },
  }),
  rightWrapper: style({
    display: "flex",
    alignItems: "center",
    gap: 16,
  }),
  searchWrapper: style({
    flex: 1,
  }),
  searchBigScreen: style({
    display: "none",
    "@media": {
      "screen and (min-width: 768px)": {
        display: "block",
      },
    },
  }),
  searchSmallScreen: style({
    display: "block",
    "@media": {
      "screen and (min-width: 768px)": {
        display: "none",
      },
    },
  }),
  title: style({
    cursor: "pointer",
    fontSize: 18,
    "@media": {
      "screen and (min-width: 768px)": {
        fontSize: 24,
      },
    },
  }),
};
