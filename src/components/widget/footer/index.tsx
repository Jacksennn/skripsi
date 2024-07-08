import React from "react";
import { footerStyles } from "./styles.css";
import Text from "@/components/elements/text";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className={footerStyles.container}>
      <div className={footerStyles.innerContainer}>
        <Text
          variant="heading03"
          weight="bold"
          color="gray00"
          className={footerStyles.title}
          onClick={() => router.push("/")}
        >
          TB CAHAYA BARU
        </Text>

        <div className={footerStyles.informationWrapper}>
          <Text variant="bodySmall" weight="bold" color="gray500">
            Kontak Kami at:
          </Text>
          <Text
            variant="bodyLarge"
            weight="medium"
            color="gray00"
            className={footerStyles.phone}
          >
            0812-6666-3380
          </Text>
          <Text
            variant="bodyMedium"
            weight="regular"
            color="gray300"
            className={footerStyles.address}
          >
            Jl. Sunggal No.360, Sunggal, Kec. Medan Sunggal, Kota Medan,
            Sumatera Utara 20128
          </Text>
        </div>
      </div>
    </footer>
  );
}
