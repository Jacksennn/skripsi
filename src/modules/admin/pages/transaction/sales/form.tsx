import React, { useState } from "react";
import { SaleInput, useCreateSale, useEditSale } from "./api";
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

type Inputs = SaleInput;

export default function SalesForm() {
  const { handleSubmit, control, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      details: [],
      id_user: "",
      metode_bayar: "",
      status_pemesanan: "",
      status_pembayaran: "",
      tgl_pemesanan: new Date(),
    },
  });
  const { mutateAsync, isLoading: isCreating } = useCreateSale();
  const { mutateAsync: mutateEdit, isLoading: isEditing } = useEditSale();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // const res =
      //   ? await mutateEdit({ data: _data, id: product.id })
      const res = await mutateAsync(data);
      notification.success({ message: res?.message });
      //   queryClient.refetchQueries(["daftar-produk"]);

      // reset();
      // router.push("/admin/product");
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  const [customerId, setCustomerId] = useState<string>("");
  return (
    <FormLayout title="Direct Transaction > Add new sales">
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
              <BaseInput
                type="date"
                label="Invoice Date"
                required
                control={control}
                name="tgl_pemesanan"
              ></BaseInput>
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
