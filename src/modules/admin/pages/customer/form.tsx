import React, { useState } from "react";
import {
  CustomerInput,
  useCreateCustomer,
  useEditCustomer,
  useGetCustomer,
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
type Inputs = CustomerInput;

interface Props {
  target: (showModal: () => void) => React.ReactNode;
  id?: string;
  refetch: () => void;
}

export default function CustomerForm(props: Props) {
  const { handleSubmit, control, setValue, reset } = useForm<Inputs>();
  const { mutateAsync, isLoading: isCreating } = useCreateCustomer();
  const { mutateAsync: mutateEdit, isLoading: isEditing } = useEditCustomer();
  const { id } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    isLoading: isGetCustomerLoading,
    isRefetching: isGetCustomerRefetching,
  } = useGetCustomer(
    {
      id: id!,
    },
    {
      enabled: isModalOpen && !!id,
      onSuccess(data) {
        setValue("alamat_user", data.data.alamat_user);
        setValue("city", data.data.city);
        setValue("email_user", data.data.email_user);
        setValue("nama_user", data.data.nama_user);
        setValue("no_user", data.data.no_user);
        setValue("notelp_user", data.data.notelp_user);
        setValue("region", data.data.region);
        setValue("zip_code", data.data.zip_code);
      },
    },
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = id
        ? await mutateEdit({ data: { ...data, password: null }, id: id })
        : await mutateAsync(data);
      reset();
      notification.success({ message: res?.message });
      setIsModalOpen(false);
      props.refetch();
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
            {!id ? "Add New Customer" : "Edit Customer"}
          </Text>
        }
        open={isModalOpen}
        width={800}
        onCancel={() => setIsModalOpen(false)}
        okText="Save Changes"
        footer={[
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
            key="cancel"
            disabled={isCreating || isEditing}
          >
            Cancel
          </Button>,
          <Button
            variant="primary"
            htmlType="submit"
            key="submit"
            loading={isCreating || isEditing}
            onClick={handleSubmit(onSubmit)}
          >
            Save Changes
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
        {isGetCustomerLoading || isGetCustomerRefetching ? (
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
                    label="Customer ID"
                    name="no_user"
                    required
                    control={control}
                    noAsterisk
                  />
                </Col>
                <Col span={12}>
                  <Input
                    type="text"
                    label="Full Name"
                    name="nama_user"
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
                    name="email_user"
                    required
                    control={control}
                    noAsterisk
                  />
                </Col>
                <Col span={12}>
                  <Input
                    type="tel"
                    label="Phone Number"
                    name="notelp_user"
                    required
                    control={control}
                    noAsterisk
                  />
                </Col>
              </Row>
              {!id && (
                <>
                  <Row>
                    <Col span={24}>
                      <Input
                        type="password"
                        label="Password"
                        name="password"
                        required
                        control={control}
                        noAsterisk
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Input
                        type="password"
                        label="Password Confirmation"
                        name="password_confirmation"
                        required
                        control={control}
                        noAsterisk
                      />
                    </Col>
                  </Row>
                </>
              )}
              <Row>
                <Col span={24}>
                  <Input
                    type="text"
                    label="Full Address"
                    name="alamat_user"
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
                        label="Zip Code"
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
