import type { PropsWithChildren } from "react";
import { useQuery } from "@tanstack/react-query";

import { refreshAction } from "@/auth/actions/refresh.action";
import { FullScreenLoading } from "@/shared/components/FullScreenLoading";

export const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const { isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: refreshAction,
    retry: false,
    refetchInterval: 1000 * 50,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return <>{children}</>;
};
