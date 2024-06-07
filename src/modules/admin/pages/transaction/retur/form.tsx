import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  ReturInput,
  ReturRespondType,
  useCreateRetur,
  useEditRetur,
} from "./api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Flex, Input, Spin, notification } from "antd";
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
import SalesSelect from "@/modules/admin/components/sales-select";
import { useGetSale } from "../sales/api";
import StatusReturSelect from "@/modules/admin/components/status-retur-select";

interface Props {
  data?: ReturRespondType;
}

type Inputs = {
  id_jual: string;
  id_user: string;
  tgl_retur: any;
  alasan_retur: string;
  status_retur: string;
  details: {
    [key: string]: {
      isChecked: boolean;
      jumlah_produk: number;
    };
  };
};
export default function ReturForm(props: Props) {
  const router = useRouter();
  const { data } = props;
  const { handleSubmit, control, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      tgl_retur: dayjs(),
      alasan_retur: "",
      details: {},
      id_jual: "",
      id_user: "",
      status_retur: "",
    },
  });
  const { mutateAsync, isLoading: isCreating } = useCreateRetur();
  const { mutateAsync: mutateEdit, isLoading: isEditing } = useEditRetur();
  const [salesId, setSalesId] = useState<string>("");

  const { data: salesShow, isLoading } = useGetSale(
    {
      id: salesId,
    },
    {
      enabled: !!salesId,
      onSuccess(data) {
        setValue("id_user", data.data.user?.id);
      },
    },
  );

  React.useEffect(() => {
    if (data) {
      const temp: {
        [key: string]: { isChecked: boolean; jumlah_produk: number };
      } = {};
      data?.details?.forEach((detail) => {
        temp[detail?.id_detailjual] = {
          isChecked: true,
          jumlah_produk: detail.jumlah_produk,
        };
      });
      setSalesId(data.id_jual);
      const input: Inputs = {
        details: temp,
        alasan_retur: data?.alasan_retur,
        id_jual: data?.id_jual,
        id_user: data?.user?.id,
        tgl_retur: dayjs(data?.tgl_retur, "YYYY-MM-DD") || dayjs(),
        status_retur: data?.status_retur,
      };
      Object.keys(input).forEach((key) =>
        setValue(key as any, (input as any)[key]),
      );
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      const temp: {
        id_detailjual: string;
        jumlah_produk: number;
      }[] = [];
      Object.keys(values.details).forEach((key) => {
        if (values.details[key].isChecked) {
          temp.push({
            id_detailjual: key,
            jumlah_produk: values.details[key].jumlah_produk,
          });
        }
      });
      const input: ReturInput = {
        ...values,
        details: temp,
      };
      const res = data
        ? await mutateEdit({ data: input, id: data?.id })
        : await mutateAsync(input);
      notification.success({ message: res?.message });
      queryClient.refetchQueries(["daftar-pembelian"]);

      reset();
      router.push("/admin/report");
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  return (
    <FormLayout
      title={`Direct Transaction > ${data ? "Edit" : "Add new"} Retur`}
    >
      {isLoading && <Spin fullscreen />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardWrapper title="Retur Invoice">
          <SectionContainerForm>
            <SectionForm>
              <SalesSelect
                control={control}
                name="id_jual"
                onChange={(value) => {
                  setSalesId(value.id);
                  setValue("details", {});
                }}
                disabled={!!data}
              />
            </SectionForm>
            <SectionForm>
              <DatePicker
                label="Invoice Date"
                required
                control={control}
                name="tgl_retur"
              ></DatePicker>
            </SectionForm>
          </SectionContainerForm>
          <SectionContainerForm>
            <SectionForm>
              <div style={{ marginBottom: 16 }}>
                <Text variant="bodySmall">
                  User ID
                  <span className="asterisk">*</span>
                </Text>

                <Input
                  type="text"
                  value={salesShow?.data?.user?.id || ""}
                  disabled={true}
                ></Input>
              </div>
            </SectionForm>
            <SectionForm>
              <BaseInput
                control={control}
                name="alasan_retur"
                type="textarea"
                required
                label="Reason of Retur"
              ></BaseInput>
            </SectionForm>
          </SectionContainerForm>
          <SectionContainerForm>
            <SectionForm></SectionForm>
            <SectionForm>
              <StatusReturSelect control={control} name="status_retur" />
            </SectionForm>
          </SectionContainerForm>
          <FormItem control={control} sales={salesShow?.data} />
        </CardWrapper>
        <Flex gap={16} justify="end">
          <CancelButton />
          <Button htmlType="submit">Save</Button>
        </Flex>
      </form>
    </FormLayout>
  );
}
