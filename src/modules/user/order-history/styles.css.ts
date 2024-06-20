import { colors } from "@/theming/colors";
import { style } from "@vanilla-extract/css";

export const tabStyle = style({
  padding: 10,
  fontSize: 14,
  fontWeight: 400,
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
});

export const tabContainerStyle = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",

  gridColumn: "1 / span 4",
  overflow: "auto",

  "@media": {
    "screen and (max-width: 768px)": {
      gridRow: 2,
      gridColumnEnd: 8,
    },
  },
});

export const searchInput = style({
  gridColumn: "5/span2",

  "@media": {
    "screen and (max-width: 768px)": {
      gridRow: 1,
      gridColumnStart: 4,
      gridColumnEnd: 8,
    },
  },
});

export const title = style({
  gridColumn: 1,
  gridColumnEnd: 4,
  "@media": {
    "screen and (min-width: 768px)": {
      display: "none",
    },
  },
});
export const container = style({
  display: "grid",

  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
  gridTemplateRows: "auto auto",
  width: "100%",
  gridRowGap: 32,
  justifyContent: "start",
});

export const itemstyle = {
  container: style({
    border: `1px solid ${colors.gray100}`,
    borderRadius: 4,
    padding: "4px 12px",
  }),
  tableContainer: style({
    display: "none",
    width: "100%",

    "@media": {
      "screen and (min-width: 768px)": {
        display: "block",
      },
    },
  }),
  smallScreen: style({
    marginTop: 22,
    display: "block",
    "@media": {
      "screen and (min-width: 768px)": {
        display: "none",
      },
    },
  }),
};
