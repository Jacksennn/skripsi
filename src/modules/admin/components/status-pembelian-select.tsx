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
    label: "Completed",
    value: "Completed",
  },
  {
    label: "Cancelled",
    value: "Cancelled",
  },
];

export default function StatusPembelianSelect(props: Props) {
  const { control, name } = props;

  return (
    <>
      <Text variant="bodySmall">
        Purchase Status
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
    </>
  );
}
