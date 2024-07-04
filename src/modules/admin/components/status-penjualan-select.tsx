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
    name: "New Orders",
    value: "New Orders",
  },
  {
    name: "On Process",
    value: "On Process",
  },
  {
    name: "On delivery",
    value: "On Delivery",
  },
  {
    name: "Delivered",
    value: "Delivered",
  },
  {
    name: "Cancelled",
    value: "Cancelled",
  },
  {
    name: "Retur",
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
