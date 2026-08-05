import type { ReactNode } from "react";

import type { EntertainmentCardItem } from "@/entertainments/types/interfaces/entertainment-card-item.interface";
import { EntertainmentImage } from "@/entertainments/images/components/EntertainmentImage";

import { CATEGORY_LABELS } from "../types/consts/category-label.const";

interface CardDetailModalProps {
  item: EntertainmentCardItem;
  onClose: () => void;
  onDelete?: () => void;
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
  item,
  onClose,
  onDelete,
}: CardDetailModalProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
      >
        ✕
      </button>

      <EntertainmentImage
        fileId={item.imageId}
        alt={item.title}
        imgClassName="w-full object-contain"
        placeholderClassName="flex h-105 w-full items-center justify-center bg-surface-elevated p-4 text-center"
      />

      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">{item.title}</h2>
        <p className="mt-1 text-text-muted">{item.subtitle}</p>

        <div className="mt-4">
          <DetailRow label="Category">
            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-neutral-900">
              {CATEGORY_LABELS[item.category]}
            </span>
          </DetailRow>

          <DetailRow label="Release date">
            <span className="text-white">{item.releaseDate}</span>
          </DetailRow>

          {item?.detailRows &&
            item.detailRows.map((row) => (
              <DetailRow key={row.label} label={row.label}>
                <span className="text-white">{row.value}</span>
              </DetailRow>
            ))}
        </div>

        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="mt-6 w-full rounded-full border border-red-500/40 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/20"
          >
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
};
