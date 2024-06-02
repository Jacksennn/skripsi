import React from "react";
import { Flex, Input as RawInput, InputProps as RawInputProps } from "antd";
import classNames from "classnames";
import { inputStyles } from "./styles.css";
import Text from "../text";
import { Control, Controller, FieldValues } from "react-hook-form";

export interface InputProps extends Omit<RawInputProps, "name" | "type"> {
  label?: string;
  noMb?: boolean;
  noAsterisk?: boolean;
  control: Control<any>;
  name: string;
  type:
    | "button"
    | "checkbox"
    | "color"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | "number-control"
    | "textarea";
}

const { TextArea } = RawInput;
export default function Input(props: InputProps) {
  const {
    className,
    label,
    noMb,
    required,
    noAsterisk,
    control,
    name,
    type,
    ...restProps
  } = props;

  const _type = type === "number-control" ? "number" : type;
  return (
    <Flex vertical={type !== "checkbox"} gap={type === "checkbox" ? 8 : 0}>
      {!!label && (
        <Text variant="bodySmall">
          {label}
          {required && !noAsterisk && <span className="asterisk">*</span>}
        </Text>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          type === "textarea" ? (
            <TextArea
              {...(restProps as any)}
              {...field}
              placeholder={restProps.placeholder || label}
              className={classNames(className, inputStyles, !noMb && "mb")}
              size="large"
            ></TextArea>
          ) : (
            <RawInput
              {...restProps}
              {...field}
              checked={field.value}
              type={_type}
              placeholder={restProps.placeholder || label}
              className={classNames(
                className,
                inputStyles,
                !noMb && type !== "checkbox" && "mb",
              )}
              size="large"
              {...(type === "checkbox" && {
                style: {
                  width: "fit-content",
                  ...restProps.style,
                },
              })}
              {...(type === "number-control" && {
                addonBefore: (
                  <button
                    type="button"
                    onClick={() => field.onChange((field.value || 0) - 1)}
                    style={{ background: "none", border: "none" }}
                  >
                    -
                  </button>
                ),
                addonAfter: (
                  <button
                    type="button"
                    onClick={() => field.onChange((field.value || 0) + 1)}
                    style={{ background: "none", border: "none" }}
                  >
                    +
                  </button>
                ),
              })}
            />
          )
        }
      ></Controller>
    </Flex>
  );
}
