import { Dropdown } from "@/shared/components/Dropdown";

interface CardActionsMenuProps {
  onDelete: () => void;
}

export const CardActionsMenu = ({ onDelete }: CardActionsMenuProps) => {
  return (
    <Dropdown
      panelClassName="absolute right-0 top-full z-20 mt-2 w-36 overflow-hidden rounded-lg border border-white/10 bg-surface-elevated shadow-xl"
      trigger={({ toggle }) => (
        <button
          type="button"
          aria-label="Open actions"
          onClick={(event) => {
            event.stopPropagation();
            toggle();
          }}
          className="flex h-7 w-7 items-center justify-center rounded-md bg-black/60 text-white transition-colors hover:bg-black/80"
        >
          ⋮
        </button>
      )}
    >
      {({ close }) => (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            close();
            onDelete();
          }}
          className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/10"
        >
          🗑️ Delete
        </button>
      )}
    </Dropdown>
  );
};
