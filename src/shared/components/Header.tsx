import { useAuthStore } from "@/auth/store/auth.store";

export const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-end gap-3 border-b border-white/10 bg-surface-elevated px-6 py-4">
      {isAuthenticated ? (
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-red-500/40 px-5 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/10"
        >
          Sign out
        </button>
      ) : (
        <button
          type="button"
          // TODO: navigate to /auth (AuthPage) once the router is configured
          className="rounded-full border border-white/20 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Sign in
        </button>
      )}
      <button
        type="button"
        className="gradient-accent rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition-transform hover:scale-105"
      >
        Add
      </button>
    </header>
  );
};
