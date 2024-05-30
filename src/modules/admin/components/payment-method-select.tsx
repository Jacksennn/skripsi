import Text from "@/components/elements/text";
import { Select } from "antd";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any, any>;
  name: string;
}
export const PaymentMethodStatus = [
  {
    label: "Cash",
    value: "Cash",
  },
];

export default function PaymentMethodSelect(props: Props) {
  const { control, name } = props;

  return (
    <>
      <Text variant="bodySmall">
        Payment Method
        <span className="asterisk">*</span>
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={PaymentMethodStatus}
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
