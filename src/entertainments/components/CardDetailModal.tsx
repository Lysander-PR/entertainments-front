import type { ReactNode } from "react";

interface CardDetailModalProps {
  imageUrl: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
  onClose: () => void;
}

interface DetailRowProps {
  label: string;
  children: ReactNode;
}

const DetailRow = ({ label, children }: DetailRowProps) => {
  return (
    <div className="flex items-center justify-between border-t border-white/10 py-4">
      <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </span>
      {children}
    </div>
  );
};

export const CardDetailModal = ({
  imageUrl,
  title,
  author,
  year,
  genre,
  rating,
  description,
  onClose,
}: CardDetailModalProps) => {
  const filledStars = Math.round(rating);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated">
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
      >
        ✕
      </button>

      <img
        src={imageUrl}
        alt={title}
        className="max-h-[420px] w-full object-cover"
      />

      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="mt-1 text-text-muted">{author}</p>

        <div className="mt-4">
          <DetailRow label="Autor">
            <span className="text-white">{author}</span>
          </DetailRow>

          <DetailRow label="Año">
            <span className="text-white">{year}</span>
          </DetailRow>

          <DetailRow label="Género">
            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-neutral-900">
              {genre}
            </span>
          </DetailRow>

          <DetailRow label="Valoración">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 text-orange-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={index < filledStars ? "" : "text-white/20"}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm font-semibold text-white">
                {rating.toFixed(1)} / 5
              </span>
            </div>
          </DetailRow>

          <div className="border-t border-white/10 py-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Descripción
            </span>
            <p className="mt-2 text-white">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
