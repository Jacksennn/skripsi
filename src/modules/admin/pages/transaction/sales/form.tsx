import React, { useState } from "react";
import { SaleInput, SaleRespondType, useCreateSale, useEditSale } from "./api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Flex, Input, notification } from "antd";
import FormLayout from "@/modules/admin/components/form-layout";
import CardWrapper from "@/modules/admin/components/card-wrapper";
import CancelButton from "@/modules/admin/components/cancel-button";
import Button from "@/components/elements/button";
import {
  SectionContainerForm,
  SectionForm,
} from "@/modules/admin/components/split-two-form";
import Text from "@/components/elements/text";
import BaseInput from "@/components/elements/input";
import PaymentMethodSelect from "@/modules/admin/components/payment-method-select";
import StatusPenjualanSelect from "@/modules/admin/components/status-penjualan-select";
import FormItem from "./form-item";
import UserSelect from "@/modules/admin/components/user-select";
import StatusPembayaranSelect from "@/modules/admin/components/status-pembayaran-select";
import dayjs from "dayjs";
import DatePicker from "@/components/elements/input/date-picker";
import { queryClient } from "@/common/query-client";
import { useRouter } from "next/router";

type Inputs = SaleInput;

interface Props {
  data?: SaleRespondType;
}

export default function SalesForm(props: Props) {
  const { data } = props;
  const { handleSubmit, control, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      details: [],
      id_user: "",
      metode_bayar: "",
      status_pemesanan: "",
      status_pembayaran: "",
      tgl_pemesanan: dayjs(),
    },
  });
  const { mutateAsync, isLoading: isCreating } = useCreateSale();
  const { mutateAsync: mutateEdit, isLoading: isEditing } = useEditSale();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      // const res =
      //   ? await mutateEdit({ data: _data, id: product.id })
      const res = data
        ? await mutateEdit({ data: values, id: data?.id })
        : await mutateAsync(values);
      notification.success({ message: res?.message });
      queryClient.refetchQueries(["daftar-penjualan"]);

      reset();
      router.push("/admin/report");
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  const [customerId, setCustomerId] = useState<string>("");

  React.useEffect(() => {
    if (data) {
      const temp: Inputs = {
        details:
          data?.details.map((item) => ({
            diskon_produk: Number(item.diskon_produk),
            harga_produk: Number(item.harga_produk),
            id_produk: item.product.id,
            jumlah_produk: Number(item.jumlah_produk),
            name: item.product.nama_produk,
          })) || [],
        id_user: data?.user?.id || "",
        metode_bayar: data?.metode_bayar || "",
        status_pembayaran: data?.status_pembayaran || "",
        tgl_pemesanan: data?.tgl_pemesanan
          ? dayjs(data?.tgl_pemesanan, "YYYY-MM-DD")
          : dayjs(),
        status_pemesanan: data?.status_pemesanan || "",
      };
      Object.keys(temp).forEach((key) =>
        setValue(key as any, (temp as any)[key]),
      );
    }
  }, [data, setValue]);
  return (
    <FormLayout
      title={`Direct Transaction > ${data ? "Edit" : "Add new"} Sales`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardWrapper title="Customer Invoice">
          <SectionContainerForm>
            <SectionForm>
              <div style={{ marginBottom: 16 }}>
                <Text variant="bodySmall">
                  Customer ID
                  <span className="asterisk">*</span>
                </Text>

                <Input
                  type="text"
                  value={customerId}
                  disabled={true}
                  placeholder={"Choose Customer Name"}
                ></Input>
              </div>

              <UserSelect
                control={control}
                name="id_user"
                onChange={(data) => setCustomerId(data?.id || "")}
              />
            </SectionForm>
            <SectionForm>
              <DatePicker
                label="Invoice Date"
                required
                control={control}
                name="tgl_pemesanan"
              ></DatePicker>
              <PaymentMethodSelect control={control} name="metode_bayar" />
              <div style={{ marginBottom: 16 }}></div>

              <StatusPembayaranSelect
                control={control}
                name="status_pembayaran"
              />
              <div style={{ marginBottom: 16 }}></div>
              <StatusPenjualanSelect
                control={control}
                name="status_pemesanan"
              />
            </SectionForm>
          </SectionContainerForm>
          <FormItem control={control} />
        </CardWrapper>
        <Flex gap={16} justify="end">
          <CancelButton />
          <Button htmlType="submit" loading={isCreating || isEditing}>
            Save
          </Button>
        </Flex>
      </form>
    </FormLayout>
  );
}
