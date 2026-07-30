import { useEntertainmentImage } from "@/entertainments/images/hooks/use-entertainment-image.hook";

interface EntertainmentImageProps {
  fileId?: string;
  alt: string;
  imgClassName: string;
  placeholderClassName: string;
}

export const EntertainmentImage = ({
  fileId,
  alt,
  imgClassName,
  placeholderClassName,
}: EntertainmentImageProps) => {
  const { imageUrl, isLoading } = useEntertainmentImage(fileId);

  if (isLoading) {
    return (
      <div className={placeholderClassName}>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/10 border-t-pink-500" />
      </div>
    );
  }

  if (!imageUrl) {
    return (
      <div className={placeholderClassName}>
        <span className="text-white">{alt}</span>
      </div>
    );
  }

  return <img src={imageUrl} alt={alt} className={imgClassName} />;
};
