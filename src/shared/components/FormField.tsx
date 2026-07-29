interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  error?: string;
}

export const FormField = ({
  name,
  label,
  type = "text",
  error,
}: FormFieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm text-white">{label}</label>
      <input
        type={type}
        name={name}
        className={`w-full rounded-lg border bg-surface px-4 py-2.5 text-white outline-none transition-colors focus:border-pink-500/50 ${
          error ? "border-red-500/50" : "border-white/10"
        }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
};
