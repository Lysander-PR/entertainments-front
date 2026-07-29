export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-surface px-6 py-6 text-center">
      <p className="text-sm text-text-muted">
        © {new Date().getFullYear()} Entertainment Hub. Todos los derechos
        reservados.
      </p>
    </footer>
  );
};
