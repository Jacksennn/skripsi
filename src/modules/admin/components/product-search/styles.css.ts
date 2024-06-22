import { style } from "@vanilla-extract/css";

export const productSearch = {
  popupContainer: style({
    width: 500,
    maxHeight: 200,
    overflow: "auto",
    position: "relative",
  }),
  popupItem: style({
    display: "flex",
    gap: 16,
    marginTop: 12,
  }),
};
