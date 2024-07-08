import { login } from "@/common/fetch-hook";
import Button from "@/components/elements/button";
import Input from "@/components/elements/input";
import Text from "@/components/elements/text";
import { ArrowRight } from "@phosphor-icons/react";
import { Flex, message, notification } from "antd";
import { sendSignInLinkToEmail, signInWithPopup } from "firebase/auth";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth, googleProvider, useCreategoogleAcc } from "./register-api";

import GoogleIcon from "@/svg/Google.svg";
import Image from "next/image";
import { useRouter } from "next/router";
type Inputs = {
  nama_user: string;
  email_user: string;

  password: string;
  password_confirmation: string;
};
const BASE = process.env.NEXT_PUBLIC_BASE_URL_REDIRECT;
const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `${BASE}/verify`,
  // This must be true.
  handleCodeInApp: true,
};

export default function SignUpTab() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();
  const router = useRouter();
  // const { mutateAsync, isLoading } = useRegister(

  // );
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      sendSignInLinkToEmail(auth, data.email_user, actionCodeSettings)
        .then(() => {
          // The link was successfully sent. Inform the user.
          // Simpan the email_user locally so you don't need to ask the user for it again
          // if they open the link on the same device.
          window.localStorage.setItem("emailForSignIn", data.email_user);
          window.localStorage.setItem("userInfo", JSON.stringify(data));
          message.info("Cek email Anda untuk aksi selanjutnya!");
          router.push("/verify-email");
          // ...
        })
        .catch((error) => {
          const errorMessage = error.message;
          message.error(errorMessage);
          return;
        });
    } catch (e: any) {
      notification.error({ message: e?.message });
    }
  };

  const { mutateAsync, isLoading } = useCreategoogleAcc();

  const onSignUpWithGoogle = async (data: Inputs) => {
    message.info(
      "Mohon untuk tidak menutup jendela ini, Kami sedang memvalidasi akun anda ...",
    );
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        try {
          const res = await mutateAsync({
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        label="Nama"
        name="nama_user"
        required
        control={control}
        noAsterisk
      />

      <Input
        type="email"
        label="Alamat Email"
        name="email_user"
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
      <Input
        type="password"
        required
        name="password_confirmation"
        control={control}
        noAsterisk
        label="Konfirmasi Password"
      />
      <Button
        htmlType="submit"
        style={{ width: "100%", textTransform: "uppercase", marginBottom: 16 }}
        size="middle"
        // loading={isLoading}
      >
        <Flex align="center" justify="center" gap={12}>
          <Text variant="heading05" color="gray100" weight="bold">
            Daftar
          </Text>{" "}
          <ArrowRight size={20} />
        </Flex>
      </Button>

      <Button
        style={{ width: "100%", textTransform: "uppercase" }}
        size="middle"
        loading={isLoading}
        variant="tertiary"
        onClick={() => onSignUpWithGoogle(getValues())}
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
            Daftar dengan Google
          </Text>{" "}
          {/* <ArrowRight size={20} /> */}
        </Flex>
      </Button>
    </form>
  );
}
