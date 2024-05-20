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
};
