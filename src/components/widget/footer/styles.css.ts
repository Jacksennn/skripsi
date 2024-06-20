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
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "column",
    "@media": {
      "screen and (min-width: 768px)": {
        paddingLeft: 32,
        paddingRight: 32,
        flexDirection: "row",
      },
      "screen and (min-width: 1200px)": {
        maxWidth: 1500,
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

  informationWrapper: style({
    display: "flex",
    flexDirection: "column",
    gap: 4,
  }),
  phone: style({
    fontSize: 16,
    marginTop: 12,
    "@media": {
      "screen and (min-width: 768px)": {
        fontSize: 18,
      },
    },
  }),
  address: style({
    fontSize: 14,
    "@media": {
      "screen and (min-width: 768px)": {
        fontSize: 16,
      },
    },
  }),
};
