import { FilterType } from "@/api/type";
import Button from "@/components/elements/button";
import BaseInput from "@/components/elements/input/base-input";
import Text from "@/components/elements/text";
import { SlidersHorizontal } from "@phosphor-icons/react";
import { Checkbox, Dropdown, Flex, Popover } from "antd";
import React, { useCallback, useState } from "react";

interface Props {
  filters: FilterType[];
  onChange: (value: { [key: string]: any }) => void;
  isLoading: boolean;
}
export default function FilterComponent(props: Props) {
  const { filters, isLoading } = props;
  const [open, setIsOpen] = useState<boolean>(false);

  const [state, setState] = useState<{ [key: string]: any }>({});

  React.useEffect(() => {
    const temp: { [key: string]: any } = {};
    filters
      .filter((item) => !!item.value)
      ?.forEach((item) => {
        if (item.behaviour === "multiple") {
          temp[item.name] = (item.value as string).split(",");
        }
      });
    setState(temp);
  }, [filters]);

  return (
    <Popover
      trigger={"click"}
      arrow={false}
      open={open}
      placement="bottomLeft"
      onOpenChange={setIsOpen}
      content={
        <div>
          {filters.map((item) => (
            <div key={item.value} className="mb">
              <Text variant="bodyMedium" style={{ marginBottom: 12 }}>
                {item.label}
              </Text>
              {item.options?.map((option) => (
                <Flex
                  gap={16}
                  key={`${item.value}-options-${option.value}`}
                  align="center"
                  style={{ marginBottom: 4 }}
                >
                  <Checkbox
                    value={option.value}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (item.behaviour === "multiple") {
                        setState((prev) => {
                          const temp: string[] = prev[item.name]
                            ? [...prev[item.name]]
                            : [];
                          if (checked) {
                            temp.push(option.value);
                          } else {
                            temp.splice(
                              temp.findIndex((val) => val === option.value),
                              1,
                            );
                          }
                          return { ...prev, [item.name]: temp };
                        });
                      } else {
                      }
                    }}
                    checked={
                      ((state[item.name] || []) as string[]).findIndex(
                        (val) => val === option.value,
                      ) !== -1
                    }
                  />
                  <Text color="gray700" variant="bodySmall">
                    {option.label}
                  </Text>
                </Flex>
              ))}
            </div>
          ))}
          <Flex justify="end" style={{ width: "100%" }}>
            <Button
              variant="secondary"
              onClick={() => {
                const temp: { [key: string]: any } = {};
                Object.keys(state).forEach((s) => {
                  const val = state[s];

                  if (Array.isArray(val)) {
                    temp[`filter[${s}]`] = val.join(",");
                  } else {
                    temp[`filter[${s}]`] = val;
                  }
                });
                setIsOpen(false);
                props.onChange?.(temp);
              }}
            >
              Apply
            </Button>
          </Flex>
        </div>
      }
    >
      <Button
        variant="tertiary"
        onClick={() => setIsOpen(true)}
        disabled={isLoading}
        icon={<SlidersHorizontal />}
      >
        Filter
      </Button>
    </Popover>
  );
}
