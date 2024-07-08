import React from "react";
import { Control, Controller } from "react-hook-form";
import { SuppliersRespondType, useGetSuppliers } from "../pages/supplier/api";
import Text from "@/components/elements/text";
import { Select } from "antd";

interface Props {
  control: Control<any, any>;
  name: string;
  onChange: (data: SuppliersRespondType | undefined) => void;
}

export default function SupplierSelect(props: Props) {
  const { control, name, onChange } = props;
  const { data, isLoading } = useGetSuppliers({ limit: -1 });

  return (
    <div className="mb">
      <Text variant="bodySmall">
        Nama Supplier
        <span className="asterisk">*</span>
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            loading={isLoading}
            {...field}
            onChange={(value) => {
              field.onChange(value);
              onChange(
                data?.data?.[
                  data?.data?.findIndex((item) => item.id === value)
                ],
              );
            }}
            options={data?.data?.map((item) => ({
              value: item.id,
              label: item.nama_supplier,
            }))}
            style={{
              width: "100%",
            }}
          />
        )}
      />
    </div>
  );
}
