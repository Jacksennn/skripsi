import Text from "@/components/elements/text";
import { Flex, Image } from "antd";
import React from "react";

interface Props {
  name: string;
}

export default function ImageLiteCard(props: Props) {
  return (
    <Flex gap={16}>
      <Image
        alt="example"
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        width={100}
        height={100}
      />
      <Flex vertical justify="center">
        <Text variant="bodySmall">{props.name}</Text>
      </Flex>
    </Flex>
  );
}
