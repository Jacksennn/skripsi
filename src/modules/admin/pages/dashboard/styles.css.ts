import { colors } from "@/theming/colors";
import { style } from "@vanilla-extract/css";

export const dashboardStyles = {
  grid: style({
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    // width: "fit-content",
    gap: 16,
    "@media": {
      "screen and (min-width: 576px)": {
        gridTemplateColumns: "repeat(2, 1fr)",
        maxWidth: "unset",
      },
      "screen and (min-width: 768px)": {
        gridTemplateColumns: "1fr 1fr 1fr",
      },
    },
  }),
  gridImage: style({
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 16,
    "@media": {
      "screen and (min-width: 576px)": {
        width: "fit-content",
        justifyContent: "unset",
        gridTemplateColumns: "repeat(2, 1fr)",
        maxWidth: "unset",
      },
      "screen and (min-width: 768px)": {
        gridTemplateColumns: "repeat(3, 1fr)",
      },
      "screen and (min-width: 976px)": {
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
      },
    },
  }),
  imageContainer: style({
    marginTop: 24,
    border: `1px solid ${colors.gray100}`,
    borderRadius: 4,
    padding: 16,
  }),
  borderBottom: style({
    borderBottom: `1px solid ${colors.gray100}`,
  }),
};
