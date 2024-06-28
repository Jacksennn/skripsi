import { SortType } from "@/api/type";
import Button from "@/components/elements/button";
import Text from "@/components/elements/text";
import { SlidersHorizontal } from "@phosphor-icons/react";
import { Checkbox, Flex, Popover, Radio } from "antd";
import React, { useMemo, useState } from "react";

type FilterValue = {
  ascending: string;
  descending: string;
};

interface Props {
  sorts: SortType;
  onChange: (value: { [key: string]: any }) => void;
  isLoading: boolean;
}

export default function FilterBySortComponent(props: Props) {
  const { sorts } = props;
  const [state, setState] = useState<FilterValue>({
    ascending: "",
    descending: "",
  });

  const [open, setIsOpen] = useState<boolean>(false);

  return (
    <Popover
      trigger={"click"}
      arrow={false}
      open={open}
      placement="bottomLeft"
      onOpenChange={setIsOpen}
      content={
        <div>
          <Text variant="bodyMedium" style={{ marginBottom: 12 }}>
            Ascending
          </Text>
          {sorts.options.map((item) => (
            <Flex
              gap={16}
              key={`${item}-options-ascending`}
              align="center"
              style={{ marginBottom: 4 }}
            >
              <Radio
                value={item}
                onChange={(e) => {
                  setState(() => ({
                    ascending: item,
                    descending: "",
                  }));
                }}
                checked={state.ascending === item}
              />
              <Text color="gray700" variant="bodySmall">
                {item}
              </Text>
            </Flex>
          ))}
          <Text variant="bodyMedium" style={{ marginBottom: 12 }}>
            Descending
          </Text>
          {sorts.options.map((item) => (
            <Flex
              gap={16}
              key={`${item}-options-descending`}
              align="center"
              style={{ marginBottom: 4 }}
            >
              <Radio
                value={item}
                onChange={(e) => {
                  setState(() => ({
                    ascending: "",
                    descending: item,
                  }));
                }}
                checked={state.descending === item}
              />
              <Text color="gray700" variant="bodySmall">
                {item}
              </Text>
            </Flex>
          ))}
          <Flex justify="center" style={{ width: "100%" }}>
            <Button
              variant="secondary"
              onClick={() => {
                setIsOpen(false);
                const index = Object.values(state).findIndex((val) => !!val);

                if (index !== -1) {
                  props.onChange?.({
                    sort: state.ascending
                      ? state.ascending
                      : `-${state.descending}`,
                  });
                } else {
                  props.onChange?.({ sort: undefined });
                }
              }}
            >
              Apply
            </Button>
          </Flex>
        </div>
      }
    >
      <Button
        icon={<SlidersHorizontal />}
        variant="tertiary"
        onClick={() => setIsOpen(true)}
        disabled={props.isLoading}
      >
        Filter
      </Button>
    </Popover>
  );
}
