import { style } from "@vanilla-extract/css";

export const reportTabStyle = style({
  padding: 10,
  fontSize: 14,
  fontWeight: 400,
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
});

export const reportTabContainerStyle = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  maxWidth: 300,
});
