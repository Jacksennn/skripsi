import React, { useState } from "react";
import {
  SupplierInput,
  useCreateSupplier,
  useEditSupplier,
  useGetSupplier,
} from "./api";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Col, Flex, Modal, Row, Spin, notification } from "antd";
import Input from "@/components/elements/input";
import Text from "@/components/elements/text";
import { colors } from "@/theming/colors";
import Button from "@/components/elements/button";
import Image from "next/image";
import Avatar from "@/svg/Avatar.svg";
import RegionInput from "@/modules/components/region-input";
import CityInput from "@/modules/components/city-input";
type Inputs = SupplierInput;

interface Props {
  target: (showModal: () => void) => React.ReactNode;
  id?: string;
  refetch: () => void;
}

export default function SupplierForm(props: Props) {
  const { handleSubmit, control, setValue, reset } = useForm<Inputs>();
  const { mutateAsync, isLoading: isCreating } = useCreateSupplier();
  const { mutateAsync: mutateEdit, isLoading: isEditing } = useEditSupplier();
  const { id } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isLoading: isGetSupplierLoading,
    isRefetching: isGetSupplierRefetching,
  } = useGetSupplier(
    {
      id: id!,
    },
    {
      enabled: isModalOpen && !!id,
      onSuccess(data) {
        setValue("alamat_supplier", data.data.alamat_supplier);
        setValue("city", data.data.city);
        setValue("email_supplier", data.data.email_supplier);
        setValue("nama_supplier", data.data.nama_supplier);
        setValue("no_supplier", data.data.no_supplier);
        setValue("notelp_supplier", data.data.notelp_supplier);
        setValue("region", data.data.region);
        setValue("zip_code", data.data.zip_code);
      },
    },
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = id
        ? await mutateEdit({ data, id: id })
        : await mutateAsync(data);
      notification.success({ message: res?.message });
      setIsModalOpen(false);
      props.refetch();
      reset();
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  const regionId = useWatch({
    name: "region",
    control: control,
  });

  return (
    <>
      {props.target(() => setIsModalOpen(true))}
      <Modal
        title={
          <Text variant="heading04" weight="semiBold">
            {!id ? "Tambah Supplier" : "Edit Supplier"}
          </Text>
        }
        open={isModalOpen}
        width={800}
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
        {isGetSupplierLoading || isGetSupplierRefetching ? (
          <Flex justify="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <Flex gap={20}>
            <Image width={170} height={170} src={Avatar} alt="avatar" />
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Input
                    type="text"
                    label="ID Supplier"
                    name="no_supplier"
                    required
                    control={control}
                    noAsterisk
                  />
                </Col>
                <Col span={12}>
                  <Input
                    type="text"
                    label="Nama Lengkap"
                    name="nama_supplier"
                    required
                    control={control}
                    noAsterisk
                  />
                </Col>
              </Row>

              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Input
                    type="email"
                    label="Email"
                    name="email_supplier"
                    required
                    control={control}
                    noAsterisk
                  />
                </Col>
                <Col span={12}>
                  <Input
                    type="tel"
                    label="Nomor Hp."
                    name="notelp_supplier"
                    required
                    control={control}
                    noAsterisk
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Input
                    type="text"
                    label="Alamat Lengkap"
                    name="alamat_supplier"
                    required
                    control={control}
                    noAsterisk
                  />
                </Col>
              </Row>
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <RegionInput control={control} name="region" />
                </Col>
                <Col span={12}>
                  <Row gutter={[16, 0]}>
                    <Col span={12}>
                      <CityInput
                        control={control}
                        name="city"
                        provinceId={regionId}
                      />
                    </Col>
                    <Col span={12}>
                      <Input
                        type="text"
                        label="Kode Pos"
                        name="zip_code"
                        required
                        control={control}
                        noAsterisk
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </form>
          </Flex>
        )}
      </Modal>
    </>
  );
}
