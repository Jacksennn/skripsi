import React, { PropsWithChildren } from "react";
import { cardWrapperContainer } from "./styles.css";

interface Props extends PropsWithChildren {
  title?: string;
}

export default function CardWrapper(props: Props) {
  const { title, children } = props;
  return <div className={cardWrapperContainer}>CardWrapper</div>;
}
