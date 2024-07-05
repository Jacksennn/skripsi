import React, { useState } from "react";
import { ProductsRespondType, useGetProducts } from "./api";
import { Modal, Table, message } from "antd";
import Text from "@/components/elements/text";
import Button from "@/components/elements/button";
import { formatPricing } from "@/common/price";

interface Props {
  target: (showModal: () => void) => React.ReactNode;
  onChoose: (product: ProductsRespondType) => void;
}

export default function AddProductModal(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKey, setSelectedRowKey] = useState<
    ProductsRespondType | undefined
  >();

  const [page, setPage] = React.useState<number>(1);

  const { data, isLoading } = useGetProducts(
    isModalOpen,
    { page },
    {
      onSuccess(data) {
        setPage(data.meta.current_page);
      },
    },
  );
  const onChoose = () => {
    if (!selectedRowKey?.id) {
      message.error({ content: "Please select at least one item / product" });
    } else {
      setSelectedRowKey(undefined);
      setIsModalOpen(false);
      props.onChoose(selectedRowKey!);
    }
  };
  return (
    <>
      {props.target(() => setIsModalOpen(true))}
      <Modal
        title={
          <Text variant="heading04" weight="semiBold">
            {"Add Product"}
          </Text>
        }
        width={900}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okText="Save Changes"
        footer={[
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
            key="cancel"
            disabled={isLoading}
          >
            Cancel
          </Button>,
          <Button
            variant="primary"
            htmlType="submit"
            key="submit"
            loading={isLoading}
            onClick={onChoose}
          >
            Choose
          </Button>,
        ]}
        styles={{
          content: {
            padding: 0,
          },
          header: {
            // borderBottom: `1px solid ${colors.gray100}`,
            padding: "16px 24px",
            marginBottom: 0,
          },
          body: {
            padding: 24,
          },
          footer: {
            marginTop: 0,
            padding: "0px 24px 24px",
          },
        }}
      >
        <Table
          virtual
          style={{
            fontSize: 14,
          }}
          rowSelection={{
            selectedRowKeys: [selectedRowKey?.id || ""],
            type: "radio",
          }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedRowKey(record);
            },
          })}
          columns={[
            {
              title: "Product Id",
              dataIndex: "sku_produk",
              width: 80,
            },
            {
              title: "Product Name",
              dataIndex: "nama_produk",
              width: 200,
            },
            {
              title: "Product Category",
              dataIndex: "kategori.nama_kategori",
              width: 120,
              render: (_, record) => record.kategori.nama_kategori,
            },
            {
              title: "Stock",
              dataIndex: "stok_produk",
              width: 120,
            },
            {
              title: "Price",
              dataIndex: "harga_produk",
              width: 200,
              render: (_, record) =>
                `${formatPricing.format(Number(record.harga_produk))},-`,
            },
          ]}
          dataSource={data?.data}
          rowKey={"id"}
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
      </Modal>
    </>
  );
}
