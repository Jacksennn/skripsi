import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  PurchaseInput,
  PurchaseRespondType,
  useCreatePurchase,
  useEditPurchase,
} from "./api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Flex, Input, notification } from "antd";
import FormLayout from "@/modules/admin/components/form-layout";
import CardWrapper from "@/modules/admin/components/card-wrapper";
import Button from "@/components/elements/button";
import {
  SectionContainerForm,
  SectionForm,
} from "@/modules/admin/components/split-two-form";
import SupplierSelect from "@/modules/admin/components/supplier-select";
import Text from "@/components/elements/text";
import BaseInput from "@/components/elements/input";
import PaymentMethodSelect from "@/modules/admin/components/payment-method-select";
import StatusPembelianSelect from "@/modules/admin/components/status-pembelian-select";
import FormItem from "./form-item";
import CancelButton from "@/modules/admin/components/cancel-button";
import { queryClient } from "@/common/query-client";
import dayjs from "dayjs";
import DatePicker from "@/components/elements/input/date-picker";

interface Props {
  data?: PurchaseRespondType;
}

type Inputs = PurchaseInput;
export default function PurchaseForm(props: Props) {
  const router = useRouter();
  const { data } = props;
  const { handleSubmit, control, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      details:
        data?.details.map((item) => ({
          diskon_produk: Number(item.diskon_produk),
          harga_produk: Number(item.harga_produk),
          id_produk: item.produk.id,
          jumlah_produk: Number(item.jumlah_produk),
          name: item.produk.nama_produk,
        })) || [],
      id_supplier: "",
      payment_method: data?.payment_method || "",
      status_pembelian: data?.status_pembelian || "",
      tgl_pembelian: data?.tgl_pembelian || dayjs(),
    },
  });
  const { mutateAsync, isLoading: isCreating } = useCreatePurchase();
  const { mutateAsync: mutateEdit, isLoading: isEditing } = useEditPurchase();

  React.useEffect(() => {
    if (data) {
      const temp: Inputs = {
        details:
          data?.details.map((item) => ({
            diskon_produk: Number(item.diskon_produk),
            harga_produk: Number(item.harga_produk),
            id_produk: item.produk.id,
            jumlah_produk: Number(item.jumlah_produk),
            name: item.produk.nama_produk,
          })) || [],
        id_supplier: "",
        payment_method: data?.payment_method || "",
        status_pembelian: data?.status_pembelian || "",
        tgl_pembelian: dayjs(data?.tgl_pembelian, "YYYY-MM-DD") || dayjs(),
      };
      Object.keys(temp).forEach((key) =>
        setValue(key as any, (temp as any)[key]),
      );
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      const res = data
        ? await mutateEdit({ data: values, id: data?.id })
        : await mutateAsync(values);
      notification.success({ message: res?.message });
      queryClient.refetchQueries(["daftar-pembelian"]);

      reset();
      router.push("/admin/report");
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  const [supplierId, setSupplierId] = useState<string>("");
  return (
    <FormLayout
      title={`Direct Transaction > ${data ? "Edit" : "Add new"} Purchase`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardWrapper title="Purchase Invoice">
          <SectionContainerForm>
            <SectionForm>
              <div style={{ marginBottom: 16 }}>
                <Text variant="bodySmall">
                  Supplier ID
                  <span className="asterisk">*</span>
                </Text>

                <Input
                  type="text"
                  value={supplierId}
                  disabled={true}
                  placeholder={"Choose Supplier Name"}
                ></Input>
              </div>
              <SupplierSelect
                control={control}
                name="id_supplier"
                onChange={(data) => setSupplierId(data?.id || "")}
              />
            </SectionForm>
            <SectionForm>
              <DatePicker
                label="Invoice Date"
                required
                control={control}
                name="tgl_pembelian"
              ></DatePicker>

              <PaymentMethodSelect control={control} name="payment_method" />
              <div style={{ marginBottom: 16 }}></div>
              <StatusPembelianSelect
                control={control}
                name="status_pembelian"
              />
            </SectionForm>
          </SectionContainerForm>
          <FormItem control={control} />
        </CardWrapper>
        <Flex gap={16} justify="end">
          <CancelButton />
          <Button htmlType="submit">Save</Button>
        </Flex>
      </form>
    </FormLayout>
  );
}
