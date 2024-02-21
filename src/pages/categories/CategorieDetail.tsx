import { useEffect, useState } from "react";
import axios from "axios";
import { SpinLoader } from "../../components/SpinLoader";

interface Categorie {
  id: string;
  name: string;
  description: string;
}

export function CategorieDetail() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="text-pallete-dark text-2xl mx-auto flex flex-col items-center py-4 gap-3">
        <div>Categories</div>
        <div className="mb-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-25 dark:opacity-100 w-full" />

        {isLoading ? (
          <SpinLoader />
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            Teste
          </div>
        )}
      </div>
    </div>
  );
}
