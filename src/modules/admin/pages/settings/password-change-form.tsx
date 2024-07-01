import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormLayout from "../../components/form-layout";
import { Col, Row, message, notification } from "antd";
import Input from "@/components/elements/input";
import Button from "@/components/elements/button";
import { useChangePassword } from "./api";
import { removeAdminLoginToken } from "@/common/fetch-hook";
import { queryClient } from "@/common/query-client";
import { useRouter } from "next/router";
import { buttonContainer } from "@/modules/user/settings/styles.css";

type Inputs = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

export default function PasswordChangeForm() {
  const { handleSubmit, control, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      password_confirmation: "",
      password: "",
      current_password: "",
    },
  });

  const { mutateAsync, isLoading } = useChangePassword();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      const res = await mutateAsync(values);

      message.success(res?.message);

      reset();
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  const router = useRouter();

  const onLogout = async () => {
    removeAdminLoginToken();

    await queryClient.invalidateQueries();
    await queryClient.clear();
    notification.success({ message: "You've been logged out!" });
    router.push("/admin/sign-in");
  };
  return (
    <FormLayout title="Change Password">
      <form onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>
        <Row>
          <Col span={24}>
            <Input
              type="password"
              label="Current Password"
              name="current_password"
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
              label="New Password"
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
              label="Confirm Password"
              name="password_confirmation"
              required
              control={control}
              noAsterisk
            />
          </Col>
        </Row>
        <div className={buttonContainer}>
          <Button
            variant="primary"
            htmlType="submit"
            key="submit"
            onClick={handleSubmit(onSubmit)}
            loading={isLoading}
          >
            Change Password
          </Button>
          <Button
            variant="primary"
            htmlType="button"
            onClick={onLogout}
            loading={isLoading}
          >
            Log Out
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
