import { useEntertainmentImage } from "@/entertainments/images/hooks/use-entertainment-image.hook";

interface EntertainmentImageProps {
  fileId?: string;
  alt: string;
  imgClassName: string;
}

export const EntertainmentImage = ({
  fileId,
  alt,
  imgClassName,
}: EntertainmentImageProps) => {
  const { imageUrl, isLoading } = useEntertainmentImage(fileId);

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-surface-elevated">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-pink-500" />
      </div>
    );
  }

  return <img src={imageUrl} alt={alt} className={imgClassName} />;
};
