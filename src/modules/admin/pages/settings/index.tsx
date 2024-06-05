import React from "react";
import SettingAccountInformationForm from "./account-information-form";
import AdminLayout from "../../components/admin-layout";
import { useGetMe } from "./api";
import { Spin } from "antd";

export default function SettingsPage() {
  const { data: respond, refetch, isLoading, isRefetching } = useGetMe();
  return (
    <AdminLayout>
      {(isLoading || isRefetching) && <Spin fullscreen />}
      <SettingAccountInformationForm data={respond?.data} />
    </AdminLayout>
  );
}
