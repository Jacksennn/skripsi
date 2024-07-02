import Text from "@/components/elements/text";
import { Card, Flex } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { imageCardStyle } from "./styles.css";
import { formatPricing } from "@/common/price";

interface Props {
  title: string;
  price: number;
  frequency?: number;
  src?: string;
  onClick?: () => void;
  classname?: string;
  discountPrice?: number;
  hoverable?: boolean;
}

export default function ImageCard(props: Props) {
  const {
    title,
    price,
    frequency,
    src = "https://placehold.co/600x400",
    onClick,
    discountPrice,
    hoverable = true,
  } = props;
  return (
    <Card
      hoverable={hoverable}
      className={props.classname}
      cover={
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={title} src={src} />
      }
      onClick={onClick}
    >
      <Text variant="bodyMedium" weight="medium">
        {title}
      </Text>
      <div className={imageCardStyle.price}>
        <Text
          variant="bodyMedium"
          color={!!discountPrice ? "gray400" : "secondary500"}
          weight="medium"
          style={{
            textDecoration: discountPrice ? "line-through" : undefined,
          }}
        >
          {formatPricing.format(price)},-
        </Text>
        {!!discountPrice && (
          <Text variant="bodyMedium" color="secondary500" weight="medium">
            {formatPricing.format(discountPrice)},-
          </Text>
        )}
      </div>
      {typeof frequency === "number" && (
        <Text variant="bodyTiny" color="gray600" style={{ textAlign: "right" }}>
          Sales Frequency : {frequency}
        </Text>
      )}
    </Card>
  );
}
