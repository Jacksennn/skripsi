import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import FormLayout from "../../components/form-layout";
import { Col, Flex, Row, message, notification } from "antd";
import Avatar from "@/svg/Avatar.svg";
import Input from "@/components/elements/input";
import {
  SectionContainerForm,
  SectionForm,
} from "../../components/split-two-form";
import { MeRespondType, MeUpdateInput, useEditMe } from "./api";
import RegionInput from "@/modules/components/region-input";
import CityInput from "@/modules/components/city-input";
import Image from "next/image";
import { queryClient } from "@/common/query-client";
import Button from "@/components/elements/button";

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
      nama_admin: "",
      email_admin: "",
      alamat_admin: "",
      username: "",
      notelp_admin: "",
      region: "",
      city: "",
      zip_code: "",
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

      queryClient.refetchQueries(["me-admin"]);
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
    <FormLayout title="Pengaturan Akun">
      <Flex gap={20}>
        <Image width={170} height={170} src={Avatar} alt="avatar" />

        <form onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>
          <SectionContainerForm>
            <SectionForm>
              <Input
                type="text"
                name="nama_admin"
                control={control}
                placeholder={"Nama Lengkap"}
                label={"Nama Lengkap"}
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
                name="email_admin"
                control={control}
                placeholder={"Email"}
                label={"Email"}
                disabled
              ></Input>
            </SectionForm>
            <SectionForm>
              <Input
                type="tel"
                name="notelp_admin"
                control={control}
                placeholder={"Nomor Hp."}
                label={"Nomor Hp."}
              ></Input>
            </SectionForm>
          </SectionContainerForm>
          <Row>
            <Col span={24}>
              <Input
                type="text"
                label="Alamat Lengkap"
                name="alamat_admin"
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
          <Button
            variant="primary"
            htmlType="submit"
            key="submit"
            loading={isCreating}
            onClick={handleSubmit(onSubmit)}
          >
            Simpan
          </Button>
        </form>
      </Flex>
    </FormLayout>
  );
}
