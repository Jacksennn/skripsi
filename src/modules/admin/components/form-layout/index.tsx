import Text from "@/components/elements/text";
import { Card } from "antd";
import { useRouter } from "next/router";
import React from "react";

interface Props {}
export default function FormLayout(props: Props) {
  const { pathname } = useRouter();
  const path = pathname.trimStart().split("/");
  path.shift();
  const [_, front, back] = path;

  const isAdd = back === "add";

  return (
    <Card
      title={
        <Text
          variant="heading04"
          weight="medium"
          style={{ textTransform: "uppercase" }}
        >
          {`${front} > ${isAdd ? `add new ${front}` : `edit ${front}`}`}
        </Text>
      }
      bordered={false}
      style={{ width: "100%", minHeight: "" }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
}
