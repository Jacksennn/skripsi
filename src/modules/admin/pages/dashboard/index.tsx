import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import { dashboardCardStyles } from "../../components/dashboard-card/styles.css";
import { dashboardStyles } from "./styles.css";
import DashboardCard from "../../components/dashboard-card";
import ImageCard from "@/modules/components/image-card";
import Text from "@/components/elements/text";
import { Flex } from "antd";
import Button from "@/components/elements/button";
import { useGetDashboard } from "./api";

export default function AdminMainPage() {
  const { data } = useGetDashboard();
  return (
    <AdminLayout>
      <div className={dashboardStyles.grid}>
        <DashboardCard
          content={data?.data?.total_sales_this_month || 0}
          text="Total Sales This Month"
          variant="success"
        />
        <DashboardCard
          content={data?.data?.total_sales_last_month || 0}
          text="Total Sales Last Month"
          variant="info"
        />
        <DashboardCard
          content={data?.data?.pending_sales_order || 0}
          text="Pending Sales Order"
          variant="warning"
        />
        <DashboardCard
          content={data?.data?.total_income_this_month || 0}
          text="Total Income This Month"
          variant="success"
        />
        <DashboardCard
          content={data?.data?.total_income_last_month || 0}
          text="Total Income Last Month"
          variant="info"
        />
        <DashboardCard
          content={`${(data?.data?.income_difference || 0) > -1 ? "+" : "-"} ${
            data?.data?.income_difference || 0
          }`}
          text="Income Difference"
          variant="warning"
        />
      </div>

      <div className={dashboardStyles.imageContainer}>
        <Flex justify="space-between">
          <Text
            variant="heading04"
            color="gray900"
            weight="medium"
            style={{ paddingBottom: 12 }}
          >
            BEST SELLING PRODUCT
          </Text>
          <Button variant="white">View All</Button>
        </Flex>
        <div className={dashboardStyles.borderBottom}></div>
        <div className="mb"> </div>
        <div className={dashboardStyles.gridImage}>
          <ImageCard
            price={50000}
            title="Semen Merah Putih 40kg"
            frequency={18}
          />
          <ImageCard
            price={50000}
            title="Semen Merah Putih 40kg"
            frequency={18}
          />
          <ImageCard
            price={50000}
            title="Semen Merah Putih 40kg"
            frequency={18}
          />
          <ImageCard
            price={50000}
            title="Semen Merah Putih 40kg"
            frequency={18}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
