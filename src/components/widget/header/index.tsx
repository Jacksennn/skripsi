import Text from "@/components/elements/text";
import React from "react";
import { headerStyles } from "./styles.css";
import Button from "@/components/elements/button";
import UserIcon from "@/components/icon/user-icon";
import CartIcon from "@/components/icon/cart-icon";
import DebounceComponent from "@/components/debounce-component";
import SearchIcon from "@/components/icon/search-icon";
import BaseInput from "@/components/elements/input/base-input";
import { useRouter } from "next/router";
import { getUserLoginToken } from "@/common/fetch-hook";
import { Hamburger, Truck, X } from "@phosphor-icons/react";
import classNames from "classnames";
import { Flex } from "antd";

interface Props {
  type?: "default" | "admin";
  searchComponent?: React.ReactNode;
  left?: React.ReactNode;
  hideRight?: boolean;
}

export default function Header(props: Props) {
  const { type = "default", searchComponent } = props;
  const router = useRouter();
  const isDefault = type === "default";
  const [isSearchExpand, setIsSearchExpand] = React.useState<boolean>();

  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(true);

  const init = async () => {
    if (typeof window !== "undefined") {
      const res = await getUserLoginToken();
      setIsAuthenticated(!!res);
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <header className={headerStyles.container}>
      <div className={headerStyles.innerContainer}>
        <Flex gap={12}>
          {!!props.left && (
            <div className={headerStyles.searchSmallScreen}>{props.left}</div>
          )}
          <div className={headerStyles.searchBigScreen}>
            <Text
              variant="heading03"
              weight="bold"
              color="gray00"
              className={headerStyles.title}
              onClick={() => router.push("/")}
            >
              TB CAHAYA BARU
            </Text>
          </div>
          <div className={headerStyles.searchSmallScreen}>
            {isSearchExpand ? (
              <Button
                shape="circle"
                icon={<X size={20} color="white" />}
                variant="white"
                onClick={() => setIsSearchExpand(false)}
              />
            ) : (
              <Text
                variant="heading03"
                weight="bold"
                color="gray00"
                className={headerStyles.title}
              >
                TB CAHAYA BARU
              </Text>
            )}
          </div>
        </Flex>
        {isDefault && !!searchComponent && (
          <div
            className={classNames(
              headerStyles.searchWrapper,
              headerStyles.searchBigScreen,
            )}
          >
            {searchComponent}
          </div>
        )}

        <div className={headerStyles.rightWrapper}>
          {!!searchComponent && (
            <div className={headerStyles.searchSmallScreen}>
              {!isSearchExpand ? (
                <Button
                  shape="circle"
                  icon={<SearchIcon size={20} color="white" />}
                  variant="white"
                  onClick={() => setIsSearchExpand(true)}
                />
              ) : (
                <>{searchComponent}</>
              )}
            </div>
          )}
          {!props.hideRight && (
            <>
              {" "}
              {isDefault &&
                (isAuthenticated ? (
                  <>
                    <Button
                      shape="circle"
                      icon={<Truck size={20} color="white" />}
                      variant="white"
                      onClick={() => router.push("/order-history")}
                    />
                    <Button
                      shape="circle"
                      icon={<CartIcon size={20} color="white" />}
                      variant="white"
                      onClick={() => router.push("/cart")}
                    />
                    <Button
                      shape="circle"
                      icon={<UserIcon size={20} color="white" />}
                      variant="white"
                      onClick={() => router.push("/settings")}
                    />
                  </>
                ) : (
                  <Text
                    variant="bodyLarge"
                    weight="semiBold"
                    color="gray00"
                    tabIndex={-1}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => router.push("/sign-in")}
                  >
                    Register | Log in
                  </Text>
                ))}
              {!isDefault && isAuthenticated && (
                <Button
                  shape="circle"
                  icon={<UserIcon size={20} color="white" />}
                  variant="white"
                />
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
