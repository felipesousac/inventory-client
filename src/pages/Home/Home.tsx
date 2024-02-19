import { Plus, List } from "lucide-react";
import { ContentCard } from "./ContentCard";

export function Home() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="text-[#12372A] text-2xl mx-auto flex flex-col items-center py-4 gap-3">
        <div>Home</div>
        <div className="mb-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-25 dark:opacity-100 w-full" />
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <ContentCard url="" title="List of categories" subtitle={<List />} />
          <ContentCard url="" title="Create" subtitle={<Plus />} />
          <ContentCard url="" title="Total items" subtitle={0} />
          <ContentCard url="" title="Registered categories" subtitle={0} />
        </div>
      </div>
    </div>
  );
}
