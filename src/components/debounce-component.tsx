import React from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props<T> {
  setValue: React.Dispatch<T>;
  value: T;
  children: (value: T, onAfterChange: (value: T) => void) => React.ReactNode;
}

export default function DebounceComponent<T>(props: Props<T>) {
  const [value, setValue] = React.useState<T>(props.value);

  const onAfterChange = useDebouncedCallback(
    (value: T) => props.setValue(value),
    800,
  );

  return (
    <>
      {props.children(value, (value) => {
        setValue(value);
        onAfterChange(value);
      })}
    </>
  );
}
