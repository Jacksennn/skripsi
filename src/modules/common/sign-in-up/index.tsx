import Layout from "@/components/widget/layout";
import { Tabs } from "antd";
import React from "react";
import { signInUpStyles } from "./styles.css";
import SignInTab from "./components/sign-in";

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
    >
      <div className={signInUpStyles.container}>
        <Tabs
          items={[
            {
              key: "1",
              label: "Sign In",
              children: (
                <div className={signInUpStyles.tabItemContainer}>
                  <SignInTab />
                </div>
              ),
            },
            {
              key: "2",
              label: "Sign Up",
              children: (
                <div className={signInUpStyles.tabItemContainer}>sign up</div>
              ),
            },
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
