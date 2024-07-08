import React, { useState } from "react";
import {
  ProductAdjustmentInput,
  useCreateProductAdjustment,
  useEditProductAdjustment,
  useGetProductAdjustment,
} from "./api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Flex, Modal, Spin, notification } from "antd";
import Text from "@/components/elements/text";
import Button from "@/components/elements/button";
import { colors } from "@/theming/colors";
import Input from "@/components/elements/input";
import {
  SectionContainerForm,
  SectionForm,
} from "../../components/split-two-form";
import AddProductModal from "../product/add-product-modal";
import FormItem from "./form-item";

interface Props {
  target: (showModal: () => void) => React.ReactNode;
  id?: string;
  refetch: () => void;
}

type Inputs = ProductAdjustmentInput;
export default function ProductAdjustmentForm(props: Props) {
  const { handleSubmit, control, setValue, reset } = useForm<Inputs>();
  const { mutateAsync, isLoading: isCreating } = useCreateProductAdjustment();
  const { mutateAsync: mutateEdit, isLoading: isEditing } =
    useEditProductAdjustment();
  const { id } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isLoading: isGetAdjustmentLoading,
    isRefetching: isGetAdjustmentRefetching,
  } = useGetProductAdjustment(
    {
      id: id!,
    },
    {
      enabled: isModalOpen && !!id,
      onSuccess(data) {
        const temp: Inputs = {
          ...data.data,
          details: data.data.details.map((item) => ({
            id_produk: item.produk.id,
            sku_produk: item.produk.sku_produk,
            adjustment: item.adjustment,
            harga_produk: Number(item.harga_produk),
            jumlah_produk: item.jumlah_produk,
            name: item.produk.nama_produk,
          })),
        };
        Object.keys(temp).forEach((key) =>
          setValue(key as any, (temp as any)[key]),
        );
      },
    },
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = id
        ? await mutateEdit({ data, id: id })
        : await mutateAsync(data);
      notification.success({ message: res?.message });

      reset({ details: [], alasan_adjust: "", nama_adjust: "" });
      setIsModalOpen(false);
      props.refetch();
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  return (
    <>
      {props.target(() => setIsModalOpen(true))}
      <Modal
        title={
          <Text variant="heading04" weight="semiBold">
            {!id ? "Tambah Penyusuaian Produk" : "Edit Penyusuaian Produk"}
          </Text>
        }
        open={isModalOpen}
        width={800}
        onCancel={() => {
          setIsModalOpen(false);
          reset({ details: [], alasan_adjust: "", nama_adjust: "" });
        }}
        okText="Simpan"
        footer={[
          <Button
            variant="secondary"
            onClick={() => {
              setIsModalOpen(false);
              reset({ details: [], alasan_adjust: "", nama_adjust: "" });
            }}
            key="cancel"
            disabled={isCreating || isEditing}
          >
            Batal
          </Button>,
          <Button
            variant="primary"
            htmlType="submit"
            key="submit"
            loading={isCreating || isEditing}
            onClick={handleSubmit(onSubmit)}
          >
            Simpan
          </Button>,
        ]}
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
        {isGetAdjustmentLoading || isGetAdjustmentRefetching ? (
          <Flex justify="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <SectionContainerForm>
              <SectionForm>
                <Input
                  type="text"
                  label="Nama Penyesuaian"
                  placeholder="Nama Penyesuaian"
                  name="nama_adjust"
                  required
                  control={control}
                />
              </SectionForm>
              <SectionForm>
                <Input
                  type="textarea"
                  label="Alasan"
                  placeholder="Alasan"
                  name="alasan_adjust"
                  required
                  control={control}
                />
              </SectionForm>
            </SectionContainerForm>
            <FormItem control={control} />
          </form>
        )}
      </Modal>
    </>
  );
}
