import Text from "@/components/elements/text";
import { colors } from "@/theming/colors";
import { Flex, Image } from "antd";
import React from "react";

interface Props {
  name: string;
  url: string;
  price: number;
  qty: number;
}

export default function SummaryImageCard(props: Props) {
  return (
    <Flex gap={16}>
      <Image
        alt="summary-image-item"
        src={props.url}
        width={100}
        height={100}
        style={{ objectFit: "contain" }}
      />
      <Flex vertical justify="center">
        <Text variant="bodySmall">{props.name}</Text>
        <Text variant="bodySmall">
          {`${props.qty}x `}{" "}
          <span
            style={{ color: colors.secondary500 }}
          >{`Rp${props.price}`}</span>
        </Text>
      </Flex>
    </Flex>
  );
}
