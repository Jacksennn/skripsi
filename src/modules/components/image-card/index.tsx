import Text from "@/components/elements/text";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

interface Props {
  title: string;
  price: number;
  frequency?: number;
  src: string;
  onClick?: () => void;
}

export default function ImageCard(props: Props) {
  const { title, price, frequency, src, onClick } = props;
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={title} src={src} />
      }
      onClick={onClick}
    >
      <Text variant="bodyMedium" weight="medium">
        {title}
      </Text>
      <Text variant="bodyMedium" color="secondary500" weight="medium">
        Rp. {price},-
      </Text>
      {typeof frequency === "number" && (
        <Text variant="bodyTiny" color="gray600" style={{ textAlign: "right" }}>
          Sales Frequency : {frequency}
        </Text>
      )}
    </Card>
  );
}
