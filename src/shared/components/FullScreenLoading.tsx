export const FullScreenLoading = () => {
  return (
    <div className="fixed inset-0 z-100 flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-pink-500" />
      <p className="text-sm font-medium text-text-muted">Loading...</p>
    </div>
  );
};
