import { formatPricing } from "@/common/price";
import React from "react";
import { useWatch } from "react-hook-form";

export default function TotalPerRowcomponent({
  index,
  control,
}: {
  index: number;
  control: any;
}) {
  const detail = useWatch({ control, name: `details.${index}` });
  return (
    <>
      {formatPricing.format(
        detail.harga_produk * detail.jumlah_produk - detail.diskon_produk || 0,
      )}
    </>
  );
}
