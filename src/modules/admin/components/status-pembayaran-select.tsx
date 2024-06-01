import Text from "@/components/elements/text";
import { Select } from "antd";
import React from "react";
import { Control, Controller } from "react-hook-form";

export const PaymentStatus = [
  {
    label: "Unpaid",
    value: "Unpaid",
  },
  {
    label: "Paid",
    value: "Paid",
  },
  {
    label: "Cancelled",
    value: "Cancelled",
  },
  {
    label: "Refund",
    value: "Refund",
  },
];

interface Props {
  control: Control<any, any>;
  name: string;
}

export default function StatusPembayaranSelect(props: Props) {
  const { control, name } = props;

  return (
    <>
      <Text variant="bodySmall">
        Payment Status
        <span className="asterisk">*</span>
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={PaymentStatus}
            style={{
              width: "100%",
            }}
            placeholder="Choose a payment method"
          />
        )}
      />
    </>
  );
}
