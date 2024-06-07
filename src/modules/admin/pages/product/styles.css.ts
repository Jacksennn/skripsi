import { style } from "@vanilla-extract/css";

export const gridStyle = style({
  display: "grid",
  gap: 16,
  alignContent: "space-between",
  "@media": {
    "screen and (min-width: 576px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "screen and (min-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "screen and (min-width: 976px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    "screen and (min-width: 1200px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
});

export const firstFormStyle = style({
  display: "grid",
  gap: 16,
  justifyContent: "space-between",
  alignContent: "space-between",
  "@media": {
    "screen and (min-width: 576px)": {
      gridTemplateColumns: "1fr",
    },
    "screen and (min-width: 768px)": {
      gridTemplateColumns: "1fr 2fr",
    },
  },
});
