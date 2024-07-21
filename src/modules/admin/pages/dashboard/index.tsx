import AdminLayout from "@/modules/admin/components/admin-layout";
import React from "react";
import { dashboardCardStyles } from "../../components/dashboard-card/styles.css";
import { dashboardStyles } from "./styles.css";
import DashboardCard from "../../components/dashboard-card";
import ImageCard from "@/modules/components/image-card";
import Text from "@/components/elements/text";
import { Divider, Flex } from "antd";
import Button from "@/components/elements/button";
import { useGetDashboard } from "./api";
import { useGetProductsBestSeller } from "../product/api";
import { useRouter } from "next/router";
import { formatPricing } from "@/common/price";

export default function AdminMainPage() {
  const { data } = useGetDashboard();
  const { data: bestSeller } = useGetProductsBestSeller(true, {
    limit: 5,
  });
  const router = useRouter();
  return (
    <AdminLayout>
      <div className={dashboardStyles.grid}>
        <DashboardCard
          content={formatPricing.format(
            data?.data?.total_income_this_month || 0,
          )}
          text="Total Omset Bulan Ini"
          variant="success"
        />
        <DashboardCard
          content={formatPricing.format(
            data?.data?.total_income_last_month || 0,
          )}
          text="Total Omset Bulan lalu"
          variant="info"
        />
        <DashboardCard
          content={(data?.data?.pending_sales_order || 0)}
          text="Order Penjualan Pending"
          variant="warning"
        />
        
      </div>

      <div className={dashboardStyles.imageContainer}>
        <Flex justify="space-between">
          <div>
          <Text
            variant="heading04"
            color="gray900"
            weight="bold"
            style={{ paddingBottom: 12 }}
          >
            PRODUK PALING BANYAK DIBELI BULAN LALU
          </Text>
          <Flex align="center" style={{marginBottom: 12}}>
            <Text style={{display: "flex", width: "max-content"}} variant="bodyMedium" color="gray900" weight="medium">
              Menampilkan penjualan produk terlaris dalam 1 bulan
            </Text>
          </Flex>
          {/* <div style={{display: "flex", flex: 1, height: 2, borderBottom: "1px solid black", marginTop: 12}}></div> */}
          </div>
        </Flex>
        <div className={dashboardStyles.borderBottom}></div>
        <div className="mb"> </div>
        <div className={dashboardStyles.gridImage}>
          {!bestSeller?.data?.length && (
            <Text variant="bodySmall" style={{ textAlign: "center" }}>
              Tidak Ada Produk
            </Text>
          )}
          {bestSeller?.data?.map((item) => {
            return (
              <ImageCard
                price={Number(item.harga_produk)}
                hoverable={false}
                title={item.nama_produk}
                frequency={Number(item.total_jual)}
                src={item.file?.foto_url}
                key={item.id}
              />
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
