import DashboardCard from "@/modules/admin/components/dashboard-card";
import ImageLiteCard from "@/modules/admin/components/image-lite";
import ImageLiteUserCard from "@/modules/user/components/image-lite";

import ImageCard from "@/modules/components/image-card";
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
      <ImageCard
        title={"Semen Merah Putih 40 kg"}
        frequency={18}
        price={50000}
      />
      <ImageLiteCard name="Triplek 12mili sms" code="PR00105" />
      <ImageLiteUserCard name="Triplek 12mili sms" />
    </div>
  );
}
