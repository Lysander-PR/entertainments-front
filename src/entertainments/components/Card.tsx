import { useState } from "react";

import { Modal } from "@/shared/components/Modal";

import { CardDetailModal } from "./CardDetailModal";

interface CardProps {
  imageUrl: string;
  genre: string;
  year: number;
  title: string;
  author: string;
  description: string;
  rating: number;
}

export const Card = ({
  imageUrl,
  genre,
  year,
  title,
  author,
  description,
  rating,
}: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filledStars = Math.round(rating);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated transition-all hover:-translate-y-1 hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-400/30"
      >
        <div className="relative aspect-3/4 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />

          <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-neutral-900">
            {genre}
          </span>

          <span className="absolute right-3 top-3 rounded-md bg-black/60 px-2 py-1 text-xs font-semibold text-white">
            {year}
          </span>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-orange-400">
            {title}
          </h3>
          <p className="text-sm text-text-muted">{author}</p>
          <p className="line-clamp-3 text-sm text-text-muted">{description}</p>

          <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3">
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
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CardDetailModal
          imageUrl={imageUrl}
          genre={genre}
          year={year}
          title={title}
          author={author}
          description={description}
          rating={rating}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};
