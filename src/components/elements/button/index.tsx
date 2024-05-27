import React from "react";
import { Button as RawButton, ButtonProps as RawButtonProps } from "antd";
import classNames from "classnames";
import { buttonStyles } from "./styles.css";

export interface ButtonProps extends Omit<RawButtonProps, "type" | "danger"> {
  variant?: "primary" | "secondary" | "tertiary" | "white";
  error?: boolean;
  info?: boolean;
}

export default function Button(props: ButtonProps) {
  const { variant = "primary", className, error, info, ...restProps } = props;

  const type = React.useMemo(() => {
    switch (variant) {
      case "primary": {
        return "primary";
      }
      case "secondary": {
        return "default";
      }
      case "tertiary": {
        return "default";
      }
      case "white": {
        return "text";
      }
    }
  }, [variant]);

  return (
    <RawButton
      type={type}
      {...restProps}
      className={classNames(
        className,
        buttonStyles({
          variant,
          ...(error || info
            ? {
                sentiment: `${error ? "error" : "info"}_${variant}`,
              }
            : {}),
        }),
      )}
    >
      {restProps.loading ? "" : restProps.children}
    </RawButton>
  );
}
