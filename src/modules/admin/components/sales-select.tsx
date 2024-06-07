import React from "react";
import { Control, Controller } from "react-hook-form";
import Text from "@/components/elements/text";
import { Select } from "antd";
import { SalesRespondType, useGetSales } from "../pages/transaction/sales/api";
type SaleType = {
  id: string;
  no_pemesanan: string;
  no_user: string;
  produk: string;
  produk_tersembunyi: number;
  total_qty: number;
  total_harga: number;
  status_pembayaran: string;
  status_pemesanan: string;
};

interface Props {
  control: Control<any, any>;
  name: string;
  onChange: (data: SaleType) => void;
  disabled?: boolean;
}

export default function SalesSelect(props: Props) {
  const { control, name, onChange, disabled } = props;
  const { data, isLoading } = useGetSales({ limit: -1 }, {});

  const datas: SaleType[] = React.useMemo(
    () => Object.values(data?.data || {}).flat(),
    [data?.data],
  );

  return (
    <div className="mb">
      <Text variant="bodySmall">
        Order ID
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
              onChange(datas[datas.findIndex((item) => item.id === value)]);
            }}
            options={datas.map((item) => ({
              value: item.id,
              label: item.no_pemesanan,
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
