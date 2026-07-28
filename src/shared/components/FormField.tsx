interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

export const FormField = ({
  label,
  type = "text",
  value,
  onChange,
}: FormFieldProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm text-white">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-white/10 bg-surface px-4 py-2.5 text-white outline-none transition-colors focus:border-pink-500/50"
      />
    </div>
  );
};
