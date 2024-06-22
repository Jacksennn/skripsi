import { colors } from "@/theming/colors";
import { style } from "@vanilla-extract/css";

export const gridStyle = style({
  display: "grid",
  gap: 16,
  alignContent: "space-between",
  gridTemplateColumns: "1fr 1fr",

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

export const mainStyle = {
  card: style({
    "@media": {
      "screen and (min-width: 768px)": {
        minWidth: 200,
      },
    },
  }),
};

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

    gap: 16,
    marginTop: 20,
    gridTemplateColumns: "1fr 2fr",
    "@media": {
      "screen and (min-width: 962px)": {
        gridTemplateColumns: "1fr 2fr 1fr",
      },
    },
  }),

  buyNowButton: style({
    gridColumn: "1/span2",
    height: "100% !important",
    "@media": {
      "screen and (min-width: 962px)": {
        gridColumn: "3",
        gridRow: "1",
      },
    },
  }),
  bigScreenFilter: style({
    display: "none",
    "@media": {
      "screen and (min-width: 768px)": {
        display: "block",
      },
    },
  }),
  card: style({
    maxWidth: 120,
    "@media": {
      "screen and (min-width: 425px)": {
        maxWidth: 200,
      },
      "screen and (min-width: 768px)": {
        minWidth: 200,
        maxWidth: 400,
      },
    },
  }),
  cardTitle: style({
    fontSize: 14,
    "@media": {
      "screen and (min-width: 768px)": {
        fontSize: 18,
      },
    },
  }),
  cardContainer: style({
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginTop: 16,
    borderRadius: 10,
    border: `1px solid ${colors.gray400}`,
    alignItems: "center",
    width: "100%",
    padding: 10,
    "@media": {
      "screen and (min-width: 768px)": {
        padding: 20,
      },
    },
  }),
  flexItemContainer: style({
    display: "grid",
    flexWrap: "wrap",
    alignItems: "center",
    gridTemplateColumns: "auto 20px auto",
    gap: 20,
    "@media": {
      "screen and (min-width: 768px)": {
        minWidth: 600,
        padding: 20,
        justifyContent: "space-between",
      },
    },
  }),
};
