import { colors } from "@/theming/colors";
import { typography } from "@/theming/typography";
import { recipe } from "@vanilla-extract/recipes";

export const textStyles = recipe({
  base: {
    display: "block",
    color: "black",
  },
  variants: {
    variant: typography,
    weight: {
      bold: {
        fontWeight: 700,
      },
      semiBold: {
        fontWeight: 600,
      },
      medium: {
        fontWeight: 500,
      },
      regular: {
        fontWeight: 400,
      },
    },
  },
  defaultVariants: {
    variant: "display01",
  },
});
