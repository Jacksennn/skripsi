import React from "react";
import Header from "../header";
import { layoutStyles } from "./styles.css";
import Footer from "../footer";
import classNames from "classnames";

interface Props extends React.PropsWithChildren {
  type?: "default" | "admin";
  className?: string;
  contentClassname?: string;
}
export default function Layout(props: Props) {
  const { type = "default", children } = props;

  return (
    <div className={classNames(props.className, layoutStyles.container)}>
      <Header type={type} />
      <main
        className={classNames(
          layoutStyles.main({ type }),
          props.contentClassname,
        )}
      >
        {children}
      </main>
      {type === "default" && <Footer />}
    </div>
  );
}
