export type MetaType = {
  current_page: number;
  last_page: number;
  from: number;
};

export type FilterType = {
  name: string;
  label: string;
  type: "option";
  behaviour: "multiple" | "single";
  options: { label: string; value: string }[];
  value: string | null;
};

export type SortType = {
  options: string[];
  value: string | undefined;
};
