import Text from "@/components/elements/text";
import { Select } from "antd";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any, any>;
  name: string;
}
export const StatusPenjualanStatus = [
  {
    label: "Order Placed",
    value: "Order Placed",
  },
  {
    label: "Packing",
    value: "Packing",
  },
  {
    label: "On Delivery",
    value: "On Delivery",
  },
  {
    label: "Delivered",
    value: "Delivered",
  },
  {
    label: "Cancelled",
    value: "Cancelled",
  },
  {
    label: "Retur",
    value: "Retur",
  },
];

export default function StatusPenjualanSelect(props: Props) {
  const { control, name } = props;

  return (
    <div className="mb">
      <Text variant="bodySmall">
        Sales Status
        <span className="asterisk">*</span>
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={StatusPenjualanStatus}
            style={{
              width: "100%",
            }}
          />
        )}
      />
    </div>
  );
}
