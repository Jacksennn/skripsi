import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import React, { useState } from "react";
import { auth, useForgotPassword } from "../sign-in-up/components/register-api";
import { Flex, Spin, message } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { colors } from "@/theming/colors";
import Text from "@/components/elements/text";
import Input from "@/components/elements/input";
import Button from "@/components/elements/button";
import { ArrowRight } from "@phosphor-icons/react";
import Layout from "@/components/widget/layout";
import { useRouter } from "next/router";

type Inputs = {
  password: string;
  password_confirmation: string;
};
export default function VerifyForgotEmail() {
  const [isHit, setIsHit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [idToken, setIdToken] = useState<string>("");
  const { mutateAsync } = useForgotPassword();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();
  const router = useRouter();
  const onCreate = React.useCallback<SubmitHandler<Inputs>>(
    async (data) => {
      try {
        let email = window.localStorage.getItem("emailForPWReset");

        const res = await mutateAsync({ idToken, email_user: email!, ...data });
        message.success(res.message);
        window.localStorage.removeItem("emailForPWReset");
        router.push("/sign-in");
      } catch (e: any) {
        message.error(e.message);
      }
    },
    [idToken, mutateAsync, router],
  );

  React.useEffect(() => {
    if (typeof window !== "undefined" && isHit === false) {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForPWReset");
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt("Masukkan email anda untuk konfirmasi");
        }
        // The client SDK will parse the code from the link for you.
        if (isHit === false) {
          setIsHit(true);
          setIsLoading(true);
          signInWithEmailLink(auth, email!, window.location.href)
            .then(async (result) => {
              // Clear email from storage.

              const idToken = await result.user.getIdToken();
              setIdToken(idToken);
              setIsLoading(false);
              //   window.localStorage.removeItem("emailForPWReset");
            })
            .catch((error) => {
              const errorMessage = error.message;
              message.error(errorMessage);
              return;
            });
        }
      }
    }
  }, [isHit]);

  return (
    <Layout
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      hideRight
    >
      {isLoading && <Spin fullscreen />}
      <div
        style={{
          background: "white",
          borderRadius: 6,
          minWidth: 400,
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
        </div>

        <form onSubmit={handleSubmit(onCreate)}>
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
                Reset Password
              </Text>{" "}
              <ArrowRight size={20} />
            </Flex>
          </Button>
        </form>
      </div>
    </Layout>
  );
}
