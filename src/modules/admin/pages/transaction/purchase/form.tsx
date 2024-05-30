import { useRouter } from "next/router";
import React, { useState } from "react";
import { PurchaseInput, useCreatePurchase, useEditPurchase } from "./api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Flex, Input, notification } from "antd";
import FormLayout from "@/modules/admin/components/form-layout";
import CardWrapper from "@/modules/admin/components/card-wrapper";
import AddProductModal from "../../product/add-product-modal";
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

interface Props {}

type Inputs = PurchaseInput;
export default function PurchaseForm(props: Props) {
  const router = useRouter();

  const { handleSubmit, control, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      details: [],
      id_supplier: "",
      payment_method: "",
      status_pembelian: "",
      tgl_pembelian: "",
    },
  });
  const { mutateAsync, isLoading: isCreating } = useCreatePurchase();
  const { mutateAsync: mutateEdit, isLoading: isEditing } = useEditPurchase();

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

  const [supplierId, setSupplierId] = useState<string>("");
  return (
    <FormLayout>
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
              <BaseInput
                type="date"
                label="Invoice Date"
                required
                control={control}
                name="tgl_pembelian"
              ></BaseInput>
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
          <Button variant="secondary">Cancel</Button>
          <Button htmlType="submit">Save</Button>
        </Flex>
      </form>
    </FormLayout>
  );
}
