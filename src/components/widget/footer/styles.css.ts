import { colors } from "@/theming/colors";
import { style } from "@vanilla-extract/css";

export const footerStyles = {
  container: style({
    backgroundColor: colors.gray900,
    paddingTop: 72,
    paddingBottom: 140,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  }),
  innerContainer: style({
    width: "100%",
    display: "flex",
    gap: 40,
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
};
