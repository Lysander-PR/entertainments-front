import { useSearchParams } from "react-router";

interface Tab<T extends string> {
  label: string;
  value: T;
}

interface TabsProps<T extends string> {
  tabs: Tab<T>[];
  paramKey: string;
}

export const Tabs = <T extends string>({ tabs, paramKey }: TabsProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeValue = searchParams.get(paramKey);

  const handleChangeTab = (value: T) => {
    searchParams.set("page", "1");
    searchParams.set(paramKey, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => handleChangeTab(tab.value)}
          className={
            tab.value === activeValue
              ? "rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-neutral-900"
              : "rounded-lg px-4 py-2 text-sm font-semibold text-text-muted transition-colors hover:bg-white/10 hover:text-white"
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
