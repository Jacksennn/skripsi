import Button from "@/components/elements/button";
import Text from "@/components/elements/text";
import Layout from "@/components/widget/layout";
import { colors } from "@/theming/colors";
import { ArrowLeft } from "@phosphor-icons/react";
import { Card, Flex } from "antd";
import { Router, useRouter } from "next/router";
import React from "react";

export default function VerifyEmail() {
  const { back } = useRouter();
  return (
    <Layout
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      hideRight
    >
      <div
        style={{
          background: "white",
          borderRadius: 6,
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          textAlign: "center",
          padding: 32,
          width: "fit-content",
          border: `1px solid ${colors.gray100}`,
        }}
      >
        <Text variant="bodyLarge" weight="semiBold" className="mb">
          Verifikasi Email Anda
        </Text>
        <Text variant="bodySmall" weight="regular" color="gray600">
          Kami telah mengirimkan link ke alamat email anda untuk memverifikasi
          akun Anda.
        </Text>

        <Button
          onClick={() => back()}
          style={{
            width: "100%",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
          size="middle"
          // loading={isLoading}
        >
          <Flex align="center" justify="center" gap={12}>
            <ArrowLeft size={20} />
            <Text variant="heading05" color="gray100" weight="bold">
              Kembali
            </Text>{" "}
          </Flex>
        </Button>
      </div>
    </Layout>
  );
}
