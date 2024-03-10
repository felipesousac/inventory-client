import { CategoryItem } from "./CategoryItem";
import { SpinLoader } from "../../components/SpinLoader";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Pagination } from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import http from "@/http";

// Interfaces of Pageable data API response
export interface CategoryResponse {
  content: Categorie[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Categorie {
  id: string;
  categoryName: string;
  description: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export function Categories() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 0;

  const { data: categoriesResponse, isLoading } = useQuery<CategoryResponse>({
    queryKey: ["get-categories", page],
    queryFn: async () => {
      const data = await http
        .get(`/categories?page=${page}&size=10`)
        .then((response) => {
          return response.data;
        });

      return data;
    },

    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="text-[#12372A] text-2xl mx-auto flex flex-col items-center py-4 gap-3">
        <div>Categories</div>
        <div className="mb-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-700 to-transparent opacity-25 dark:opacity-100 w-full" />

        {isLoading ? (
          <SpinLoader />
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            {categoriesResponse?.content.map((category) => {
              return (
                <CategoryItem
                  key={category.id}
                  category={category}
                  url={`/categories/${category.id}`}
                />
              );
            })}
          </div>
        )}

        {categoriesResponse && (
          <Pagination
            pages={categoriesResponse.totalPages}
            items={categoriesResponse.totalElements}
            page={page}
          />
        )}
      </div>
    </div>
  );
}
