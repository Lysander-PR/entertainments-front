import { RouterProvider } from "react-router";

import { appRouter } from "./router/app.router";

export const EntertainmentsApp = () => {
  return <RouterProvider router={appRouter} />;
};
