import React from "react";
import { useFieldArray } from "react-hook-form";

import { Table } from "antd";
import Input from "@/components/elements/input";

import Button from "@/components/elements/button";
import AddProductModal from "../product/add-product-modal";
import AdjustmentDetailSelect from "../../components/adjustment-detail";
import { TrashSimple } from "@phosphor-icons/react";
import { formatPricing } from "@/common/price";

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
                noMb
                key={`details.${record.sku_produk}.jumlah_produk`}
                min={0}
              />
            ),
          },
          {
            title: "Harga",
            dataIndex: "harga_produk",
            render: (val) => formatPricing.format(val),
          },
          {
            title: "Penyesuaian",
            dataIndex: "adjustment",
            render: (_, record, index) => (
              <AdjustmentDetailSelect
                name={`details.${index}.adjustment`}
                control={control}
              />
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
            Tambah Produk
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
