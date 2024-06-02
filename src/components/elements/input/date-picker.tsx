import React from "react";
import { DatePicker as BaseDatePicker, Flex } from "antd";
import { Control, Controller } from "react-hook-form";
import Text from "../text";
import classNames from "classnames";
export interface Props {
  label?: string;
  noMb?: boolean;
  noAsterisk?: boolean;
  control: Control<any>;
  name: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}
export default function DatePicker(props: Props) {
  const {
    className,
    label,
    noMb,
    required,
    noAsterisk,
    control,
    name,
    placeholder,
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
          <BaseDatePicker
            {...field}
            placeholder={placeholder || label}
            className={classNames(className, className, !noMb && "mb")}
            style={{ width: "100%" }}
            size="middle"
          />
        )}
      />
    </>
  );
}
