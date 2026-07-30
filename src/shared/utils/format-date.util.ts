export const formatDate = (dateIso: string): string => {
  return new Date(dateIso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
