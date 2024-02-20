import { CategorieItem } from "./CategorieItem";

export function Categories() {
  const categories = ["categorie 1", "categorie 1", "categorie 1"];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="text-[#12372A] text-2xl mx-auto flex flex-col items-center py-4 gap-3">
        <div>Categories</div>
        <div className="mb-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-25 dark:opacity-100 w-full" />
        <div className="flex flex-col items-center justify-center gap-6 w-full">
          {categories.map((categorie) => {
            return <CategorieItem categorie={categorie} url="" />;
          })}
        </div>
      </div>
    </div>
  );
}
