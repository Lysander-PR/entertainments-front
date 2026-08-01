import { CATEGORY_LABELS } from "@/entertainments/types/consts/category-label.const";
import type { EntertainmentCategory } from "../interfaces/entertainment-card-item.interface";

export const CATEGORIES_TABS = Object.entries(CATEGORY_LABELS).map(
  ([value, label]) => ({
    value: value as EntertainmentCategory,
    label,
  }),
);
