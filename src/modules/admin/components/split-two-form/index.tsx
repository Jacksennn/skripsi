import React, { PropsWithChildren } from "react";
import { sectionContainerStyles, sectionStyles } from "./styles.css";

export function SectionContainerForm(props: PropsWithChildren) {
  return <div className={sectionContainerStyles}>{props.children}</div>;
}
export function SectionForm(props: PropsWithChildren) {
  return <div className={sectionStyles}>{props.children}</div>;
}
