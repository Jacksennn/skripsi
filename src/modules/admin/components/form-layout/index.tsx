import Text from "@/components/elements/text";
import { Card, Flex } from "antd";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title?: string;
  right?: React.ReactNode;
}
export default function FormLayout(props: Props) {
  const { pathname } = useRouter();
  const path = pathname.trimStart().split("/");
  path.shift();
  const [_, front, back] = path;

  const isAdd = back === "add";

  return (
    <Card
      title={
        <Flex justify="space-between">
          <Text
            variant="heading04"
            weight="medium"
            style={{ textTransform: "uppercase" }}
          >
            {props.title ||
              `${front} > ${isAdd ? `add new ${front}` : `edit ${front}`}`}
          </Text>
          {props?.right}
        </Flex>
      }
      bordered={false}
      style={{ width: "100%" }}
    >
      {props.children}
    </Card>
  );
}
