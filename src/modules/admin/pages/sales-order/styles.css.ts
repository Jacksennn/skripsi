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
  // maxWidth: 300,
});

export const container = style({
  display: "grid",

  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
  gridTemplateRows: "auto auto",
  width: "100%",
  gridRowGap: 32,
  justifyContent: "start",
});
