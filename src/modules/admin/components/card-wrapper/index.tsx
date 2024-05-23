import React, { PropsWithChildren } from "react";
import { cardWrapperContainer } from "./styles.css";
import Text from "@/components/elements/text";

interface Props extends PropsWithChildren {
  title?: string;
}

export default function CardWrapper(props: Props) {
  const { title, children } = props;
  return (
    <div className={cardWrapperContainer}>
      <Text style={{ fontSize: 18, marginBottom: 16 }} weight="medium">
        {title}
      </Text>
      {children}
    </div>
  );
}
