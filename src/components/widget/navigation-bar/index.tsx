import {
  BellSimple,
  Gear,
  Heart,
  NotePencil,
  Notebook,
  ShoppingCartSimple,
  Stack,
  Storefront,
  Truck,
  Users,
} from "@phosphor-icons/react";
import { Flex } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { navigationBarStyles } from "./styles.css";
import { colors } from "@/theming/colors";

const route: {
  [key: string]: { name: string; label: string; icon: React.ReactNode };
} = {
  dashboard: {
    name: "dashboard",
    label: "Dashboard",
    icon: <Stack weight="duotone" size={20} />,
  },
  product_alert: {
    name: "product-alert",
    label: "Product Alert",
    icon: <BellSimple size={20} />,
  },
  product: {
    name: "product",
    label: "Product",
    icon: <Storefront size={20} />,
  },
  supplier: { name: "supplier", label: "Supplier", icon: <Truck size={20} /> },
  customer: { name: "customer", label: "Customer", icon: <Users size={20} /> },
  sales_order: {
    name: "sales-order",
    label: "Sales Order",
    icon: <ShoppingCartSimple size={20} />,
  },
  direct_transaction: {
    name: "direct-transaction",
    label: "Direct Transaction",
    icon: <NotePencil size={20} />,
  },
  product_combination: {
    name: "product-combination",
    label: "Product Combination",
    icon: <Heart size={20} />,
  },
  report: { name: "report", label: "Report", icon: <Notebook size={20} /> },
  setting: { name: "setting", label: "Setting", icon: <Gear size={20} /> },
};

export default function NavigationBar() {
  const router = useRouter();
  return (
    <div className={navigationBarStyles.container}>
      {Object.keys(route).map((key: string) => (
        <Flex
          key={key}
          className={navigationBarStyles.item}
          gap={12}
          {...(router.pathname.includes(route[key].name) && {
            style: {
              color: colors.gray00,
              backgroundColor: colors.secondary800,
              fontWeight: 600,
            },
          })}
          onClick={() => router.push(route[key].name)}
        >
          {route[key].icon}
          {route[key].label}
        </Flex>
      ))}
    </div>
  );
}
