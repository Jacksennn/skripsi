import Text from "@/components/elements/text";
import { Select } from "antd";
import React from "react";
import { Control, Controller } from "react-hook-form";

export const AdjustmentDetail = [
  {
    name: "Stock out",
    value: "Stock Out",
  },
  {
    name: "Stock in",
    value: "Stock In",
  },
];

interface Props {
  control: Control<any, any>;
  name: string;
}

export default function AdjustmentDetailSelect(props: Props) {
  const { control, name } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          {...field}
          options={AdjustmentDetail}
          style={{
            width: "100%",
          }}
          placeholder="Choose a reason"
        />
      )}
    />
  );
}
