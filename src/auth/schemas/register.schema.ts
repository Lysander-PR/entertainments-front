import * as yup from "yup";

const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/;

export const registerSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(1, "El nombre de usuario es obligatorio")
    .max(30, "El nombre de usuario no puede superar los 30 caracteres")
    .matches(/^\S+$/, "El nombre de usuario no puede contener espacios")
    .required("El nombre de usuario es obligatorio"),
  email: yup
    .string()
    .trim()
    .email("Ingresa un email válido")
    .max(50, "El email no puede superar los 50 caracteres")
    .required("El email es obligatorio"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .matches(
      STRONG_PASSWORD_REGEX,
      "La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un símbolo",
    )
    .required("La contraseña es obligatoria"),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;
