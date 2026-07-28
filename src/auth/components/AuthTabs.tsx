export type AuthMode = "login" | "register";

interface AuthTabsProps {
  activeMode: AuthMode;
  onChange: (mode: AuthMode) => void;
}

interface AuthTabButtonProps {
  label: string;
  mode: AuthMode;
  activeMode: AuthMode;
  onChange: (mode: AuthMode) => void;
}

const AuthTabButton = ({
  label,
  mode,
  activeMode,
  onChange,
}: AuthTabButtonProps) => {
  const isActive = activeMode === mode;

  return (
    <button
      type="button"
      onClick={() => onChange(mode)}
      className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "gradient-accent text-white"
          : "text-text-muted hover:text-white"
      }`}
    >
      {label}
    </button>
  );
};

export const AuthTabs = ({ activeMode, onChange }: AuthTabsProps) => {
  return (
    <div className="flex rounded-full bg-black/20 p-1">
      <AuthTabButton
        label="Iniciar sesión"
        mode="login"
        activeMode={activeMode}
        onChange={onChange}
      />
      <AuthTabButton
        label="Registrarse"
        mode="register"
        activeMode={activeMode}
        onChange={onChange}
      />
    </div>
  );
};
