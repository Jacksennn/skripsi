import React from "react";
import { footerStyles } from "./styles.css";
import Text from "@/components/elements/text";

export default function Footer() {
  return (
    <footer className={footerStyles.container}>
      <div className={footerStyles.innerContainer}>
        <Text variant="heading03" weight="bold" color="gray00">
          TB CAHAYA BARU
        </Text>

        <div>
          <Text variant="bodySmall" weight="bold" color="gray500">
            Contact us at:
          </Text>
          <Text variant="bodyLarge" weight="medium" color="gray00">
            0812-6666-3380
          </Text>
          <Text variant="bodyMedium" weight="regular" color="gray300">
            Jl. Sunggal No.360, Sunggal, Kec. Medan Sunggal, Kota Medan,
            Sumatera Utara 20128
          </Text>
        </div>
      </div>
    </footer>
  );
}
