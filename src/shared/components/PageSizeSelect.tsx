import { useSearchParams } from "react-router";

import { Dropdown } from "./Dropdown";
import { DEFAULT_PAGE } from "@/entertainments/utils/entertainment-defaults.util";

interface PageSizeSelectProps {
  value: number;
  options: number[];
}

export const PageSizeSelect = ({ value, options }: PageSizeSelectProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (newPageSize: number) => {
    searchParams.set("pageSize", newPageSize.toString());
    searchParams.set("page", DEFAULT_PAGE.toString());
    setSearchParams(searchParams);
  };

  return (
    <Dropdown
      panelClassName="absolute right-0 top-full z-10 mt-2 w-24 overflow-hidden rounded-lg border border-white/10 bg-surface-elevated shadow-xl"
      trigger={({ toggle }) => (
        <button
          type="button"
          onClick={toggle}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-surface-elevated px-4 py-2 text-sm font-medium text-white"
        >
          {value}
          <span className="text-text-muted">▾</span>
        </button>
      )}
    >
      {({ close }) =>
        options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              onChange(option);
              close();
            }}
            className="flex w-full items-center justify-between px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            {option}
            {option === value && <span>✓</span>}
          </button>
        ))
      }
    </Dropdown>
  );
};
