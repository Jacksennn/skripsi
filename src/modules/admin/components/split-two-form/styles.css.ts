import { style } from "@vanilla-extract/css";

export const sectionContainerStyles = style({
  display: "flex",
  flexDirection: "column",
  "@media": {
    "screen and (min-width: 991px)": {
      flexDirection: "row",
      gap: 34,
    },
  },
});

export const sectionStyles = style({
  width: "100%",
  "@media": {
    "screen and (min-width: 768px)": {
      width: "50%",
    },
  },
});
