import { Dropdown } from "./Dropdown";

interface PageSizeSelectProps {
  value: number;
  options: number[];
  onChange: (value: number) => void;
}

export const PageSizeSelect = ({
  value,
  options,
  onChange,
}: PageSizeSelectProps) => {
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
