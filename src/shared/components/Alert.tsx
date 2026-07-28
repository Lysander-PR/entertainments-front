export type AlertType = "error" | "warning" | "success";

interface AlertProps {
  type: AlertType;
  message: string;
}

const alertStyles: Record<AlertType, string> = {
  error: "border-red-500/40 bg-red-500/10 text-red-400",
  warning: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
};

const alertIcons: Record<AlertType, string> = {
  error: "✕",
  warning: "⚠",
  success: "✓",
};

export const Alert = ({ type, message }: AlertProps) => {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium ${alertStyles[type]}`}
    >
      <span aria-hidden="true">{alertIcons[type]}</span>
      <span>{message}</span>
    </div>
  );
};
