import { useRouter } from "next/router";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormLayout from "../../components/form-layout";
import { Flex, Image } from "antd";
import Avatar from "@/svg/Avatar.svg";
import Input from "@/components/elements/input";
import {
  SectionContainerForm,
  SectionForm,
} from "../../components/split-two-form";

type Inputs = {
  fullname: string;
  username: string;
  email: string;
  phoneNumber: string;
  fullAddress: string;
  region: string;
  city: string;
  zipCode: string;
};
export default function SettingAccountInformationForm() {
  const router = useRouter();

  const { handleSubmit, control, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      city: "",
      email: "",
      fullAddress: "",
      fullname: "",

      phoneNumber: "",
      region: "",
      username: "",
      zipCode: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
    } catch {}
  };

  return (
    <FormLayout title="Account Setting">
      <Flex gap={20}>
        <Image width={170} height={170} src={Avatar} alt="avatar" />

        <form onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>
          <SectionContainerForm>
            <SectionForm>
              <Input
                type="text"
                name="fullname"
                control={control}
                placeholder={"Full Name"}
              ></Input>
            </SectionForm>
            <SectionForm>
              <Input
                type="text"
                name="fullname"
                control={control}
                placeholder={"Full Name"}
              ></Input>
            </SectionForm>
          </SectionContainerForm>
        </form>
      </Flex>
    </FormLayout>
  );
}
