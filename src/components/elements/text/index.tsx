import { RecipeVariants } from "@vanilla-extract/recipes";
import React from "react";
import { textStyles } from "./styles.css";
import { colors } from "@/theming/colors";

type TextStyleProps = RecipeVariants<typeof textStyles>;

type TextProps = TextStyleProps &
  React.ButtonHTMLAttributes<HTMLParagraphElement> &
  React.PropsWithChildren & {
    color?: keyof typeof colors;
  };

export default function Text(props: TextProps) {
  const { variant, weight, children, color = "gray900", ...rest } = props;

  return (
    <p
      className={textStyles({ variant, weight })}
      {...rest}
      style={{
        color: colors[color],
      }}
    >
      {children}
    </p>
  );
}
