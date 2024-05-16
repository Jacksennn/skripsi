import { colors } from "@/theming/colors";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const dashboardCardStyles = {
  container: recipe({
    base: {
      padding: 16,
      display: "flex",
      alignItems: "center",
      gap: 16,
      maxWidth: 300,
    },
    variants: {
      variant: {
        success: {
          background: colors.success50,
          color: colors.success500,
        },
        info: {
          background: colors.secondary50,
          color: colors.secondary500,
        },
        warning: {
          background: colors.warning50,
          color: colors.warning500,
        },
      },
    },
  }),
  iconContainer: style({
    padding: 12,
    background: "white",
  }),
};
