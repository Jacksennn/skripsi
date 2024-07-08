import { useGetCity, useGetProvinces } from "@/api/common";
import Text from "@/components/elements/text";
import { Select } from "antd";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any, any>;
  name: string;
  provinceId: string;
  type?: "user" | "admin";
}

export default function CityInput(props: Props) {
  const { control, name } = props;
  const { data, isLoading, mutate } = useGetCity(props.type || "admin");

  React.useEffect(() => {
    if (props.provinceId) {
      mutate({
        province_id: props.provinceId,
      });
    }
  }, [mutate, props.provinceId]);

  return (
    <>
      <Text variant="bodySmall">Kota</Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            loading={isLoading}
            {...field}
            options={data?.data?.map((item) => ({
              value: item.id,
              label: item.nama,
            }))}
            style={{
              width: "100%",
            }}
          />
        )}
      />
    </>
  );
}
