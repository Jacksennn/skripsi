import React from "react";
import { dashboardCardStyles } from "./styles.css";
import { Package, Receipt, Rocket } from "@phosphor-icons/react";
import Text from "@/components/elements/text";

interface Props {
  variant: "warning" | "success" | "info";
  text: string;
  content: string | number;
}

export default function DashboardCard(props: Props) {
  const { content, text, variant } = props;

  const icon = React.useMemo(() => {
    switch (variant) {
      case "success":
        return <Package size={32} weight={"duotone"} />;
      case "info":
        return <Rocket size={32} weight={"duotone"} />;
      default:
        return <Receipt size={32} weight={"duotone"} />;
    }
  }, [variant]);

  return (
    <div className={dashboardCardStyles.container({ variant })}>
      <div className={dashboardCardStyles.iconContainer}>{icon}</div>
      <div>
        <Text variant="bodyXl" weight="medium">
          {content}
        </Text>
        <Text variant="bodySmall" color={"gray700"}>
          {text}
        </Text>
      </div>
    </div>
  );
}
