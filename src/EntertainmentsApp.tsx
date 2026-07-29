import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { appRouter } from "./router/app.router";
import { CheckAuthProvider } from "./shared/components/CheckAuthProvider";

const queryClient = new QueryClient();

export const EntertainmentsApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
    </QueryClientProvider>
  );
};
