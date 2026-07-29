import * as yup from "yup";

const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/;

export const registerSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(1, "Username is required")
    .max(30, "Username cannot exceed 30 characters")
    .matches(/^\S+$/, "Username cannot contain spaces")
    .required("Username is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .max(50, "Email cannot exceed 50 characters")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .matches(
      STRONG_PASSWORD_REGEX,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one symbol",
    )
    .required("Password is required"),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;
