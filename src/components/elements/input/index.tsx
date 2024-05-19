import React from "react";
import { Input as RawInput, InputProps as RawInputProps } from "antd";
import classNames from "classnames";
import { inputStyles } from "./styles.css";
import Text from "../text";
import { Control, Controller, FieldValues } from "react-hook-form";

export interface InputProps extends Omit<RawInputProps, "name"> {
  label?: string;
  noMb?: boolean;
  noAsterisk?: boolean;
  control: Control<any>;
  name: string;
}

export default function Input(props: InputProps) {
  const {
    className,
    label,
    noMb,
    required,
    noAsterisk,
    control,
    name,
    ...restProps
  } = props;

  return (
    <>
      {!!label && (
        <Text variant="bodySmall">
          {label}
          {required && !noAsterisk && <span className="asterisk">*</span>}
        </Text>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RawInput
            {...restProps}
            {...field}
            className={classNames(className, inputStyles, !noMb && "mb")}
            size="large"
          />
        )}
      ></Controller>
    </>
  );
}
