import { FilterType } from "@/api/type";
import Button from "@/components/elements/button";
import Text from "@/components/elements/text";
import { SlidersHorizontal } from "@phosphor-icons/react";
import { Checkbox, Dropdown, Flex, Popover, Radio } from "antd";
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
        } else {
          temp[item.name] = item.value;
        }
      });
    setState(temp);
  }, [filters]);

  return (
    <div
      style={{
        width: "fit-content",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        padding: "20px",
        maxWidth: "200px",
        minWidth: "200px",
      }}
    >
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
              {item.behaviour === "multiple" ? (
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
                    }
                  }}
                  checked={
                    ((state[item.name] || []) as string[]).findIndex(
                      (val) => val === option.value,
                    ) !== -1
                  }
                />
              ) : (
                <Radio
                  value={option.value}
                  checked={state[item.name] === option.value}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      setState((prev) => {
                        return { ...prev, [item.name]: option.value };
                      });
                    }
                  }}
                />
              )}

              <Text color="gray700" variant="bodySmall">
                {option.label}
              </Text>
            </Flex>
          ))}
        </div>
      ))}
      <Flex justify="start" style={{ marginTop: 40 }}>
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
  );
}
