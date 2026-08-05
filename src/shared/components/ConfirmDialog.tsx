import { Alert } from "./Alert";
import { Modal } from "./Modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  loadingLabel?: string;
  isLoading?: boolean;
  errorMessage?: string | null;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmLabel = "Delete",
  loadingLabel = "Deleting...",
  isLoading = false,
  errorMessage = null,
  onConfirm,
  onClose,
}: ConfirmDialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-surface-elevated p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-sm text-text-muted">{message}</p>
        </div>

        {errorMessage && <Alert type="error" message={errorMessage} />}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-full border border-red-500/40 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/20 disabled:opacity-60"
          >
            {isLoading ? loadingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};
