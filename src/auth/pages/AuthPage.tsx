import { useState } from "react";

import { AuthTabs, type AuthMode } from "../components/AuthTabs";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <div className="w-full rounded-2xl border border-white/10 bg-surface-elevated p-8 shadow-2xl shadow-pink-500/10">
          <AuthTabs activeMode={mode} onChange={setMode} />

          <div className="mt-8">
            {mode === "login" ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
};
