import Text from "@/components/elements/text";
import Layout from "@/components/widget/layout";
import {
  auth,
  useCreateAcc,
} from "@/modules/common/sign-in-up/components/register-api";
import { signInUpStyles } from "@/modules/common/sign-in-up/styles.css";
import { Spin, message, notification } from "antd";
import {
  getAdditionalUserInfo,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import React, { useState } from "react";

export default function PageVerify() {
  const [isHit, setIsHit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutateAsync, isLoading: isCreating } = useCreateAcc();

  const onCreate = React.useCallback(
    async (idToken: string) => {
      try {
        const userInfo = JSON.parse(
          window.localStorage.getItem("userInfo") || "",
        );
        const res = await mutateAsync({ idToken, ...userInfo });
        message.success(res.message);
      } catch (e: any) {
        message.error(e.message);
      }
    },
    [mutateAsync],
  );
  React.useEffect(() => {
    if (typeof window !== "undefined" && isHit === false) {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        // Additional state parameters can also be passed via URL.
        // This can be used to continue the user's intended action before triggering
        // the sign-in operation.
        // Get the email if available. This should be available if the user completes
        // the flow on the same device where they started it.
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt("Please provide your email for confirmation");
        }
        // The client SDK will parse the code from the link for you.
        if (isHit === false) {
          setIsHit(true);
          setIsLoading(true);
          signInWithEmailLink(auth, email!, window.location.href)
            .then(async (result) => {
              // Clear email from storage.
              window.localStorage.removeItem("emailForSignIn");
              const userInfo = JSON.parse(
                window.localStorage.getItem("userInfo") || "",
              );
              if (userInfo) {
                const idToken = await result.user.getIdToken();
                onCreate(idToken);
              }

              // You can access the new user by importing getAdditionalUserInfo
              // and calling it with result:

              // You can access the user's profile via:
              // getAdditionalUserInfo(result)?.profile
              // You can check if the user is new or existing:
              // getAdditionalUserInfo(result)?.isNewUser
            })
            .catch((error) => {
              const errorMessage = error.message;
              message.error(errorMessage);
              return;
            });
        }
      }
    }
  }, [isHit, onCreate]);

  return (
    <Layout
      className={signInUpStyles.outerContainer}
      contentClassname={signInUpStyles.outerContentContainer}
    >
      <div className={signInUpStyles.container}>
        <Spin size={"large"} />
        <Text variant="bodyLarge">Harap tunggu sebentar</Text>
        {isCreating && (
          <Text variant="bodyLarge">Kami sedang membuat akun anda</Text>
        )}
        {isLoading && (
          <Text variant="bodyLarge">Kami sedang memvalidasi email anda</Text>
        )}
      </div>
    </Layout>
  );
}
