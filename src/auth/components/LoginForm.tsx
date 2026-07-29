import { isAxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ValidationError } from "yup";

import { Alert } from "@/shared/components/Alert";
import { FormField } from "@/shared/components/FormField";
import { formatYupErrors } from "@/shared/utils/format-yup-errors.util";

import { loginAction } from "../actions/login.action";
import { loginSchema } from "../schemas/login.schema";

export const LoginForm = () => {
  const navigate = useNavigate();
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

    try {
      await loginSchema.validate({ email, password }, { abortEarly: false });
    } catch (validationError) {
      if (validationError instanceof ValidationError) {
        setFieldErrors(formatYupErrors(validationError));
      }
      return;
    }

    setIsSubmitting(true);

    try {
      await loginAction(email, password);
      navigate("/");
    } catch (submitError) {
      const message = isAxiosError(submitError)
        ? submitError.response?.data?.message
        : null;

      setError(message ?? "We couldn't sign you in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && <Alert type="error" message={error} />}
      <FormField
        name="email"
        label="Email"
        type="email"
        error={fieldErrors.email}
      />
      <FormField
        name="password"
        label="Password"
        type="password"
        error={fieldErrors.password}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="gradient-accent rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        Sign in
      </button>
    </form>
  );
};
