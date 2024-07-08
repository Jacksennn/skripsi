import { inputStyles } from "@/components/elements/input/styles.css";
import { Input, InputProps } from "antd";
import classNames from "classnames";
import React from "react";
interface Props {
  onChange: (val: number) => void;
  value: Number;
  classname?: string;
  size?: "small" | "large";
  max?: number;
}
export default function NumberControlInput(props: Props) {
  return (
    <Input
      type="number"
      className={classNames(inputStyles, props.classname)}
      size={props.size || "large"}
      style={{ textAlign: "center" }}
      value={props.value as any}
      max={props.max}
      {...{
        addonBefore: (
          <button
            type="button"
            onClick={() =>
              props.onChange?.(((props?.value as unknown as number) || 0) - 1)
            }
            style={{ background: "none", border: "none" }}
          >
            -
          </button>
        ),
        addonAfter: (
          <button
            type="button"
            onClick={() =>
              props.onChange?.(((props?.value as unknown as number) || 0) + 1)
            }
            style={{ background: "none", border: "none" }}
          >
            +
          </button>
        ),
      }}
    />
  );
}
