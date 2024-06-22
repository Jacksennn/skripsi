import React from "react";
import { Flex, Table } from "antd";
import Input from "@/components/elements/input";
import { SaleRespondType } from "../sales/api";
import { formatPricing } from "@/common/price";

export default function FormItem({
  control,
  sales,
}: {
  control: any;
  sales?: SaleRespondType;
}) {
  return (
    <>
      <Table
        virtual
        dataSource={sales?.details || []}
        style={{
          fontSize: 14,
          marginTop: 24,
        }}
        columns={[
          {
            title: "Retur",
            dataIndex: "action",
            width: 50,
            render: (_, record, index) => (
              <Flex align="center">
                <Input
                  type="checkbox"
                  name={`details.${record.id}.isChecked`}
                  control={control}
                />
              </Flex>
            ),
          },
          {
            title: "Product Name",
            dataIndex: "product",
            width: 200,
            render: (_, record, index) => record.product.nama_produk,
          },
          {
            title: "Quantity",
            dataIndex: "jumlah_produk",
            width: 120,
          },
          {
            title: "Quantity",
            dataIndex: "qty",
            width: 120,
            render: (_, record, index) => (
              <Input
                type="number"
                variant="borderless"
                control={control}
                name={`details.${record.id}.jumlah_produk`}
                max={record.jumlah_produk}
                noMb={true}
              />
            ),
          },
          {
            title: "Price",
            dataIndex: "harga_produk",
            width: 200,
            render: (_, record) =>
              formatPricing.format(Number(record.harga_produk)),
          },
          {
            title: "Discount",
            dataIndex: "diskon_produk",
            width: 200,
            render: (_, record) =>
              formatPricing.format(Number(record.diskon_produk)),
          },
        ]}
      ></Table>
    </>
  );
}
