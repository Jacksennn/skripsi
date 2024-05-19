import { useLogin } from "@/api/common";
import { login } from "@/common/fetch-hook";
import Button from "@/components/elements/button";
import Input from "@/components/elements/input";
import Text from "@/components/elements/text";
import { ArrowRight } from "@phosphor-icons/react";
import { Flex, notification } from "antd";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};
export default function SignInTab() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutateAsync, isLoading } = useLogin();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await mutateAsync(data);
      login(res?.data.access_token, "admin");
      notification.success({ message: "Logged In!" });
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        label="Email Address"
        name="username"
        required
        control={control}
        noAsterisk
      />

      <Input
        type="password"
        required
        name="password"
        control={control}
        noAsterisk
        label="Password"
      />
      <Button
        htmlType="submit"
        style={{ width: "100%", textTransform: "uppercase" }}
        size="middle"
        loading={isLoading}
      >
        <Flex align="center" justify="center" gap={12}>
          <Text variant="heading05" color="gray100" weight="bold">
            Sign In
          </Text>{" "}
          <ArrowRight size={20} />
        </Flex>
      </Button>
    </form>
  );
}
