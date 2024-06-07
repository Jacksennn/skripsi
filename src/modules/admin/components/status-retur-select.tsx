import Text from "@/components/elements/text";
import { Select } from "antd";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any, any>;
  name: string;
}

export const StatusReturStatus = [
  {
    label: "Pending",
    value: "Pending",
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

export default function StatusReturSelect(props: Props) {
  const { control, name } = props;

  return (
    <div className="mb">
      <Text variant="bodySmall">
        Status Retur
        <span className="asterisk">*</span>
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder="Choose Status Retur"
            options={StatusReturStatus}
            style={{
              width: "100%",
            }}
          />
        )}
      />
    </div>
  );
}
