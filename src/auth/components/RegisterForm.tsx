import { isAxiosError } from "axios";
import { useState } from "react";
import { ValidationError } from "yup";

import { Alert } from "@/shared/components/Alert";
import { FormField } from "@/shared/components/FormField";
import { formatYupErrors } from "@/shared/utils/format-yup-errors.util";

import { register } from "../actions/register.action";
import { registerSchema } from "../schemas/register.schema";

export const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: React.SubmitEvent) => {
    setError(null);
    setFieldErrors({});
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

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
        name="username"
        label="Nombre de usuario"
        error={fieldErrors.username}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        error={fieldErrors.email}
      />
      <FormField
        label="Contraseña"
        name="password"
        type="password"
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
