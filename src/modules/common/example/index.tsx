import DashboardCard from "@/modules/admin/components/dashboard-card";
import React from "react";

export default function ExamplePage() {
  return (
    <div>
      ExamplePage
      <DashboardCard
        content={154}
        text="Total Sales This Month"
        variant="success"
      />
      <DashboardCard
        content={149}
        text="Total Sales This Month"
        variant="info"
      />
      <DashboardCard
        content={154}
        text="Total Sales This Month"
        variant="warning"
      />
    </div>
  );
}
