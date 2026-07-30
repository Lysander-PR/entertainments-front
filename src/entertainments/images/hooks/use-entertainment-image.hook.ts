import { useEffect, useState } from "react";

import { getFileAction } from "@/entertainments/images/actions/get-file.action";

export const useEntertainmentImage = (fileId?: string): string | undefined => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  useEffect(() => {
    if (!fileId) {
      setImageUrl(undefined);
      return;
    }

    let objectUrl: string | undefined;

    getFileAction(fileId)
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl);
      })
      .catch(() => setImageUrl(undefined));

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [fileId]);

  return imageUrl;
};
