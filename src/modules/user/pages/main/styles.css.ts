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
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    "screen and (min-width: 976px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
});

export const layout = style({
  display: "flex",
  gap: 20,
  padding: 20,
});

export const detailStyle = {
  container: style({
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "20px",
    paddingRight: "20px",
    "@media": {
      "screen and (min-width: 768px)": {
        alignItems: "space-between",
        gap: 50,

        flexDirection: "row",
      },
    },
  }),
  button: style({
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr",
    gap: 16,
    marginTop: 20,
  }),
};
