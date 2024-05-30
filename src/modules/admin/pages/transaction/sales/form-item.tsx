import React from "react";
import { useController, useFieldArray, useFormContext } from "react-hook-form";
import { SaleInput } from "./api";
import { Table } from "antd";
import Input from "@/components/elements/input";
import AddProductModal from "../../product/add-product-modal";
import Button from "@/components/elements/button";

export default function FormItem({ control }: { control: any }) {
  const { fields, append } = useFieldArray({
    name: "details",
    control,
  });

  return (
    <>
      <Table
        virtual
        dataSource={fields}
        style={{
          fontSize: 14,
        }}
        columns={[
          {
            title: "Product Id",
            dataIndex: "id_produk",
            width: 80,
          },
          {
            title: "Product Name",
            dataIndex: "name",
            width: 200,
          },
          {
            title: "Quantity",
            dataIndex: "jumlah_produk",
            width: 120,
            render: (_, __, index) => (
              <Input
                type="number"
                variant="borderless"
                control={control}
                name={`details.${index}.jumlah_produk`}
              />
            ),
          },
          {
            title: "Price",
            dataIndex: "harga_produk",
            width: 120,
            render: (_, __, index) => (
              <Input
                type="number"
                variant="borderless"
                control={control}
                name={`details.${index}.harga_produk`}
              />
            ),
          },
          {
            title: "Discount",
            dataIndex: "diskon_produk",
            width: 200,
            render: (_, __, index) => (
              <Input
                type="number"
                variant="borderless"
                control={control}
                name={`details.${index}.diskon_produk`}
              />
            ),
          },
        ]}
      ></Table>
      <AddProductModal
        target={(show) => (
          <Button onClick={show} variant="white" info>
            Add New Product
          </Button>
        )}
        onChoose={(product) => {
          append({
            id_produk: product.id,
            name: product.nama_produk,
            diskon_produk: 0,
            harga_produk: product.harga_produk,
            jumlah_produk: 0,
          });
        }}
      />
    </>
  );
}
