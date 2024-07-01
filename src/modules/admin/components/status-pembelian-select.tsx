import Text from "@/components/elements/text";
import { Select } from "antd";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any, any>;
  name: string;
}
export const StatusPembelianStatus = [
  {
    label: "On delivery",
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
];

export default function StatusPembelianSelect(props: Props) {
  const { control, name } = props;

  return (
    <div className="mb">
      <Text variant="bodySmall">
        Delivery Status
        <span className="asterisk">*</span>
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={StatusPembelianStatus}
            style={{
              width: "100%",
            }}
          />
        )}
      />
    </div>
  );
}
