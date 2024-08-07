import React from "react";
import { useController, useFieldArray, useFormContext } from "react-hook-form";
import { SaleInput } from "./api";
import { Table } from "antd";
import Input from "@/components/elements/input";
import AddProductModal from "../../product/add-product-modal";
import Button from "@/components/elements/button";
import { TrashSimple } from "@phosphor-icons/react";
import TotalPerRowcomponent from "./total-per-row-component";

export default function FormItem({ control }: { control: any }) {
  const { fields, append, remove } = useFieldArray({
    name: "details",
    control,
  });

  return (
    <>
      <Table
        virtual
        dataSource={fields}
        pagination={false}
        style={{
          fontSize: 14,
        }}
        columns={[
          {
            title: "ID Produk",
            dataIndex: "sku_produk",
            width: 80,
          },
          {
            title: "Nama Produk",
            dataIndex: "name",
            width: 200,
          },
          {
            title: "Kuantitas",
            dataIndex: "jumlah_produk",
            width: 120,
            render: (_, record: any, index) => (
              <Input
                type="number"
                variant="borderless"
                control={control}
                name={`details.${index}.jumlah_produk`}
                key={`details.${record.sku_produk}.jumlah_produk`}
              />
            ),
          },
          {
            title: "Harga",
            dataIndex: "harga_produk",
            width: 120,
            render: (_, record: any, index) => (
              <Input
                type="number"
                variant="borderless"
                control={control}
                name={`details.${index}.harga_produk`}
                key={`details.${record.sku_produk}.harga_produk`}
              />
            ),
          },
          {
            title: "Diskon",
            dataIndex: "diskon_produk",
            width: 200,
            render: (_, record, index) => (
              <Input
                type="number"
                variant="borderless"
                control={control}
                name={`details.${index}.diskon_produk`}
                key={`details.${record.sku_produk}.diskon_produk`}
              />
            ),
          },
          {
            title: "Total",
            dataIndex: "total",

            render: (_, record, index) => (
              <TotalPerRowcomponent index={index} control={control} />
            ),
          },
          {
            title: "",
            key: "operation",
            fixed: "right",
            width: 100,
            render: (_, __, index) => (
              <Button
                variant="white"
                error
                shape={"circle"}
                onClick={() => remove(index)}
              >
                <TrashSimple size={22} />
              </Button>
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
            sku_produk: product.sku_produk,
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
