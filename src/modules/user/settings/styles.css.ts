import { style } from "@vanilla-extract/css";

export const buttonContainer = style({
  display: "flex",
  flexDirection: "column",
  "@media": {
    "screen and (min-width:768px)": {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
});

export const usericonContainer = style({
  display: "none",
  "@media": {
    "screen and (min-width:768px)": {
      display: "block",
    },
  },
});
