import { useState } from "react";

import { FormField } from "@/shared/components/FormField";

import { register } from "../actions/register.action";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await register(email, password, username);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
