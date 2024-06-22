import { style } from "@vanilla-extract/css";

export const productSearch = {
  popupContainer: style({
    overflow: "auto",
    position: "relative",
    width: 150,
    maxHeight: 200,
    "@media": {
      "screen and (min-width: 768px)": {
        width: 500,
      },
    },
  }),
  popupItem: style({
    display: "flex",
    gap: 16,
    marginTop: 12,
  }),
};
