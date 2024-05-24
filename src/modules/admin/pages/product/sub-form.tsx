import React, { useState } from "react";
import {
  ProductInput,
  ProductRespondType,
  useCreateProduct,
  useEditProduct,
} from "./api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Col, Row, notification } from "antd";
import { queryClient } from "@/common/query-client";
import FormLayout from "../../components/form-layout";
import CardWrapper from "../../components/card-wrapper";
import Input from "@/components/elements/input";
import Text from "@/components/elements/text";
import ImageUpload from "./upload-image";
import Button from "@/components/elements/button";
import { useRouter } from "next/router";

interface Props {
  product?: ProductRespondType;
  id?: string;
}

type Inputs = {
  id_kategori: string;
  sku_produk: string;
  nama_produk: string;
  harga_produk: number;
  ket_produk: string;
  min_produk: number;
  visibility: boolean;
  files: string[];
};
export default function ProductSubForm(props: Props) {
  const { id } = props;
  const router = useRouter();
  const { handleSubmit, control, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      files: [],
      harga_produk: 0,
      id_kategori: "",
      ket_produk: "",
      min_produk: 1,
      nama_produk: "",
      sku_produk: "",
      visibility: true,
    },
  });
  const { mutateAsync, isLoading: isCreating } = useCreateProduct();
  const { mutateAsync: mutateEdit, isLoading: isEditing } = useEditProduct();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const _data = {
        ...data,
        files: data.files.map((item, idx) => ({
          foto_produk: item,
          urutan: idx,
        })),
      };

      const res = id
        ? await mutateEdit({ data: _data, id: id })
        : await mutateAsync(_data);
      notification.success({ message: res?.message });
      queryClient.refetchQueries(["daftar-produk"]);
      reset();
      router.push("/admin/product");
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageUpload name="files" control={control} />
        <Row gutter={[16, 0]}>
          <Col span={15}>
            <CardWrapper title="Product Information">
              <Input
                type="text"
                label="Product ID"
                name="sku_produk"
                required
                control={control}
              />
              <Input
                type="text"
                label="Product Name"
                name="nama_produk"
                required
                control={control}
              />
              <Input
                type="text"
                label="Product Category"
                name="id_kategori"
                required
                control={control}
              />
              <Input
                type="textarea"
                label="Description"
                name="ket_produk"
                control={control}
              />
            </CardWrapper>
          </Col>
          <Col span={9}>
            <CardWrapper title="Properties">
              <Input
                type="number"
                label="Price"
                name="harga_produk"
                required
                control={control}
              />
              <Input
                type="number-control"
                label="Minimum Purchase Quantity"
                name="min_produk"
                required
                control={control}
              />
            </CardWrapper>
            <CardWrapper title="Visibility">
              <Text variant="bodyTiny" color="gray500">
                Allow users to see this product on the list
              </Text>
              <Input
                type="checkbox"
                label="Visibility"
                name="visibility"
                required
                control={control}
              />
            </CardWrapper>
          </Col>
        </Row>
        <Button htmlType="submit">hehe</Button>
      </form>
    </FormLayout>
  );
}
