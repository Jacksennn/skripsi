import { colors } from "@/theming/colors";
import { globalStyle, style } from "@vanilla-extract/css";

export const cartStyles = {
  shoppingCardTitle: style({
    marginBottom: 22,
  }),
  container: style({
    display: "flex",
    flexDirection: "column",
    gap: 16,

    "@media": {
      "screen and (min-width: 768px)": {
        flexDirection: "row",
      },
    },
  }),
  leftContainer: style({
    paddingBottom: 32,
    border: `1px solid ${colors.gray100}`,
    borderRadius: 4,
    padding: "20px 24px",

    "@media": {
      "screen and (min-width: 768px)": {
        width: "70%",
      },
    },
  }),
  tableContainer: style({
    display: "none",
    width: "100%",
    "@media": {
      "screen and (min-width: 768px)": {
        display: "inline-block",
      },
    },
  }),
  tableSmallContainer: style({
    display: "inline-block",
    width: "100%",

    "@media": {
      "screen and (min-width: 768px)": {
        display: "none",
      },
    },
  }),
  rightContainer: style({
    "@media": {
      "screen and (min-width: 768px)": {
        width: "30%",
      },
    },
  }),
  totalCard: style({
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 12,
    border: `1px solid ${colors.gray100}`,
    borderRadius: 4,
  }),

  cartItem: style({
    border: `1px solid ${colors.gray100}`,
    borderRadius: 4,
    padding: "4px 12px",
  }),
  numberInput: style({
    "@media": {
      "screen and (max-width: 768px)": {
        width: "30%",
        borderRadius: 10,
      },
    },
  }),
};

globalStyle(`${cartStyles.numberInput} .ant-input-group-addon`, {
  background: "transparent !important",
});
globalStyle(`${cartStyles.numberInput} input`, {
  borderLeft: "none",
  borderRight: "none",
});
globalStyle(`${cartStyles.numberInput} .ant-input-group-addon:first-child`, {
  borderTopLeftRadius: 10,
  borderBottomLeftRadius: 10,
});

globalStyle(`${cartStyles.numberInput} .ant-input-group-addon:last-child`, {
  borderTopRightRadius: 10,
  borderBottomRightRadius: 10,
});
