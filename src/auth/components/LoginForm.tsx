import { isAxiosError } from "axios";
import { useState } from "react";

import { Alert } from "@/shared/components/Alert";
import { FormField } from "@/shared/components/FormField";

import { loginAction } from "../actions/login.action";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await loginAction(email, password);
    } catch (submitError) {
      const message = isAxiosError(submitError)
        ? submitError.response?.data?.message
        : null;

      setError(message ?? "No pudimos iniciar sesión. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && <Alert type="error" message={error} />}
      <FormField label="Email" type="email" value={email} onChange={setEmail} />
      <FormField
        label="Contraseña"
        type="password"
        value={password}
        onChange={setPassword}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="gradient-accent rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        Iniciar sesión
      </button>
    </form>
  );
};
