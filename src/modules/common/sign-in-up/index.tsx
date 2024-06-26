import Layout from "@/components/widget/layout";
import { Tabs } from "antd";
import React from "react";
import { signInUpStyles } from "./styles.css";
import SignInTab from "./components/sign-in";
import SignUpTab from "./components/sign-up";

interface Props {
  type?: "default" | "admin";
}

export default function SignInUpPage(props: Props) {
  const { type } = props;

  return (
    <Layout
      type={type}
      className={signInUpStyles.outerContainer}
      contentClassname={signInUpStyles.outerContentContainer}
      hideRight
    >
      <div className={signInUpStyles.container}>
        <Tabs
          items={[
            {
              key: "1",
              label: "Sign In",
              children: (
                <div className={signInUpStyles.tabItemContainer}>
                  <SignInTab type={type} />
                </div>
              ),
            },
            ...(type !== "admin"
              ? [
                  {
                    key: "2",
                    label: "Sign Up",
                    children: (
                      <div className={signInUpStyles.tabItemContainer}>
                        <SignUpTab />
                      </div>
                    ),
                  },
                ]
              : []),
          ]}
          className={signInUpStyles.tab}
          tabBarStyle={{
            paddingTop: 10,
            paddingLeft: 10,
          }}
        ></Tabs>
      </div>
    </Layout>
  );
}
