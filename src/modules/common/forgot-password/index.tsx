import React from "react";
import { auth } from "../sign-in-up/components/register-api";
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { Flex, message, notification } from "antd";
import { useRouter } from "next/router";
import Layout from "@/components/widget/layout";
import { colors } from "@/theming/colors";
import Input from "@/components/elements/input";
import Button from "@/components/elements/button";
import Text from "@/components/elements/text";
import { ArrowRight } from "@phosphor-icons/react";

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `${process.env.NEXT_PUBLIC_BASE_URL_REDIRECT}/forgot-password/verify`,
  // This must be true.
  handleCodeInApp: true,
};

type Inputs = {
  email_user: string;
};
export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();
  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      sendSignInLinkToEmail(auth, data.email_user, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem("emailForPWReset", data.email_user);

          message.info("Cek email Anda untuk aksi selanjutnya");
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
  return (
    <Layout
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      hideRight
    >
      <div
        style={{
          background: "white",
          borderRadius: 6,
          minWidth: 200,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          //   textAlign: "center",
          padding: 32,
          width: "fit-content",
          border: `1px solid ${colors.gray100}`,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Text variant="bodyLarge" weight="semiBold" className="mb">
            Lupa Password
          </Text>
          <Text variant="bodySmall" weight="regular" color="gray600">
            Masukkan alamat email yang terkait dengan akun Anda.
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            label="Alamat Email"
            name="email_user"
            required
            control={control}
            noAsterisk
          />
          <Button
            htmlType="submit"
            style={{
              width: "100%",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
            size="middle"
            // loading={isLoading}
          >
            <Flex align="center" justify="center" gap={12}>
              <Text variant="heading05" color="gray100" weight="semiBold">
                Kirim Kode
              </Text>{" "}
              <ArrowRight size={20} />
            </Flex>
          </Button>
          <Flex className="mb">
            <Text variant="heading05" color="gray600" weight="regular">
              Sudah memiliki akun?
            </Text>
            <Text
              variant="heading05"
              color="secondary500"
              weight="regular"
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/sign-in")}
            >
              Masuk
            </Text>{" "}
          </Flex>
          <Flex>
            <Text variant="heading05" color="gray600" weight="regular">
              Belum memiliki akun
            </Text>
            <Text
              variant="heading05"
              color="secondary500"
              weight="regular"
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/sign-in")}
            >
              Daftar
            </Text>{" "}
          </Flex>
        </form>
      </div>
    </Layout>
  );
}
