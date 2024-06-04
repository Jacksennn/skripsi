import React from "react";
import SettingAccountInformationForm from "./account-information-form";
import AdminLayout from "../../components/admin-layout";

export default function SettingsPage() {
  return (
    <AdminLayout>
      SettingsPage
      <SettingAccountInformationForm />
    </AdminLayout>
  );
}
