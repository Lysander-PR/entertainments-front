import { useEffect, useState } from "react";

import { getFileAction } from "@/entertainments/images/actions/get-file.action";

interface UseEntertainmentImageResult {
  imageUrl?: string;
  isLoading: boolean;
}

export const useEntertainmentImage = (
  fileId?: string,
): UseEntertainmentImageResult => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!fileId) {
      setImageUrl(undefined);
      setIsLoading(false);
      return;
    }

    let objectUrl: string | undefined;

    setImageUrl(undefined);
    setIsLoading(true);

    getFileAction(fileId)
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl);
      })
      .catch(() => setImageUrl(undefined))
      .finally(() => setIsLoading(false));

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [fileId]);

  return { imageUrl, isLoading };
};
