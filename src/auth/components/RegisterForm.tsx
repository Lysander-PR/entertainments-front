import { isAxiosError } from "axios";
import { useState } from "react";

import { Alert } from "@/shared/components/Alert";
import { FormField } from "@/shared/components/FormField";

import { register } from "../actions/register.action";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await register(email, password, username);
    } catch (submitError) {
      const message = isAxiosError(submitError)
        ? submitError.response?.data?.message
        : null;

      setError(message ?? "No pudimos crear la cuenta. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && <Alert type="error" message={error} />}
      <FormField
        label="Nombre de usuario"
        value={username}
        onChange={setUsername}
      />
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
        Crear cuenta
      </button>
    </form>
  );
};
