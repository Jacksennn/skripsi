import React from "react";
import { Input as RawInput, InputProps as RawInputProps } from "antd";
import classNames from "classnames";
import { inputStyles } from "./styles.css";
import Text from "../text";

export interface InputProps extends Omit<RawInputProps, ""> {
  label?: string;
  noMb?: boolean;
  noAsterisk?: boolean;
}

export default function BaseInput(props: InputProps) {
  const { className, label, noMb, required, noAsterisk, ...restProps } = props;

  return (
    <>
      {!!label && (
        <Text variant="bodySmall">
          {label}
          {required && !noAsterisk && <span className="asterisk">*</span>}
        </Text>
      )}
      <RawInput
        {...restProps}
        className={classNames(className, inputStyles, !noMb && "mb")}
        size="large"
      />
    </>
  );
}
