import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const layoutStyles = {
  container: style({
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  }),
  main: recipe({
    base: {
      width: "100%",
      "@media": {
        "screen and (min-width: 768px)": {
          paddingLeft: 32,
          paddingRight: 32,
        },
        "screen and (min-width: 1200px)": {
          maxWidth: 1400,
        },
      },
    },
    variants: {
      type: {
        admin: {
          height: `calc(100vh - 82px)`,
        },
        default: {
          minHeight: `calc(100vh - 200px)`,
          padding: 16,
        },
      },
    },
  }),
};
