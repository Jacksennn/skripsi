import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Col, Flex, Row, message, notification } from "antd";
import Avatar from "@/svg/Avatar.svg";
import Input from "@/components/elements/input";

import { MeRespondType, MeUpdateInput, useEditMe } from "./api";
import RegionInput from "@/modules/components/region-input";
import CityInput from "@/modules/components/city-input";
import Image from "next/image";
import { queryClient } from "@/common/query-client";
import Button from "@/components/elements/button";
import {
  SectionContainerForm,
  SectionForm,
} from "@/modules/admin/components/split-two-form";
import FormLayout from "@/modules/admin/components/form-layout";

type Inputs = MeUpdateInput;
export default function SettingAccountInformationForm({
  data,
}: {
  data?: MeRespondType;
}) {
  const router = useRouter();
  const { mutateAsync, isLoading: isCreating } = useEditMe();

  const { handleSubmit, control, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      nama_user: "",
      email_user: "",
      alamat_user: "",
      username: "",
      notelp_user: "",
      region: "",
      city: "",
      zipcode: "",
    },
  });

  React.useEffect(() => {
    if (data) {
      const temp: Inputs = {
        ...data,
        username: data.username || "",
      };
      Object.keys(temp).forEach((key) =>
        setValue(key as any, (temp as any)[key]),
      );
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      const res = await mutateAsync({ data: values, id: data?.id! });

      message.success(res?.message);

      queryClient.refetchQueries(["me-user"]);
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
    <FormLayout title="Account Setting">
      <Flex gap={20}>
        <Image width={170} height={170} src={Avatar} alt="avatar" />

        <form onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>
          <SectionContainerForm>
            <SectionForm>
              <Input
                type="text"
                name="nama_user"
                control={control}
                placeholder={"Full Name"}
                label={"Full Name"}
              ></Input>
            </SectionForm>
            <SectionForm>
              <Input
                type="text"
                name="username"
                control={control}
                placeholder={"Username"}
                label={"Username"}
              ></Input>
            </SectionForm>
          </SectionContainerForm>
          <SectionContainerForm>
            <SectionForm>
              <Input
                type="email"
                name="email_user"
                control={control}
                placeholder={"Email"}
                label={"Email"}
              ></Input>
            </SectionForm>
            <SectionForm>
              <Input
                type="tel"
                name="notelp_user"
                control={control}
                placeholder={"Phone Number"}
                label={"Phone Number"}
              ></Input>
            </SectionForm>
          </SectionContainerForm>
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
          <Row>
            <Col span={24}>
              <Input
                type="text"
                label="Full Address"
                name="alamat_supplier"
                required
                control={control}
                noAsterisk
              />
            </Col>
          </Row>
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <RegionInput control={control} name="region" type="user" />
            </Col>
            <Col span={12}>
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <CityInput
                    control={control}
                    name="city"
                    provinceId={regionId}
                    type="user"
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
          <Button
            variant="primary"
            htmlType="submit"
            key="submit"
            loading={isCreating}
            onClick={handleSubmit(onSubmit)}
          >
            Save Changes
          </Button>
        </form>
      </Flex>
    </FormLayout>
  );
}
