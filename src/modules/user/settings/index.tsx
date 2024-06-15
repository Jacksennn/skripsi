import React from "react";
import SettingAccountInformationForm from "./account-information-form";

import { useGetMe } from "./api";
import { Spin } from "antd";
import PasswordChangeForm from "./password-change-form";
import Layout from "@/components/widget/layout";

export default function SettingsPage() {
  const { data: respond, refetch, isLoading, isRefetching } = useGetMe();
  return (
    <Layout hideSearchBar>
      {(isLoading || isRefetching) && <Spin fullscreen />}
      <SettingAccountInformationForm data={respond?.data} />
      <div className="mb"></div>
      <div className="mb"></div>
      <PasswordChangeForm />
    </Layout>
  );
}
