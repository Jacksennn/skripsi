import React from "react";
import { Control, Controller } from "react-hook-form";

import Text from "@/components/elements/text";
import { Select } from "antd";
import { UseQueryResult, useQuery } from "react-query";
import { MetaType } from "@/api/type";
import { queryFetch } from "@/common/fetch-hook";

interface Props {
  control: Control<any, any>;
  name: string;
  onChange: (data: UsersRespondType | undefined) => void;
}

export type UsersRespondType = {
  id: string;
  no_user: string;
  nama_user: string;
  notelp_user: string;
  alamat_user: string;
};
export type GetUsersRespond = {
  data: UsersRespondType[];
  meta: MetaType;
};

export const useGetUsers = (): UseQueryResult<GetUsersRespond, unknown> => {
  return useQuery({
    queryFn: async (input) =>
      await queryFetch({
        endpoint: "users",
        method: "GET",
        type: "admin",
      }),
    queryKey: ["users"],
  });
};

export default function UserSelect(props: Props) {
  const { control, name, onChange } = props;
  const { data, isLoading } = useGetUsers();

  return (
    <div className="mb">
      <Text variant="bodySmall">
        Customer Nama
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
            placeholder="Customer Nama"
            options={data?.data?.map((item) => ({
              value: item.id,
              label: item.nama_user,
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
