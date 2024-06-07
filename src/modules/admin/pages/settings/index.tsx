import React from "react";
import SettingAccountInformationForm from "./account-information-form";
import AdminLayout from "../../components/admin-layout";
import { useGetMe } from "./api";
import { Spin } from "antd";
import PasswordChangeForm from "./password-change-form";

export default function SettingsPage() {
  const { data: respond, refetch, isLoading, isRefetching } = useGetMe();
  return (
    <AdminLayout>
      {(isLoading || isRefetching) && <Spin fullscreen />}
      <SettingAccountInformationForm data={respond?.data} />
      <div className="mb"></div>
      <div className="mb"></div>
      <PasswordChangeForm />
    </AdminLayout>
  );
}
