import React from "react";
import { Control, Controller } from "react-hook-form";
import Text from "@/components/elements/text";
import { Select } from "antd";
import { CategoryRespondType, useGetCategories } from "../pages/category/api";

interface Props {
  control: Control<any, any>;
  name: string;

  disabled?: boolean;
}

export default function CategorySelect(props: Props) {
  const { control, name, disabled } = props;
  const { data, isLoading } = useGetCategories({ limit: -1 }, {});

  const datas: CategoryRespondType[] = React.useMemo(
    () => Object.values(data?.data || {}).flat(),
    [data?.data],
  );

  return (
    <div className="mb">
      <Text variant="bodySmall">
        Kategori Produk
        <span className="asterisk">*</span>
      </Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            disabled={disabled}
            loading={isLoading}
            {...field}
            onChange={(value) => {
              field.onChange(value);
            }}
            options={datas.map((item) => ({
              value: item.id,
              label: item.nama_kategori,
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
