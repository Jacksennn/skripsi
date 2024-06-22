import { style } from "@vanilla-extract/css";

export const imageCardStyle = {
  card: style({
    maxWidth: "50%",
    "@media": {
      "screen and (min-width: 768px)": {
        minWidth: 200,
      },
    },
  }),
  price: style({
    display: "flex",
    flexDirection: "column",
    "@media": {
      "screen and (min-width: 768px)": {
        flexDirection: "row",
      },
    },
  }),
};
