import { useState } from "react";

import { Modal } from "@/shared/components/Modal";
import type { EntertainmentCardItem } from "@/entertainments/types/interfaces/entertainment-card-item.interface";
import { EntertainmentImage } from "@/entertainments/images/components/EntertainmentImage";

import { CardDetailModal } from "./CardDetailModal";
import { CATEGORY_LABELS } from "../types/consts/category-label.const";

interface CardProps {
  item: EntertainmentCardItem;
}

export const Card = ({ item }: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated transition-all hover:-translate-y-1 hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-400/30"
      >
        <div className="relative aspect-3/4 overflow-hidden">
          <EntertainmentImage
            fileId={item.imageId}
            alt={item.title}
            imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            placeholderClassName="absolute inset-0 flex items-center justify-center bg-surface-elevated p-4 text-center"
          />

          <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-neutral-900">
            {CATEGORY_LABELS[item.category]}
          </span>

          <span className="absolute right-3 top-3 rounded-md bg-black/60 px-2 py-1 text-xs font-semibold text-white">
            {item.releaseDate}
          </span>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-orange-400">
            {item.title}
          </h3>
          <p className="text-sm text-text-muted">{item.subtitle}</p>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CardDetailModal item={item} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};
