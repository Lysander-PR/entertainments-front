import { isAxiosError } from "axios";
import { useState } from "react";
import { ValidationError } from "yup";

import { Alert } from "@/shared/components/Alert";
import { FormField } from "@/shared/components/FormField";
import { formatYupErrors } from "@/shared/utils/format-yup-errors.util";

import { register } from "../actions/register.action";
import { registerSchema } from "../schemas/register.schema";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    setError(null);
    setFieldErrors({});

    try {
      await registerSchema.validate(
        { username, email, password },
        { abortEarly: false },
      );
    } catch (validationError) {
      if (validationError instanceof ValidationError) {
        setFieldErrors(formatYupErrors(validationError));
      }
      return;
    }

    setIsSubmitting(true);

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
        error={fieldErrors.username}
      />
      <FormField
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        error={fieldErrors.email}
      />
      <FormField
        label="Contraseña"
        type="password"
        value={password}
        onChange={setPassword}
        error={fieldErrors.password}
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
