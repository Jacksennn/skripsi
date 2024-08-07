import React, { useState } from "react";
import { useGetCheckout } from "../checkout/api";
import Modal from "antd/es/modal/Modal";
import Text from "@/components/elements/text";
import { colors } from "@/theming/colors";
import {
  SectionContainerForm,
  SectionForm,
} from "@/modules/admin/components/split-two-form";
import BaseInput from "@/components/elements/input/base-input";
import { Flex, Spin, Table } from "antd";
import dayjs from "dayjs";
import { formatPricing } from "@/common/price";

interface Props {
  target: (showModal: () => void) => React.ReactNode;
  id: string;
  status: string;
}

export default function OrderHistoryDetail(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, status } = props;
  const { isLoading, isRefetching, data } = useGetCheckout(
    {
      id: id!,
    },
    {
      enabled: isModalOpen && !!id,
    },
  );

  return (
    <>
      {props.target(() => setIsModalOpen(true))}
      <Modal
        title={
          <Text variant="heading04" weight="semiBold">
            Order Detil
          </Text>
        }
        open={isModalOpen}
        width={800}
        onCancel={() => setIsModalOpen(false)}
        footer={<></>}
        styles={{
          content: {
            padding: 0,
          },
          header: {
            borderBottom: `1px solid ${colors.gray100}`,
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
        {isLoading || isRefetching ? (
          <Flex justify="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <>
            <SectionContainerForm>
              <SectionForm>
                <BaseInput
                  value={data?.data?.no_pemesanan}
                  label={"ID Pemesanan"}
                  disabled
                ></BaseInput>
              </SectionForm>
              <SectionForm>
                <BaseInput
                  value={status}
                  label={"Status Pemesanan"}
                  disabled
                ></BaseInput>
              </SectionForm>
            </SectionContainerForm>
            <SectionContainerForm>
              <SectionForm>
                <BaseInput
                  value={
                    data?.data?.tgl_pemesanan
                      ? `${dayjs(new Date(data?.data?.tgl_pemesanan), {
                          utc: false,
                        }).format("DD/MM/YYYY, hh:mm A")}`
                      : ""
                  }
                  label={"Tanggal Pemesanan"}
                  disabled
                ></BaseInput>
              </SectionForm>
              <SectionForm>
                <BaseInput
                  value={"XENDIT"}
                  label={"Metode Pembayaran"}
                  disabled
                ></BaseInput>
              </SectionForm>
            </SectionContainerForm>
            <SectionContainerForm>
              <SectionForm>
                <BaseInput
                  value={data?.data["jasa_kirim "] || "-"}
                  label={"Delivery Method"}
                  disabled
                ></BaseInput>
              </SectionForm>
              <SectionForm></SectionForm>
            </SectionContainerForm>
            <Table
              virtual
              dataSource={data?.data?.details || []}
              style={{
                fontSize: 14,
              }}
              pagination={false}
              columns={[
                {
                  title: "ID Produk",
                  dataIndex: "id",
                  width: 80,
                  render: (_, record) => record.produk?.sku_produk,
                },
                {
                  title: "Produk",
                  dataIndex: "produk",
                  width: 200,
                  render: (_, record) => record.produk?.nama_produk,
                },
                {
                  title: "Kuantitas",
                  dataIndex: "jumlah_produk",
                  width: 120,
                },
                {
                  title: "Harga",
                  dataIndex: "harga_produk",
                  width: 120,
                  render: (_, record) =>
                    `${formatPricing.format(
                      Number(record.harga_produk || 0),
                    )},-`,
                },
                {
                  title: "Harga",
                  dataIndex: "diskon_produk",
                  width: 120,
                  render: (_, record) =>
                    `${formatPricing.format(
                      Number(record.diskon_produk || 0),
                    )},-`,
                },
                {
                  title: "Total",
                  dataIndex: "total",
                  width: 120,
                  align: "right",
                  render: (_, record) =>
                    `${formatPricing.format(
                      Number(record.total_harga || 0),
                    )},-`,
                },
              ]}
            ></Table>
            <Flex justify="flex-end">
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
                <Text variant="bodySmall">
                  {`${formatPricing.format(
                    Number(
                      data?.data?.details.reduce(
                        (acc, curr) => (acc += Number(curr.total_harga)),
                        0,
                      ),
                    ),
                  )},-`}
                </Text>
                <Text variant="bodySmall">Diskon:</Text>
                <Text variant="bodySmall">
                  {`${formatPricing.format(
                    Number(
                      data?.data?.details.reduce(
                        (acc, curr) => (acc += Number(curr.diskon_produk)),
                        0,
                      ),
                    ),
                  )},-`}
                </Text>

                <Text variant="bodyLarge" weight="semiBold">
                  Total:
                </Text>
                <Text variant="bodyLarge" weight="semiBold">
                  {`${formatPricing.format(
                    Number(
                      data?.data?.details.reduce(
                        (acc, curr) =>
                          (acc +=
                            Number(curr.total_harga) -
                            Number(curr.diskon_produk)),
                        0,
                      ),
                    ),
                  )},-`}
                </Text>
              </div>
            </Flex>
          </>
        )}
      </Modal>
    </>
  );
}
