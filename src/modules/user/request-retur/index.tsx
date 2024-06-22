import React from "react";
import { useGetCheckout } from "../checkout/api";
import { useRouter } from "next/router";
import { Flex, Spin, Table, message, notification } from "antd";
import Layout from "@/components/widget/layout";
import FormLayout from "@/modules/admin/components/form-layout";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useCreateRetur } from "./api";
import BaseInput from "@/components/elements/input/base-input";
import {
  SectionContainerForm,
  SectionForm,
} from "@/modules/admin/components/split-two-form";
import Input from "@/components/elements/input";
import Text from "@/components/elements/text";
import CardWrapper from "@/modules/admin/components/card-wrapper";
import CancelButton from "@/modules/admin/components/cancel-button";
import Button from "@/components/elements/button";
import { TrashSimple } from "@phosphor-icons/react";
import { formatPricing } from "@/common/price";
type Inputs = {
  id_jual: string;
  alasan_retur: string;
  details: {
    id_detailjual: string;
    jumlah_produk: number;
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
    discount: number;
    total: number;
  }[];
};

export default function RequestRetur() {
  const {
    query: { id },
    push,
  } = useRouter();

  const { handleSubmit, control, setValue, reset } = useForm<Inputs>();
  const { mutateAsync, isLoading: isCreating } = useCreateRetur();

  const { isLoading, isRefetching, data } = useGetCheckout(
    {
      id: id! as string,
    },
    {
      enabled: !!id,
      onError(err: any) {
        message.error(err?.message);
      },
      onSuccess(data) {
        const input: Inputs = {
          details: data.data.details.map((item) => ({
            id_detailjual: item.id,
            jumlah_produk: item.jumlah_produk,
            product_id: item.produk.sku_produk,
            product_name: item.produk.nama_produk,
            discount: Number(item.diskon_produk),
            price: Number(item.harga_produk),
            quantity: Number(item.jumlah_produk),
            total: Number(item.total_harga),
          })),
          alasan_retur: "",
          id_jual: data?.data?.id,
        };
        Object.keys(input).forEach((key) =>
          setValue(key as any, (input as any)[key]),
        );
      },
    },
  );

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      const res = await mutateAsync(values);
      notification.success({
        message:
          "Your refund will is on proces, contact us if you need your refund update",
      });
      notification.success({ message: res?.message });

      reset();
      push("/order-history");
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  const { remove, fields } = useFieldArray({
    control,
    name: "details",
  });

  return (
    <Layout>
      <FormLayout title="Delivered Orders > Request Retur">
        {isLoading && <Spin fullscreen />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardWrapper title="Retur Invoice">
            <SectionContainerForm>
              <SectionForm>
                <BaseInput
                  label="Order ID"
                  disabled
                  value={data?.data?.no_pemesanan}
                />
              </SectionForm>
              <SectionForm>
                <Input
                  control={control}
                  name="alasan_retur"
                  type="textarea"
                  required
                  label="Reason of Retur"
                ></Input>
              </SectionForm>
            </SectionContainerForm>
            <Table
              virtual
              dataSource={fields || []}
              style={{
                fontSize: 14,
                marginTop: 24,
              }}
              pagination={false}
              columns={[
                {
                  title: "Product ID",
                  dataIndex: "product_id",
                  width: 100,
                },
                {
                  title: "Product Name",
                  dataIndex: "product_name",
                },
                {
                  title: "Quantity",
                  dataIndex: "jumlah_produk",
                  width: 120,
                },

                {
                  title: "Price",
                  dataIndex: "harga_produk",
                  width: 120,
                  render: (_, record) =>
                    `${formatPricing.format(record.price)},-`,
                },
                {
                  title: "Price",
                  dataIndex: "diskon_produk",
                  width: 120,
                  render: (_, record) =>
                    `${formatPricing.format(record.discount)},-`,
                },
                {
                  title: "Total",
                  dataIndex: "total",
                  width: 120,
                  align: "right",
                  render: (_, record) =>
                    `${formatPricing.format(record.total)},-`,
                },
                {
                  title: "Total",
                  dataIndex: "total",
                  width: 120,
                  align: "right",
                  render: (_, __, index) => (
                    <Button variant="white" onClick={() => remove(index)}>
                      <TrashSimple size={20} />
                    </Button>
                  ),
                },
              ]}
            ></Table>
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
                <Text variant="bodySmall">
                  {`${formatPricing.format(
                    fields.reduce(
                      (acc, curr) => (acc += Number(curr.price)),
                      0,
                    ),
                  )},-`}
                </Text>
                <Text variant="bodySmall">Discount:</Text>
                <Text variant="bodySmall">
                  {`${formatPricing.format(
                    fields.reduce(
                      (acc, curr) => (acc += Number(curr.discount)),
                      0,
                    ),
                  )},-`}
                </Text>

                <Text variant="bodyLarge" weight="semiBold">
                  Total Amount:
                </Text>
                <Text variant="bodyLarge" weight="semiBold">
                  {`${formatPricing.format(
                    fields.reduce(
                      (acc, curr) => (acc += Number(curr.total)),
                      0,
                    ),
                  )},-`}
                </Text>
              </div>
            </Flex>
          </CardWrapper>
          <Flex gap={16} justify="end">
            <CancelButton />
            <Button htmlType="submit">Send Request</Button>
          </Flex>
        </form>
      </FormLayout>
    </Layout>
  );
}
