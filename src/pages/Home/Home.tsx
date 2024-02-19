import { Plus, List } from "lucide-react";

export function Home() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="text-[#12372A] text-2xl mx-auto flex flex-col items-center py-4 gap-3">
        <div>Home</div>
        <div className="mb-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-25 dark:opacity-100 w-full" />
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          <div className="flex flex-col items-center justify-evenly border border-[#12372A] w-9/12 h-36">
            <div>List of categories</div>
            <List />
          </div>
          <div className="flex flex-col items-center justify-evenly border border-[#12372A] w-9/12 h-36">
            <div>Create</div>
            <Plus />
          </div>
          <div className="flex flex-col items-center justify-evenly border border-[#12372A] w-9/12 h-36">
            <div>Total items</div>
            <div>0</div>
          </div>
          <div className="flex flex-col items-center justify-evenly border border-[#12372A] w-9/12 h-36">
            <div>Registered categories</div>
            <div>0</div>
          </div>
        </div>
      </div>
    </div>
  );
}
