import Button from "@/components/elements/button";
import Text from "@/components/elements/text";
import { Flex } from "antd";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  title: string;
  onAdd: () => void;
  noAdd?: boolean;
  right?: React.ReactNode;
}

export default function AdminHeader(props: Props) {
  return (
    <Flex justify="space-between" style={{ marginBottom: "24px" }}>
      <Text variant="bodyXxl" weight="medium">
        {props.title}
      </Text>
      {!props.noAdd && (
        <Button variant="primary" onClick={props.onAdd}>
          Tambah
        </Button>
      )}
      {props.right}
    </Flex>
  );
}
