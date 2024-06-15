import { useGetProvinces } from "@/api/common";
import Text from "@/components/elements/text";
import { Select } from "antd";
import React from "react";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any, any>;
  name: string;
  type?: "user" | "admin";
}
export default function RegionInput(props: Props) {
  const { control, name } = props;
  const { data, isLoading, mutate } = useGetProvinces(props.type || "admin");

  React.useEffect(() => {
    mutate({});
  }, [mutate]);

  return (
    <>
      <Text variant="bodySmall">Region</Text>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            loading={isLoading}
            {...field}
            options={data?.data.map((item) => ({
              value: item.id,
              label: item.name,
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
