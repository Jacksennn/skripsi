import React from "react";
import { useGetProduct } from "../product/api";
import { useGetProductAlert } from "./api";
import AdminLayout from "../../components/admin-layout";
import Text from "@/components/elements/text";
import { Flex, Image, Table, Typography } from "antd";
import { formatPricing } from "@/common/price";

export default function ProductAlert() {
  const [page, setPage] = React.useState<number>(1);

  const { data, refetch, isLoading } = useGetProductAlert(true, { page });
  return (
    <AdminLayout>
      <Text variant="bodyXxl" style={{ marginBottom: 8 }}>
        Notifikasi Produk
      </Text>
      <Text variant="bodySmall" color="gray500" className="mb">
        Notifikasi Produk akan di perbaharui setiap 00:00 WIB
      </Text>
      <Table
        virtual
        loading={isLoading}
        columns={[
          {
            title: "Produk",
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
            title: "Harga",
            dataIndex: "harga_produk",
            width: 120,
            render: (_, record) =>
              formatPricing.format(Number(record.harga_produk)),
          },
          {
            title: "Kuantitas",
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
            title: "Kuantitas Minimal",
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
          current: page,

          total: data?.meta?.total,
          pageSize: 15,
          showSizeChanger: false,
          onChange(page) {
            setPage(page);
          },
        }}
      />
    </AdminLayout>
  );
}
