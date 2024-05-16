import { colors } from "@/theming/colors";
import { recipe } from "@vanilla-extract/recipes";

export const buttonStyles = recipe({
  base: {},
  variants: {
    variant: {
      primary: {
        backgroundColor: `${colors.secondary800} !important`,
        boxShadow: "none !important",
        ":hover": {
          backgroundColor: `${colors.secondary900} !important`,
        },
      },
      secondary: {
        color: `${colors.secondary800} !important`,
        borderColor: `${colors.secondary800} !important`,
        ":hover": {
          backgroundColor: `${colors.secondary50} !important`,
        },
      },
      tertiary: {
        borderColor: `${colors.gray100} !important`,
        color: `${colors.gray700} !important`,
        ":hover": {
          backgroundColor: `${colors.gray50} !important`,
        },
      },
      white: {
        color: `${colors.secondary800} !important`,
      },
    },
    sentiment: {
      error_primary: {
        backgroundColor: `${colors.danger500} !important`,
        boxShadow: "none !important",
        ":hover": {
          backgroundColor: `${colors.danger600} !important`,
        },
      },
      error_secondary: {
        color: `${colors.danger500} !important`,
        borderColor: `${colors.danger500} !important`,
        ":hover": {
          backgroundColor: `${colors.danger50} !important`,
        },
      },
      error_tertiary: {
        borderColor: `${colors.danger100} !important`,
        color: `${colors.danger700} !important`,
        ":hover": {
          backgroundColor: `${colors.danger50} !important`,
        },
      },
      error_white: {
        color: `${colors.danger500} !important`,
      },
      info_primary: {
        backgroundColor: `${colors.secondary500} !important`,
        boxShadow: "none !important",
        ":hover": {
          backgroundColor: `${colors.secondary50} !important`,
        },
      },
      info_secondary: {
        color: `${colors.secondary500} !important`,
        borderColor: `${colors.secondary500} !important`,
        ":hover": {
          backgroundColor: `${colors.secondary50} !important`,
        },
      },
      info_tertiary: {
        borderColor: `${colors.secondary100} !important`,
        color: `${colors.secondary700} !important`,
        ":hover": {
          backgroundColor: `${colors.secondary50} !important`,
        },
      },
      info_white: {
        color: `${colors.secondary500} !important`,
      },
    },
  },
});
