import { useState } from "react";

import { FormField } from "@/shared/components/FormField";

import { loginAction } from "../actions/login.action";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await loginAction(email, password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
