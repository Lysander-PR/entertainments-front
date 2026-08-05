import type { PaginatedResponse } from "@/shared/types/interfaces/pagination.interface";

import type { EntertainmentCardItem } from "../types/interfaces/entertainment-card-item.interface";

export const toCardItemsPage = <T>(
  response: PaginatedResponse<T>,
  mapper: (item: T) => EntertainmentCardItem,
): PaginatedResponse<EntertainmentCardItem> => ({
  ...response,
  data: response.data.map(mapper),
});
