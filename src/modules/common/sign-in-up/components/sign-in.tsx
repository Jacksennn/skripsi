import { useLogin } from "@/api/common";
import { login } from "@/common/fetch-hook";
import Button from "@/components/elements/button";
import Input from "@/components/elements/input";
import Text from "@/components/elements/text";
import { ArrowRight } from "@phosphor-icons/react";
import { Flex, message, notification } from "antd";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth, googleProvider, useCreategoogleAcc } from "./register-api";
import GoogleIcon from "@/svg/Google.svg";
import { useRouter } from "next/router";

type Inputs = {
  username: string;
  password: string;
};

interface Props {
  type?: "default" | "admin";
}
const BASE = process.env.NEXT_PUBLIC_BASE_URL_REDIRECT;

export default function SignInTab(props: Props) {
  const { type = "default" } = props;

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const { mutateAsync, isLoading } = useLogin(
    type === "default" ? "user" : "admin",
  );
  const { mutateAsync: mutateGoogle, isLoading: isGoogleLoad } =
    useCreategoogleAcc();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await mutateAsync(data);
      login(res?.data.access_token, type === "default" ? "user" : "admin");
      notification.success({ message: "Logged In!" });
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  const onSignUpWithGoogle = async () => {
    message.info(
      "Mohon untuk tidak menutup jendela ini, Kami sedang memvalidasi akun anda ...",
    );
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        try {
          const res = await mutateGoogle({
            idToken: await result.user.getIdToken(),
            username: result.user.email!,
            password: null,
          });
          login(res?.data.access_token, "user");
          message.success(res.message);
          message.success("Berhasil Masuk!");
        } catch (e: any) {
          message.error(e?.message);
        }
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        message.error(errorMessage);
      });
  };

  const router = useRouter();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        label="Alamat Email"
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
        label={
          (
            <Flex>
              <Text variant="bodySmall">Password</Text>
              {type === "default" && (
                <Flex
                  justify="flex-end"
                  style={{ width: "100%", flex: 1, cursor: "pointer" }}
                  onClick={() => router.push("/forgot-password")}
                >
                  <Text
                    variant="bodySmall"
                    weight="regular"
                    color="secondary500"
                  >
                    Forget Password
                  </Text>
                </Flex>
              )}
            </Flex>
          ) as any
        }
        placeholder="Password"
      />
      <Button
        htmlType="submit"
        style={{ width: "100%", textTransform: "uppercase", marginBottom: 16 }}
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
      {type !== "admin" && (
        <Button
          style={{ width: "100%", textTransform: "uppercase" }}
          size="middle"
          loading={isLoading}
          variant="tertiary"
          onClick={onSignUpWithGoogle}
        >
          <Flex align="center" justify="center" gap={12}>
            <Image
              width={20}
              height={20}
              src={GoogleIcon}
              alt="google-icon"
            ></Image>
            <Text
              variant="heading05"
              weight="medium"
              style={{ textTransform: "capitalize" }}
            >
              Masuk dengan Google
            </Text>{" "}
            {/* <ArrowRight size={20} /> */}
          </Flex>
        </Button>
      )}
    </form>
  );
}
