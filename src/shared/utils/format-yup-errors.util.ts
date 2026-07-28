import type { ValidationError } from "yup";

export const formatYupErrors = (
  error: ValidationError,
): Record<string, string> => {
  return error.inner.reduce<Record<string, string>>((errors, issue) => {
    if (issue.path && !errors[issue.path]) {
      errors[issue.path] = issue.message;
    }
    return errors;
  }, {});
};
