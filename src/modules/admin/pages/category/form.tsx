import React, { useState } from "react";
import {
  CategoryInput,
  useCreateCategory,
  useEditCategory,
  useGetCategory,
} from "./api";
import { SubmitHandler, useForm } from "react-hook-form";
import { Flex, Modal, Spin, notification } from "antd";
import Input from "@/components/elements/input";
import Text from "@/components/elements/text";
import { colors } from "@/theming/colors";
import Button from "@/components/elements/button";
type Inputs = CategoryInput;

interface Props {
  target: (showModal: () => void) => React.ReactNode;
  id?: string;
  refetch: () => void;
}

export default function CategoryForm(props: Props) {
  const { handleSubmit, control, setValue, reset } = useForm<Inputs>();
  const { mutateAsync, isLoading: isCreating } = useCreateCategory();
  const { mutateAsync: mutateEdit, isLoading: isEditing } = useEditCategory();
  const { id } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isLoading: isGetCategoryLoading,
    isRefetching: isGetCategoryRefetching,
  } = useGetCategory(
    {
      id: id!,
    },
    {
      enabled: isModalOpen && !!id,
      onSuccess(data) {
        setValue("nama_kategori", data.data.nama_kategori);
      },
    },
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = id
        ? await mutateEdit({ data, id: id })
        : await mutateAsync(data);
      notification.success({ message: res?.message });
      reset();
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
            {!id ? "Add New Kategori" : "Edit Kategori"}
          </Text>
        }
        open={isModalOpen}
        width={400}
        onCancel={() => setIsModalOpen(false)}
        okText="Simpan"
        footer={[
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
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
        {isGetCategoryLoading || isGetCategoryRefetching ? (
          <Flex justify="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              label="Kategori Nama"
              placeholder="Kategori Nama"
              name="nama_kategori"
              required
              control={control}
              noAsterisk
            />
          </form>
        )}
      </Modal>
    </>
  );
}
