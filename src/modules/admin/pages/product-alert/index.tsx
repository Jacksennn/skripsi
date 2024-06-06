import React from "react";
import { useGetProduct } from "../product/api";
import { useGetProductAlert } from "./api";
import AdminLayout from "../../components/admin-layout";
import Text from "@/components/elements/text";
import { Flex, Image, Table, Typography } from "antd";

export default function ProductAlert() {
  const { data, refetch, isLoading } = useGetProductAlert();
  return (
    <AdminLayout>
      <Text variant="bodyXxl" style={{ marginBottom: 8 }}>
        Product Alert
      </Text>
      <Text variant="bodySmall" color="gray500" className="mb">
        Product Alert will be updated everyday at 00:00 WIB
      </Text>
      <Table
        virtual
        loading={isLoading}
        columns={[
          {
            title: "Products",
            dataIndex: "nama_produk",
            width: 200,
            render: (a, data, index) => {
              return (
                <Flex gap={12}>
                  <Image
                    src={data?.file?.foto_url}
                    width={80}
                    height={80}
                    alt="foto-produk"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                  <div>
                    <Text variant="bodyTiny" color="secondary500">
                      {data.sku_produk}
                    </Text>
                    <Text variant="bodyTiny">{data.nama_produk}</Text>
                  </div>
                </Flex>
              );
            },
          },
          {
            title: "Price",
            dataIndex: "harga_produk",
            width: 120,
          },
          {
            title: "Quantity",
            dataIndex: "stok_produk",
            width: 120,
            render: (_, record) => (
              <Text
                color={record.stok_produk < 0 ? "danger500" : "success500"}
                variant="bodySmall"
              >
                {record.stok_produk}
              </Text>
            ),
          },
          {
            title: "Minimum Quantity",
            dataIndex: "min_produk",
            width: 120,
            render: (_, record) => (
              <Text variant="bodySmall" weight="semiBold">
                {record.min_produk}
              </Text>
            ),
          },
        ]}
        dataSource={data?.data || []}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
    </AdminLayout>
  );
}
