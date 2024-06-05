import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormLayout from "../../components/form-layout";
import { Col, Row } from "antd";
import Input from "@/components/elements/input";
import Button from "@/components/elements/button";

type Inputs = {
  password: string;
  new_password: string;
  confirm_password: string;
};

export default function PasswordChangeForm() {
  const { handleSubmit, control, setValue, reset } = useForm<Inputs>({
    defaultValues: {
      confirm_password: "",
      new_password: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
    } catch {}
  };
  return (
    <FormLayout title="Account Setting">
      <form onSubmit={handleSubmit(onSubmit)} style={{ flex: 1 }}>
        <Row>
          <Col span={24}>
            <Input
              type="password"
              label="Current Password"
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
              label="New Password"
              name="new_password"
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
              name="confirm_password"
              required
              control={control}
              noAsterisk
            />
          </Col>
        </Row>
        <Button
          variant="primary"
          htmlType="submit"
          key="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Change Password
        </Button>
      </form>
    </FormLayout>
  );
}
