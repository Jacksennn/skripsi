import Text from "@/components/elements/text";
import React from "react";
import { headerStyles } from "./styles.css";
import Button from "@/components/elements/button";
import UserIcon from "@/components/icon/user-icon";
import CartIcon from "@/components/icon/cart-icon";
import DebounceComponent from "@/components/debounce-component";
import SearchIcon from "@/components/icon/search-icon";
import BaseInput from "@/components/elements/input/base-input";

interface Props {
  type?: "default" | "admin";
}

const isAuthenticated = true;
export default function Header(props: Props) {
  const { type = "default" } = props;

  const isDefault = type === "default";
  const [search, setSearch] = React.useState<string>("");

  return (
    <header className={headerStyles.container}>
      <div className={headerStyles.innerContainer}>
        <Text variant="heading03" weight="bold" color="gray00">
          {/* TB CAHAYA BARU */}
        </Text>
        {isDefault && (
          <div className={headerStyles.searchWrapper}>
            <DebounceComponent value={search} setValue={setSearch}>
              {(value, onAfterChange) => (
                <BaseInput
                  type="text"
                  size="large"
                  placeholder="Search for anything..."
                  value={value}
                  onChange={(e) => onAfterChange(e.target.value)}
                  suffix={<SearchIcon size={20} />}
                  noMb
                />
              )}
            </DebounceComponent>
          </div>
        )}
        <div className={headerStyles.rightWrapper}>
          {isDefault &&
            (isAuthenticated ? (
              <>
                <Button
                  shape="circle"
                  icon={<UserIcon size={20} color="white" />}
                  variant="white"
                />
                <Button
                  shape="circle"
                  icon={<CartIcon size={20} color="white" />}
                  variant="white"
                />
              </>
            ) : (
              <Text variant="bodyLarge" weight="semiBold">
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
        </div>
      </div>
    </header>
  );
}
