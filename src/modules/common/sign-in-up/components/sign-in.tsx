import Input from "@/components/elements/input";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};
export default function SignInTab() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        label="Email Address"
        {...register("email")}
        required
      />

      <Input
        type="password"
        {...register("password")}
        required
        label="Password"
      />
      <button type="submit">heheh</button>
    </form>
  );
}
