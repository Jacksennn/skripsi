import React from "react";
import { Control, useWatch } from "react-hook-form";
import { SaleInput } from "./api";
import Text from "@/components/elements/text";
import { formatPricing } from "@/common/price";
import { Flex } from "antd";
interface Props {
  control: Control<SaleInput, any>;
}

export default function SaleTotalComponent(props: Props) {
  const details = useWatch({
    control: props.control,
    name: "details",
  });

  const amount = details.reduce(
    (acc, curr) =>
      (acc += Number(curr.harga_produk) * Number(curr.jumlah_produk)),
    0,
  );

  const discount = details.reduce(
    (acc, curr) => (acc += Number(curr.diskon_produk)),
    0,
  );
  return (
    <Flex justify="flex-end" style={{ marginTop: 64 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          maxWidth: 400,
          justifyItems: "end",
        }}
      >
        <Text variant="bodySmall">Amount:</Text>
        <Text variant="bodySmall">{`${formatPricing.format(amount)},-`}</Text>
        <Text variant="bodySmall">Discount:</Text>
        <Text variant="bodySmall">{`${formatPricing.format(discount)},-`}</Text>

        <Text variant="bodyLarge" weight="semiBold">
          Total Amount:
        </Text>
        <Text variant="bodyLarge" weight="semiBold">
          {`${formatPricing.format(amount - discount)},-`}
        </Text>
      </div>
    </Flex>
  );
}
