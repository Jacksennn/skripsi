import {
  ArrowDown,
  BellSimple,
  CaretDown,
  Gear,
  Heart,
  NotePencil,
  Notebook,
  ShoppingCartSimple,
  Stack,
  Storefront,
  Tag,
  Truck,
  Users,
} from "@phosphor-icons/react";
import { Flex } from "antd";
import { NextRouter, Router, useRouter } from "next/router";
import React, { useState } from "react";
import { navigationBarStyles } from "./styles.css";
import { colors } from "@/theming/colors";

type Route = { name: string; label: string; icon: React.ReactNode };
const route: {
  [key: string]: Route | (Route & { items: Route[] });
} = {
  dashboard: {
    name: "dashboard",
    label: "Dashboard",
    icon: <Stack weight="duotone" size={20} />,
  },
  product_alert: {
    name: "product-alert",
    label: "Notifikasi Produk",
    icon: <BellSimple size={20} />,
  },
  product: {
    name: "product",
    label: "Produk",
    icon: <Storefront size={20} />,
    items: [
      {
        name: "product",
        label: "Produk",
        icon: <Storefront size={20} />,
      },
      {
        name: "product-adjustment",
        label: "Penyesuaian Produk",
        icon: <Storefront size={20} />,
      },
    ],
  },
  category: { name: "category", label: "Kategori", icon: <Tag size={20} /> },
  supplier: { name: "supplier", label: "Supplier", icon: <Truck size={20} /> },
  customer: { name: "customer", label: "Customer", icon: <Users size={20} /> },
  sales_order: {
    name: "sales-order",
    label: "Penjualan",
    icon: <ShoppingCartSimple size={20} />,
  },
  direct_transaction: {
    name: "transaction",
    label: "Transaksi",
    icon: <NotePencil size={20} />,
  },
  product_combination: {
    name: "product-combination",
    label: "Kombinasi Produk",
    icon: <Heart size={20} />,
  },
  report: { name: "report", label: "Laporan", icon: <Notebook size={20} /> },
  setting: { name: "settings", label: "Pengaturan", icon: <Gear size={20} /> },
};

function NavItem(props: Route & { router: NextRouter }) {
  const { router, name, icon, label } = props;

  return (
    <Flex
      className={navigationBarStyles.item}
      gap={12}
      {...(router.pathname.split("/")?.[2] === name && {
        style: {
          color: colors.gray00,
          backgroundColor: colors.secondary800,
          fontWeight: 600,
        },
      })}
      onClick={() => router.push(`/admin/${name}`)}
    >
      {icon}
      <div className={navigationBarStyles.iconContainer}>{label}</div>
    </Flex>
  );
}

function NavWithItems(props: Route & { items: Route[]; router: NextRouter }) {
  const { router, name, items, icon, label } = props;
  const [isOpen, setIsOpen] = useState<boolean>(router.pathname.includes(name));

  return (
    <>
      <Flex
        className={navigationBarStyles.item}
        gap={12}
        onClick={() => setIsOpen((prev) => !prev)}
        flex={1}
        style={{ width: "100%" }}
      >
        {icon}
        <div className={navigationBarStyles.iconContainer}>{label}</div>
        <CaretDown size={12} />
      </Flex>
      {isOpen &&
        items.map((item) => (
          <Flex
            key={item.name}
            className={navigationBarStyles.item}
            gap={12}
            style={{
              marginLeft: 32,
              borderLeft: `1px solid ${colors.gray100}`,
              ...(router.pathname.split("/")?.[2] === item.name && {
                color: colors.gray00,
                backgroundColor: colors.secondary800,
                fontWeight: 600,
              }),
            }}
            onClick={() => router.push(`/admin/${item.name}`)}
          >
            <div className={navigationBarStyles.iconContainer}>
              {item.label}
            </div>
          </Flex>
        ))}
    </>
  );
}
export default function NavigationBar() {
  const router = useRouter();

  return (
    <div className={navigationBarStyles.container}>
      {Object.keys(route).map((key: string) => {
        const hsItem = Object.keys(route[key]).includes("items");
        return hsItem ? (
          <NavWithItems router={router} {...(route[key] as any)} />
        ) : (
          <NavItem router={router} {...route[key]} key={key} />
        );
      })}
    </div>
  );
}
